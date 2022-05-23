const game = (() => {
	let	gameBoard = [];
	let counter = 0;
	const boardDisplay = document.querySelector("#game");

	displayController();

	const player = (name) => {
		 return {name};
	};
	
	function displayController() {
		createBoard();
		bindEvents();
	};

	function createBoard() {
		boardDisplay.textContent = "";
		for (i = 0; i < 9; i++) {
			let square = document.createElement("div");
			square.classList.add("square");
			square.classList.add(i);
			square.textContent = gameBoard[i];
			boardDisplay.append(square);
		}
	}

	function bindEvents() {
		let fields = document.querySelectorAll(".square");
		fields.forEach(element => {
			element.addEventListener("click", playerMove);
		});
	};

	function playerMove() {
		if (gameBoard[this.classList[1]] === undefined) {
			if (counter === 0) {
				gameBoard[this.classList[1]] = "X";
				counter = 1;
			} else {
				gameBoard[this.classList[1]] = "O";
				counter = 0;
			}
			displayController();
			checkResult();
		}
	};

	function checkResult() {
		let winningConditions = [];
		winningConditions[0] = (gameBoard[0] !== undefined && gameBoard[0] === gameBoard[1] && gameBoard[0] === gameBoard[2]) ? gameBoard[0] : undefined;
		winningConditions[1] = (gameBoard[3] !== undefined && gameBoard[3] === gameBoard[4] && gameBoard[3] === gameBoard[5]) ? gameBoard[3] : undefined;
		winningConditions[2] = (gameBoard[6] !== undefined && gameBoard[6] === gameBoard[7] && gameBoard[6] === gameBoard[8]) ? gameBoard[6] : undefined;
		winningConditions[3] = (gameBoard[0] !== undefined && gameBoard[0] === gameBoard[3] && gameBoard[0] === gameBoard[6]) ? gameBoard[0] : undefined;
		winningConditions[4] = (gameBoard[1] !== undefined && gameBoard[1] === gameBoard[4] && gameBoard[1] === gameBoard[7]) ? gameBoard[1] : undefined;
		winningConditions[5] = (gameBoard[2] !== undefined && gameBoard[2] === gameBoard[5] && gameBoard[2] === gameBoard[8]) ? gameBoard[2] : undefined;
		winningConditions[6] = (gameBoard[0] !== undefined && gameBoard[0] === gameBoard[4] && gameBoard[0] === gameBoard[8]) ? gameBoard[0] : undefined;
		winningConditions[7] = (gameBoard[2] !== undefined && gameBoard[2] === gameBoard[4] && gameBoard[2] === gameBoard[6]) ? gameBoard[2] : undefined;
		if (winningConditions.find(condition => {
			if (condition == "X" || condition == "O") alert(condition + " won!");
		}));
	};
})();

