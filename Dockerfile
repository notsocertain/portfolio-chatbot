# Use the official Rasa SDK image as a parent image
FROM rasa/rasa:3.0.0-full

# Use root to perform installations and operations
USER root

# Install additional dependencies if needed
# RUN pip install <your-dependency>

# Copy the content of your chatbot project to the image
COPY . /app

# Change ownership of the /app directory to the non-root user (assuming '1001' is the user ID)
RUN chown -R 1001 /app

# Change back to the non-root rasa user
USER 1001

# Set the working directory to /app
WORKDIR /app

# Train the Rasa model when the container is created
RUN rasa train

# Expose the port the app runs on
EXPOSE 5005

# Command to run the chatbot server
CMD ["rasa", "run", "-m", "/app/models", "--enable-api", "--cors", "*", "--debug"]
