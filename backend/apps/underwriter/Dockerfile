# Use Node.js LTS as base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install all dependencies (dev + production) to support building
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the application (compile TypeScript to generate 'dist')
RUN npm run build

# Expose port (match your backend API port)
EXPOSE 4001

# Start the application
CMD ["npm", "run", "start:prod"]
