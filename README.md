# Workshop: My first Chrome Extension

## Setup

1. Clone the git repository for this workshop
```
git clone https://github.com/trouni/workshop-chrome-extension.git
```
2. Alternatively, download the zip file from this page
3. Enter `chrome://extensions` in the Chrome search bar, and activate developer mode (top-right corner)
4. Click `Load unpacked` and select the workshop-chrome-extension folder.

## Let's build our first extension

This example will showcase how to interact with a webpage using a very simple Chrome extension.

### Interacting with the DOM using JavaScript
```
document.getElementById('my-element-id') // => Element with the id #my-element-id

document.querySelector('.css-selector') // => First element matching the CSS selector

document.querySelectorAll('.css-selector') // => Array of all elements matching the CSS selector
```

Using this, let's replace all the images on a page with beautiful photos of cheese from [Unsplash](https://source.unsplash.com).

```
document.querySelectorAll('img').forEach( (img) => {
  img.src = `https://source.unsplash.com/${img.width}x${img.height}/?cheese&${Math.random()}`;
  img.srcset = img.src;
})
```

*Note: Not sure why you would want to do that, but you can replace `cheese` in the string with anything you want (e.g. `wine`, `kitten`, `nail-clipper`, etc.)*

Stunning! Now, let's put this script in a Chrome extension, so that we can run it whenever we want from the toolbar.

### Basic structure of a Chrome extension

The manifest is a simple JSON file that tells the browser about your web application, and it is the only file that every extension using WebExtension APIs must contain.

```
// manifest.json

{
  "manifest_version": 2,
  "name": "My first Chrome Extension",
  "description": "Chrome extension workshop for Le Wagon Tokyo",
  "author": "Your name",
  "version": "0.0.1",
  "permissions": [
    "tabs"
  ],
  "content_scripts": [
    // ...
  ],
  "background": {
    // ...
  },
  "browser_action": {
    // ...
  },
  "icons": {
    "16": "images/icon16.png",
    "48": "images/icon48.png",
    "128": "images/icon128.png"
  }
}

