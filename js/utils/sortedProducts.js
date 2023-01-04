const PRICE = "price";
const CATEGORY = "category";

// функция для сортировки элементов в списке
export const sortedProducts = (products, field) => {
	// Т.к. цена является числом, а категория строкой, то для них используются разные алгоритмы сортировки
	switch (field) {
		case PRICE:
			return products.sort((a, b) => a[field] - b[field]);
		case CATEGORY:
			return products.sort((a, b) => a[field].localeCompare(b[field]));
		default:
			return products;
	}
};

