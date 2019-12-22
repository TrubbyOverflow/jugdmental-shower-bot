FROM node:12

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

ARG TELEGRAM_TOKEN

ENV TELEGRAM_TOKEN=$TELEGRAM_TOKEN

CMD [ "node", "app/app.js" ]
