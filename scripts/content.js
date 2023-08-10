function insertButton() {
	var possibleBtn = [];
	const containers = document.querySelectorAll(
		"ytd-reel-player-overlay-renderer"
	);
	if (containers) {
		containers.forEach((cont) => {
			possibleBtn.push(cont.querySelector("#convert-button"));
		});
	}

	if (possibleBtn) {
		console.log(possibleBtn);

		possibleBtn.forEach((btn) => {
			if (btn) {
				btn.remove();
			}
		});
	}

	const convertDiv = document.createElement("div");
	convertDiv.id = "convert-button";
	convertDiv.classList.add("style-scope", "ytd-reel-player-overlay-renderer");

	const convertLabel = document.createElement("label");
	convertLabel.classList.add("yt-spec-button-shape-with-label");

	const convertBtn = document.createElement("button");
	convertBtn.classList.add(
		"yt-spec-button-shape-next",
		"yt-spec-button-shape-next--tonal",
		"yt-spec-button-shape-next--mono",
		"yt-spec-button-shape-next--size-l",
		"yt-spec-button-shape-next--icon-button"
	);

	const icon = document.createElement("img");
	icon.src = chrome.runtime.getURL("icons/iconWebCol.png");

	icon.setAttribute("width", "24px");
	icon.setAttribute("height", "24px");

	convertBtn.appendChild(icon);
	convertLabel.appendChild(convertBtn);
	convertDiv.appendChild(convertLabel);

	var focus;
	const menu = document.querySelectorAll("ytd-reel-video-renderer");
	console.log(menu);
	menu.forEach((el) => {
		if (el.attributes["is-active"]) {
			focus = el;
		}
	});

	if (focus) {
		const container = focus.querySelector("#actions");
		container.insertAdjacentElement("afterbegin", convertDiv);
	}
}
console.log("content injected");

var delayInMilliseconds = 1000;

setTimeout(function() {
	insertButton();
}, delayInMilliseconds);