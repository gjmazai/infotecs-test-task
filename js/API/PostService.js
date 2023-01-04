// класс для взаимодействия с API
export default class PostService {
	// статик-метод для загрузки данных с fakeAPI
	static async getProducts() {
		const responce = await fetch(`https://dummyjson.com/products`);
		return responce;
	}
}

