import PostService from "./API/PostService.js";
import { useFetching } from "./hooks/useFetching.js";
import render from "./FunctionsForDOM/Render.js";
import store from "./store/store.js";
import dragAndDrop from "./FunctionsForDOM/DragAndDrop.js";

const App = () => {
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

