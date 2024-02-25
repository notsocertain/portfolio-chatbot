// // // Wait for the DOM content to load
// // document.addEventListener("DOMContentLoaded", function() {
// //     // Add event listener to input field for Enter key
// //     document.getElementById("user-input").addEventListener("keydown", function(event) {
// //       if (event.keyCode === 13) { // If Enter key is pressed
// //         sendMessage(); // Call sendMessage function
// //       }
// //     });
// //   });
  
// //   function sendMessage() {
// //     var userInput = document.getElementById("user-input").value;
// //     if (userInput !== "") {
// //       appendMessage("You: " + userInput);
      
// //       // Check for specific user inputs
// //       if (userInput.toLowerCase() === "hello") {
// //         setTimeout(function() {
// //           appendMessage("NotSoAssist-o-Tron: Hello there!");
// //         }, 500);
// //       }
// //         // Check for specific user inputs
// //         else if (userInput.toLowerCase() === "twitter") {
// //             setTimeout(function() {
// //                 appendMessage("NotSoAssist-o-Tron: twitter handle is @notsocertainwind ");
// //             }, 500);
// //             }  else {
// //         // For all other responses
// //         setTimeout(function() {
// //           appendMessage("NotSoAssist-o-Tron: I didn't understand.");
// //         }, 500);
// //       }
      
// //       document.getElementById("user-input").value = "";
// //     }
// //   }
  
// //   function appendMessage(message) {
// //     var chatBox = document.getElementById("chat-box");
// //     var messageElement = document.createElement("div");
// //     messageElement.innerText = message;
// //     chatBox.appendChild(messageElement);
// //     chatBox.scrollTop = chatBox.scrollHeight;
// //   }
// async function sendMessage() {
//   const chatBox = document.getElementById("chat-box");
//   const userInputField = document.getElementById("user-input");
//   const userMessage = userInputField.value.trim();

//   if (userMessage) {
//       const userDiv = document.createElement("div");
//       userDiv.textContent = "You: " + userMessage;
//       chatBox.appendChild(userDiv);
//       chatBox.scrollTop = chatBox.scrollHeight;
//       userInputField.value = '';
//   }

//   if (userMessage) {
//       try {
//           const response = await fetch('http://localhost:5005/webhooks/rest/webhook', {
//               method: 'POST',
//               headers: {
//                   'Content-Type': 'application/json',
//               },
//               body: JSON.stringify({
//                   sender: "user",
//                   message: userMessage
//               }),
//           });

//           const responseData = await response.json();

//           // Display bot response
// // Display bot response
// if (responseData && responseData.length > 0) {
//   responseData.forEach((message) => {
//       const botDiv = document.createElement("div");
//       // Check if the message contains HTML (a simple check for a tag)
//       if (message.text && message.text.includes('<a href=')) {
//           // If the message contains HTML, set innerHTML instead of textContent
//           botDiv.innerHTML = "notsoNishant: " + message.text;
//       } else {
//           // If no HTML, it's safe to use textContent
//           botDiv.textContent = "notsoNishant: " + message.text;
//       }
//       chatBox.appendChild(botDiv);

//       if (message.image) {
//           const img = document.createElement("img");
//           img.src = message.image;
//           img.style.maxWidth = "200px"; // Set image size
//           img.style.borderRadius = "5px"; // Optional: style the image
//           chatBox.appendChild(img);
//       }

//       chatBox.scrollTop = chatBox.scrollHeight;
//   });
// }

//       } catch (error) {
//           console.error("Error sending message to Rasa:", error);
//           const errorDiv = document.createElement("div");
//           errorDiv.textContent = "Bot: I'm having trouble connecting. Please try again later.";
//           chatBox.appendChild(errorDiv);
//       }
//   }
// }


// // Allow the user to send a message by pressing the Enter key
// document.getElementById("user-input").addEventListener("keypress", function(event) {
//   if (event.key === "Enter") {
//       event.preventDefault(); // Prevent the default action to stop submitting the form
//       sendMessage();
//   }
// });

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
                  const botDiv = document.createElement("div");
                  // Check if the message contains HTML (a simple check for an <a> tag)
                  if (message.text && message.text.includes('<a href=')) {
                      // If the message contains HTML, set innerHTML instead of textContent
                      // Directly apply a style to underline links
                      botDiv.innerHTML = "notsoNishant: " + message.text.replace(/<a /g, "<a style='text-decoration: underline;' ");
                  } else {
                      // If no HTML, it's safe to use textContent
                      botDiv.textContent = "notsoNishant: " + message.text;
                  }
                  chatBox.appendChild(botDiv);

                  if (message.image) {
                      const img = document.createElement("img");
                      img.src = message.image;
                      img.style.maxWidth = "200px"; // Set image size
                      img.style.borderRadius = "5px"; // Optional: style the image
                      chatBox.appendChild(img);
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
