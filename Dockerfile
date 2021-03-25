FROM node:lts-alpine

WORKDIR /app

COPY ./yarn.lock ./package.json /app/
RUN yarn install
COPY . /app
CMD yarn dev