```


```
// manifest.json

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
      "js": [],
      "css": []
    }
  ],
  "permissions": [
    "tabs"
  ],
  "background": {
    "scripts": [],
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

### Content scripts & Background / Event scripts

**Content scripts** run in the context of a web page / tab, and allow you to get information from it, or even change its contents.

As the name suggests, **background scripts** are running in the background of the Chrome browser, acting as controllers and used to maintain state for your extensions.

While content scripts have limited access to the Chrome Extension APIs, background scripts can make full use of them. **As a general rule, content scripts should be used to interact with web pages / tabs, while most of the logic should be located in the background scripts.**

You can read this short blog post for a quick overview:
[Chrome Extensions: Content Scripts vs. Background Scripts](https://medium.com/@vanessajimenez_85032/chrome-extensions-content-scripts-vs-background-scripts-7bbd01f9dbe6)

#### Creating our first content script

Since it interacts with our page, our image replacing script should go into a content script.

**TODO:** Type or copy the script from [above](#interacting-with-the-dom-using-javascript) in the `scripts/cheesify.js` file.

#### Adding our content script to the manifest

**TODO:** In your manifest, add the following to run our cheesify script on all the pages we visit.

```
// manifest.json

{
  // ...

  "content_scripts": [
    {
      "matches": [
        "<all_urls>"
      ],
      "js": ["scripts/cheesify.js"]
    }
  ],

  // ...
}
```

## Let's add a menu

Our script now runs on every single page we visit, and although I'm definitely loving all that cheesy goodness, I can think of a few situations where replacing all images on the internet with photos of coagulated milk may not be entirely relevant. So let's add a menu to our extension, in order to trigger the cheesification of our page only when we *actually* need it.

### Creating the menu UI in HTML/CSS

**TODO:** Create your menu or copy-paste the code below into `popup.html` and `style/popup.css`.
```
<!-- popup.html -->

<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>My first Chrome extension</title>
  <link rel="stylesheet" href="style/popup.css">
</head>
<body>
  <h1>My first Chrome extension</h1>
  <button id="cheesify">Cheesify Page</button>
  <script src="scripts/popup.js"></script>
</body>
</html>
```

```
/* style/popup.css */

body {
  text-align: center;
  font-family: 'Helvetica';
  width: 600px;
  margin: 0;
  padding: 1em;
  color: white;
  background: radial-gradient(#2C4792, #162346);
  border: solid 2px #2C4792;
}

h1 {
  margin: 0.8em;
}

button {
  font-size: 1.2em;
  padding: 1em;
  margin: 1em;
  background: #339AF0;
  color: white;
  border-radius: 5px;
  border: solid 1px white;
}

button:disabled {
  background: lightgrey;
}
```

### Adding our menu to the manifest

**TODO:** Add this to your manifest.json file.
```
// manifest.json

{
  // ...

  "browser_action": {
    "default_popup": "popup.html",
    "default_title": "My first Chrome Extension"
  },

  // ...
}
```

### Passing messages to tabs / content scripts

When we click the button of our popup.html page, we should send a message to the cheesify.js content script and trigger our image replacement script.

Here are some useful methods to pass messages to content scripts:
```
chrome.tabs.query( queryInfo, (responseCallback) ) // Search within the open tabs in Chrome

chrome.tabs.sendMessage( tabId, message, (options), (responseCallback) )
```
*Learn more in the [chrome.tabs API](https://developer.chrome.com/extensions/tabs).*

**TODO:** Let's apply this to our extension and trigger the cheesify script when we click on our button.
```
// scripts/popup.js

document.getElementById('cheesify').addEventListener('click', event => cheesify());

function cheesify() {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) { // Finds tabs that are active in the current window
    chrome.tabs.sendMessage(tabs[0].id, { action: 'cheesify' }); // Sends a message (object) to the first tab (tabs[0])
  });
}
```

### Listening for messages in tabs / content scripts

Now, all that's keeping us from turning our web page into dairy heaven is learning how to intercept the message we've just sent, then trigger an action based on that. We will be using the chrome.runtime API and more specifically, the `onMessage.addListener()` method:

```
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    // actions based on the request (which corresponds to the object we sent in our message)
  }
);
```
*Learn more in the [chrome.runtime API](https://developer.chrome.com/apps/runtime).*

**TODO:** Complete/replace your code in cheesify.js with the one below.
```
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.action === 'cheesify') cheesify();
  }
);

function cheesify() {
  document.querySelectorAll('img').forEach( (img) => {
    img.src = `https://source.unsplash.com/${img.width}x${img.height}/?cheese&${Math.random()}`;
    img.srcset = img.src;
  })
}
```

Awesome! You should now be able to click on the extension's icon, then click on the 'Cheesify Page' button to run our cheesify script. I have also included a basic 'font picker' script for you to play around if you'd like to experiment more with passing messages between the popup and content script.

## Let's make our extension interact with an API



### Passing messages to the background scripts

```
chrome.runtime.sendMessage( (extensionId), message, (options), (responseCallback) )
```

### Listening for messages in the background scripts

Listening is the same in the background or in content scripts, using `chrome.runtime.onMessage.addListener( ... )`.



## Publishing our extension to the store

- Sign up or sign in to your Google Account
- Developer account
- Share your extension


**TODO:** I would absolutely love to see what extensions you've built, so don't hesitate to contact me (details below) and let me know what you came up with!

======
©[CC BY-NC](https://creativecommons.org/licenses/by-nc/4.0/) Workshop by Trouni Tiet for Le Wagon Tokyo
[LinkedIn](https://linkedin.com/trouni) | [Github](https://github.com/trouni) | [Instagram](https://instagram.com/trouni)
