FROM node:16-alpine

EXPOSE 3000

ARG NODE_ENV
ENV NODE_ENV $NODE_ENV

RUN mkdir /api
WORKDIR /api
ADD package.json /api/
RUN npm install -y
ADD . /api

CMD ["node", "./src/index.js"]