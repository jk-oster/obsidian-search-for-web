import browser from "webextension-polyfill";


export function escapeRegex(string) {
  return string.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
}

async function getCurrTabId(matches = null) {
  return browser.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
    var currTab = tabs[0];
    if (currTab && (!matches || matches.test(currTab.url))) {
      return currTab.id;
    }
    return undefined;
  })
}

export async function checkApiKey(url, apiKey) {
  console.log(url, apiKey);
  const options = {
    method: 'GET',
    headers: {
      Authorization: "Bearer " + apiKey
    }
  };

  let statusText = '';
  let data = {};
  let action = '';

  try {
    const resp = await fetch(url + "/", options);
    data = await resp.json();
    console.log('fetched data', data);

    if (data.status == 'OK' && data.authenticated) {
      statusText = "✅ Succcessfully connected to Obsidian";
      data = { status: 'search', statusText };
      action = 'search';
    }
    else {
      statusText = '🔑 Could reach Obsidian REST Api - API-Key is not valid. Please check and copy the key from Obsidian REST Api Plugin Settings';
      data = { status: 'noauth', results: 'x', statusText };
      action = 'noauth';
    };
  }
  catch (e) {
    console.log('error reason', e);
    statusText = '❗ Make sure Obsidian is running and set your Protocol / Port settings to connect to your Obsidian REST Api!';
    data = { status: 'offline', results: 'off', statusText };
    action = 'offline';
  }


  try {
    browser.storage.sync.set(data);
    console.log('stored', data);
    browser.runtime.sendMessage({ action: 'badge', data });
    console.log('sent', action, data)

  } catch (e) {
    console.log('runtimeMsgError', e);
  }
  const event = new CustomEvent(action, data);
  window.dispatchEvent(event);
  console.log('dispatched', action, data);
  console.log(statusText);
  return statusText;
}