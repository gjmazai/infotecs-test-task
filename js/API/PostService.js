export default class PostService {
	static async getUsers(limit = 10) {
		const responce = await fetch(`https://dummyjson.com/products?limit=${limit}`);
		return responce;
	}
}

