FROM node:14.20

WORKDIR /app

ADD . .

RUN npm install

EXPOSE 5173

CMD ["npm", "run", "dev"]