<?php

declare(strict_types=1);

namespace OCA\AppAPI\Command\Daemon;

use OCA\AppAPI\AppInfo\Application;
use OCA\AppAPI\Service\DaemonConfigService;

use OCP\IConfig;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Helper\Table;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

class ListDaemons extends Command {

	public function __construct(
		private DaemonConfigService $daemonConfigService,
		private IConfig $config
	) {
		parent::__construct();
	}

	protected function configure(): void {
		$this->setName('app_api:daemon:list');
		$this->setDescription('List registered daemons');
	}

	protected function execute(InputInterface $input, OutputInterface $output): int {
		$daemonConfigs = $this->daemonConfigService->getRegisteredDaemonConfigs();
		if ($daemonConfigs === null) {
			$output->writeln('<error>Failed to get list of daemons.</error>');
			return 1;
		}

		if (count($daemonConfigs) === 0) {
			$output->writeln('No registered daemon configs.');
			return 0;
		}

		$defaultDaemonName = $this->config->getAppValue(Application::APP_ID, 'default_daemon_config');

		$output->writeln('Registered ExApp daemon configs:');
		$table = new Table($output);
		$table->setHeaders(['Default', 'Name', 'Display name', 'Accepts Deploy ID', 'Protocol', 'Host']);
		$rows = [];

		foreach ($daemonConfigs as $daemon) {
			$rows[] = [$daemon->getName() === $defaultDaemonName ? '*' : '', $daemon->getName(), $daemon->getDisplayName(), $daemon->getAcceptsDeployId(), $daemon->getProtocol(), $daemon->getHost()];
		}

		$table->setRows($rows);
		$table->render();

		return 0;
	}
}
