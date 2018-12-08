window.addEventListener('load', function load(event) {
  const icons = document.querySelectorAll(".icon");
  for(var i = 0; i < icons.length; i++) {
    const iconId = icons[i].id;
    icons[i].onclick = function() { toggleIconValue(iconId); };
  }

  const applyButton = document.getElementById("applied");
  applyButton.onclick = function() { toggleIconValue("applied") };
});

function toggleIconValue(iconId) {
  chrome.storage.sync.get(iconId, function(result) {
    var newIconVal = !result[iconId];
    console.log(newIconVal);
    chrome.storage.sync.set({[iconId]: newIconVal}, function() {
      if(newIconVal) {
        document.getElementById(iconId).classList.add("active");
      } else {
        document.getElementById(iconId).classList.remove("active");
      }
    });
  });
}

// Run once when popup first appears
chrome.storage.sync.get(null, function(items) {
  const allKeys = Object.keys(items);
  for(var i = 0 ; i < allKeys.length; i++) {
    if(items[allKeys[i]]) {
      document.getElementById(allKeys[i]).classList.add("active");
    }
  }
});
