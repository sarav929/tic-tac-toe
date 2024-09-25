// store the gameboard as an array inside of a Gameboard object, 
// Your players are also going to be stored in objects
// an object to control the flow of the game itself

function Game() {
    this.board = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
    ]
    this.turn = 1
    this.winner = ""
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
    
    let move = window.prompt(`${currentPlayer.name}: what's your next move?`).split(" ")

    let row = parseInt(move[0]) - 1
    let col = parseInt(move[1]) - 1

    game.board[row][col] = currentPlayer.symbol
    game.turn++

}


player1 = new Player("me", "o")
player2 = new Player("you", "x")

game = new Game

console.log(game)

makeMove(game, player1, player2)
makeMove(game, player1, player2)
makeMove(game, player1, player2)
makeMove(game, player1, player2)
makeMove(game, player1, player2)








