import store from "./store/store.js";
import PostService from "./API/PostService.js";
import { useFetching } from "./hooks/useFetching.js";
import { render } from "./utils/render.js";
import { dragAndDrop } from "./utils/dragAndDrop.js";
import { removeItems } from "./utils/removeItems.js";
import { sortedProducts } from "./utils/sortedProducts.js";

const App = () => {
	// Получение html-элементов из DOM-дерева
	const mainList = document.querySelector(".main__list"); // список самих элементов
	const btn = document.querySelector(".header__bot-btn"); // кнопка для рендеринга новых элементов
	const select = document.querySelector("#header__drop-select"); // select для выбора сортировки элементов

	/*Использование хука useFetching для загрузки данных из fakeAPI
	Для оптимизации я использую всего одну загрузку данных с сервера, т.к. заранее известен размер массива данных, при этом размер не сильно большой(30) и не будет изменяться со временем */
	const fetchUsers = useFetching(async () => {
		// Запрос данных с помощью метода класса PostService
		const responce = await PostService.getProducts();
		const data = await responce.json();
		// Помещаю данные в стор
		store.products = data.products;
		store.maxLimit = data.limit;
		// Отрисовываю элементы списка в функции render
		store.products.forEach(async (el, index) => {
			index < store.limit && render(el, mainList);
		});
	});

	// Чтобы отображать новое количество элементов в списке, которое указал пользователь, на кнопку навешиваю слушатель события по клику
	btn.addEventListener("click", (event) => {
		select.value = "default"; // Меняю элемент select на значение по умолчанию, нужно если пользователь сортировал элементы, загрузил новые и хочет снова отсортировать по тому же значению, иначе событие onChange для select не сработает
		event.preventDefault(); // предотвращаю перезагрузку страницы
		removeItems(mainList); // удаляю все элементы из списка, для новой отрисовки
		const numberOfElements = document.getElementsByClassName("header__bot-input")[0].value;
		// Проверка на валидное значение запрашиваемых элементов для списка
		if (numberOfElements >= 0 && numberOfElements <= store.maxLimit) {
			store.limit = numberOfElements;
		} else {
			alert("Введите корректное значение элементов: от 0 до 30");
			return false;
		}
		// Отрисовка списка
		store.products.forEach((el, index) => {
			index < store.limit && render(el, mainList);
		});
	});

	// Срабатывает при изменении вида сортировки
	select.onchange = (event) => {
		removeItems(mainList); // удаляю элементы из списка
		let state = []; // создаю новый массив, чтобы не изменять данные в stor
		for (let i = 0; i < store.limit; i++) {
			// заполняю новый массив ровно стольким кол-вом элементов, сколько сейчас находиться на странице
			state.push(store.products[i]);
		}
		// Функция sortedProducts возвращает отсортированный массив
		state = sortedProducts(state, event.target.value);
		// Отрисовка отсортированого массива
		state.forEach((el) => {
			render(el, mainList);
		});
	};

	// Вызываю хук useFetching и функцию для функциональности Drag'n'Drop
	fetchUsers();
	dragAndDrop(mainList);
};

export default App;

