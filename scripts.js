const ticTacToe = (() => {
	const gameBoard = (() => {
		let	board = [];
		
		function getBoard() {
			return board;
		}

		function updateBoard(newBoard) {
			board = newBoard;
		}

		function clearBoard(){
			board = [];
		}

		return {getBoard, updateBoard, clearBoard};
	})();


	const player = (name, marker) => {
		function playerMove() {
			let board = gameBoard.getBoard();
			if (board[this.classList[1]] === undefined) {
				board[this.classList[1]] = game.getCurrentPlayer().marker;
				gameBoard.updateBoard(board);
				displayController.render();
				game.checkResult();
			}
		};

		return {name, marker, playerMove};
	};
	

	const game = (() => {
		let playerTurn = 1;
		let player1;
		let player2;

		function startGame() {
			player1 = player(document.querySelector('#player1').value, "X");
			player2 = player(document.querySelector('#player2').value, "O");
			displayController.render();
		};

		function getCurrentPlayer() {
			return (playerTurn === 1) ? player1 : player2;
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
			if (winConditions.includes("X")) _endGame(player1.name);
			else if (winConditions.includes("O")) _endGame(player2.name);
			else if (!board.includes(undefined)) _endGame();
			else _endTurn();
		};

		function _endTurn() {
			playerTurn = (playerTurn === 1) ? 2 : 1;
		};

		function _endGame(result) {
			if (result !== undefined) {
				alert(result + " won!");
			} else alert("It's a draw!");
			displayController.lock();
		};

		function restartGame() {
			gameBoard.clearBoard();
			player1 = "";
			player2 = "";
			playerTurn = 1;
			displayController.render();
			displayController.start();
		}

		return {startGame, getCurrentPlayer, checkResult, restartGame};
	})();


	const displayController = (() => {
		const boardDisplay = document.querySelector("#game");
		const startButton = document.querySelector('#start');
		const restartButton = document.querySelector('#restart');
		restartButton.addEventListener("click", game.restartGame);

		function start() {
			startButton.addEventListener("click", game.startGame);
		};

		(function _init() {
			_createBoard();
			start();
		})();

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

		function lock() {
			let fields = boardDisplay.querySelectorAll(".square");
			fields.forEach(element => {
				element.removeEventListener("click", game.getCurrentPlayer().playerMove, false);
			});
			startButton.removeEventListener("click", game.startGame);
		}

		return {start, render, lock};
	})();
})();

