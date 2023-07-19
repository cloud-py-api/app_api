<?php

declare(strict_types=1);

/**
 *
 * Nextcloud - App Ecosystem V2
 *
 * @copyright Copyright (c) 2023 Andrey Borysenko <andrey18106x@gmail.com>
 *
 * @copyright Copyright (c) 2023 Alexander Piskun <bigcat88@icloud.com>
 *
 * @author 2023 Andrey Borysenko <andrey18106x@gmail.com>
 *
 * @license AGPL-3.0-or-later
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 */

namespace OCA\AppEcosystemV2\Db;

use OCP\AppFramework\Db\DoesNotExistException;
use OCP\AppFramework\Db\MultipleObjectsReturnedException;
use OCP\AppFramework\Db\QBMapper;
use OCP\DB\Exception;
use OCP\DB\QueryBuilder\IQueryBuilder;
use OCP\IDBConnection;

/**
 * @template-extends QBMapper<ExFilesActionsMenu>
 */
class ExFilesActionsMenuMapper extends QBMapper {
	public function __construct(IDBConnection $db) {
		parent::__construct($db, 'ex_files_actions_menu');
	}

	/**
	 * @throws Exception
	 */
	public function findAll(int $limit = null, int $offset = null): array {
		$qb = $this->db->getQueryBuilder();
		$qb->select('*')
			->from($this->tableName)
			->setMaxResults($limit)
			->setFirstResult($offset);
		return $this->findEntities($qb);
	}

	/**
	 * @throws Exception
	 */
	public function findAllEnabled(): array {
		$qb = $this->db->getQueryBuilder();
		$result = $qb->select(
			'ex_files_actions_menu.appid',
			'ex_files_actions_menu.name',
			'ex_files_actions_menu.display_name',
			'ex_files_actions_menu.mime',
			'ex_files_actions_menu.permissions',
			'ex_files_actions_menu.order',
			'ex_files_actions_menu.icon',
			'ex_files_actions_menu.icon_class',
			'ex_files_actions_menu.action_handler',
		)
			->from($this->tableName, 'ex_files_actions_menu')
			->innerJoin('ex_files_actions_menu', 'ex_apps', 'exa', 'exa.appid = ex_files_actions_menu.appid')
			->where(
				$qb->expr()->eq('exa.enabled', $qb->createNamedParameter(1, IQueryBuilder::PARAM_INT))
			)
			->executeQuery();
		return $result->fetchAll();
	}

	/**
	 * @param string $appId
	 *
	 * @throws Exception
	 * @return ExFilesActionsMenu[]
	 */
	public function findAllByAppId(string $appId): array {
		$qb = $this->db->getQueryBuilder();
		$qb->select('*')
			->from($this->tableName)
			->where(
				$qb->expr()->eq('appId', $qb->createNamedParameter($appId, IQueryBuilder::PARAM_STR))
			);
		return $this->findEntities($qb);
	}

	/**
	 * @param string $appId
	 * @param string $name
	 *
	 * @throws MultipleObjectsReturnedException if more than one result
	 * @throws DoesNotExistException if not found
	 * @throws Exception
	 *
	 * @return ExFilesActionsMenu
	 */
	public function findByAppIdName(string $appId, string $name): ExFilesActionsMenu {
		$qb = $this->db->getQueryBuilder();
		$qb->select('*')
			->from($this->tableName)
			->where(
				$qb->expr()->eq('appId', $qb->createNamedParameter($appId, IQueryBuilder::PARAM_STR)),
				$qb->expr()->eq('name', $qb->createNamedParameter($name, IQueryBuilder::PARAM_STR)),
			);
		return $this->findEntity($qb);
	}

	/**
	 * @param string $name
	 *
	 *
	 * @throws MultipleObjectsReturnedException if more than one result
	 * @throws DoesNotExistException|Exception if not found
	 * @throws Exception
	 *
	 * @return ExFilesActionsMenu
	 */
	public function findByName(string $name): ExFilesActionsMenu {
		$qb = $this->db->getQueryBuilder();
		$qb->select('*')
			->from($this->tableName)
			->where(
				$qb->expr()->eq('name', $qb->createNamedParameter($name, IQueryBuilder::PARAM_STR))
			);
		return $this->findEntity($qb);
	}

	/**
	 * @param ExFilesActionsMenu $exFilesActionsMenu
	 *
	 * @throws Exception
	 *
	 * @return int Number of updated rows
	 */
	public function updateFileActionMenu(ExFilesActionsMenu $exFilesActionsMenu): int {
		$qb = $this->db->getQueryBuilder();
		return $qb->update($this->tableName)
			->set('display_name', $qb->createNamedParameter($exFilesActionsMenu->getDisplayName(), IQueryBuilder::PARAM_STR))
			->set('mime', $qb->createNamedParameter($exFilesActionsMenu->getMime(), IQueryBuilder::PARAM_STR))
			->set('permissions', $qb->createNamedParameter($exFilesActionsMenu->getPermissions(), IQueryBuilder::PARAM_STR))
			->set('order', $qb->createNamedParameter($exFilesActionsMenu->getOrder(), IQueryBuilder::PARAM_INT))
			->set('icon', $qb->createNamedParameter($exFilesActionsMenu->getIcon() ?? '', IQueryBuilder::PARAM_STR))
			->set('icon_class', $qb->createNamedParameter($exFilesActionsMenu->getIconClass(), IQueryBuilder::PARAM_STR))
			->set('action_handler', $qb->createNamedParameter($exFilesActionsMenu->getActionHandler(), IQueryBuilder::PARAM_STR))
			->where(
				$qb->expr()->eq('appId', $qb->createNamedParameter($exFilesActionsMenu->getAppid(), IQueryBuilder::PARAM_STR)),
				$qb->expr()->eq('name', $qb->createNamedParameter($exFilesActionsMenu->getName(), IQueryBuilder::PARAM_STR))
			)
			->executeStatement();
	}

	/**
	 * @param ExFilesActionsMenu $exFilesActionsMenu
	 *
	 * @throws Exception
	 *
	 * @return int Number of deleted rows
	 */
	public function deleteByAppidName(ExFilesActionsMenu $exFilesActionsMenu): int {
		$qb = $this->db->getQueryBuilder();
		return $qb->delete($this->tableName)
			->where(
				$qb->expr()->eq('appId', $qb->createNamedParameter($exFilesActionsMenu->getAppid(), IQueryBuilder::PARAM_STR))
			)
			->andWhere(
				$qb->expr()->eq('name', $qb->createNamedParameter($exFilesActionsMenu->getName(), IQueryBuilder::PARAM_STR))
			)
			->executeStatement();
	}
}
