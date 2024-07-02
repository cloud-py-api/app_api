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
	public function findAll(?int $limit = null, ?int $offset = null): array {
		$qb = $this->db->getQueryBuilder();
		$qb->select(
			'a.*',
			'd.protocol',
			'd.host',
			'd.deploy_config',
			'd.accepts_deploy_id',
		)
			->from($this->tableName, 'a')
			->leftJoin('a', 'ex_apps_daemons', 'd', $qb->expr()->eq('a.daemon_config_name', 'd.name'))
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
			'a.*',
			'd.protocol',
			'd.host',
			'd.deploy_config',
			'd.accepts_deploy_id',
		)
			->from($this->tableName, 'a')
			->leftJoin('a', 'ex_apps_daemons', 'd', $qb->expr()->eq('a.daemon_config_name', 'd.name'))
			->where(
				$qb->expr()->eq('a.appid', $qb->createNamedParameter($appId))
			);
		return $this->findEntity($qb);
	}

	/**
	 * @return array
	 * @throws Exception
	 */
	public function getUsedPorts(): array {
		$qb = $this->db->getQueryBuilder();
		$qb->select('port')->from($this->tableName);
		$result = $qb->executeQuery();
		$ports = [];
		while ($row = $result->fetch()) {
			$ports[] = $row['port'];
		}
		$result->closeCursor();
		return $ports;
	}

	public function deleteExApp(string $appId): int {
		$qb = $this->db->getQueryBuilder();
		try {
			return $qb->delete($this->tableName)
				->where(
					$qb->expr()->eq('appid', $qb->createNamedParameter($appId, IQueryBuilder::PARAM_STR))
				)->executeStatement();
		} catch (Exception) {
			return 0;
		}
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
			} elseif ($field === 'is_system') {
				$qb = $qb->set('is_system', $qb->createNamedParameter($exApp->getIsSystem(), IQueryBuilder::PARAM_INT));
			} elseif ($field === 'api_scopes') {
				$qb = $qb->set('api_scopes', $qb->createNamedParameter($exApp->getApiScopes(), IQueryBuilder::PARAM_JSON));
			}
		}
		return $qb->where($qb->expr()->eq('appid', $qb->createNamedParameter($exApp->getAppid())))->executeStatement();
	}
}
