# TIBCO Jaspersoft Bikeshare Demo

This TIBCO Jaspersoft Bikeshare Demonstration Application is designed to show the best practices of a user experience and web application design process and implementation, leveraging Jaspersoft's "embedded BI" data visualizations, reports and self service.

# Components in directories

* UI
    * React/Typescript web app
    * Deployed as a static web site or run as a node app in development mode: â€œnpm startâ€�

* API
    * Node.js Express app

* Data
    * bikeshare-backup.zip: Postgres database backup to be restored with psql
    * Development SQL scripts
    * ETL data load jobs

* Reports
    * Bikeshare-JRS-export.zip creates /public/Bikeshare_demo folder and contents
    * Base JRXMLs in a Studio project

* JSSConfig
    * Updated JAR(s)

* JRSConfig
    * Additional/updated JARs and appContext

* Auth
    * Token for auth and encrypt process

* Deploy
    * AWS CodePipeline and Docker deployment


# Deployment Architecture

![Bikeshare deployment components](Bikeshare-components.png)

# Manual Setup

## Bikeshare database
  * Unzip the `Data/bikeshare_backup.zip.*` Creates a `bikeshare_backup.sql` file.
     * 7zip on Windows will automatically unzip it
     * On Linux, `cat bikeshare_backup.zip.* > bikeshare_backup.zip`
  * Connect to your your Postgres database
  * psql -host XXX -U <user>
  * create database bikeshare;
  * \c bikeshare
  * \i `<path_to_js-bikeshare-demo/Data/bikeshare_backup.sql`
  * \i `<path_to_js-bikeshare-demo/Data/updates_to_bikeshare.sql`

## JasperReports Server
  * Install JRS with the Github `/JRSConfig` additions
  * Import the JRS repo export from Github `/Reports`
    * BS-server-settings-export.zip
    * Bikeshare-JRS-export.zip
  * Create the Bikeshare orgs and users
    * Add a â€œBikeShareâ€� org manually
    * Import Bikeshare_org_user_export.zip into the new Bikeshare org.

        * If you get: `import from superuser does not work Import of an organization to the root is not allowed.`, that means you tried to import into the root org, which does not work in JasperReports Server. Use the new organizationâ€™s jasperadmin account.

        * Note: There will be a few â€œaccess deniedâ€� on resources under the public folder, you can ignore them.

  * Within JRS, update the server attributes affecting the Bikeshare data Source :
      * bikeshareDBHost
      * bikeshareDBPort
      * bikeshareDBUsername
      * bikeshareDBPassword
      * bikeshareDBSchema

## Proxy
You need to set up a proxy. Have the proxy in front of the Bikeshare web app, API and JasperReports Server. See the deploy/docker-compose.yml and haproxy.cfg for ideas.

## Bikeshare Web application
1. cd UI
1. npm install
1. npm start
    * will launch web app on http://localhost:3000 (Do the UI configuration (below) first)
    * Running like this will have CORS issues when the app accessed JRS directly: so use the Docker config to run a haproxy
1. *OR* npm run build
    * builds a static web site in UI/build
    * This can be copied to a web server like nginx
      
## Bikeshare microservices API
1. cd API
1. npm install
1. npm start
    * will launch web app on http://localhost:8888

# Docker deployment

Dockerfiles in:
* /API: API in node
* /UI: static web site in nginx

```
/deploy/Docker/docker-compose.yml
/deploy/Docker/haproxy.cfg
```

1. Run UI and API images behind HAproxy.
1. Need to set domain etc of JasperReports Server in haproxy.cfg.
1. Need to set Postgres bikeshare database config in /API


# Configuration files    

## UI/.env*

```
REACT_APP_JASPERSERVER_URL="/jasperserver-pro"
REACT_APP_API_URL="/bikeshare-api"
# base folder to display in Manager > Reports and Dashboards
REACT_APP_REPOSITORY_START_FOLDER=/Reports
```
Used with npm start.

## UI/.env.production

As above, plus:

```
# for Docker static deployment only
STATIC_BIKESHARE_APP_PATH=/var/www/bikeshare
```
Used with npm run build.

## API/.env

```
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=bikeshare_v2
PORT=8888
#DEBUG=express:*
#API_PATH=/bikeshare-api

SESSION_SECRET=bikeshare
```

Change to point to your Bikeshare Postgres database, as per the JasperReports Server data source settings above.


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



