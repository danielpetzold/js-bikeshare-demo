FROM node:10-alpine

# Create app directory
WORKDIR /usr/src/app

# Bundle app source
COPY . .

RUN npm install

EXPOSE 8888
CMD [ "npm", "start" ]
