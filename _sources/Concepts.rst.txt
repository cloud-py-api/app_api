Concepts
========

API Access Control Mechanism
----------------------------

Each application defines list of API groups it intends to access.

This system easily allows you to increase the level of trust in applications.
Even prior to installation, it's possible to ascertain the API groups to which an application will gain access.

System & Non System apps
------------------------

The main difference between a System app and a regular app is that a System app can impersonate a user who hasn't interacted with the app before.
And normal applications cannot impersonate a user and call any APIs in the context of the user if the user has never used this application before.

Given that numerous applications do not require system-level status,
this approach significantly heightens security and fosters greater trust in new and lesser-known applications.

Extensible Deployment
---------------------

The system should support the expansion and integration of new deployment methods, avoiding any tight coupling with a specific deployment type.
Applications should be capable of indicating the deployment methods they can accommodate.

Given the evolving landscape of new technologies and the potential emergence of more intricate or simplified deployment options,
the system is architected to seamlessly embrace the integration of novel deployment modes.
