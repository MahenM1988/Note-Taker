# Use the official Node.js image from the Docker registry
FROM node:16

# Set the working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port that your server runs on (e.g., 5000)
EXPOSE 5000

# Command to start the server
CMD ["npm", "start"]