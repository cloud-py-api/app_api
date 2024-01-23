<?php

declare(strict_types=1);

namespace OCA\AppAPI\Db;

use OCP\AppFramework\Db\DoesNotExistException;
use OCP\AppFramework\Db\Entity;
use OCP\AppFramework\Db\MultipleObjectsReturnedException;
use OCP\AppFramework\Db\QBMapper;
use OCP\DB\Exception;
use OCP\DB\QueryBuilder\IQueryBuilder;
use OCP\IDBConnection;

/**
 * @template-extends QBMapper<ExApp>
 */
class ExAppMapper extends QBMapper {
	public function __construct(IDBConnection $db) {
		parent::__construct($db, 'ex_apps');
	}

	/**
	 * @throws Exception
	 *
	 * @return ExApp[]
	 */
	public function findAll(int $limit = null, int $offset = null): array {
		$qb = $this->db->getQueryBuilder();
		$qb->select(
			'ex_apps.*',
			'ex_apps_daemons.protocol',
			'ex_apps_daemons.host',
			'ex_apps_daemons.deploy_config',
			'ex_apps_daemons.accepts_deploy_id',
		)
			->from($this->tableName, 'ex_apps')
			->leftJoin(
				'ex_apps',
				'ex_apps_daemons',
				'ex_apps_daemons',
				'ex_apps_daemons.name = ex_apps.daemon_config_name')
			->setMaxResults($limit)
			->setFirstResult($offset);
		return $this->findEntities($qb);
	}

	/**
	 * @param string $appId
	 *
	 * @throws DoesNotExistException if not found
	 * @throws MultipleObjectsReturnedException if more than one result
	 * @throws Exception
	 *
	 * @return ExApp
	 */
	public function findByAppId(string $appId): Entity {
		$qb = $this->db->getQueryBuilder();
		$qb->select(
			'ex_apps.*',
			'ex_apps_daemons.protocol',
			'ex_apps_daemons.host',
			'ex_apps_daemons.deploy_config',
			'ex_apps_daemons.accepts_deploy_id',
		)
			->from($this->tableName, 'ex_apps')
			->leftJoin(
				'ex_apps',
				'ex_apps_daemons',
				'ex_apps_daemons',
				'ex_apps_daemons.name = ex_apps.daemon_config_name')
			->where(
				$qb->expr()->eq('ex_apps.appid', $qb->createNamedParameter($appId))
			);
		return $this->findEntity($qb);
	}

	/**
	 * @param int $port
	 *
	 * @throws Exception
	 *
	 * @return array
	 */
	public function findByPort(int $port): array {
		$qb = $this->db->getQueryBuilder();
		$qb->select(
			'ex_apps.*',
			'ex_apps_daemons.protocol',
			'ex_apps_daemons.host',
			'ex_apps_daemons.deploy_config',
			'ex_apps_daemons.accepts_deploy_id',
		)
			->from($this->tableName, 'ex_apps')
			->leftJoin(
				'ex_apps',
				'ex_apps_daemons',
				'ex_apps_daemons',
				'ex_apps_daemons.name = ex_apps.daemon_config_name')
			->where(
				$qb->expr()->eq('ex_apps.port', $qb->createNamedParameter($port))
			);
		return $this->findEntities($qb);
	}

	/**
	 * @throws Exception
	 */
	public function deleteExApp(string $appId): int {
		$qb = $this->db->getQueryBuilder();
		return $qb->delete($this->tableName)
			->where(
				$qb->expr()->eq('appid', $qb->createNamedParameter($appId, IQueryBuilder::PARAM_STR))
			)->executeStatement();
	}

	/**
	 * @throws Exception
	 */
	public function updateExApp(ExApp $exApp, array $fields): int {
		$qb = $this->db->getQueryBuilder();
		$qb = $qb->update($this->tableName);
		foreach ($fields as $field) {
			if ($field === 'version') {
				$qb = $qb->set('version', $qb->createNamedParameter($exApp->getVersion()));
			} elseif ($field === 'name') {
				$qb = $qb->set('name', $qb->createNamedParameter($exApp->getName()));
			} elseif ($field === 'port') {
				$qb = $qb->set('port', $qb->createNamedParameter($exApp->getPort(), IQueryBuilder::PARAM_INT));
			} elseif ($field === 'status') {
				$qb = $qb->set('status', $qb->createNamedParameter($exApp->getStatus(), IQueryBuilder::PARAM_JSON));
			} elseif ($field === 'enabled') {
				$qb = $qb->set('enabled', $qb->createNamedParameter($exApp->getEnabled(), IQueryBuilder::PARAM_INT));
			} elseif ($field === 'last_check_time') {
				$qb = $qb->set('last_check_time', $qb->createNamedParameter($exApp->getLastCheckTime(), IQueryBuilder::PARAM_INT));
			}
		}
		return $qb->where($qb->expr()->eq('appid', $qb->createNamedParameter($exApp->getAppid())))->executeStatement();
	}
}
