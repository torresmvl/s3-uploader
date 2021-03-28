FROM node:alpine as base

WORKDIR /api
COPY . .

RUN npm install

CMD [ "npm", "run", "dev" ]