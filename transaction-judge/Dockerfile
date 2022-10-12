FROM node:16-alpine

EXPOSE 3000

ARG NODE_ENV
ENV NODE_ENV $NODE_ENV

RUN mkdir /judge
WORKDIR /judge
ADD package.json /judge/
RUN npm install -y
ADD . /judge

CMD ["npm", "run", "start"]