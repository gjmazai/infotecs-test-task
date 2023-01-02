import App from "./App.js";

const MAIN = "MAIN";

function InitialApp() {
	App();
}

if (MAIN === "MAIN") {
	InitialApp();
}

const btn = document.getElementsByClassName("header__top-btn")[0];
btn.addEventListener("click", (evt) => {
	evt.preventDefault();
	InitialApp();
});

