# Workshop: My first Chrome Extension

## Setup

1. Clone the git repository for this workshop
```
git clone https://github.com/trouni/workshop-chrome-extension.git
```
2. Enter `chrome://extensions` in the Chrome search bar, and activate developer mode (top-right corner)
3. Click `Load unpacked` and select the workshop-chrome-extension folder.

## Preliminary Knowledge Recap

- Interacting with the DOM using JavaScript
```
document.getElementById('my-element-id') // => Element with the id #my-element-id

document.querySelector('.css-selector') // => First element matching the CSS selector

document.querySelectorAll('.css-selector') // => Array of all elements matching the CSS selector
```

## Let's build our first extension

This simple example will showcase how to interact with a webpage.

### Basic structure of an extension

- manifest.json
```
{
  "manifest_version": 2,
  "name": "My first Chrome Extension",
  "description": "Chrome extension workshop for Le Wagon Tokyo",
  "author": "Your name",
  "version": "0.0.1",
  "content_scripts": [
    {
      "matches": [
        "<all_urls>"
      ],
      "css": ["style/content.css"],
      "js": ["scripts/content.js"]
    }
  ],
  "permissions": [
    "tabs"
  ],
  "background": {
    "scripts": ["scripts/background.js"],
    "persistent": false
  },
  "browser_action": {
    "default_popup": "popup.html",
    "default_title": "My first Chrome Extension"
  },
  "icons": {
    "16": "images/icon16.png",
    "48": "images/icon48.png",
    "128": "images/icon128.png"
  }
}

```

### Background & Content scripts

### Passing messages to tabs / content scripts
Find more in the [chrome.tabs API](https://developer.chrome.com/extensions/tabs).

Here are some of the most useful methods:
```
chrome.tabs.query( queryInfo, (responseCallback) ) // Search within the open tabs in Chrome

chrome.tabs.sendMessage( tabId, message, (options), (responseCallback) )
```

Example:
```
chrome.tabs.query({active: true, currentWindow: true}, function(tabs) { // Finds tabs that are active in the current window
  chrome.tabs.sendMessage(tabs[0].id, { // Sends a message to the first tab (tabs[0])
    // message object
  });
});
```

### Listening for messages in tabs / content scripts

```
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    // actions based on the request
  }
);
```

## Let's make our extension interact with an API

### Passing messages to the background

```
chrome.runtime.sendMessage( (extensionId), message, (options), (responseCallback) )
```

### Listening for messages in the background

Listening is the same in the background or in content scripts, using `chrome.runtime.onMessage.addListener( ... )`.

## Publishing our extension to the store

- Sign up or sign in to your Google Account
- Developer account
- Share your extension



<!-- Footer -->
Workshop by Trouni Tiet for Le Wagon Tokyo
https://github.com/trouni
https://instagram.com/trouni
https://linkedin.com/trouni
