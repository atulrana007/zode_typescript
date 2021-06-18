FROM node:alpine

WORKDIR /usr/local

COPY package*.json ./
RUN yarn install && yarn cache clean --force 
ENV PATH=/usr/local/node_modules/.bin:$PATH

WORKDIR /usr/local/app

COPY src ./src