# Step 1: Build the React app
# Use an official Node.js runtime as a parent image
FROM node:22 AS build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the React application
RUN npm run build

# Step 2: Serve the React app
# Use an official Nginx image to serve the build artifacts
FROM nginx:alpine

# Copy the build artifacts from the 'build' stage
COPY --from=build /app/build /usr/share/nginx/html

# Copy a custom Nginx configuration file (optional)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
