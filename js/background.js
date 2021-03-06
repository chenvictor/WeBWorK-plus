chrome.browserAction.onClicked.addListener(function() {
    chrome.tabs.executeScript(null, {file: "js/inject.js"});
});
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    // noinspection EqualityComparisonWithCoercionJS
    if (tab.url != undefined && tab.url != null && changeInfo.status === "complete") {
        try {
            let url = new URL(tab.url);
            chrome.storage.sync.get({
                whitelist: ["webwork.elearning"]
            }, function (items) {
                for (let query of items.whitelist) {
                    if (url.origin.includes(query)) {
                        chrome.tabs.executeScript(tabId, {file: "js/inject.js"});
                        break;
                    }
                }
            });
        } catch (e) {
            console.error("Error: "+ e + " with url: " + tab.url);
        }
    }
});