FROM node:22-alpine

#installing nodemon globally
RUN npm install -g nodemon

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . . 

EXPOSE 3000

CMD ["nodemon","server.js","--","--host","0.0.0.0"]