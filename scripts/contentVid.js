function redirectToVid() {
	chrome.runtime.sendMessage({ message: "redirect" });
}
function insertButtonOnShort() {
	const convertBtn = document.createElement("button");
	convertBtn.id = "convert-button";
	convertBtn.classList.add("ytp-mute-button", "ytp-button");
	convertBtn.onclick = () => redirectToVid();

	const icon = document.createElement("img");
	icon.src = chrome.runtime.getURL("icons/iconVidWhite.png");

	icon.setAttribute("width", "36px");
	icon.setAttribute("height", "36px");

	convertBtn.appendChild(icon);

	const controldiv = document.querySelector(".ytp-left-controls");
	if (controldiv) {
		controldiv.insertAdjacentElement("beforeend", convertBtn);
	}
}

insertButtonOnShort();
