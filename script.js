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

const createPlayer = (name, pokemon, symbol) => {
    return { name, pokemon, symbol }
}
    
const ticTacToe = (() => {

    let players = []
    let currentPlayer
    let gameOver
    let winner

    const initializeGame = () => {

        let form = document.getElementById('create-players-form')
        let player1Name = document.getElementById('player1-name')
        let pokeSel1 = document.getElementsByClassName('poke1')
        let player1Poke

        let form2 = document.getElementById('create-player2')
        let player2Name = document.getElementById('player2-name')
        let pokeSel2 = document.getElementsByClassName('poke2')
        let player2Poke

       form.addEventListener('submit', (e) => {
            e.preventDefault()

            for (poke of pokeSel1) {
                if (poke.checked) {
                    player1Poke = poke.id
                }
            }

            for (poke of pokeSel2) {
                if (poke.checked) {
                    player2Poke = poke.id
                }
            }

            players = [createPlayer(player1Name.value, player1Poke, 'x'), 
            createPlayer(player2Name.value, player2Poke, 'o')]
            
            currentPlayer = players[0]
            board = gameBoard.getBoard()
            gameOver = false 
            winner = ""
            form.reset()
            startGame()
        })
    }

    const startGame = () => {
        console.log(players)
        let cells = document.querySelectorAll(".cell")
        
        for (let cell of cells) {
            cell.addEventListener('click', handleClick)
        }
    }

    const handleClick = (event) => {
        
        let cell = event.target
        let index = cell.id
        let board = gameBoard.getBoard()

        if (board[index] == "") {
            gameBoard.updateBoard(index, currentPlayer.symbol)
            cell.innerHTML = `<img src="img/${currentPlayer.pokemon}-s.png">`
            checkWin() 
            
            if (currentPlayer == players[0]) {
                currentPlayer = players[1] 
            } else {
                currentPlayer = players[0]
            }
            
        }      
    }

    const resetBoard = () => { 

        for (i = 0; i < 9; i++) {
            gameBoard.updateBoard(i, "")
        }

        let cells = document.querySelectorAll(".cell")
        for (let cell of cells) {
            cell.innerHTML = ""
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
                announceWinner()
            } else if (!board.includes("") && winner == "") {
                gameOver = true
                announceTie()
            }      
        })
    }

    const announceWinner = () => {
        console.log(`${currentPlayer.name} won!`)
    } 

    const announceTie = () => {
        console.log("It's a tie!")
    }
 
    return {initializeGame, startGame, handleClick, checkWin, announceWinner, announceTie, resetBoard}

})()


ticTacToe.initializeGame()