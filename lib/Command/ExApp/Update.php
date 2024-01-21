<?php

declare(strict_types=1);

namespace OCA\AppAPI\Command\ExApp;

use OCA\AppAPI\Db\ExAppScope;
use OCA\AppAPI\DeployActions\DockerActions;
use OCA\AppAPI\Service\AppAPIService;
use OCA\AppAPI\Service\DaemonConfigService;
use OCA\AppAPI\Service\ExAppApiScopeService;
use OCA\AppAPI\Service\ExAppScopesService;

use OCA\AppAPI\Service\ExAppService;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Helper\QuestionHelper;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Question\ConfirmationQuestion;

class Update extends Command {

	public function __construct(
		private readonly AppAPIService  	  $service,
		private readonly ExAppService         $exAppService,
		private readonly ExAppScopesService   $exAppScopeService,
		private readonly ExAppApiScopeService $exAppApiScopeService,
		private readonly DaemonConfigService  $daemonConfigService,
		private readonly DockerActions        $dockerActions,
	) {
		parent::__construct();
	}

	protected function configure(): void {
		$this->setName('app_api:app:update');
		$this->setDescription('Update ExApp');

		$this->addArgument('appid', InputArgument::REQUIRED);

		$this->addOption('info-xml', null, InputOption::VALUE_REQUIRED, '[required] Path to ExApp info.xml file (url or local absolute path)');
		$this->addOption('force-update', null, InputOption::VALUE_NONE, 'Force ExApp update approval');
		$this->addOption('force-scopes', null, InputOption::VALUE_NONE, 'Force new ExApp scopes approval');
	}

