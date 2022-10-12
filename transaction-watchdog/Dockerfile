FROM node:16-alpine

EXPOSE 3000

ARG NODE_ENV
ENV NODE_ENV $NODE_ENV

RUN mkdir /watchdog
WORKDIR /watchdog
ADD package.json /watchdog/
RUN npm install -y
ADD . /watchdog

CMD ["npm", "run", "start"]