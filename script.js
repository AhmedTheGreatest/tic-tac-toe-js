const Board = (function() {
    const board = new Array(9).fill(null);
    
    const getBoard = () => board;
    const getCell = (index) => board[index];
    const setCell = (index, value) => {
        board[index] = value;
    };

    const isMoveValid = (index) => {
        return index >= 0 && index < board.length && board[index] === null
    }

    const isBoardFull = () => {
        return board.every(cell => cell !== null);
    }

    const resetBoard = () => {
        for (let i = 0; i < board.length; i++) {
            board[i] = null;
        }
    }

    return {
        getBoard,
        getCell,
        setCell,
        isMoveValid,
        isBoardFull,
        resetBoard
    };
})();

const createPlayer = (name, marker) => {
    const getName = () => name;
    const getMarker = () => marker;

    return {
        getName,
        getMarker
    };
}

const Game = (function() {
    const WINNING_COMBINATIONS = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    const player1 = createPlayer('Player 1', 'X');
    const player2 = createPlayer('Player 2', 'O');
    let currentPlayer = player1;
    let winner = null;

    const getCurrentPlayer = () => currentPlayer;
    const getWinner = () => winner;

    const switchPlayer = () => {
        currentPlayer = currentPlayer === player1 ? player2 : player1;
    }

    const checkWinner = () => {
        for (const [a, b, c] of WINNING_COMBINATIONS) {
            const cellA = Board.getCell(a);
            const cellB = Board.getCell(b);
            const cellC = Board.getCell(c);

            if (cellA && cellA === cellB && cellA === cellC) {
                winner = currentPlayer;
                return true;
            }
        }
        return false;
    }

    const checkTie = () => {
        return Board.isBoardFull() && !winner;
    }

    const playRound = (index) => {
        if (winner || !Board.isMoveValid(index)) return;

        Board.setCell(index, currentPlayer.getMarker());

        if (checkWinner()) {
            return { status: 'win', winner: currentPlayer };
        }

        if (checkTie()) {
            return { status: 'tie' };
        }

        switchPlayer();
        return { status: 'continue', currentPlayer: currentPlayer };
    };

    const resetGame = () => {
        Board.resetBoard();
        currentPlayer = player1;
        winner = null;
    }

    const isGameOver = () => !!winner || checkTie();

    return {
        getCurrentPlayer,
        getWinner,
        resetGame,
        playRound,
        isGameOver
    };
})();