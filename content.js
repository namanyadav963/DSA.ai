const createAssistant = () => {
  // Check if the assistant already exists
  if (document.querySelector("#ai-assistant")) return;

  // Create the assistant container
  const assistantDiv = document.createElement("div");
  assistantDiv.id = "ai-assistant";
  assistantDiv.style.position = "fixed";
  assistantDiv.style.bottom = "20px";
  assistantDiv.style.right = "20px";
  assistantDiv.style.zIndex = "10000";
  assistantDiv.style.backgroundColor = "#fff"; // Ensure it's visible on white backgrounds
  assistantDiv.style.border = "1px solid #ccc";
  assistantDiv.style.padding = "10px";
  assistantDiv.style.borderRadius = "8px";
  assistantDiv.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)";
  assistantDiv.style.fontFamily = "Arial, sans-serif";

  // Set inner HTML for the assistant
  assistantDiv.innerHTML = `
    <textarea id="ai-prompt" placeholder="Ask something..." style="
      width: 200px; 
      height: 80px; 
      resize: none; 
      font-size: 14px; 
      padding: 5px; 
      border: 1px solid #ddd; 
      border-radius: 4px;"></textarea>
    <button id="ai-submit" style="
      margin-top: 10px; 
      padding: 5px 10px; 
      background-color: #007BFF; 
      color: #fff; 
      border: none; 
      border-radius: 4px; 
      cursor: pointer;">Ask AI</button>
    <div id="ai-response" style="
      margin-top: 10px; 
      font-size: 14px; 
      color: #333;"></div>
  `;

  // Append the assistant to the document
  document.body.appendChild(assistantDiv);

  // Add event listener for the "Ask AI" button
  document.getElementById("ai-submit").addEventListener("click", () => {
      const prompt = document.getElementById("ai-prompt").value.trim();

      if (!prompt) {
          alert("Please enter a prompt before asking the AI.");
          return;
      }

      // Send a message to the background script to fetch the AI response
      chrome.runtime.sendMessage(
          {
              type: "fetchAIResponse",
              apiKey: "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", // Replace with a dynamic key retrieval if necessary
              prompt
          },
          (response) => {
              const responseDiv = document.getElementById("ai-response");
              if (response.success) {
                  responseDiv.textContent = response.data.choices[0].text.trim();
              } else {
                  responseDiv.textContent = "Error fetching AI response.";
                  console.error("Error:", response.error);
              }
          }
      );
  });
};

// Call the function to initialize the assistant
createAssistant();
