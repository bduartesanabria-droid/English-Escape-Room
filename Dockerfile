# ---------- Build stage ----------
FROM node:22-alpine AS build
WORKDIR /app

# Build tools required to compile the better-sqlite3 native module on Alpine
RUN apk add --no-cache python3 make g++

# Install all dependencies (including dev) to build the frontend and bundle the server
COPY package*.json ./
RUN npm ci

# Build the Vite/React frontend into dist/
COPY . .
RUN npm run build

# Bundle server.ts into a single server.js so the runtime image needs no dev dependencies
RUN npx esbuild server.ts --bundle --platform=node --format=esm --packages=external --outfile=server.js

# ---------- Runtime stage ----------
FROM node:22-alpine
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV DB_DIR=/app/data

# Build tools needed to compile the better-sqlite3 native module during install
RUN apk add --no-cache python3 make g++

# Install only production dependencies (compiles better-sqlite3 from source on Alpine)
COPY package*.json ./
RUN npm ci --omit=dev

# Remove build tools to keep the runtime image slim
RUN apk del python3 make g++

# Copy the bundled server and the built frontend
COPY --from=build /app/server.js ./server.js
COPY --from=build /app/dist ./dist

# Persistent SQLite storage
RUN mkdir -p /app/data
VOLUME /app/data

EXPOSE 3000

CMD ["node", "server.js"]