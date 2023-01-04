// Реализация Drag'n'Drop
export function dragAndDrop(mainList) {
	// Слушатель события dragstart, чтобы добавить к className перетаскиваемого элемента selected
	mainList.addEventListener("dragstart", (event) => {
		event.target.classList.add(`selected`);
	});

	// когда перемещение элемента закончится, нужно удалить класс selected
	mainList.addEventListener(`dragend`, (event) => {
		event.target.classList.remove(`selected`);
	});

	const getNextElement = (cursorPosition, currentElement) => {
		// получение объекта координат и размера элемента
		const currentElementCoord = currentElement.getBoundingClientRect();

		// координата центра элемента по оси Y
		const currentElementCenter = currentElementCoord.y + currentElementCoord.height / 2;

		// Если координата позиции курсора пересекла координату центра элемента, то возвращаем следующий элемент из списка
		const nextElement = cursorPosition < currentElementCenter ? currentElement : currentElement.nextElementSibling;
		return nextElement;
	};

	mainList.addEventListener(`dragover`, (event) => {
		event.preventDefault(); // Отмена действия по умолчанию, чтобы элементы могли сбрасываться в области списка

		/*
		 * Если элемент на котором сработало событие = элементу который выбрали для переноса, то нет смысла далее
		 * выполнять функцию, кроме того элемент у которого сработало событие должен относиться к списку ul, иначе выходим
		 * из функции
		 */
		const activeElement = mainList.querySelector(".selected"); // выбранный элемент для переноса
		const currentElement = event.target; // элемент у которого сработало событие
		const isMoveable = activeElement !== currentElement && currentElement.classList.contains("main__item");
		if (!isMoveable) {
			return;
		}

		// находим элемент перед которым нужно сделать вставку, если он равен выбранному, то выходим из функции
		const nextElement = getNextElement(event.clientY, currentElement);
		if (activeElement === nextElement) {
			return;
		}
		// вставка элемента перед следующим
		mainList.insertBefore(activeElement, nextElement);
	});
}

