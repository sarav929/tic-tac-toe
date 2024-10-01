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
    let modal = document.getElementById('gameover')

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

            if (player1Poke == undefined || player2Poke == undefined) {
                alert("Both players have to select a Pokemon!")
            }

            players = [createPlayer(player1Name.value, player1Poke, 'x'), 
            createPlayer(player2Name.value, player2Poke, 'o')]
            
            currentPlayer = players[0]
            document.getElementById('pokemon1-img').classList.add('current-player')
                document.getElementById('pokemon2-img').classList = ''
            board = gameBoard.getBoard()
            gameOver = false 
            winner = ""
            form.reset()

            document.getElementById('name1').innerText = players[0].name.charAt(0).toUpperCase() + players[0].name.slice(1)
            document.getElementById('pokemon1-img').src = `img/${player1Poke}.png`
            document.getElementById('pokemon1-name').innerText = players[0].pokemon.charAt(0).toUpperCase() + players[0].pokemon.slice(1)

            document.getElementById('name2').innerText = players[1].name.charAt(0).toUpperCase() + players[1].name.slice(1)
            document.getElementById('pokemon2-img').src = `img/${player2Poke}.png`
            document.getElementById('pokemon2-name').innerText = players[1].pokemon.charAt(0).toUpperCase() + players[1].pokemon.slice(1)

            document.querySelector('div.form-container').style.display = 'none'
            document.querySelector('main').style.display = 'flex'
            
            startGame()
        })
    }

    const startGame = () => {
        
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
                document.getElementById('pokemon2-img').classList.add('current-player')
                document.getElementById('pokemon1-img').classList = ''  
            } else {
                currentPlayer = players[0]
                document.getElementById('pokemon1-img').classList.add('current-player')
                document.getElementById('pokemon2-img').classList = ''  
            }
            
        }      
    }

    const resetBoard = () => { 

        modal.close()
        currentPlayer = winner
        board = gameBoard.getBoard()
        gameOver = false 
        winner = ""

        for (i = 0; i < 9; i++) {
            gameBoard.updateBoard(i, "")
        }

        let cells = document.querySelectorAll(".cell")
        for (let cell of cells) {
            cell.innerHTML = ""
        }

        startGame()
    }

    const checkWin = () => {

        let board = gameBoard.getBoard()

        const WIN_COMBOS = [[0,1,2], [3,4,5], [6,7,8], 
        [0, 3, 6], [1, 4, 7], [2, 5, 8], 
        [0, 4, 8], [2, 4, 6]]
    
        WIN_COMBOS.forEach((combo) => {
            let subString = [board[combo[0]], board[combo[1]], board[combo[2]]]
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
        modal.showModal()
        document.getElementById('result').innerHTML = `<h1>${currentPlayer.name.charAt(0).toUpperCase() + currentPlayer.name.slice(1)} won!</h1>`
    } 

    const announceTie = () => {
        modal.showModal()
        document.getElementById('result').innerHTML = `<h1>It's a tie!</h1>`
    }
 
    return {initializeGame, startGame, handleClick, checkWin, announceWinner, announceTie, resetBoard}

})()


ticTacToe.initializeGame()