.. _test_deploy:

Test Deploy Daemon
------------------

You can test each Daemon configuration deployment from the AppAPI Admin settings.

.. image:: ./img/test_deploy.png


Status Checks
^^^^^^^^^^^^^

The Deploy test installs a `test-deploy <https://github.com/cloud-py-api/test-deploy>`_ ExApp
to verify each step of the deployment process, including a hardware support check -
for each compute device, there is a separate Docker image.

.. note::
    The Test Deploy ExApp container is not removed after the test as it's needed for logs and status checks.
    You can remove it after testing from the External Apps page.
    The Docker images are also not removed from the Daemon; you can clean up unused images with the ``docker image prune`` command.

.. image:: ./img/test_deploy_modal_4.png


Register
********

The Register step is the first step; it checks if the ExApp is registered in Nextcloud.

Image Pull
**********

The Image Pull step downloads the ExApp Docker image.

Possible errors:

- Image not found
- Image pull failed (e.g., due to network issues)
- Image pull timeout

Container Started
*****************

The Container Started step verifies that the ExApp container is created and started successfully.

Possible errors:

- Container failed to start with GPU support
    - For NVIDIA, refer to the `NVIDIA Docker configuration docs <https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/latest/install-guide.html>`_.
    - For AMD, refer to the `ROCm Docker configuration docs <https://rocm.docs.amd.com/projects/install-on-linux/en/latest/how-to/docker.html>`_.


Heartbeat
*********

The Heartbeat step checks if the container's health check is finished and the container is healthy.
The ExApp might have additional pre-configuration logic during this step.

Possible errors:

- ExApp failed to start a web server, e.g., if the port is already in use (this should be visible in the container logs)
- ExApp heartbeat_count keeps increasing, this may indicate that the ExApp couldn't start properly

Init
****

The Init step checks if the ExApp is initialized and ready to use.
During the init step, the ExApp may perform downloads of extra stuff required for it.

Possible errors:

- Initialization failed (e.g., due to network issues or timeout)


Enabled
*******

The Enabled step checks if the ExApp is enabled and ready to use.
During this step, the ExApp registers all the required and available APIs of the Nextcloud AppFramework.

Possible errors:

- ExApp did not respond to the enable request
- ExApp failed to enable due to a failure in registering AppAPI Nextcloud AppFramework APIs (this should be visible both in the container logs and in the Nextcloud logs if there are any errors)


Download Logs
^^^^^^^^^^^^^

You can download the logs of the last test deploy attempt container.

.. note::
    Downloading Docker container logs is only possible for containers using the json-file or journald logging drivers.
