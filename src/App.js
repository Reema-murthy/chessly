import logo from './logo.svg';
import './App.css';
import { Chess } from 'chess.js';
import Board from './board.js'


function App() {
  const chess = new Chess();
  console.log(chess.ascii());
  return (
    <div>
      <br/>
      <Board />
    </div>
  );
}

export default App;
