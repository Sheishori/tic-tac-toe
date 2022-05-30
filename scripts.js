const ticTacToe = (() => {
	const gameBoard = (() => {
		let board = ["X", "O", 2, 3, "X", 5, "O", "X", "O"];
		
		function getBoard() {
			return board;
		};

		function clearBoard(){
			board = [0, 1, 2, 3, 4, 5, 6, 7, 8];
		};

		return {getBoard, clearBoard};
	})();


	const player = (name, marker) => {
		function playerMove() {
			let board = gameBoard.getBoard();
			if (board[this.classList[1]] !== "X" && board[this.classList[1]] !== "O") {
				board[this.classList[1]] = game.getCurrentPlayer().marker;
				displayController.render();
				game.endTurn();
			};
		};

		return {name, marker, playerMove};
	};
	

	const game = (() => {
		let playerTurn = 1;
		let player1;
		let player2;
		let bot = false;

		function enableBot() {
			bot = true;
		};

		function disableBot() {
			bot = false;
		};

		function _setPlayers(){
			player1 = player(document.querySelector('#player1').value, "X");
			player2 = (bot === true) ? player("Computer", "O") : player(document.querySelector('#player2').value, "O");
		}

		function startGame() {
			_setPlayers();
			gameBoard.clearBoard();
			displayController.render();
		};

		function getCurrentPlayer() {
			return (playerTurn === 1) ? player1 : player2;
		};

		function checkResult(board, player) {
			if ((board[0] === player && board[1] === player && board[2] === player) ||
					(board[3] === player && board[4] === player && board[5] === player) ||
					(board[6] === player && board[7] === player && board[8] === player) ||
					(board[0] === player && board[3] === player && board[6] === player) ||
					(board[1] === player && board[4] === player && board[7] === player) ||
					(board[2] === player && board[5] === player && board[8] === player) ||
					(board[0] === player && board[4] === player && board[8] === player) ||
					(board[2] === player && board[4] === player && board[6] === player))
					return true;
			else return false;
		};

		function getAvailableMoves(board) {
			let avaliableMoves = [];
			board.filter((square, i) => {
				if (square !== "X" && square !== "O") avaliableMoves.push(i);
			});
			return avaliableMoves;
		};

		function endTurn() {
			let board = gameBoard.getBoard();
			let player = getCurrentPlayer().marker;
			if (checkResult(board, player)) _endGame(getCurrentPlayer().name);
			else if (getAvailableMoves(board).length === 0) _endGame();
			else _changeTurn();
		};

		function _changeTurn() {
			if (playerTurn === 1) {
				playerTurn = 2;
				if (bot === true) computerPlayer.easyBot();
			}
			else playerTurn = 1;
		}

		function _endGame(result) {
			displayController.announceResult(result);
		};

		function restartGame() {
			gameBoard.clearBoard();
			player1 = "";
			player2 = "";
			playerTurn = 1;
			displayController.clearResult();
			displayController.render();
			displayController.start();
			startGame();
		};

		return {enableBot, disableBot, startGame, getCurrentPlayer, checkResult, getAvailableMoves, endTurn, restartGame};
	})();


	const displayController = (() => {
		const boardDisplay = document.querySelector("#game");
		const onePlayerButton = document.querySelector('#onep');
		const twoPlayersButton = document.querySelector('#twop');
		const playerTwoInput = document.querySelector('.player2');
		const startButton = document.querySelector('#start');
		const resultDiv = document.querySelector('#result');
		const restartButton = document.querySelector('#restart');
		onePlayerButton.addEventListener("click", onePlayer);
		twoPlayersButton.addEventListener("click", twoPlayers);
		restartButton.addEventListener("click", game.restartGame);

		function onePlayer() {
			playerTwoInput.style.display = "none";
			game.enableBot();
		}

		function twoPlayers() {
			playerTwoInput.style.display = "inherit";
			game.disableBot();
		}

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
				if (gameBoard.getBoard()[i] === "X" || gameBoard.getBoard()[i] === "O") {
				square.textContent = gameBoard.getBoard()[i];
				}
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

		function _lock() {
			let fields = boardDisplay.querySelectorAll(".square");
			fields.forEach(element => {
				element.removeEventListener("click", game.getCurrentPlayer().playerMove, false);
			});
			startButton.removeEventListener("click", game.startGame);
		};

		function announceResult(result) {
			if (result !== undefined) {
				resultDiv.textContent = `${result} won!`;
			} else resultDiv.textContent = "It's a draw!";
			_lock();
		};

		function clearResult() {
			resultDiv.textContent = "";
		};

		return {start, render, announceResult, clearResult};
	})();

	const computerPlayer = (() => {

		// easy bot
		function easyBot() {
			let board = gameBoard.getBoard();
			let avaliableMoves = game.getAvailableMoves(board);
			let move = Math.floor(Math.random()*avaliableMoves.length);
			board[avaliableMoves[move]] = "O";
			displayController.render();
			game.endTurn();
		};

		return {easyBot};
	})();
})();

