const tabTimeObjectKey = "tabTimesObject"; //{key:url, value: {url: String, trackedSec: number, lastDateVal: number}}
const lastActiveTabKey = "lastActiveTab"; // {url: String, lastDateVal: number}

chrome.runtime.onInstalled.addListener(function(){
	chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
		chrome.declarativeContent.onPageChanged.addRules([{
			conditions:[new chrome.declarativeContent.PageStateMatcher({
				pageUrl: {},
			})],
			actions: [new chrome.declarativeContent.ShowPageAction()]
		}]);
	});
});

chrome.windows.onFocusChanged.addListener(function(windowid){
	if(windowid == chrome.windows.WINDOWS_ID_NONE) {
		//reset the last date and store the difference
		processTabChange(false);
	} else {
		processTabChange(true);
	}
});


function processTabChange(isActive) {
	chrome.tabs.query({'active':true}, function(tabs){
		if (tabs.length> 0 && tabs[0] != null) {
			let currentTab = tabs[0];
			let url = currentTab.url;
			let title = currentTab.title;
			let hostname = url;
			try {
				let urlObject = new URL(url);
				hostname = urlObject.hostname		
			} catch (e) {
				console.log("couldn't find url of ${currentTab.url}, error: ${e}");
			}

			chrome.storage.local.get([tabTimeObjectKey, lastActiveTabKey], function(result){
				let lastActiveTabStr = result[lastActiveTabKey];
				let tabTimeObjectStr = result[tabTimeObjectKey];
				console.log("getting result from storage");
				console.log(result);

				tabTimeObject = {};
				if (tabTimeObjectStr != null) {
					tabTimeObject = JSON.parse(tabTimeObjectStr);
				}

				lastActiveTab ={};
				if (lastActiveTabStr != null) {
					lastActiveTab = JSON.parse(tabTimeObjectStr);
				}

				// if last tab has been an entry, stop the time and if it hasn't...
				if (lastActiveTab.hasOwnProperty("url") && lastActiveTab.hasOwnProperty("lastDateVal")) {
					let lastUrl = lastActiveTab["url"];
					let currentDateVal_ Date.now();
					let passedSeconds = (currentDateVal_ - lastActiveTab["lastDateVal"]) * 0.001;

					if (tabTimeObject.hasOwnProperty(lastUrl)){
						let lastUrlObjectInfo = tabTimeObject[lastUrl];
						if (lastUrlObjectInfo.hasOwnProperty("trackedSec")){
							lastUrlObjectInfo["trackedSec"] = lastUrlObjectInfo["trackedSec"] + passedSeconds; 
						} else {
							lastUrlObjectInfo["trackedSec"] = passedSeconds;
						}
						lastUrlObjectInfo["lastDateVal"] = currentDateVal_;
					} else {
						let newUrlInfo = {url: lastUrl, trackedSec: passedSeconds, lastDateVal: currentDateVal_};
						tabTimeObject[lastUrl] = newUrlInfo;
					}
				}

				let currentDate = Date.now();

				//storing current tab info:
				let lastTabInfo = {"url": hostname, "lastDateVal": currentDate};
				if (!isActive) {
					lastTabInfo = {};
				}

				let newLastTabObject = {};
				newLastTabObject[lastActiveTabKey] = JSON.stringify(lastTabInfo);

				chrome.storage.local.set(newLastTabObject, function(){
					const tabTimesObjectStr = JSON.stringify(tabTimeObject);
					let newTabTimesObject = {};
					newTabTimesObject[tabTimeObjectKey] = tabTimesObjectStr;
					chrome.storage.local.set(newTabTimesObject, function (){

					});
				});

			});
		}
	});
}

function onTabTrack(isActive) {
	let tabID = isActive.tabId;
	let windowId = isActive.windowId;

	processTabChange(true);
}


chrome.tabs.onActivated.addListener(onTabTrack);
