chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === "fetchAIResponse") {
      fetch("https://api.openai.com/v1/completions", {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${request.apiKey}`
          },
          body: JSON.stringify({
              model: "text-davinci-003",
              prompt: request.prompt,
              max_tokens: 150
          })
      })
      .then(response => response.json())
      .then(data => {
          console.log("API Response:", data); // Debug response
          sendResponse({ success: true, data });
      })
      .catch(error => {
          console.error("API Error:", error); // Debug error
          sendResponse({ success: false, error });
      });
      return true; // Indicates asynchronous response
  }
});
