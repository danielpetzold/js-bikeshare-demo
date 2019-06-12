#!/bin/bash
set -e
set -x

echo "******Bikeshare database load******"

POSTGRES_HOST="jr3djagdm8leib.cgcmqlgjtwj3.us-east-1.rds.amazonaws.com"
POSTGRES_DB="bikeshare_v2"
POSTGRES_USER="postgres"
POSTGRES_PASSWORD="postgres"

cat *.zip* >> /tmp/bikeshare_backup.zip
unzip /tmp/bikeshare_backup.zip -d /tmp

PGPASSWORD=$POSTGRES_PASSWORD psql -U $POSTGRES_USER -h $POSTGRES_HOST <<EOF
create database $POSTGRES_DB;
\c $POSTGRES_DB
\i /tmp/bikeshare_backup.sql
EOF

rm /tmp/bikeshare_backup.sql /tmp/bikeshare_backup.zip

echo "******Bikeshare database load finished ******"
