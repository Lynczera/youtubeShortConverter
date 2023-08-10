chrome.action.onClicked.addListener(async (tab) => {
	var urlToGo;
	var videoID;
	if (tab.url.includes("shorts")) {
		urlToGo = tab.url.replace("shorts", "watch");
		videoID = tab.url.split("/").at(-1);

		chrome.storage.session.set({ [videoID]: "true" }, () => {
			if (chrome.runtime.lastError) {
				console.error(chrome.runtime.lastError);
			} else {
				console.log("Data saved.");
			}
		});
		chrome.tabs.update({ url: urlToGo });
	} else if (tab.url.includes("watch")) {
		var regExp =
			/^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
		var match = tab.url.match(regExp);
		if (match && match[7].length == 11) {
			videoID = match[7];
		} else {
			videoID = null;
		}

		if (videoID) {
			chrome.storage.session.get([videoID]).then((result) => {
				if (JSON.parse(result[videoID])) {
					urlToGo = `https://www.youtube.com/shorts/${videoID}`;
					chrome.storage.session.remove(videoID);
					chrome.tabs.update({ url: urlToGo });
				}
			});
		} else {
			urlToGo = null;
		}
	}
});

try{
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
	const url = tab.url;
	
	if (changeInfo.status === "complete" && url.includes("shorts")) {
		console.log(url);
		chrome.scripting.executeScript({
			files : ['scripts/content.js'],
			target : {tabId : tab.id}
		})

	}
});
}catch(err){

}


