# ---------- Build stage ----------
FROM node:22-alpine AS build
WORKDIR /app

# Install all dependencies (including dev) to build the frontend and bundle the server
COPY package*.json ./
RUN npm install

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

# Install only production dependencies
COPY package*.json ./
RUN npm install --omit=dev

# Copy the bundled server and the built frontend
COPY --from=build /app/server.js ./server.js
COPY --from=build /app/dist ./dist

EXPOSE 3000

CMD ["node", "server.js"]