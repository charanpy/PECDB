FROM node:latest

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . /app

ARG DEFAULT_PORT=4000

ENV PORT $DEFAULT_PORT

EXPOSE $PORT 

CMD ["npm", "start"]