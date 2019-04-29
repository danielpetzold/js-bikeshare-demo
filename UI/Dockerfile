FROM nginx:1.15.2-alpine

# install node

RUN apk add --update nodejs && rm -rf /var/cache/apk/*

# Create app directory
WORKDIR /usr/src/app

# get the UI source and install
COPY . .
RUN mkdir /conf && \
    rm -rf build && \
    rm -rf node_modules && \
	npm install

COPY docker/nginx.template /conf
COPY docker/entrypoint.sh /
EXPOSE 80
ENTRYPOINT ["/entrypoint.sh"]