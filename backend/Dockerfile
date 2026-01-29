#build stage
#pulling the base image
FROM node:22-alpine AS builder

#creating the directory 
WORKDIR /app

#copying the package.json 
COPY package*.json ./

#installing the packages
RUN npm install


FROM node:22-alpine AS runner

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules

COPY . . 


ENV ENV_MODE=production


EXPOSE 3000

# Start the server
CMD ["node", "server.js"]

