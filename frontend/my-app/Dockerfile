# Stage 1: The Builder
FROM node:22-alpine AS builder 

WORKDIR /app

# Copy package files
COPY package*.json ./

# installing the libraries
# We use --include=dev because SvelteKit needs devDependencies to run the 'build' command
RUN npm install

# COPY THE CONFIG FILES EXPLICITLY FIRST (Fixes the "Missing Svelte config" warning)
COPY svelte.config.js vite.config.js jsconfig.json ./

# Copy the rest of the source code
COPY . . 

# Build the project
# Note: PUBLIC_API_URL must be in your Render Env Vars for this to succeed
RUN npm run build

# Stage 2: The Runner
FROM node:22-alpine AS runner

WORKDIR /app

# Copy the built app and necessary files from builder
COPY --from=builder /app/build ./build
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules

# Set environment to production
ENV NODE_ENV=production
# Render typically listens on port 10000, but we'll stick to 3000 if your Render PORT var is 3000
EXPOSE 3000

# Start the server
CMD ["node", "build/index.js"]