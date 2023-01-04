export async function render({ title, brand, category, description, rating, price }, mainList) {
	//  создаем новые элементы списка для вставки на страницу
	const itemTitle = document.createElement("li");
	const itemDesription = document.createElement("p");

	// Заполняем элементы списка названием продуктов и придаем им className,
	//а также указываю draggable = true, для возможности перемещения элементов по списку
	itemTitle.innerHTML = title;
	itemTitle.className = "main__item";
	itemTitle.draggable = true;
	mainList.append(itemTitle);

	// Заполняем описание продуктов и придаем им classNAme
	itemDesription.innerHTML = `BRAND: ${brand} <br/> CATEGORY: ${category}<br/> DESCRIPTION: ${description} <br/> RATING: ${rating} <br/> PRICE: ${price}$`;
	itemDesription.className = "main__item-description";
	itemTitle.append(itemDesription);
}

