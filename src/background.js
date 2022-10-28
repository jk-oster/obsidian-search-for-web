const color = {
  blue: "#236dc9",
  red: "#d53032",
  yellow: "#ffe834",
  green: "#8fce00",
  gray: "#222222",
};

let show = true;

chrome.storage.sync.set({ show: true });
chrome.storage.sync.set({ status: "offline" });
chrome.storage.sync.set({ results: "off" });
chrome.action.setBadgeText({ text: "off" });
chrome.action.setBadgeBackgroundColor({ color: color.gray });

// listen to event for changes from saved data in storage
chrome.storage.onChanged.addListener((data, namespace) => {
  if (data.results) {
    let newText = data.results.newValue;
    if (typeof newText != "string") newText = JSON.stringify(newText);
    chrome.action.setBadgeText({ text: newText ?? "" });
  }

  if (data.show) {
    show = data.show.newValue;
  }

  if (data.status) {
    let newColor;
    if (data.status.newValue == "noauth") newColor = color.red;
    if (data.status.newValue == "search") newColor = color.green;
    else if (data.status.newValue == "url") newColor = color.yellow;
    else if (data.status.newValue == "offline") newColor = color.gray;
    chrome.action.setBadgeBackgroundColor({ color: newColor });
  }
});

chrome.action.onClicked.addListener((tab) => {
  chrome.storage.sync.set({ show: !show });
});
