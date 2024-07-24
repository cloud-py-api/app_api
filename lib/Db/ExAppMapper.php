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
			'r.url',
			'r.verb',
			'r.access_level',
			'r.headers_to_exclude',
		)
			->from($this->tableName, 'a')
			->leftJoin('a', 'ex_apps_daemons', 'd', $qb->expr()->eq('a.daemon_config_name', 'd.name'))
			->leftJoin('a', 'ex_apps_routes', 'r', $qb->expr()->eq('a.appid', 'r.appid'))
			->orderBy('a.appid', 'ASC')
			->setMaxResults($limit)
			->setFirstResult($offset);
		return $this->buildExAppRoutes($qb->executeQuery()->fetchAll());
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
			'r.url',
			'r.verb',
			'r.access_level',
			'r.headers_to_exclude',
		)
			->from($this->tableName, 'a')
			->leftJoin('a', 'ex_apps_daemons', 'd', $qb->expr()->eq('a.daemon_config_name', 'd.name'))
			->leftJoin('a', 'ex_apps_routes', 'r', $qb->expr()->eq('a.appid', 'r.appid'))
			->orderBy('a.appid', 'ASC')
			->where(
				$qb->expr()->eq('a.appid', $qb->createNamedParameter($appId))
			);
		$apps = $this->buildExAppRoutes($qb->executeQuery()->fetchAll());
		if (count($apps) === 0) {
			throw new DoesNotExistException();
		}
		if (count($apps) > 1) {
			throw new MultipleObjectsReturnedException();
		}
		return $apps[0];
	}

	/**
	 * @param array $result fetched rows from the database
	 *
	 * @return array of ExApps with composed routes
	 */
	private function buildExAppRoutes(array $result): array {
		$apps = [];
		$lastAppId = null;
		$lastApp = null;
		foreach ($result as $row) {
			if ($lastAppId !== $row['appid'] || $lastAppId === null) {
				$lastAppId = $row['appid'];
				$lastApp = new ExApp([
					'id' => $row['id'],
					'appid' => $row['appid'],
					'version' => $row['version'],
					'name' => $row['name'],
					'daemon_config_name' => $row['daemon_config_name'],
					'protocol' => $row['protocol'],
					'host' => $row['host'],
					'port' => $row['port'],
					'secret' => $row['secret'],
					'status' => $row['status'],
					'enabled' => $row['enabled'],
					'created_time' => $row['created_time'],
					'last_check_time' => $row['last_check_time'],
					'api_scopes' => $row['api_scopes'],
					'deploy_config' => $row['deploy_config'],
					'accepts_deploy_id' => $row['accepts_deploy_id'],
					'routes' => [],
				]);
				$apps[] = $lastApp;
			}
			if (isset($row['url'])) {
				$route = [
					'url' => $row['url'],
					'verb' => $row['verb'],
					'access_level' => $row['access_level'],
					'headers_to_exclude' => $row['headers_to_exclude'],
				];
				$lastAppRoutes = $lastApp->getRoutes();
				$lastAppRoutes[] = $route;
				$lastApp->setRoutes($lastAppRoutes);
			}
		}
		return $apps;
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
			} elseif ($field === 'api_scopes') {
				$qb = $qb->set('api_scopes', $qb->createNamedParameter($exApp->getApiScopes(), IQueryBuilder::PARAM_JSON));
			}
		}
		return $qb->where($qb->expr()->eq('appid', $qb->createNamedParameter($exApp->getAppid())))->executeStatement();
	}

	/**
	 * @throws Exception
	 */
	public function registerExAppRoutes(ExApp $exApp, array $routes): int {
		$qb = $this->db->getQueryBuilder();
		$count = 0;
		foreach ($routes as $route) {
			$qb->insert('ex_apps_routes')
				->values([
					'appid' => $qb->createNamedParameter($exApp->getAppid()),
					'url' => $qb->createNamedParameter($route['url']),
					'verb' => $qb->createNamedParameter($route['verb']),
					'access_level' => $qb->createNamedParameter($route['access_level']),
					'headers_to_exclude' => $qb->createNamedParameter($route['headers_to_exclude']),
				]);
			$count += $qb->executeStatement();
		}
		return $count;
	}

	/**
	 * @throws Exception
	 */
	public function updateExAppRoutes(ExApp $exApp, array $routes): int {
		$count = 0;
		foreach ($routes as $route) {
			$qb = $this->db->getQueryBuilder();
			$qb->update('ex_apps_routes')
				->set('url', $qb->createNamedParameter($route['url']))
				->set('verb', $qb->createNamedParameter($route['verb']))
				->set('access_level', $qb->createNamedParameter($route['access_level']))
				->set('headers_to_exclude', $qb->createNamedParameter($route['headers_to_exclude']))
				->where($qb->expr()->eq('appid', $qb->createNamedParameter($exApp->getAppid())));
			$count += $qb->executeStatement();
		}
		return $count;
	}

	/**
	 * @throws Exception
	 */
	public function removeExAppRoutes(ExApp $exApp): int {
		$qb = $this->db->getQueryBuilder();
		return $qb->delete('ex_apps_routes')
			->where($qb->expr()->eq('appid', $qb->createNamedParameter($exApp->getAppid())))
			->executeStatement();
	}
}
