import { useState } from 'react'
import './App.css'
import confetti from 'canvas-confetti'
import { TURNS } from './constants'
import { checkWinnerFrom, checkEndGame } from './logic/board'
import { WinnerModal } from './components/winnerModal'
import { BoardGame } from './components/BoardGame'
import { Turns } from './components/Turns'
import { SaveGameToStorage, resetGameStorage } from './logic/storage'
function App() {
  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem('board')
    if (boardFromStorage) return JSON.parse(boardFromStorage)
    return Array(9).fill(null)
  })

  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem('turn')
    return turnFromStorage ?? TURNS.X
  })
  // null means there's no winner, false means draw
  const [winner, setWinner] = useState(null)

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)

    resetGameStorage()
  }

  const updateBoard = (index) => {
    // don't update if already filled
    if (board[index] || winner) return

    // update the board
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)

    // change turn
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)

    // save game
    console.log('saving game')
    SaveGameToStorage({ board: newBoard, turn: newTurn })
    // check if there's a winner
    const newWinner = checkWinnerFrom(newBoard)
    if (newWinner) {
      confetti()
      setWinner(newWinner)
    } else if (checkEndGame(newBoard)) {
      setWinner(false) // draw
    }
  }
  return (
    <main className='board'>
      <h1>Tic tac toe</h1>
      <button onClick={resetGame}>Reset game</button>
      <BoardGame board={board} updateBoard={updateBoard} />
      <Turns turn={turn} />
      <WinnerModal resetGame={resetGame} winner={winner} />
    </main>
  )
}

export default App
