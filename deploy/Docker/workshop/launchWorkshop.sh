#!/bin/bash

docker start portainer

docker start pgadmin4

cd /home/ubuntu/Documents/js-bikeshare-demo/deploy/Docker/workshop
docker-compose up -d

cd ~/Documents

"./TIB_js-jss_7.2.1/Jaspersoft Studio Professional" > /dev/null 2>&1 &


