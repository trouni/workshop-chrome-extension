// ================================================= //
// Code for your background script goes in this file //
// ================================================= //

const postBinUrl = 'https://postb.in/1590579419993-4853072522673' // 👈 Paste your PostBin url here

// TODO: Create function to make a POST request to PostBin using fetch()
function postItem(title, url) {
  return fetch(postBinUrl, {
    method: 'POST',
    headers: { "Content-type": "application/json; charset=UTF-8" },
    body: JSON.stringify({ title: title, url: url })
  })
}

// TODO: Add a message listener to receive the active page information sent by popup.js and send it to PostBin
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.action === 'callPostItem') postItem(request.title, request.url).then(response => sendResponse(response));
    return true // Necessary when sendResponse() is sent asynchronously so that the script that sent the message waits for the response.
  }
);