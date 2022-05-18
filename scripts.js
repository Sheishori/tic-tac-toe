const game = (() => {
	let	gameBoard = [];
	
	displayController();

	const player = (name) => {
		 return {name};
	};
	
	function displayController() {
		let display = document.querySelector("#game");
		for (i = 0; i < 9; i++) {
			let square = document.createElement("div");
			square.classList.add("square");
			display.append(square);
		}
	};

	return {gameBoard};
})();

