# Stage 1: The Builder
FROM node:22-alpine AS builder 

WORKDIR /app

# Copy package files
COPY package*.json ./


RUN npm install


COPY svelte.config.js vite.config.js jsconfig.json ./


COPY . . 


RUN npm run build

# Stage 2: The Runner
FROM node:22-alpine AS runner

WORKDIR /app

# here, we are copying the built app and necessary files from builder
COPY --from=builder /app/build ./build
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules

# Setting environment to production
ENV NODE_ENV=production

EXPOSE 3000

# Start the server
CMD ["node", "build/index.js"]