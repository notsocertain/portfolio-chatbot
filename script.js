async function sendMessage() {
  const chatBox = document.getElementById("chat-box");
  const userInputField = document.getElementById("user-input");
  const userMessage = userInputField.value.trim();

  if (userMessage) {
      const userDiv = document.createElement("div");
      userDiv.textContent = "You: " + userMessage;
      chatBox.appendChild(userDiv);
      chatBox.scrollTop = chatBox.scrollHeight;
      userInputField.value = '';
  }

  if (userMessage) {
      try {
          const response = await fetch('http://localhost:5005/webhooks/rest/webhook', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                  sender: "user",
                  message: userMessage
              }),
          });

          const responseData = await response.json();

          // Display bot response
          if (responseData && responseData.length > 0) {
              responseData.forEach((message) => {
                  // Handle direct text response
                  if (message.text) {
                      const botDiv = document.createElement("div");
                      // Check if the message contains HTML
                      if (message.text && message.text.includes('<a href=')) {
                        // If the message contains HTML, set innerHTML instead of textContent
                        // Directly apply a style to underline links
                        botDiv.innerHTML = "notNishant: " + message.text.replace(/<a /g, "<a style='text-decoration: underline;' ");
                    } else {
                        // If no HTML, it's safe to use textContent
                        botDiv.textContent = "notNishant: " + message.text;
                    }
                      chatBox.appendChild(botDiv);
                  }
                  // Handle custom payload with text and images
                  if (message.custom) {
                    if (message.custom.text) {
                        const customTextDiv = document.createElement("div");
                        customTextDiv.innerHTML = "notNishant: " + message.custom.text; // Insert the HTML content
                        chatBox.appendChild(customTextDiv);
                        
                        // After appending, style all <a> tags in the last inserted div
                        const links = customTextDiv.querySelectorAll('a');
                        links.forEach(link => {
                            link.style.textDecoration = 'underline';
                        });
                    }
// Assuming message.custom.images is an array of image URLs
if (message.custom.images && message.custom.images.length > 0) {
  let imageRowContainer = document.createElement("div");
  imageRowContainer.style.display = "flex";
  imageRowContainer.style.justifyContent = "space-around";
  imageRowContainer.style.flexWrap = "wrap";
  imageRowContainer.style.marginBottom = "10px"; // Space between rows

  message.custom.images.forEach((imageUrl, index) => {
      const imgContainer = document.createElement("div");
      imgContainer.style.maxWidth = "calc(33% - 10px)"; // Adjust based on margins to fit 3 per row
      imgContainer.style.flexGrow = "1";
      imgContainer.style.display = "flex";
      imgContainer.style.justifyContent = "center"; // Center images in their container

      const img = document.createElement("img");
      img.src = imageUrl;
      img.style.maxWidth = "100%";
      img.style.borderRadius = "5px";
      img.style.margin = "5px"; // Space around images

      imgContainer.appendChild(img);
      imageRowContainer.appendChild(imgContainer);

      // Every 3 images, append the current row container to chatBox and create a new row container
      if ((index + 1) % 3 === 0) {
          chatBox.appendChild(imageRowContainer);
          imageRowContainer = document.createElement("div");
          imageRowContainer.style.display = "flex";
          imageRowContainer.style.justifyContent = "space-around";
          imageRowContainer.style.flexWrap = "wrap";
          imageRowContainer.style.marginBottom = "10px"; // Space between rows
      }
  });

  // After looping, if there's an incomplete row, append it as well
  if (message.custom.images.length % 3 !== 0) {
      chatBox.appendChild(imageRowContainer);
  }
}

                  }

                  chatBox.scrollTop = chatBox.scrollHeight;
              });
          }
      } catch (error) {
          console.error("Error sending message to Rasa:", error);
          const errorDiv = document.createElement("div");
          errorDiv.textContent = "Bot: I'm having trouble connecting. Please try again later.";
          chatBox.appendChild(errorDiv);
      }
  }
}



// Allow the user to send a message by pressing the Enter key
document.getElementById("user-input").addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
      event.preventDefault(); // Prevent the default action to stop submitting the form
      sendMessage();
  }
});

