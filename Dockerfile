# Use the official Rasa SDK image as a base image
FROM rasa/rasa:3.6.18-full

# Use root to install any additional dependencies
USER root

# Optional: Install system dependencies
# RUN apt-get update && apt-get install -y <your-dependencies> && rm -rf /var/lib/apt/lists/*

# Copy your Rasa project into the container
COPY . /app

# Change the ownership of the /app directory to the non-root user
RUN chown -R 1001 /app

# Switch back to the non-root user
USER 1001

# Set the working directory to /app
WORKDIR /app

# Train the Rasa model when the container is built
# Note: You might want to skip training in the Dockerfile for larger models and train externally.
RUN rasa train

# Expose the port Rasa server runs on
EXPOSE 5005

# Define the command to run your bot
CMD ["rasa", "run", "--enable-api", "--cors", "*"]
