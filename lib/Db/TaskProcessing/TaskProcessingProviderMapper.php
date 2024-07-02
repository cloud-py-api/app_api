<?php

declare(strict_types=1);

namespace OCA\AppAPI\Db\TaskProcessing;

use OCP\AppFramework\Db\DoesNotExistException;
use OCP\AppFramework\Db\MultipleObjectsReturnedException;
use OCP\AppFramework\Db\QBMapper;
use OCP\DB\Exception;
use OCP\DB\QueryBuilder\IQueryBuilder;
use OCP\IDBConnection;

/**
 * @template-extends QBMapper<TaskProcessingProvider>
 */
class TaskProcessingProviderMapper extends QBMapper {
	public function __construct(IDBConnection $db) {
		parent::__construct($db, 'ex_task_processing');
	}

	/**
	 * @throws Exception
	 */
	public function findAllEnabled(): array {
		$qb = $this->db->getQueryBuilder();
		$result = $qb->select('exs.*')
			->from($this->tableName, 'exs')
			->innerJoin('exs', 'ex_apps', 'exa', $qb->expr()->eq('exa.appid', 'exs.app_id'))
			->where(
				$qb->expr()->eq('exa.enabled', $qb->createNamedParameter(1, IQueryBuilder::PARAM_INT))
			)->executeQuery();
		return $result->fetchAll();
	}

	/**
	 * @param string $appId
	 * @param string $name
	 *
	 * @return TaskProcessingProvider
	 * @throws Exception
	 * @throws MultipleObjectsReturnedException
	 *
	 * @throws DoesNotExistException
	 */
	public function findByAppidName(string $appId, string $name): TaskProcessingProvider {
		$qb = $this->db->getQueryBuilder();
		return $this->findEntity($qb->select('*')
			->from($this->tableName)
			->where($qb->expr()->eq('app_id', $qb->createNamedParameter($appId), IQueryBuilder::PARAM_STR))
			->andWhere($qb->expr()->eq('name', $qb->createNamedParameter($name), IQueryBuilder::PARAM_STR))
		);
	}

	/**
	 * @throws Exception
	 */
	public function removeAllByAppId(string $appId): int {
		$qb = $this->db->getQueryBuilder();
		$qb->delete($this->tableName)
			->where(
				$qb->expr()->eq('app_id', $qb->createNamedParameter($appId, IQueryBuilder::PARAM_STR))
			);
		return $qb->executeStatement();
	}
}
