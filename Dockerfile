FROM node:lts-alpine

WORKDIR /usr/src/app/

RUN npm i -g @vue/cli && npm i -g firebase-tools

RUN npm i && npm cache clear --force

COPY . .


