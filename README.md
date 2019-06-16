# TIBCO Jaspersoft Bikeshare Demo Application

# Full deployment with Docker
This process:
- Creates images
- Uses docker-compose to launch a proxy (haproxy) and all containers
- When running, access the app via http://<host>:<proxyPort>

Configurations are in js-bikeshare-demo/deploy/Docker/workshop.

Configuration options defined by docker-compose and haproxy

- Everything in Docker as per the default docker-compose.yml
- HAProxy, bikeshare-ui and bikeshare-api in Docker, JRS and Postgres outside
- As above, but using a bikeshare-ui:dev container to be able to edit the UI on disk and have it recompile and deploy automatically: “npm start”
- As above, having UI “npm start” outside of Docker

If you want to have docker containers reaching outside of Docker to the localhost domain:
- Mac and Windows: localhost is host.docker.internal
- Linux: “network_mode: host” and refer to localhost

## Build Images

Build the `jasperserver-pro:7.2.0` image:
- Get the Dockerfile and supporting resources from https://github.com/TIBCOSoftware/js-docker
- Get the JasperReports Server WAR File installer.
- `docker build -t jasperserver-pro:7.2.0 .`

Build the `bikeshare-ui:1.0` image as a static web site:
- `cd UI`
- `docker build -t bikeshare-ui:1.0.`

If you want develop with “npm start” running in Docker, build the `bikeshare-ui:dev` image:
- `cd UI`
- `docker build -t bikeshare-ui:dev -f Dockerfile-dev .`

Build the `bikeshare-api` image
- `cd API`
- `docker build -t bikeshare-api .`

Build the `js-bikeshare-data` image:
This will load the bikeshare database into a Postgres instance running inside Docker. Same DB for the repository. The first time, it is slow to start up and JRS may fail, but after the initial creation with a persistent volume, it works really well.
- `cd Data`
- `docker build -t js-bikeshare-data .`

## Install and launch Bikeshare in Docker

1. Open a command line.
1. cd js-bikeshare-demo/deploy/Docker/workshop
1. docker-compose -f .\docker-compose-JRS-and-db.yml up -d
1. Login to JRS on 8080 as superuser/superuser and create `Bikeshare` organization at the root level.
1. docker run --rm -v /path/to/js-bikeshare-demo/JRSConfig:/usr/local/share/jasperserver-pro/import --network workshop_default -e DB_HOST=jasperserver_pro_repository  --name jasperserver-import jasperserver-pro:7.2.0 import /usr/local/share/jasperserver-pro/import
  - Note that this process renames the import.properties file in js-bikeshare-demo/JRSConfig to import-done.properties, to stop multiple imports.
1. Login to JRS as superuser:
  1. Update the bikeshareDBHost server attribute to jasperserver_pro_repository
  1. Test the Bikeshare demo DS - should be fine
1. docker-compose -f .\docker-compose-JRS-and-db.yml down
1. Edit the volumes in docker-compose.yml to match where you have the js-bikeshare-source, replacing “/C/Users/swood/Documents/Github” with your own path.
1. docker-compose up -d
1. http://localhost:105 to get to the bikeshare login page

If you need to restart everything:
- docker volume rm workshop_postgres-bikeshare-data
- Rename js-bikeshare-demo/JRSConfig/import-done.properties to import.properties


