#!/bin/bash

docker run --name pgadmin4 \
        -e "PGADMIN_DEFAULT_EMAIL=user@domain.com" \
        -e "PGADMIN_DEFAULT_PASSWORD=secret" \
        -e "PGADMIN_LISTEN_PORT=5050" \
        --network host \
        -d dpage/pgadmin4

#docker run -d -p 9000:9000 --name portainer -v /var/run/docker.sock:/var/run/docker.sock 
docker volume create portainer_data
docker run -d -p 9000:9000 --name portainer -v /var/run/docker.sock:/var/run/docker.sock \
           -v portainer_data:/data portainer/portainer
