#!/bin/bash
set -e
set -x

echo "******Add Bikeshare database updates******"

POSTGRES_HOST="jr3djagdm8leib.cgcmqlgjtwj3.us-east-1.rds.amazonaws.com"
POSTGRES_DB="bikeshare_v2"
POSTGRES_USER="postgres"
POSTGRES_PASSWORD="postgres"

PGPASSWORD=$POSTGRES_PASSWORD psql -U $POSTGRES_USER -h $POSTGRES_HOST <<EOF
\c $POSTGRES_DB
\dt
\i 10-updates_to_bikeshare.sql
EOF

echo "******Add Bikeshare database updates finished ******"
