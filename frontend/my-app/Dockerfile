#setting the base image
FROM node:22-alpine

#creating the working directory
WORKDIR /app

#copying the package.json and package-lock.json in current directory
COPY package*.json ./

#installing the packages
RUN npm install

#copy rest of the components in current directory
COPY . .

#creates the .svelte-kit/tsconfig.json files
RUN npx svelte-kit sync

#exposing the dev server port
EXPOSE 5173

#run the dev server
CMD  ["npm","run","dev","--","--host","0.0.0.0"]