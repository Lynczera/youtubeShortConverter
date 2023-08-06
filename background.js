chrome.action.onClicked.addListener(async (tab) => {
	var urlToGo;
	var videoID;
	if (tab.url.includes("shorts")) {
		urlToGo = tab.url.replace("shorts", "watch");
		videoID = tab.url.split("/").at(-1);

		chrome.storage.local.set({ [videoID]: "true" }, () => {
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
			chrome.storage.local.get([videoID]).then((result) => {
				if (JSON.parse(result[videoID])) {
					console.log("worked");

					urlToGo = `https://www.youtube.com/shorts/${videoID}`;
          chrome.tabs.update({ url: urlToGo });
				}
			});
		} else {
			console.log("Not a short");
			urlToGo = null;
		}
	}

});
