=====
ExApp
=====

OCS APIs for ExApp actions.

Get ExApps list
^^^^^^^^^^^^^^^

Get list of installed ExApps.

OCS endpoint: ``GET /apps/app_api/api/v1/ex-app/{list}``

There are two ``list`` options:

- ``enabled``: list only enabled ExApps
- ``all``: list all ExApps


Response data
*************

The response data is a JSON array of ExApp objects with the following attributes:

.. code-block:: json

	{
		"id": "appid of the ExApp",
		"name": "name of the ExApp",
		"version": "version of the ExApp",
		"enabled": "true/false flag",
		"last_check_time": "timestamp of last successful Nextcloud->ExApp connection check",
		"system": "true/false flag indicating system ExApp",
	}
