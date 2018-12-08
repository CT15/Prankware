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
