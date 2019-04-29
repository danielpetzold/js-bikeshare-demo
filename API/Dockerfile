FROM node:10-alpine

ENV PORT 8888
# Create app directory
WORKDIR /usr/src/app

# Bundle app source
COPY . .

RUN npm install

EXPOSE 8888
CMD [ "npm", "start" ]
