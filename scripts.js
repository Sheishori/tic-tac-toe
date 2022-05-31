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

		function enableEasyBot() {
			bot = "easy";
		};

		function enableImpBot() {
			bot = "impossible";
		};
		
		function disableBot() {
			bot = false;
		};

		function _setPlayers(){
			player1 = player(document.querySelector('#player1').value, "X");
			player2 = (bot === false) ? player(document.querySelector('#player2').value, "O") : player("Computer", "O");
		}

		function startGame() {
			_setPlayers();
			gameBoard.clearBoard();
			displayController.render();
			displayController.displayRestart();
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
				if (bot !== false) computerPlayer.makeMove(bot);
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
			startGame();
		};

		return {enableEasyBot, enableImpBot, disableBot, startGame, getCurrentPlayer, checkResult, getAvailableMoves, endTurn, restartGame};
	})();


	const displayController = (() => {
		const boardDisplay = document.querySelector("#game");
		const twoPlayersButton = document.querySelector('#twop');
		const easyBotButton = document.querySelector('#easy');
		const impBotButton = document.querySelector('#imp');
		const playerTwoInput = document.querySelector('.player2');
		const startButton = document.querySelector('#start');
		const resultDiv = document.querySelector('#result');
		const restartButton = document.querySelector('#restart');
		easyBotButton.addEventListener("click", _easy);
		impBotButton.addEventListener("click", _impossible);
		twoPlayersButton.addEventListener("click", _twoPlayers);
		startButton.addEventListener("click", game.startGame);
		restartButton.addEventListener("click", game.restartGame);

		function _onePlayer() {
			playerTwoInput.style.display = "none";
			_displayStart();
		}

		function _easy() {
			_onePlayer();
			game.enableEasyBot();
		}

		function _impossible() {
			_onePlayer();
			game.enableImpBot();
		}

		function _twoPlayers() {
			playerTwoInput.style.display = "block";
			game.disableBot();
			_displayStart();
		}

		function _displayStart() {
			startButton.style.display = "block";
			restartButton.style.display = "none";
		};

		function displayRestart() {
			startButton.style.display = "none";
			restartButton.style.display = "block";
		};

		(function _init() {
			_createBoard();
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

		return {displayRestart, render, announceResult, clearResult};
	})();

	const computerPlayer = (() => {

		// easy bot
		function _easyBot(board) {
			let avaliableMoves = game.getAvailableMoves(board);
			let move = Math.floor(Math.random()*avaliableMoves.length);
			return avaliableMoves[move];
		};

		//impossible bot
		function _impossibleBot(board) {
			//create a temporary board for simulation purposes
			let simBoard = board.slice();
			let humanPlayer = "X";
			let AI = "O";
			let nextMove = minimax(simBoard, AI);

			function minimax(board, player) {
				let avaliableMoves = game.getAvailableMoves(board);
				let possibleMoves = [];
				
				if (game.checkResult(board, AI)) return {score: 10};
				else if (game.checkResult(board, humanPlayer)) return {score: -10};
				else if (avaliableMoves.length === 0) return {score: 0};

				for (let i = 0; i < avaliableMoves.length; i++) {
					let move = {};
					move.index = board[avaliableMoves[i]];
					board[avaliableMoves[i]] = player;

					//return only score to not create nested objects
					if (player === AI) {
						move.score = minimax(board, humanPlayer).score;
					} else {
						move.score = minimax(board, AI).score;
					};

					//undo marker placement for the next loop iteration
					board[avaliableMoves[i]] = move.index;
					possibleMoves.push(move);
				};
				return bestMove(possibleMoves, player);
			};

			//choose the best move according to the score
			function bestMove(possibleMoves, player) {
				let bestMove;
				if (player === AI) {
					let bestScore = -100;
					possibleMoves.forEach(function(move, index) {
						if (move.score > bestScore) {
							bestScore = move.score;
							bestMove = index;
						}
					});
				} else {
					let bestScore = 100;
					possibleMoves.forEach(function(move, index) {
						if (move.score < bestScore) {
							bestScore = move.score;
							bestMove = index;
						}
					});
				};
				return possibleMoves[bestMove];
			}
			
			return nextMove.index;
		};

		function makeMove(difficulty) {
			let currentBoard = gameBoard.getBoard();
			let move;
			if (difficulty === "easy") move = _easyBot(currentBoard);
			if (difficulty === "impossible") move = _impossibleBot(currentBoard);
			currentBoard[move] = "O";
			displayController.render();
			game.endTurn();
		};

		return {makeMove};
	})();
})();