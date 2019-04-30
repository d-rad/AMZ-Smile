window.onload = function loadSwitch() {
    var defaultValue = "true";
    var updateState = chrome.storage.sync.get({ activeSwitch: defaultValue }, function (data) {
        chrome.storage.sync.set({ activeSwitch: data.activeSwitch }, function () {

        });
    });
    document.getElementById("activeSwitch").checked = updateState;
}

function storeSwitch() {
    var switchState = document.getElementById("activeSwitch").checked;
    chrome.storage.sync.set({ activeSwitch: switchState }, function () {
    });
}

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("activeSwitch").addEventListener("click", storeSwitch);
});