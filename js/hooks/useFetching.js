// Реализация хука - обрабатывает возможные ошибки при запросе на сервер
export const useFetching = (callback) => {
	const fetching = async () => {
		try {
			await callback();
		} catch (error) {
			console.log(error);
		}
	};
	return fetching;
};

