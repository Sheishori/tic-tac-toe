const game = (() => {
	let	gameBoard = [];
	let counter = 0;

	displayController();

	const player = (name) => {
		 return {name};
	};
	
	function displayController() {
		let display = document.querySelector("#game");
		display.textContent = "";
		for (i = 0; i < 9; i++) {
			let square = document.createElement("div");
			square.classList.add("square");
			square.classList.add(i);
			square.textContent = gameBoard[i];
			display.append(square);
		}
		playerMove();
	};

	function playerMove() {
		let fields = document.querySelectorAll(".square");
		fields.forEach(element => {
			element.addEventListener("click", () => {
				if (gameBoard[element.classList[1]] === undefined) {
					if (counter === 0) {
						gameBoard[element.classList[1]] = "X";
						counter = 1;
					} else {
						gameBoard[element.classList[1]] = "O";
						counter = 0;
					}
					displayController();
				}
			})
		});
	}
})();