	protected function execute(InputInterface $input, OutputInterface $output): int {
		$appId = $input->getArgument('appid');

		$pathToInfoXml = $input->getOption('info-xml');
		if ($pathToInfoXml !== null) {
			$infoXml = simplexml_load_string(file_get_contents($pathToInfoXml));
		} else {
			$infoXml = $this->exAppService->getLatestExAppInfoFromAppstore($appId);
		}

		if ($infoXml === false) {
			$output->writeln(sprintf('Failed to load info.xml from %s', $pathToInfoXml));
			return 2;
		}
		if ($appId !== (string) $infoXml->id) {
			$output->writeln(sprintf('ExApp appid %s does not match appid in info.xml (%s)', $appId, $infoXml->id));
			return 2;
		}

		$exApp = $this->exAppService->getExApp($appId);
		if ($exApp === null) {
			$output->writeln(sprintf('ExApp %s not found.', $appId));
			return 1;
		}

		$newVersion = (string) $infoXml->version;
		if ($exApp->getVersion() === $newVersion) {
			$output->writeln(sprintf('ExApp %s already updated (%s)', $appId, $newVersion));
			return 2;
		}

		if ($exApp->getEnabled()) {
			if (!$this->service->disableExApp($exApp)) {
				$output->writeln(sprintf('Failed to disable ExApp %s.', $appId));
				return 1;
			} else {
				$output->writeln(sprintf('ExApp %s disabled.', $appId));
			}
		}

		$daemonConfig = $this->daemonConfigService->getDaemonConfigByName($exApp->getDaemonConfigName());
		if ($daemonConfig === null) {
			$output->writeln(sprintf('Daemon config %s not found', $exApp->getDaemonConfigName()));
		}

		if ($daemonConfig->getAcceptsDeployId() === 'manual-install') {
			$output->writeln('For "manual-install" deployId update is done manually');
			return 2;
		}

		if ($daemonConfig->getAcceptsDeployId() === $this->dockerActions->getAcceptsDeployId()) {
			$forceApproval = $input->getOption('force-update');
			$approveUpdate = $forceApproval;
			if (!$forceApproval && $input->isInteractive()) {
				/** @var QuestionHelper $helper */
				$helper = $this->getHelper('question');
				$question = new ConfirmationQuestion('Current ExApp version will be removed (persistent storage preserved). Continue? [y/N] ', false);
				$approveUpdate = $helper->ask($input, $output, $question);
			}

			if (!$approveUpdate) {
				$output->writeln(sprintf('ExApp %s update canceled', $appId));
				return 0;
			}

			$this->dockerActions->initGuzzleClient($daemonConfig); // Required init
			$containerInfo = $this->dockerActions->inspectContainer($this->dockerActions->buildDockerUrl($daemonConfig), $this->dockerActions->buildExAppContainerName($appId));
			if (isset($containerInfo['error'])) {
				$output->writeln(sprintf('Failed to inspect old ExApp %s container. Error: %s', $appId, $containerInfo['error']));
				return 1;
			}
			$deployParams = $this->dockerActions->buildDeployParams($daemonConfig, $infoXml, [
				'container_info' => $containerInfo,
			]);
			[$pullResult, $stopResult, $removeResult, $createResult, $startResult] = $this->dockerActions->updateExApp($daemonConfig, $deployParams);

			if (isset($pullResult['error'])) {
				$output->writeln(sprintf('ExApp %s update failed. Error: %s', $appId, $pullResult['error']));
				return 1;
			}

			if (isset($stopResult['error']) || isset($removeResult['error'])) {
				$output->writeln(sprintf('Failed to remove old ExApp %s container (id: %s). Error: %s', $appId, $containerInfo['Id'], $stopResult['error'] ?? $removeResult['error'] ?? null));
				return 1;
			}

			if (!isset($startResult['error']) && isset($createResult['Id'])) {
				if (!$this->dockerActions->healthcheckContainer($createResult['Id'], $daemonConfig)) {
					$output->writeln(sprintf('ExApp %s update failed. Error: %s', $appId, 'Container healthcheck failed.'));
					return 1;
				}

				$auth = [];
				$exAppUrl = $this->dockerActions->resolveExAppUrl(
					$appId,
					$daemonConfig->getProtocol(),
					$daemonConfig->getHost(),
					$daemonConfig->getDeployConfig(),
					(int) $deployParams['container_params']['port'],
					$auth,
				);
				if (!$this->service->heartbeatExApp($exAppUrl, $auth)) {
					$output->writeln(sprintf('ExApp %s heartbeat check failed. Make sure container started and configured correctly to be reachable by Nextcloud.', $appId));
					return 1;
				}

				$output->writeln(sprintf('ExApp %s container successfully updated.', $appId));
			}
		}

		$exAppInfo = $this->dockerActions->loadExAppInfo($appId, $daemonConfig);
		if (!$this->exAppService->updateExAppInfo($exApp, $exAppInfo)) {
			$output->writeln(sprintf('Failed to update ExApp %s info', $appId));
			return 1;
		}

		// Default scopes approval process (compare new ExApp scopes)
		$currentExAppScopes = array_map(function (ExAppScope $exAppScope) {
			return $exAppScope->getScopeGroup();
		}, $this->exAppScopeService->getExAppScopes($exApp));
		$newExAppScopes = $this->exAppService->getExAppRequestedScopes($exApp, $infoXml);
		if (isset($newExAppScopes['error'])) {
			$output->writeln($newExAppScopes['error']);
		}
		// Prepare for prompt of newly requested ExApp scopes
		$requiredScopes = $this->compareExAppScopes($currentExAppScopes, $newExAppScopes, 'required');
		$optionalScopes = $this->compareExAppScopes($currentExAppScopes, $newExAppScopes, 'optional');

		$forceScopes = (bool) $input->getOption('force-scopes');
		$confirmRequiredScopes = $forceScopes;
		$confirmOptionalScopes = $forceScopes;

		if (!$forceScopes && $input->isInteractive()) {
			/** @var QuestionHelper $helper */
			$helper = $this->getHelper('question');

			if (count($requiredScopes) > 0) {
				$output->writeln(sprintf('ExApp %s requested required scopes: %s', $appId, implode(', ',
					$this->exAppApiScopeService->mapScopeGroupsToNames($requiredScopes))));
				$question = new ConfirmationQuestion('Do you want to approve it? [y/N] ', false);
				$confirmRequiredScopes = $helper->ask($input, $output, $question);
			} else {
				$confirmRequiredScopes = true;
			}

			if ($confirmRequiredScopes && count($optionalScopes) > 0) {
				$output->writeln(sprintf('ExApp %s requested optional scopes: %s', $appId, implode(', ',
					$this->exAppApiScopeService->mapScopeGroupsToNames($optionalScopes))));
				$question = new ConfirmationQuestion('Do you want to approve it? [y/N] ', false);
				$confirmOptionalScopes = $helper->ask($input, $output, $question);
			}
		}

		if (!$confirmRequiredScopes && count($requiredScopes) > 0) {
			$output->writeln(sprintf('ExApp %s required scopes not approved. Failed to finish ExApp update.', $appId));
			return 1;
		}

		if (!$confirmOptionalScopes && count($optionalScopes) > 0) {
			// Remove optional scopes from the list so that they will be removed
			$newExAppScopes['optional'] = [];
		}

		$newExAppScopes = array_merge(
			$this->exAppApiScopeService->mapScopeNamesToNumbers($newExAppScopes['required']),
			$this->exAppApiScopeService->mapScopeNamesToNumbers($newExAppScopes['optional'])
		);
		if (!$this->exAppScopeService->updateExAppScopes($exApp, $newExAppScopes)) {
			$output->writeln(sprintf('Failed to update ExApp %s scopes.', $appId));
			return 1;
		}

		if (!$this->service->dispatchExAppInit($exApp, true)) {
			$output->writeln(sprintf('Dispatching init for ExApp %s fails.', $appId));
			return 1;
		}

		$output->writeln(sprintf('ExApp %s successfully updated.', $appId));
		return 0;
	}

	/**
	 * Compare ExApp scopes and return difference (new requested)
	 *
	 * @param array $currentExAppScopes
	 * @param array $newExAppScopes
	 * @param string $type
	 * @return array
	 */
	private function compareExAppScopes(array $currentExAppScopes, array $newExAppScopes, string $type): array {
		return array_values(array_diff($this->exAppApiScopeService->mapScopeNamesToNumbers($newExAppScopes[$type]), $currentExAppScopes));
	}
}
