import React from "react";
import './board.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Chess } from "chess.js";

class Board extends React.Component {
    chess = new Chess();

    prevMoveFrom = null;
    prevMoveTo = null;
    fromChar = null;
    toChar = null;
    currentPlayer = null;

    constructor() {
        super();
        this.state = {
            chessboard: [
                ["r", "n", "b", "q", "k", "b", "n", "r"],
                ["p", "p", "p", "p", "p", "p", "p", "p"],
                [" ", " ", " ", " ", " ", " ", " ", " "],
                [" ", " ", " ", " ", " ", " ", " ", " "],
                [" ", " ", " ", " ", " ", " ", " ", " "],
                [" ", " ", " ", " ", " ", " ", " ", " "],
                ["P", "P", "P", "P", "P", "P", "P", "P"],
                ["R", "N", "B", "Q", "K", "B", "N", "R"],
            ],

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
        if (this.prevMoveFrom == null) {
            window.alert("No previous move to undo");
            return;
        }
        this.chess.undo();  //undo previous half move
        this.currentPlayer = this.chess.turn(); //update current player

        //update moves table
        if(this.currentPlayer === 'w')
            var element = document.getElementById("whiteMoves");
        else
            var element = document.getElementById("blackMoves");
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
        if(this.currentPlayer === 'w')
            var element = document.getElementById("whiteMoves");
        else
            var element = document.getElementById("blackMoves");
        var newMove = document.createElement("li");
        newMove.textContent = "Move from " + this.state.from + " to " + this.state.to;
        element.appendChild(newMove);
        
    }

    //checks for move validity and makes the move
    makeMove() {


        if (this.state.flag == 0) {
            console.log("error");
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
                console.log(this.currentPlayer);
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
                    window.location.reload(false);
                }
            } catch (error) {
                window.alert("Invalid Move!");
            }
        }
        console.log("move made " + this.state.from + " to" + this.state.to);
        this.setState({ from: null, to: null, flag: 0 });
        return;

    }

    //registers the square chosen and makes a move once from and to of the state is set
    handleClick(event) {
        const newgame = new Chess();
        let square = event.target.id;
        if (this.state.from === null) {
            this.setState({ from: event.target.id })

        }
        else {
            this.setState({ to: event.target.id, flag: 1 }, () => {
                this.makeMove();
            });
        }
    }

    render() {
        return (
            <div className="container">
                <div className="WhiteCorner"><h4>White Moves</h4><ul id="whiteMoves"></ul></div>
                <div className="board">
                    <button name="Undo" id="undoButton" onClick={(event) => this.undoMove(event)} > Undo </button>
                    <div id="main-board" className="container">

                        <div className="rows">
                            <div id="a8" className="square" onClick={(event) => this.handleClick(event)}>{this.state.chessboard[0][0]}</div>
                            <div id="b8" className="square bs" onClick={(event) => this.handleClick(event)}>{this.state.chessboard[0][1]}</div>
                            <div id="c8" className="square" onClick={(event) => this.handleClick(event)}>{this.state.chessboard[0][2]}</div>
                            <div id="d8" className="square bs" onClick={(event) => this.handleClick(event)}>{this.state.chessboard[0][3]}</div>
                            <div id="e8" className="square" onClick={(event) => this.handleClick(event)}>{this.state.chessboard[0][4]}</div>
                            <div id="f8" className="square bs" onClick={(event) => this.handleClick(event)}>{this.state.chessboard[0][5]}</div>
                            <div id="g8" className="square" onClick={(event) => this.handleClick(event)}>{this.state.chessboard[0][6]}</div>
                            <div id="h8" className="square bs" onClick={(event) => this.handleClick(event)}>{this.state.chessboard[0][7]}</div>
                        </div>
                        <div className="rows">
                            <div id="a7" className="square bs" onClick={(event) => this.handleClick(event)}>{this.state.chessboard[1][0]}</div>
                            <div id="b7" className="square" onClick={(event) => this.handleClick(event)}>{this.state.chessboard[1][1]}</div>
                            <div id="c7" className="square bs" onClick={(event) => this.handleClick(event)}>{this.state.chessboard[1][2]}</div>
                            <div id="d7" className="square" onClick={(event) => this.handleClick(event)}>{this.state.chessboard[1][3]}</div>
                            <div id="e7" className="square bs" onClick={(event) => this.handleClick(event)}>{this.state.chessboard[1][4]}</div>
                            <div id="f7" className="square" onClick={(event) => this.handleClick(event)}>{this.state.chessboard[1][5]}</div>
                            <div id="g7" className="square bs" onClick={(event) => this.handleClick(event)}>{this.state.chessboard[1][6]}</div>
                            <div id="h7" className="square" onClick={(event) => this.handleClick(event)}>{this.state.chessboard[1][7]}</div>
                        </div>
                        <div className="rows">
                            <div id="a6" className="square" onClick={(event) => this.handleClick(event)}>{this.state.chessboard[2][0]}</div>
                            <div id="b6" className="square bs" onClick={(event) => this.handleClick(event)}>{this.state.chessboard[2][1]}</div>
                            <div id="c6" className="square" onClick={(event) => this.handleClick(event)}>{this.state.chessboard[2][2]}</div>
                            <div id="d6" className="square bs" onClick={(event) => this.handleClick(event)}>{this.state.chessboard[2][3]}</div>
                            <div id="e6" className="square" onClick={(event) => this.handleClick(event)}>{this.state.chessboard[2][4]}</div>
                            <div id="f6" className="square bs" onClick={(event) => this.handleClick(event)}>{this.state.chessboard[2][5]}</div>
                            <div id="g6" className="square" onClick={(event) => this.handleClick(event)}>{this.state.chessboard[2][6]}</div>
                            <div id="h6" className="square bs" onClick={(event) => this.handleClick(event)}>{this.state.chessboard[2][7]}</div>
                        </div>
                        <div className="rows">
                            <div id="a5" className="square bs" onClick={(event) => this.handleClick(event)}>{this.state.chessboard[3][0]}</div>
                            <div id="b5" className="square" onClick={(event) => this.handleClick(event)}>{this.state.chessboard[3][1]}</div>
                            <div id="c5" className="square bs" onClick={(event) => this.handleClick(event)}>{this.state.chessboard[3][2]}</div>
                            <div id="d5" className="square" onClick={(event) => this.handleClick(event)}>{this.state.chessboard[3][3]}</div>
                            <div id="e5" className="square bs" onClick={(event) => this.handleClick(event)}>{this.state.chessboard[3][4]}</div>
                            <div id="f5" className="square" onClick={(event) => this.handleClick(event)}>{this.state.chessboard[3][5]}</div>
                            <div id="g5" className="square bs" onClick={(event) => this.handleClick(event)}>{this.state.chessboard[3][6]}</div>
                            <div id="h5" className="square" onClick={(event) => this.handleClick(event)}>{this.state.chessboard[3][7]}</div>
                        </div>
                        <div className="rows">
                            <div id="a4" className="square" onClick={(event) => this.handleClick(event)}>{this.state.chessboard[4][0]}</div>
                            <div id="b4" className="square bs" onClick={(event) => this.handleClick(event)}>{this.state.chessboard[4][1]}</div>
                            <div id="c4" className="square" onClick={(event) => this.handleClick(event)}>{this.state.chessboard[4][2]}</div>
                            <div id="d4" className="square bs" onClick={(event) => this.handleClick(event)}>{this.state.chessboard[4][3]}</div>
                            <div id="e4" className="square" onClick={(event) => this.handleClick(event)}>{this.state.chessboard[4][4]}</div>
                            <div id="f4" className="square bs" onClick={(event) => this.handleClick(event)}>{this.state.chessboard[4][5]}</div>
                            <div id="g4" className="square" onClick={(event) => this.handleClick(event)}>{this.state.chessboard[4][6]}</div>
                            <div id="h4" className="square bs" onClick={(event) => this.handleClick(event)}>{this.state.chessboard[4][7]}</div>
                        </div>
                        <div className="rows">
                            <div id="a3" className="square bs" onClick={(event) => this.handleClick(event)}>{this.state.chessboard[5][0]}</div>
                            <div id="b3" className="square" onClick={(event) => this.handleClick(event)}>{this.state.chessboard[5][1]}</div>
                            <div id="c3" className="square bs" onClick={(event) => this.handleClick(event)}>{this.state.chessboard[5][2]}</div>
                            <div id="d3" className="square" onClick={(event) => this.handleClick(event)}>{this.state.chessboard[5][3]}</div>
                            <div id="e3" className="square bs" onClick={(event) => this.handleClick(event)}>{this.state.chessboard[5][4]}</div>
                            <div id="f3" className="square" onClick={(event) => this.handleClick(event)}>{this.state.chessboard[5][5]}</div>
                            <div id="g3" className="square bs" onClick={(event) => this.handleClick(event)}>{this.state.chessboard[5][6]}</div>
                            <div id="h3" className="square" onClick={(event) => this.handleClick(event)}>{this.state.chessboard[5][7]}</div>
                        </div>
                        <div className="rows">
                            <div id="a2" className="square" onClick={(event) => this.handleClick(event)}>{this.state.chessboard[6][0]}</div>
                            <div id="b2" className="square bs" onClick={(event) => this.handleClick(event)}>{this.state.chessboard[6][1]}</div>
                            <div id="c2" className="square" onClick={(event) => this.handleClick(event)}>{this.state.chessboard[6][2]}</div>
                            <div id="d2" className="square bs" onClick={(event) => this.handleClick(event)}>{this.state.chessboard[6][3]}</div>
                            <div id="e2" className="square" onClick={(event) => this.handleClick(event)}>{this.state.chessboard[6][4]}</div>
                            <div id="f2" className="square bs" onClick={(event) => this.handleClick(event)}>{this.state.chessboard[6][5]}</div>
                            <div id="g2" className="square" onClick={(event) => this.handleClick(event)}>{this.state.chessboard[6][6]}</div>
                            <div id="h2" className="square bs" onClick={(event) => this.handleClick(event)}>{this.state.chessboard[6][7]}</div>
                        </div>
                        <div className="rows">
                            <div id="a1" className="square bs" onClick={(event) => this.handleClick(event)}>{this.state.chessboard[7][0]}</div>
                            <div id="b1" className="square" onClick={(event) => this.handleClick(event)}>{this.state.chessboard[7][1]}</div>
                            <div id="c1" className="square bs" onClick={(event) => this.handleClick(event)}>{this.state.chessboard[7][2]}</div>
                            <div id="d1" className="square" onClick={(event) => this.handleClick(event)}>{this.state.chessboard[7][3]}</div>
                            <div id="e1" className="square bs" onClick={(event) => this.handleClick(event)}>{this.state.chessboard[7][4]}</div>
                            <div id="f1" className="square" onClick={(event) => this.handleClick(event)}>{this.state.chessboard[7][5]}</div>
                            <div id="g1" className="square bs" onClick={(event) => this.handleClick(event)}>{this.state.chessboard[7][6]}</div>
                            <div id="h1" className="square" onClick={(event) => this.handleClick(event)}>{this.state.chessboard[7][7]}</div>
                        </div>
                    </div>
                </div>
                <div className="BlackCorner"><h4>Black Moves</h4><ul id="blackMoves"></ul></div>
            </div>
        )
    }
}

export default Board