FROM node:latest

WORKDIR /app

COPY package.json .

RUN npm i

EXPOSE 9000

CMD [ "npm", "start" ]