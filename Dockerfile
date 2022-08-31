FROM node:14.20
WORKDIR /app
ADD . .
RUN npm install
EXPOSE 3000
CMD ["npm", "run", "dev"]