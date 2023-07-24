<?php

declare(strict_types=1);

namespace OCA\AppEcosystemV2\Db;

use JsonSerializable;
use OCP\AppFramework\Db\Entity;

/**
 * Class ExFilesActionsMenu
 *
 * @package OCA\AppEcosystemV2\Db
 *
 * @method string getAppid()
 * @method string getName()
 * @method string getDisplayName()
 * @method string getMime()
 * @method string getPermissions()
 * @method string getOrder()
 * @method string getIcon()
 * @method string getIconClass()
 * @method string getActionHandler()
 * @method void setAppid(string $appid)
 * @method void setName(string $name)
 * @method void setDisplayName(string $displayName)
 * @method void setMime(string $mime)
 * @method void setPermissions(string $permissions)
 * @method void setOrder(string $order)
 * @method void setIcon(string $icon)
 * @method void setIconClass(string $iconClass)
 * @method void setActionHandler(string $actionHandler)
 */
class ExFilesActionsMenu extends Entity implements JsonSerializable {
	protected $appid;
	protected $name;
	protected $displayName;
	protected $mime;
	protected $permissions;
	protected $order;
	protected $icon;
	protected $iconClass;
	protected $actionHandler;

	/**
	 * @param array $params
	 */
	public function __construct(array $params = []) {
		$this->addType('appid', 'string');
		$this->addType('name', 'string');
		$this->addType('displayName', 'string');
		$this->addType('mime', 'string');
		$this->addType('permissions', 'string');
		$this->addType('order', 'string');
		$this->addType('icon', 'string');
		$this->addType('iconClass', 'string');
		$this->addType('actionHandler', 'string');

		if (isset($params['id'])) {
			$this->setId($params['id']);
		}
		if (isset($params['appid'])) {
			$this->setAppid($params['appid']);
		}
		if (isset($params['name'])) {
			$this->setName($params['name']);
		}
		if (isset($params['display_name'])) {
			$this->setDisplayName($params['display_name']);
		}
		if (isset($params['mime'])) {
			$this->setMime($params['mime']);
		}
		if (isset($params['permissions'])) {
			$this->setPermissions($params['permissions']);
		}
		if (isset($params['order'])) {
			$this->setOrder($params['order']);
		}
		if (isset($params['icon'])) {
			$this->setIcon($params['icon']);
		}
		if (isset($params['icon_class'])) {
			$this->setIconClass($params['icon_class']);
		}
		if (isset($params['action_handler'])) {
			$this->setActionHandler($params['action_handler']);
		}
	}

	public function jsonSerialize(): array {
		return [
			'id' => $this->getId(),
			'appid' => $this->getAppid(),
			'name' => $this->getName(),
			'display_name' => $this->getDisplayName(),
			'mime' => $this->getMime(),
			'permissions' => $this->getPermissions(),
			'order' => $this->getOrder(),
			'icon' => $this->getIcon(),
			'icon_class' => $this->getIconClass(),
			'action_handler' => $this->getActionHandler(),
		];
	}
}
