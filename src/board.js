import React from "react";
import './board.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Chess } from "chess.js";
import blackPawn from './pieces/bpawn.png';
import blackknight from './pieces/bknight.png';
import blackRook from './pieces/br.png';
import blackKing from './pieces/bking.png';
import blackQueen from './pieces/bq.png';
import blackBishop from './pieces/bb.png';
import whitePawn from './pieces/wpawn.png';
import whiteknight from './pieces/wknight.png';
import whiteRook from './pieces/wrook.png';
import whiteKing from './pieces/wking.png';
import whiteQueen from './pieces/wq.png';
import whiteBishop from './pieces/wbishop.png';

const pieces = {
    q: blackQueen,
    k: blackKing,
    r: blackRook,
    b: blackBishop,
    n: blackknight,
    p: blackPawn,
    Q: whiteQueen,
    K: whiteKing,
    R: whiteRook,
    B: whiteBishop,
    N: whiteknight,
    P: whitePawn
  };



class Board extends React.Component {
    chess = new Chess();

    prevMoveFrom = null;
    prevMoveTo = null;
    fromChar = null;
    toChar = null;
    currentPlayer = null;
    fenStarting = this.chess.fen();
    startingBoard = [
        ["r", "n", "b", "q", "k", "b", "n", "r"],
        ["p", "p", "p", "p", "p", "p", "p", "p"],
        [" ", " ", " ", " ", " ", " ", " ", " "],
        [" ", " ", " ", " ", " ", " ", " ", " "],
        [" ", " ", " ", " ", " ", " ", " ", " "],
        [" ", " ", " ", " ", " ", " ", " ", " "],
        ["P", "P", "P", "P", "P", "P", "P", "P"],
        ["R", "N", "B", "Q", "K", "B", "N", "R"],
    ]

    constructor() {
        super();
        this.state = {
            chessboard: this.startingBoard,

            from: null,

            to: null,

            flag: 0,

        };
        this.makeMove = this.makeMove.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleUpdation = this.handleUpdation.bind(this);
        this.promotion = this.promotion.bind(this);
        this.undoMove = this.undoMove.bind(this);
        this.updateMoveTable = this.updateMoveTable.bind(this);
        this.resetBoard = this.resetBoard.bind(this);
    }

    //updates the state of the chessboard
    handleUpdation() {
        let fromsquare = this.state.from;
        let tosquare = this.state.to;
        this.prevMoveFrom = fromsquare;
        this.prevMoveTo = tosquare;
        let x1 = 8 - fromsquare[1];
        let y1 = fromsquare.charCodeAt(0) - 97;
        let x2 = 8 - tosquare[1];
        let y2 = tosquare.charCodeAt(0) - 97;
        let newBoard = structuredClone(this.state.chessboard);
        newBoard[x1][y1] = " ";
        newBoard[x2][y2] = this.state.chessboard[x1][y1];
        this.toChar = this.state.chessboard[x1][y1];
        this.fromChar = this.state.chessboard[x2][y2];
        this.setState({ chessboard: newBoard });
        console.log(this.chess.ascii());
        this.setState({ from: null, to: null, flag: 0 });
    }


    promotion() {
        let promoteTo = "q";

        try {
            this.currentPlayer = this.chess.turn(); //update current player
            this.chess.move({ from: this.state.from, to: this.state.to, promotion: promoteTo }); //promotion pf piece
            let fromsquare = this.state.from;
            let tosquare = this.state.to;
            let x1 = 8 - fromsquare[1];
            let y1 = fromsquare.charCodeAt(0) - 97;
            let x2 = 8 - tosquare[1];
            let y2 = tosquare.charCodeAt(0) - 97;

            //newboard formation
            let newBoard = structuredClone(this.state.chessboard);
            newBoard[x1][y1] = " ";
            if (this.currentPlayer === 'w') {
                newBoard[x2][y2] = "Q";
            }
            else {
                newBoard[x2][y2] = "q";
            }
            this.toChar = this.state.chessboard[x1][y1];
            this.fromChar = this.state.chessboard[x2][y2];

            //state update to reflect game changes on ui
            this.setState({ chessboard: newBoard });
            console.log(this.chess.ascii());
            this.setState({ from: null, to: null, flag: 0 });
            this.prevMoveFrom = fromsquare;
            this.prevMoveTo = tosquare;


        } catch (error) {
            window.alert("invalid move");
        }

    }

