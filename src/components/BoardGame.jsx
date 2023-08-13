import { Square } from './Square'

export const BoardGame = ({ board, updateBoard }) => {
  return (
    <section className='game'>
      {board.map((_, index) => {
        console.log('hello')
        return (
          <Square key={index} index={index} updateBoard={updateBoard}>
            {board[index]}
          </Square>
        )
      })}
    </section>
  )
}
