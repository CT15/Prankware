chrome.runtime.onInstalled.addListener(function() {
    chrome.storage.sync.set({
        applied: false,
        facebook: false,
        spotify: false,
        youtube: false,
        instagram: false,
        github: false,
        reddit: false,
        twitter: false,
        twitch: false,
        pinterest: false
    }, function() {
        console.log("Initialisation complete.")
    });
});

const iconUrlMap = {
  facebook: "*://www.facebook.com/*",
  spotify: "*://www.spotify.com/*",
  youtube: "*://www.youtube.com/*",
  instagram: "*://www.instagram.com/*",
  github: "*://github.com/*",
  reddit: "*://www.reddit.com/*",
  twitter: "*://twitter.com/*",
  twitch: "*://www.twitch.tv/*",
  pinterest: "*://www.pinterest.com/*"
}

function redirectRequest(details) {
    const host = "https://en.wikipedia.org/wiki/Denial-of-service_attack";
    return { redirectUrl: host };
}

var urls = [];
chrome.storage.onChanged.addListener(function(changes, namespace) {
  for(key in changes) {
    if(key == 'applied' && urls.length > 0) {
      chrome.webRequest.onBeforeRequest.addListener(
          redirectRequest,
          { urls: urls,
            types: [
                    "main_frame",
                    "sub_frame",
                    "stylesheet",
                    "script",
                    "image",
                    "object",
                    "xmlhttprequest",
                    "other"
                  ]
          },
          ["blocking"]
      );
    } else if(key == 'applied' && urls.length <= 0) {
      chrome.webRequest.onBeforeRequest.removeListener(redirectRequest);
    } else {
      urls.push(iconUrlMap[key]);
    }
  }
});
