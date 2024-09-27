const gameBoard = (() => {
    let board = ["", "", "", "", "", "", "", "", ""]
    
    const getBoard = () => {
        return board
    }

    const updateBoard = (index, symbol) => {
        board[index] = symbol
    }

    return {getBoard, updateBoard}

})()

const createPlayer = (name, score = 0, symbol) => {
    return { name, score, symbol }
}
    
const ticTacToe = (() => {

    let gameOver
    let players = []
    let currentPlayer
    let winner
    
    const startGame = () => {
        board = gameBoard.getBoard()
        players = [createPlayer("player1", 0, "x"), createPlayer("player2", 0, "o")]
        currentPlayer = players[0]
        gameOver = false 
        winner = ""
        
        let cells = document.querySelectorAll(".cell")
        
        for (let cell of cells) {
            cell.addEventListener('click', handleClick)
        }
    }

    const resetBoard = () => { 

        for (i = 0; i < 9; i++) {
            gameBoard.updateBoard(i, "")
        }

        let cells = document.querySelectorAll(".cell")
        
        for (let cell of cells) {
            cell.classList = "cell"
        }
    }

    const handleClick = (event) => {
        
        let cell = event.target
        let index = cell.id
        let board = gameBoard.getBoard()

        if (board[index] == "") {
            gameBoard.updateBoard(index, currentPlayer.symbol)
            cell.classList.add(currentPlayer.name)
            if (currentPlayer == players[0]) {
                currentPlayer = players[1] 
            } else {
                currentPlayer = players[0]
            }
            ticTacToe.checkWin() 
        }      
    }

    const checkWin = () => {

        let board = gameBoard.getBoard()

        const WIN_COMBOS = [[0,1,2], [3,4,5], [6,7,8], 
        [0, 3, 6], [1, 4, 7], [2, 5, 8], 
        [0, 4, 8], [2, 4, 6]]
    
        WIN_COMBOS.forEach((combo) => {
            let subString = [board[combo[0]],board[combo[1]], board[combo[2]]]
            if (subString.every((el) => el == "o") || subString.every((el) => el == "x")) {
                gameOver = true
                winner = currentPlayer
                ticTacToe.announceWinner()
            } else if (!board.includes("") && winner == "") {
                gameOver = true
                ticTacToe.announceTie()
            }      
        })
    }

    const announceWinner = () => {
        console.log(`${currentPlayer.name} won!`)

        ticTacToe.resetBoard()
    } 

    const announceTie = () => {
        console.log("It's a tie!")

        ticTacToe.resetBoard()
    }
 
    return {startGame, handleClick, checkWin, announceWinner, announceTie, resetBoard}

})()

ticTacToe.startGame()   
