const ticTacToe = (() => {
	const gameBoard = (() => {
		let	board = [];
		
		function getBoard() {
			return board;
		}

		function updateBoard(newBoard) {
			board = newBoard;
		}

		return {getBoard, updateBoard}
	})();


	const player = (name, marker) => {
		function playerMove() {
			let board = gameBoard.getBoard();
			if (board[this.classList[1]] === undefined) {
				board[this.classList[1]] = game.getCurrentPlayer().marker;
				gameBoard.updateBoard(board);
				displayController.render();
				game.checkResult();
				game.endTurn();
			}
		};

		return {name, marker, playerMove};
	};
	

	const game = (() => {
		let playerTurn = 1;
		
		function getCurrentPlayer() {
			return (playerTurn === 1) ? player1 : player2;
		};

		function endTurn() {
			playerTurn = (playerTurn === 1) ? 2 : 1;
		};

		function checkResult() {
			let winConditions = [];
			let board = gameBoard.getBoard();
			winConditions[0] = (board[0] !== undefined && board[0] === board[1] && board[0] === board[2]) ? board[0] : undefined;
			winConditions[1] = (board[3] !== undefined && board[3] === board[4] && board[3] === board[5]) ? board[3] : undefined;
			winConditions[2] = (board[6] !== undefined && board[6] === board[7] && board[6] === board[8]) ? board[6] : undefined;
			winConditions[3] = (board[0] !== undefined && board[0] === board[3] && board[0] === board[6]) ? board[0] : undefined;
			winConditions[4] = (board[1] !== undefined && board[1] === board[4] && board[1] === board[7]) ? board[1] : undefined;
			winConditions[5] = (board[2] !== undefined && board[2] === board[5] && board[2] === board[8]) ? board[2] : undefined;
			winConditions[6] = (board[0] !== undefined && board[0] === board[4] && board[0] === board[8]) ? board[0] : undefined;
			winConditions[7] = (board[2] !== undefined && board[2] === board[4] && board[2] === board[6]) ? board[2] : undefined;
			if (winConditions.find(condition => {
				if (condition == "X" || condition == "O") alert(condition + " won!");
			}));
		};
		return {getCurrentPlayer, endTurn, checkResult};
	})();


	const displayController = (() => {
		const boardDisplay = document.querySelector("#game");

		function render() {
			_clearBoard();
			_createBoard();
			_bindEvents();
		};

		function _createBoard() {
			for (i = 0; i < 9; i++) {
				let square = document.createElement("div");
				square.classList.add("square");
				square.classList.add(i);
				square.textContent = gameBoard.getBoard()[i];
				boardDisplay.append(square);
			};
		};

		function _bindEvents() {
			let fields = boardDisplay.querySelectorAll(".square");
			fields.forEach(element => {
				element.addEventListener("click", game.getCurrentPlayer().playerMove);
			});
		};

		function _clearBoard() {
			boardDisplay.textContent = "";
		};

		return {render};
	})();


	const player1 = player("first", "X");
	const player2 = player("second", "O");
	displayController.render();
})();

