import { Square } from 'src/components/Square'
import { TURNS } from 'src/constants'

export function Turns(turn) {
  return (
    <section className='turn'>
      <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
      <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
    </section>
  )
}
