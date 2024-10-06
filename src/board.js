import React from "react";
import './board.css';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import { Chess } from "chess.js";

class Board extends React.Component {
    chess = new Chess()

    constructor(){
        super();
        this.state = {
            chessboard: [
                ["r", "n", "b", "q", "k", "b", "n", "r"],
                ["p", "p", "p", "p", "p", "p", "p", "p"],
                [".", ".", ".", ".", ".", ".", ".", "."],
                [".", ".", ".", ".", ".", ".", ".", "."],
                [".", ".", ".", ".", ".", ".", ".", "."],
                [".", ".", ".", ".", ".", ".", ".", "."],
                ["P", "P", "P", "P", "P", "P", "P", "P"],
                ["R", "N", "B", "Q", "K", "B", "N", "R"],
              ],

              from: null,

              to: null,
              flag: 0,
              
        }
        this.makeMove = this.makeMove.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleUpdation = this.handleUpdation.bind(this);
    }

    handleUpdation(){
        let fromsquare = this.state.from;
        let tosquare = this.state.to;
        let x1 = 8 - fromsquare[1];
        let y1 = fromsquare.charCodeAt(0) - 97;
        let x2 = 8 - tosquare[1];
        let y2 = tosquare.charCodeAt(0) - 97;
        let newBoard = structuredClone(this.state.chessboard);
        newBoard[x1][y1]=".";
        newBoard[x2][y2]=this.state.chessboard[x1][y1];
        this.setState({ chessboard: newBoard });
        console.log(this.chess.ascii());
        this.setState({from: null, to: null, flag: 0})
    }

    //
    makeMove() {
        if(this.state.flag == 0){
            console.log("error");
            return;
        }
        let fromsquare = this.state.from;
        let tosquare = this.state.to;
        if(true){
            try {
                this.chess.move({ from: fromsquare, to: tosquare });
                console.log("valid move");
                this.handleUpdation();
            } catch (error) {
                window.alert("Invalid Move!");
            }
        }
        console.log("move made " + this.state.from + " to" + this.state.to);
        this.setState({from: null, to: null, flag: 0})
        return;

    }

    handleClick (event){
        const newgame = new Chess();
        let square = event.target.id;
        if(this.state.from === null){
            this.setState({from: event.target.id})
            
        }
        else {
            this.setState({to: event.target.id});
            this.setState({ to: event.target.id, flag: 1 }, () => {
            this.makeMove();
            });
            
            
        }
        //console.log(square + " " + row + " " + typeof(row) + " " + column + " " +typeof(column));
    }

