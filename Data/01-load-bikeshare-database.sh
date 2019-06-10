#!/bin/bash
set -e
set -x

# bikeshare database created in Dockerfile
# ENV POSTGRES_DB bikeshare
echo "******Bikeshare database load******"

psql -U $POSTGRES_USER --dbname=$POSTGRES_DB < /tmp/bikeshare_backup.sql

echo "******Bikeshare database load finished ******"
