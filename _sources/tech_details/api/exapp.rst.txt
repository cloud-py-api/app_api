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


Make Requests to ExApps
^^^^^^^^^^^^^^^^^^^^^^^

There are two endpoints for making requests to ExApps:

1. Synchronous request: ``POST /apps/app_api/api/v1/ex-app/request/{appid}``
2. Synchronous request with ExApp user setup: ``POST /apps/app_api/api/v1/ex-app/request/{appid}/{userId}``

Request data
************

The request data params are the same as in ``lib/PublicFunction.php``:

.. code-block:: json

    {
        "route": "relative route to ExApp API endpoint",
        "method": "GET/POST/PUT/DELETE",
        "params": {},
        "options": {},
    }

.. note::

    ``userId`` and ``appId`` is taken from url params


Response data
*************

Successful request to ExApp OCS data response structure is the following:

.. code-block:: json

    {
        "status_code": "HTTP status code",
        "body": "response data from ExApp",
        "headers": "response headers from ExApp",
    }

If there is an error, the response object will have only an ``error`` attribute with the error message.
