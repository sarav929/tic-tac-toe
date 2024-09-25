// store the gameboard as an array inside of a Gameboard object, 
// Your players are also going to be stored in objects
// an object to control the flow of the game itself

const WIN_COMBOS = [ [0,1,2], [3,4,5], [6,7,8], 
[0, 3, 6], [1, 4, 7], [2, 5, 8], 
[0, 4, 8], [2, 4, 6]]

function Game() {
    this.board = ["1", "2", "3", "4", "5", "6", "7", "8", "9"]
    this.turn = 1
    this.winner = ""
}

function displayBoard(board) {
    console.log(`${board[0]} | ${board[1]} | ${board[2]}`)
    console.log("----------")
    console.log(`${board[3]} | ${board[4]} | ${board[5]}`)
    console.log("----------")
    console.log(`${board[6]} | ${board[7]} | ${board[8]}`)
}

function Player(name, symbol, score = 0) {
    this.name = name
    this.score = score
    this.symbol = symbol
}

function makeMove(game, player1, player2) {

    if (game.turn % 2 != 0) {
        var currentPlayer = player1
    } else {
        currentPlayer = player2
    }
    
    let move = window.prompt(`${currentPlayer.name}: what's your next move?`)

    game.board[parseInt(move) - 1] = currentPlayer.symbol
    game.turn++

    checkWin(game)
    displayBoard(game.board)
}

function checkWin(game) {

    WIN_COMBOS.forEach((combo) => {
        let subString = [game.board[combo[0]], game.board[combo[1]], game.board[combo[2]]]
        if (subString.every((el) => el == "o")) {
            game.winner = player1.name
            console.log(`Winner is ${game.winner}`)
        } else if (subString.every((el) => el == "x")) {
            game.winner = player2.name
            console.log(`Winner is ${game.winner}`)
        }       
    })
}

player1 = new Player("ME", "o")
player2 = new Player("YOU", "x")

game = new Game

displayBoard(game.board)

while (game.winner == "") {
    makeMove(game, player1, player2)
}








