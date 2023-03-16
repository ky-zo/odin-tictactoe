const createGame = (() => {
    const gameHTML = document.querySelector('.game')
    for (let i = 0; i < 9; i++) {
        const boardPiece = document.createElement('div')
        boardPiece.setAttribute('game-board', i)
        boardPiece.classList.add('game-field')
        boardPiece.addEventListener('click', () => {
            newMove(i)
        })
        gameHTML.appendChild(boardPiece)
    }
})()

const newMove = (position) => {
    const boardPiece = document.querySelector(`[game-board="${position}"]`)
    // Stop operation if cell is not empty
    if (boardPiece.textContent !== '') return
    const currentClick = document.querySelector('.curr')
    boardPiece.textContent = currentClick.textContent
    const symbol = boardPiece.textContent
    mygameController.updateGameBoard(position, symbol)
    currentClick.textContent === 'X' ? (currentClick.textContent = 'O') : (currentClick.textContent = 'X')
    return symbol
}

const gameController = () => {
    let playerX = []
    let playerO = []

    const modal = document.querySelector('.modal')
    const overlay = document.querySelector('.overlay')

    const updateGameBoard = (position, symbol) => {
        if (symbol === 'X') {
            playerX.push(position)
            mygameController.endGame('X', isWinner(playerX))
        } else {
            playerO.push(position)
            mygameController.endGame('O', isWinner(playerO))
        }
        if (playerO.length + playerX.length === 9) {
            mygameController.endGame('', 'draw')
        }
    }
    const isWinner = (playerArr) => {
        const winningCombinations = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ]
        function isSubset(subset, set) {
            return subset.every((val) => set.includes(val))
        }
        for (const combination of winningCombinations) {
            if (isSubset(combination, playerArr)) {
                return true
            }
        }
        return false
    }
    const endGame = (player, result) => {
        if (result === false) return
        modal.classList.add('active')
        overlay.classList.add('active')

        if (result === 'draw') {
            modal.innerHTML = "<p>It's a draw!</p>"
        } else {
            modal.innerHTML = `<p>Player ${player} won the game!</p>`
        }

        const button = document.createElement('button')
        button.classList.add('reset-button')
        button.textContent = 'Play Again'
        button.addEventListener('click', () => {
            mygameController.reset()
        })

        modal.appendChild(button)
    }

    const reset = () => {
        playerX = []
        playerO = []
        modal.classList.remove('active')
        overlay.classList.remove('active')

        const boardPiece = document.querySelectorAll(`[game-board]`)
        boardPiece.forEach((element) => {
            element.textContent = ''
        })
    }

    return { updateGameBoard, isWinner, endGame, reset }
}

const mygameController = gameController()
