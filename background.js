async function backGdRedirect() {
	chrome.tabs.query(
		{
			active: true,
			currentWindow: true,
		},
		function (tabs) {
			var tab = tabs[0];

			var urlToGo;
			var videoID;
			if (tab.url.includes("shorts")) {
				urlToGo = tab.url.replace("shorts", "watch");
				videoID = tab.url.split("/").at(-1);

				chrome.storage.session.set({ [videoID]: "true" });
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
		}
	);
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
	if (request.message === "redirect") {
		backGdRedirect();
	}
});

try {
	chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
		const url = tab.url;

		if (changeInfo.status === "complete" && url.includes("shorts")) {
			chrome.scripting.executeScript({
				files: ["scripts/contentShort.js"],
				target: { tabId: tab.id },
			});
		}
		if (changeInfo.status === "complete" && url.includes("watch")) {
			chrome.scripting.executeScript({
				files: ["scripts/contentVid.js"],
				target: { tabId: tab.id },
			});
		}
	});
} catch (err) {}
