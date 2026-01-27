#pulling the base image, here builder is the nickname that can be referred in the runner stage

FROM node:22-alpine as builder 

#creating the working directory in the container
WORKDIR /app

#copying the package.json and packge-lock.json
COPY package*.json ./

#installing the libraries
RUN npm install

#copying the rest of the files/folders
COPY . . 

#build the project
RUN npm run build

FROM node:22-alpine as runner

WORKDIR /app

COPY --from=builder /app/build ./build
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3000

#using the production mode
ENV NODE_ENV=production

# running the completed build
CMD ["node", "build/index.js"]