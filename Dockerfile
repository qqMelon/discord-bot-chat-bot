FROM node:latest

RUN mkdir -p /usr/src/bot
WORKDIR /urs/src/bot

COPY package.json /urs/src/bot/
RUN npm install

COPY . /urs/src/bot/

CMD ["node", "index.js"]