    render(){
        return (
        <div id="main-board" className="container">
            <div className="rows">
                <div id="a8" className="square col-sm-1" onClick={(event) => this.handleClick(event)}>{this.state.chessboard[0][0]}</div>
                <div id="b8" className="square col-sm-1 bs" onClick={(event) => this.handleClick(event)}>{this.state.chessboard[0][1]}</div>
                <div id="c8" className="square col-sm-1" onClick={(event) => this.handleClick(event)}>{this.state.chessboard[0][2]}</div>
                <div id="d8" className="square col-sm-1 bs" onClick={(event) => this.handleClick(event)}>{this.state.chessboard[0][3]}</div>
                <div id="e8" className="square col-sm-1" onClick={(event) => this.handleClick(event)}>{this.state.chessboard[0][4]}</div>
                <div id="f8" className="square col-sm-1 bs" onClick={(event) => this.handleClick(event)}>{this.state.chessboard[0][5]}</div>
                <div id="g8" className="square col-sm-1" onClick={(event) => this.handleClick(event)}>{this.state.chessboard[0][6]}</div>
                <div id="h8" className="square col-sm-1 bs" onClick={(event) => this.handleClick(event)}>{this.state.chessboard[0][7]}</div>
            </div>
            <div className="rows">
                <div id="a7" className="square col-sm-1 bs" onClick={(event) => this.handleClick(event)}>{this.state.chessboard[1][0]}</div>
                <div id="b7" className="square col-sm-1" onClick={(event) => this.handleClick(event)}>{this.state.chessboard[1][1]}</div>
                <div id="c7" className="square col-sm-1 bs" onClick={(event) => this.handleClick(event)}>{this.state.chessboard[1][2]}</div>
                <div id="d7" className="square col-sm-1" onClick={(event) => this.handleClick(event)}>{this.state.chessboard[1][3]}</div>
                <div id="e7" className="square col-sm-1 bs" onClick={(event) => this.handleClick(event)}>{this.state.chessboard[1][4]}</div>
                <div id="f7" className="square col-sm-1" onClick={(event) => this.handleClick(event)}>{this.state.chessboard[1][5]}</div>
                <div id="g7" className="square col-sm-1 bs" onClick={(event) => this.handleClick(event)}>{this.state.chessboard[1][6]}</div>
                <div id="h7" className="square col-sm-1" onClick={(event) => this.handleClick(event)}>{this.state.chessboard[1][7]}</div>
            </div>
            <div className="rows">
                <div id="a6" className="square col-sm-1" onClick={(event) => this.handleClick(event)}>{this.state.chessboard[2][0]}</div>
                <div id="b6" className="square col-sm-1 bs" onClick={(event) => this.handleClick(event)}>{this.state.chessboard[2][1]}</div>
                <div id="c6" className="square col-sm-1" onClick={(event) => this.handleClick(event)}>{this.state.chessboard[2][2]}</div>
                <div id="d6" className="square col-sm-1 bs" onClick={(event) => this.handleClick(event)}>{this.state.chessboard[2][3]}</div>
                <div id="e6" className="square col-sm-1" onClick={(event) => this.handleClick(event)}>{this.state.chessboard[2][4]}</div>
                <div id="f6" className="square col-sm-1 bs" onClick={(event) => this.handleClick(event)}>{this.state.chessboard[2][5]}</div>
                <div id="g6" className="square col-sm-1" onClick={(event) => this.handleClick(event)}>{this.state.chessboard[2][6]}</div>
                <div id="h6" className="square col-sm-1 bs" onClick={(event) => this.handleClick(event)}>{this.state.chessboard[2][7]}</div>
            </div>
            <div className="rows">
                <div id="a5" className="square col-sm-1 bs" onClick={(event) => this.handleClick(event)}>{this.state.chessboard[3][0]}</div>
                <div id="b5" className="square col-sm-1" onClick={(event) => this.handleClick(event)}>{this.state.chessboard[3][1]}</div>
                <div id="c5" className="square col-sm-1 bs" onClick={(event) => this.handleClick(event)}>{this.state.chessboard[3][2]}</div>
                <div id="d5" className="square col-sm-1" onClick={(event) => this.handleClick(event)}>{this.state.chessboard[3][3]}</div>
                <div id="e5" className="square col-sm-1 bs" onClick={(event) => this.handleClick(event)}>{this.state.chessboard[3][4]}</div>
                <div id="f5" className="square col-sm-1" onClick={(event) => this.handleClick(event)}>{this.state.chessboard[3][5]}</div>
                <div id="g5" className="square col-sm-1 bs" onClick={(event) => this.handleClick(event)}>{this.state.chessboard[3][6]}</div>
                <div id="h5" className="square col-sm-1" onClick={(event) => this.handleClick(event)}>{this.state.chessboard[3][7]}</div>
            </div>
            <div className="rows">
                <div id="a4" className="square col-sm-1" onClick={(event) => this.handleClick(event)}>{this.state.chessboard[4][0]}</div>
                <div id="b4" className="square col-sm-1 bs" onClick={(event) => this.handleClick(event)}>{this.state.chessboard[4][1]}</div>
                <div id="c4" className="square col-sm-1" onClick={(event) => this.handleClick(event)}>{this.state.chessboard[4][2]}</div>
                <div id="d4" className="square col-sm-1 bs" onClick={(event) => this.handleClick(event)}>{this.state.chessboard[4][3]}</div>
                <div id="e4" className="square col-sm-1" onClick={(event) => this.handleClick(event)}>{this.state.chessboard[4][4]}</div>
                <div id="f4" className="square col-sm-1 bs" onClick={(event) => this.handleClick(event)}>{this.state.chessboard[4][5]}</div>
                <div id="g4" className="square col-sm-1" onClick={(event) => this.handleClick(event)}>{this.state.chessboard[4][6]}</div>
                <div id="h4" className="square col-sm-1 bs" onClick={(event) => this.handleClick(event)}>{this.state.chessboard[4][7]}</div>
            </div>
            <div className="rows">
                <div id="a3" className="square col-sm-1 bs" onClick={(event) => this.handleClick(event)}>{this.state.chessboard[5][0]}</div>
                <div id="b3" className="square col-sm-1" onClick={(event) => this.handleClick(event)}>{this.state.chessboard[5][1]}</div>
                <div id="c3" className="square col-sm-1 bs" onClick={(event) => this.handleClick(event)}>{this.state.chessboard[5][2]}</div>
                <div id="d3" className="square col-sm-1" onClick={(event) => this.handleClick(event)}>{this.state.chessboard[5][3]}</div>
                <div id="e3" className="square col-sm-1 bs" onClick={(event) => this.handleClick(event)}>{this.state.chessboard[5][4]}</div>
                <div id="f3" className="square col-sm-1" onClick={(event) => this.handleClick(event)}>{this.state.chessboard[5][5]}</div>
                <div id="g3" className="square col-sm-1 bs" onClick={(event) => this.handleClick(event)}>{this.state.chessboard[5][6]}</div>
                <div id="h3" className="square col-sm-1" onClick={(event) => this.handleClick(event)}>{this.state.chessboard[5][7]}</div>
            </div>
            <div className="rows">
                <div id="a2" className="square col-sm-1" onClick={(event) => this.handleClick(event)}>{this.state.chessboard[6][0]}</div>
                <div id="b2" className="square col-sm-1 bs" onClick={(event) => this.handleClick(event)}>{this.state.chessboard[6][1]}</div>
                <div id="c2" className="square col-sm-1" onClick={(event) => this.handleClick(event)}>{this.state.chessboard[6][2]}</div>
                <div id="d2" className="square col-sm-1 bs" onClick={(event) => this.handleClick(event)}>{this.state.chessboard[6][3]}</div>
                <div id="e2" className="square col-sm-1" onClick={(event) => this.handleClick(event)}>{this.state.chessboard[6][4]}</div>
                <div id="f2" className="square col-sm-1 bs" onClick={(event) => this.handleClick(event)}>{this.state.chessboard[6][5]}</div>
                <div id="g2" className="square col-sm-1" onClick={(event) => this.handleClick(event)}>{this.state.chessboard[6][6]}</div>
                <div id="h2" className="square col-sm-1 bs" onClick={(event) => this.handleClick(event)}>{this.state.chessboard[6][7]}</div>
            </div>
            <div className="rows">
                <div id="a1" className="square col-sm-1 bs" onClick={(event) => this.handleClick(event)}>{this.state.chessboard[7][0]}</div>
                <div id="b1" className="square col-sm-1" onClick={(event) => this.handleClick(event)}>{this.state.chessboard[7][1]}</div>
                <div id="c1" className="square col-sm-1 bs" onClick={(event) => this.handleClick(event)}>{this.state.chessboard[7][2]}</div>
                <div id="d1" className="square col-sm-1" onClick={(event) => this.handleClick(event)}>{this.state.chessboard[7][3]}</div>
                <div id="e1" className="square col-sm-1 bs" onClick={(event) => this.handleClick(event)}>{this.state.chessboard[7][4]}</div>
                <div id="f1" className="square col-sm-1" onClick={(event) => this.handleClick(event)}>{this.state.chessboard[7][5]}</div>
                <div id="g1" className="square col-sm-1 bs" onClick={(event) => this.handleClick(event)}>{this.state.chessboard[7][6]}</div>
                <div id="h1" className="square col-sm-1" onClick={(event) => this.handleClick(event)}>{this.state.chessboard[7][7]}</div>
            </div>
        </div>
        )
    }
}

export default Board