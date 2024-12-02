document.getElementById("save-key").addEventListener("click", () => {
    const apiKey = document.getElementById("api-key").value;
    chrome.storage.sync.set({ apiKey }, () => {
      alert("API Key saved!");
    });
  });
  