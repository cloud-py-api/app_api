<?php

declare(strict_types=1);

namespace OCA\AppAPI\Db\TaskProcessing;

use JsonSerializable;
use OCP\AppFramework\Db\Entity;

/**
 * Class TaskProcessingProvider
 *
 * @package OCA\AppAPI\Db\TaskProcessing
 *
 * @method void setAppId(string $appId)
 * @method string getAppId()
 * @method void setName(string $name)
 * @method string getName()
 * @method void setDisplayName(string $displayName)
 * @method string getDisplayName()
 * @method void setTaskType(string $taskType)
 * @method string getTaskType()
 */
class TaskProcessingProvider extends Entity implements JsonSerializable {
	protected ?string $appId = null;
	protected ?string $name = null;
	protected ?string $displayName = null;
	protected ?string $actionHandler = null;
	protected ?string $taskType = null;

	public function __construct(array $params = []) {
		$this->addType('app_id', 'string');
		$this->addType('name', 'string');
		$this->addType('display_name', 'string');
		$this->addType('task_type', 'string');

		if (isset($params['app_id'])) {
			$this->setAppId($params['app_id']);
		}
		if (isset($params['name'])) {
			$this->setName($params['name']);
		}
		if (isset($params['display_name'])) {
			$this->setDisplayName($params['display_name']);
		}
		if (isset($params['task_type'])) {
			$this->setTaskType($params['task_type']);
		}
	}

	public function jsonSerialize(): array {
		return [
			'app_id' => $this->appId,
			'name' => $this->name,
			'display_name' => $this->displayName,
			'task_type' => $this->taskType,
		];
	}
}
