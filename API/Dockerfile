FROM node:10-alpine

ENV PORT 8888
# Create app directory
WORKDIR /usr/src/app

# Bundle app source
COPY src src
COPY *.json ./
COPY *.js ./

RUN npm install

EXPOSE 8888
CMD [ "npm", "start" ]
