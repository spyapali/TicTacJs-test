/* Tic-Tac Javascript */


// The board is a simple 9-element array of null-for-empty, "X", or "O"
var board;


function initializeBoard() {
    // Initialize board to empty

    board = [null, null, null, null, null, null, null, null, null];
}


function updateBoard() {
    // Update visual game board from board data structure

    for (var i = 0; i < 9; i++) {
        var cell = board[i] || "";
        $("#cell-" + i).text(cell);
    }
}


function isBoardFull() {
    // Return true if board is full

    for (var i = 0; i < 9; i++) {
        if (!board[i]) {
            return false;
        }
    }
    return true;
}


function xyToCell(x, y) {
    // Convert 0-based x and y coordinates to cell # 0-8

    return y * 3 + x;
}


function findWinner() {
    // Return 'X' or 'O' for winner (or null if no winner yet)

    var cell;

    // horizontal
    for (var rowi = 0; rowi < 3; rowi++) {
        cell = board[xyToCell(0, rowi)];
        if (cell !== null) {
            if ((board[xyToCell(1, rowi)] === cell) && (board[xyToCell(2, rowi)] === cell)) {
                return cell;
            }
        }
    }

    // vertical
    for (var coli = 0; coli < 3; coli++) {
        cell = board[xyToCell(coli, 0)];
        if (cell !== null) {
            if ((board[xyToCell(coli, 1)] === cell) && (board[xyToCell(coli, 2)] === cell)) {
                return cell;
            }
        }
    }

    // diagonal /
    cell = board[4];

    if (cell !== null) {

        if ((board[2] === cell) && (board[6] === cell)) {
            return cell;
        }

        // diagonal \
        if ((board[0] === cell) && (board[8] === cell)) {
            return cell;
        }
    }

    return;
}


function placePiece(cellNumber, pieceType) {
    // Place this piece on board
    //
    // Return true if placed (spot was empty); false if not placed (spot already full)

    if (board[cellNumber] === null) {
        board[cellNumber] = pieceType;
        return true;
    }

    return false;
}


function computerMove() {
    // Make next possible move for the computer

    for (var i = 0; i < 9; i++) {
        if (board[i] === null) {
            board[i] = "O";
            return;
        }
    }
}


function checkGameOver() {
    // Check if game over, notifying if so. Return true for game over, else false

    var winner = findWinner();
    var gameOver = false;

    if (winner) {
        $("h1").text(winner + " won");
        gameOver = true;
    }

    else if (isBoardFull()) {
        $("h1").text("Tie!");
        gameOver = true;
    }

    if (gameOver) {
        // If game is over, no longer respond to board clicks
        $("#game-board td").off("click");
    }

    return gameOver;
}


function makeHumanMove(cellNumber) {
    // Make human move -- place X in the given 0-8 cell number
    // if piece wasn't place, ignore this move
    //   - update the board
    //   - if the game isn't over
    //     - make computer move
    //     - update board
    //     - check if game is over

    if (placePiece(cellNumber, "X")) {
        updateBoard();

        if (! checkGameOver()) {
            computerMove();
            updateBoard();
            checkGameOver();
        }
    }
}


function handleClick(evt) {
    // Handle a click from the user -- play a round of the game

    var cell = evt.currentTarget;
    makeHumanMove(parseInt(cell.id[5]));
}


function startGame(evt) {
    // Handle start-game button

    initializeBoard();

    // Allow clicks on game board
    $('#game-board td').on('click', handleClick);

    // Remove start-game button
    $(this).remove();
}


$("#start-game").on("click", startGame);