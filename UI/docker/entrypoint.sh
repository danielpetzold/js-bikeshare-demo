#!/bin/sh

cd /usr/src/app
# build the site with environment variables
npm run build

# /var/www/bikeshare or /var/www
mkdir -p $STATIC_BIKESHARE_APP_PATH
cp -r build/* $STATIC_BIKESHARE_APP_PATH 

echo Can replace in nginx.conf JRS: $JASPERSERVER_URL Bikeshare API $BIKESHARE_API_URL

ls -lsa /conf

# set env values in nginx
envsubst  '\$JASPERSERVER_URL \$BIKESHARE_API_URL' < /conf/nginx.template > /etc/nginx/nginx.conf

cat /etc/nginx/nginx.conf

exec nginx -g 'daemon off;'
