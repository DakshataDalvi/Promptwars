# Use the official hyper-lightweight Nginx alpine image
FROM nginx:alpine

# Copy all the static application files to the default Nginx html directory
COPY . /usr/share/nginx/html/

# Cloud Run defaults to exposing port 8080. We need to configure Nginx to listen on it.
# We modify the default nginx config inline to listen on port 8080 instead of 80.
RUN sed -i 's/listen  *80;/listen 8080;/g' /etc/nginx/conf.d/default.conf

# Expose the Cloud Run default port
EXPOSE 8080

# Start Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
