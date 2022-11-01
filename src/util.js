export function escapeRegex(string) {
  return string.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
}

export async function checkApiKey(url, apiKey, callback) {
  console.log(url, apiKey);
  return fetch(url + "/", { method: 'GET', headers: { Authorization: "Bearer " + apiKey } })
    .then(res => res.json())
    .then(data => {
      console.log(data);
      if (data.status == 'OK' && data.authenticated) {
        chrome.storage.sync.set({ status: 'search', results: ' ' });
        const statusText = "✅ Succcessfully connected to Obsidian";
        console.log(statusText);
        if (callback) callback();
        return statusText;
      }
      else {
        chrome.storage.sync.set({ status: 'noauth', results: 'x' });
        const statusText = '🔑 Could reach Obsidian REST Api - API-Key is not valid. Please check and copy the key from Obsidian REST Api Plugin Settings';
        console.log(statusText);
        return statusText;
      };
    }).catch(e => {
      chrome.storage.sync.set({ status: 'offline', results: 'off' });
      const statusText = '❗ Make sure Obsidian is running and set your Protocol settings to connect to your Obsidian REST Api!';
      console.log(statusText);
      return statusText;
    });
}