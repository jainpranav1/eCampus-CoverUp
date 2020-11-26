// sends message to ecampus_coverup.js when tab button is clicked
chrome.browserAction.onClicked.addListener(buttonClicked);

// stores whether application on or off for each tab
var tab_store = {}
var tab_str;

function buttonClicked(tab) {
	tab_str = (tab.id).toString()
	
	if (!(tab_str in tab_store)) {
		tab_store[tab_str] = "off";
	}
	
	if (tab_store[tab_str] == "off") {
		
		// changes icon of current tab only
		chrome.browserAction.setIcon({path:"on.png", tabId:tab.id});
		chrome.tabs.sendMessage(tab.id, "on");
		tab_store[tab_str] = "on";
	}
	else {
		
		// changes icon of current tab only
		chrome.browserAction.setIcon({path:"off.png", tabId:tab.id});
		chrome.tabs.sendMessage(tab.id, "off");
		tab_store[tab_str] = "off";
	}
}