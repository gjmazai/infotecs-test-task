import App from "./App.js";

const MAIN = "MAIN";

// Инициализация приложения
function InitialApp() {
	App();
}
// Необходимо для первого рендеринга страницы с 10-ю элементами по умолчанию
if (MAIN === "MAIN") {
	InitialApp();
}

