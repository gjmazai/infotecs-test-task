export default function render({ title, brand, category, description, rating, price }) {
	// получаем необходимые элементы из DOM-дерева и создаем новые для вставки на страницу
	const listBlock = document.getElementsByClassName("main__list")[0];
	const itemTitle = document.createElement("li");
	const itemDesription = document.createElement("p");

	// Заполняем элементы списка названием продуктов и придаем им className
	itemTitle.innerHTML = title;
	itemTitle.className = "main__item";
	itemTitle.draggable = true;
	listBlock.append(itemTitle);

	// Заполняем описание продуктов и придаем им classNAme
	itemDesription.innerHTML = `BRAND: ${brand} <br/> CATEGORY: ${category}<br/> DESCRIPTION: ${description} <br/> RATING: ${rating} <br/> PRICE: ${price}$`;
	itemDesription.className = "main__item-description";
	itemTitle.append(itemDesription);
	return true;
}

