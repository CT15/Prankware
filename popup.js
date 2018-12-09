// Starting point (when the popup is loaded)
window.addEventListener('load', function load(event) {
  const icons = document.querySelectorAll(".icon");
  for(var i = 0; i < icons.length; i++) {
    const iconId = icons[i].id;
    icons[i].onclick = function() { toggleIconValue(iconId); };
  }

  const applyButton = document.getElementById("applied");
  applyButton.onclick = toggleActivateButtonValue;
});

function toggleIconsClickable(clickable) {
  const icons = document.querySelectorAll(".icon");
  for(var i = 0; i < icons.length; i++) {
    if(clickable) icons[i].classList.remove("unclickable");
    else icons[i].classList.add("unclickable");
  }
}

function toggleActivateButtonValue() {
  const buttonId = "applied";

  chrome.storage.sync.get(buttonId, function(result) {
    var newButtonVal = !result[buttonId];

    chrome.storage.sync.set({[buttonId]: newButtonVal}, function() {
      if(newButtonVal) {
        document.getElementById(buttonId).classList.add("active");
      } else {
        document.getElementById(buttonId).classList.remove("active");
      }
      toggleIconsClickable(!newButtonVal);
    });

  });
}

function toggleActivateButtonClickable(clickable) {
  const buttonId = "applied";
  if(clickable) {
    document.getElementById(buttonId).classList.remove("unclickable");
  } else {
    document.getElementById(buttonId).classList.add("unclickable");
  }
}

var activeIconsCount = 0;

function toggleIconValue(iconId) {
  chrome.storage.sync.get(iconId, function(result) {
    var newIconVal = !result[iconId];

    chrome.storage.sync.set({[iconId]: newIconVal}, function() {
      if(newIconVal) {
        document.getElementById(iconId).classList.add("active");
        activeIconsCount++;
      } else {
        document.getElementById(iconId).classList.remove("active");
        activeIconsCount--;
      }
      toggleActivateButtonClickable(activeIconsCount > 0);
    });

  });
}

// Run once when popup first appears
chrome.storage.sync.get(null, function(items) {
  const allKeys = Object.keys(items);

  for(var i = 0 ; i < allKeys.length; i++) {
    if(items[allKeys[i]]) {
      document.getElementById(allKeys[i]).classList.add("active");
      if(allKeys[i] == "applied") toggleIconsClickable(false);
      else activeIconsCount++;
    }
  }

  toggleActivateButtonClickable(activeIconsCount > 0);
});