    undoMove(event) {
        if (this.prevMoveFrom === null) {
            window.alert("No previous move to undo");
            return;
        }
        this.chess.undo();  //undo previous half move
        this.currentPlayer = this.chess.turn(); //update current player

        //update moves table
        var element = document.getElementById("blackMoves");
        if(this.currentPlayer === 'w')
            element = document.getElementById("whiteMoves");
        element.removeChild(element.lastChild);

        //newboard formation
        let x1 = 8 - this.prevMoveFrom[1];
        let y1 = this.prevMoveFrom.charCodeAt(0) - 97;
        let x2 = 8 - this.prevMoveTo[1];
        let y2 = this.prevMoveTo.charCodeAt(0) - 97;
        let newBoard = structuredClone(this.state.chessboard);
        newBoard[x1][y1] = this.toChar;
        newBoard[x2][y2] = this.fromChar;

        //state update to reflect game changes on ui
        this.setState({ chessboard: newBoard });
        console.log(this.chess.ascii());
        this.setState({ from: null, to: null, flag: 0 });
        this.toChar = null;
        this.fromChar = null;
        this.prevMoveFrom = null;
        this.prevMoveTo = null;

    }

    //add moves to both tables 
    updateMoveTable(){
        var element;
        if(this.currentPlayer === 'w')
            element = document.getElementById("whiteMoves");
        else
            element = document.getElementById("blackMoves");
        var newMove = document.createElement("li");
        newMove.textContent = "Move from " + this.state.from + " to " + this.state.to;
        element.appendChild(newMove);
        
    }

    //checks for move validity and makes the move
    makeMove() {


        if (this.state.flag === 0) {
            window.alert("Error");
            return;
        }
        let fromsquare = this.state.from;
        let tosquare = this.state.to;
        let x1 = 8 - fromsquare[1];
        let y1 = fromsquare.charCodeAt(0) - 97;
        if (((this.state.from[1] === "7" && this.state.to[1] === "8") || (this.state.from[1] === "2" && this.state.to[1] === "1")) && (this.state.chessboard[x1][y1] === 'p' || this.state.chessboard[x1][y1] === 'P')) {
            this.promotion();
        }
        else {
            try {
                this.currentPlayer = this.chess.turn();
                console.log(this.currentPlayer + " " + fromsquare + " " + tosquare);
                this.chess.move({ from: fromsquare, to: tosquare });
                this.updateMoveTable();
                console.log("valid move");
                this.handleUpdation();
                if (this.chess.isGameOver()) {
                    if (this.chess.isDraw()) {
                        window.alert("Game is a Draw!");
                    }
                    else if (this.chess.isThreefoldRepetition()) {
                        window.alert("Three fold repetition detected, game is a draw!");
                    }
                    else if (this.chess.isStalemate()) {
                        window.alert("Stalemate detected, game is a draw!");
                    }
                    else if (this.chess.isCheckmate()) {
                        if (this.currentPlayer === "b") {
                            window.alert("Black Wins!");
                        }
                        else {
                            window.alert("White Wins!");
                        }
                    }
                    window.alert("New game starting soon...");
                    this.resetBoard();
                }
            } catch (error) {
                window.alert("Invalid Move!");
            }
        }
        console.log("move made " + this.state.from + " to" + this.state.to);
        this.setState({ from: null, to: null, flag: 0}, () => {
            console.log("set to 0");
            return;
        });

    }

    resetBoard(event){
        if(event != null)
        window.alert("Game will be reset!");
        this.chess.load(this.fenStarting);
        this.setState({chessboard: this.startingBoard, from: null, to: null, flag:0});
        var table1 = document.getElementById("whiteMoves");
        while(table1.lastChild){
            table1.removeChild(table1.lastChild);
        }
        var table2 = document.getElementById("blackMoves");
        while(table2.lastChild){
            table2.removeChild(table2.lastChild);
        }
        console.log(this.chess.ascii());
    }

    //registers the square chosen and makes a move once from and to of the state is set
    handleClick(event) {
        var squareid;
        if(event.target.tagName === "IMG"){
            squareid = event.target.parentNode.id;
        }
        else{
            squareid = event.target.id;
        }
        if (this.state.from === null) {
            this.setState({ from: squareid })

        }
        else {
            this.setState({ to: squareid, flag: 1 }, () => {
                this.makeMove();
            });
        }
        console.log(this.chess.isGameOver());
    }


    render() {
        return (
            <div className="container">
                <div className="WhiteCorner"><h4>White Moves</h4><ul id="whiteMoves"></ul></div>
                <div className="board">
                <button name="Reset" id="resetButton" onClick={(event) => this.resetBoard(event)} > New game </button>
                    <button name="Undo" id="undoButton" onClick={(event) => this.undoMove(event)} > Undo </button>
                    <div id="main-board" className="container">
                        {this.state.chessboard.map((rows, rownum) => (
                            <div className="rows" key={rownum}>
                                {rows.map((playingpiece, colNum) => (
                                    <div id={ String.fromCharCode(97 + colNum) + (8-rownum)} 
                                    className={`${"square"} ${((rownum%2 == 0 && colNum%2 == 1) || (rownum%2 == 1 && colNum%2 == 0))? "bs" : "ws"}`}
                                    key={colNum} 
                                    onClick={(event) =>this.handleClick(event)}>
                                        <img src={pieces[playingpiece]} ></img>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="BlackCorner"><h4>Black Moves</h4><ul id="blackMoves"></ul></div>
            </div>
        )
    }
}

export default Board