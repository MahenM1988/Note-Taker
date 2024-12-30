# Use the official Node.js image
FROM node:16

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy all files
COPY . .

# Build the React app
RUN npm run build

# Install a simple static server to serve the build files
RUN npm install -g serve

# Expose the port for the React app (default is 3000)
EXPOSE 3000

# Serve the built app
CMD ["serve", "-s", "build", "-l", "3000"]