// const newPlayer = (playerName, symbol) => ({ playerName, symbol })

const newMove = (position) => {
    const boardPiece = document.querySelector(`[game-board="${position}"]`)
    if (boardPiece.textContent !== '') return
    const currentClick = document.querySelector('.curr')
    boardPiece.textContent = currentClick.textContent
    const symbol = boardPiece.textContent
    currentClick.textContent === 'X' ? (currentClick.textContent = 'O') : (currentClick.textContent = 'X')
    return symbol
}

// const game = () => {
//     const gameBoard = []
//     console.log(gameBoard)
//     const updateGameBoard = (position, symbol) => {
//         gameBoard.push({ position: symbol })
//         console.log(gameBoard)
//     }
//     createGame()
//     return { updateGameBoard }
// }

// const createGame = () => {
//     const gameHTML = document.querySelector('.game')
//     for (let i = 0; i < 9; i++) {
//         const boardPiece = document.createElement('div')
//         boardPiece.setAttribute('game-board', i)
//         boardPiece.classList.add('game-field')
//         boardPiece.addEventListener('click', (e) => {
//             console.log(i)
//             console.log(newMove(i))
//             game.updateGameBoard(i, newMove(i))
//         })
//         gameHTML.appendChild(boardPiece)
//     }
// }

game.updateGameBoard(1, 'X')
game()
