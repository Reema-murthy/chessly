import logo from './logo.svg';
import './App.css';
import { Chess } from 'chess.js';
import Board from './board.js'


function App() {
  const chess = new Chess();
  console.log(chess.ascii());
  return (
    <div className='main-container'>
      <Board />
    </div>
  );
}

export default App;
