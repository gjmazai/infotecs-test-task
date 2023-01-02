import PostService from "./API/PostService.js";
import { useFetching } from "./hooks/useFetching.js";
import render from "./FunctionsForDOM/render.js";
import store from "./store/store.js";
import dragAndDrop from "./FunctionsForDOM/dragAndDrop.js";
import { removeItems } from "./FunctionsForDOM/removeItems.js";

const App = () => {
	removeItems(document.getElementsByClassName("main__list")[0]);
	const limitVar = document.getElementsByClassName("header__top-input")[0].value;
	if (limitVar >= 0) {
		store.limit = limitVar;
	}
	const fetchUsers = useFetching(async () => {
		const responce = await PostService.getUsers(store.limit);
		const data = await responce.json();
		store.products = data.products;
		store.products.map(async (el, index) => {
			render(el);
		});
	});

	fetchUsers();
	dragAndDrop();
};

export default App;

