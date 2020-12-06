FROM node:10

WORKDIR /usr/src/app

ADD . /usr/src/app

RUN npm install

RUN npm install pm2 -g

RUN npm run build

COPY . .

EXPOSE 4000

CMD ["pm2-runtime","app.js"]