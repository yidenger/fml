FROM node:8.12-alpine
MAINTAINER liyidong@yeezon.com

WORKDIR /app

RUN npm install -g cnpm pm2 --registry=https://registry.npm.taobao.org 
COPY package.json ./
RUN cnpm install --production
COPY . ./

EXPOSE 3000

CMD pm2-docker start ecosystem.config.js