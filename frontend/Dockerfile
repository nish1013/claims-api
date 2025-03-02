# Use Node.js 20 for the build step
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install --frozen-lockfile

# Copy everything else and build the app
COPY . .
RUN npm run build

# Use lightweight image for serving static files
FROM node:20-alpine

WORKDIR /app

# Copy built frontend from previous stage
COPY --from=builder /app/dist /app/dist

# Install Vite preview server
RUN npm install -g serve

# Expose port for frontend
EXPOSE 5174

# Serve the built frontend
CMD ["serve", "-s", "dist", "-l", "5174"]
