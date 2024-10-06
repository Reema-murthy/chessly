import React from "react";
import './board.css';
import 'bootstrap/dist/css/bootstrap.min.css'; 

class Board extends React.Component {

    constructor(){
        super();
        this.state = {
            
        }
    }

    handleClick (event){
        let square = event.target.id;
        console.log(square);
    }

    render(){
        return (
        <div id="main-board" className="container">
            <div className="rows">
                <div id="8a" className="square col-sm-1" onClick={(event) => this.handleClick(event)}>r</div>
                <div id="8b" className="square col-sm-1 bs" onClick={(event) => this.handleClick(event)}>n</div>
                <div id="8c" className="square col-sm-1" onClick={(event) => this.handleClick(event)}>b</div>
                <div id="8d" className="square col-sm-1 bs" onClick={(event) => this.handleClick(event)}>q</div>
                <div id="8e" className="square col-sm-1" onClick={(event) => this.handleClick(event)}>k</div>
                <div id="8f" className="square col-sm-1 bs" onClick={(event) => this.handleClick(event)}>b</div>
                <div id="8g" className="square col-sm-1" onClick={(event) => this.handleClick(event)}>n</div>
                <div id="8h" className="square col-sm-1 bs" onClick={(event) => this.handleClick(event)}>r</div>
            </div>
            <div className="rows">
                <div id="7a" className="square col-sm-1 bs" onClick={(event) => this.handleClick(event)}>p</div>
                <div id="7b" className="square col-sm-1" onClick={(event) => this.handleClick(event)}>p</div>
                <div id="7c" className="square col-sm-1 bs" onClick={(event) => this.handleClick(event)}>p</div>
                <div id="7d" className="square col-sm-1" onClick={(event) => this.handleClick(event)}>p</div>
                <div id="7e" className="square col-sm-1 bs" onClick={(event) => this.handleClick(event)}>p</div>
                <div id="7f" className="square col-sm-1" onClick={(event) => this.handleClick(event)}>p</div>
                <div id="7g" className="square col-sm-1 bs" onClick={(event) => this.handleClick(event)}>p</div>
                <div id="7h" className="square col-sm-1" onClick={(event) => this.handleClick(event)}>p</div>
            </div>
            <div className="rows">
                <div id="6a" className="square col-sm-1" onClick={(event) => this.handleClick(event)}>.</div>
                <div id="6b" className="square col-sm-1 bs" onClick={(event) => this.handleClick(event)}>.</div>
                <div id="6c" className="square col-sm-1" onClick={(event) => this.handleClick(event)}>.</div>
                <div id="6d" className="square col-sm-1 bs" onClick={(event) => this.handleClick(event)}>.</div>
                <div id="6e" className="square col-sm-1" onClick={(event) => this.handleClick(event)}>.</div>
                <div id="6f" className="square col-sm-1 bs" onClick={(event) => this.handleClick(event)}>.</div>
                <div id="6g" className="square col-sm-1" onClick={(event) => this.handleClick(event)}>.</div>
                <div id="6h" className="square col-sm-1 bs" onClick={(event) => this.handleClick(event)}>.</div>
            </div>
            <div className="rows">
                <div id="5a" className="square col-sm-1 bs" onClick={(event) => this.handleClick(event)}>.</div>
                <div id="5b" className="square col-sm-1" onClick={(event) => this.handleClick(event)}>.</div>
                <div id="5c" className="square col-sm-1 bs" onClick={(event) => this.handleClick(event)}>.</div>
                <div id="5d" className="square col-sm-1" onClick={(event) => this.handleClick(event)}>.</div>
                <div id="5e" className="square col-sm-1 bs" onClick={(event) => this.handleClick(event)}>.</div>
                <div id="5f" className="square col-sm-1" onClick={(event) => this.handleClick(event)}>.</div>
                <div id="5g" className="square col-sm-1 bs" onClick={(event) => this.handleClick(event)}>.</div>
                <div id="5h" className="square col-sm-1" onClick={(event) => this.handleClick(event)}>.</div>
            </div>
            <div className="rows">
                <div id="4a" className="square col-sm-1" onClick={(event) => this.handleClick(event)}>.</div>
                <div id="4b" className="square col-sm-1 bs" onClick={(event) => this.handleClick(event)}>.</div>
                <div id="4c" className="square col-sm-1" onClick={(event) => this.handleClick(event)}>.</div>
                <div id="4d" className="square col-sm-1 bs" onClick={(event) => this.handleClick(event)}>.</div>
                <div id="4e" className="square col-sm-1" onClick={(event) => this.handleClick(event)}>.</div>
                <div id="4f" className="square col-sm-1 bs" onClick={(event) => this.handleClick(event)}>.</div>
                <div id="4g" className="square col-sm-1" onClick={(event) => this.handleClick(event)}>.</div>
                <div id="4h" className="square col-sm-1 bs" onClick={(event) => this.handleClick(event)}>.</div>
            </div>
            <div className="rows">
                <div id="3a" className="square col-sm-1 bs" onClick={(event) => this.handleClick(event)}>.</div>
                <div id="3b" className="square col-sm-1" onClick={(event) => this.handleClick(event)}>.</div>
                <div id="3c" className="square col-sm-1 bs" onClick={(event) => this.handleClick(event)}>.</div>
                <div id="3d" className="square col-sm-1" onClick={(event) => this.handleClick(event)}>.</div>
                <div id="3e" className="square col-sm-1 bs" onClick={(event) => this.handleClick(event)}>.</div>
                <div id="3f" className="square col-sm-1" onClick={(event) => this.handleClick(event)}>.</div>
                <div id="3g" className="square col-sm-1 bs" onClick={(event) => this.handleClick(event)}>.</div>
                <div id="3h" className="square col-sm-1" onClick={(event) => this.handleClick(event)}>.</div>
            </div>
            <div className="rows">
                <div id="2a" className="square col-sm-1" onClick={(event) => this.handleClick(event)}>P</div>
                <div id="2b" className="square col-sm-1 bs" onClick={(event) => this.handleClick(event)}>P</div>
                <div id="2c" className="square col-sm-1" onClick={(event) => this.handleClick(event)}>P</div>
                <div id="2d" className="square col-sm-1 bs" onClick={(event) => this.handleClick(event)}>P</div>
                <div id="2e" className="square col-sm-1" onClick={(event) => this.handleClick(event)}>P</div>
                <div id="2f" className="square col-sm-1 bs" onClick={(event) => this.handleClick(event)}>P</div>
                <div id="2g" className="square col-sm-1" onClick={(event) => this.handleClick(event)}>P</div>
                <div id="2h" className="square col-sm-1 bs" onClick={(event) => this.handleClick(event)}>P</div>
            </div>
            <div className="rows">
                <div id="1a" className="square col-sm-1 bs" onClick={(event) => this.handleClick(event)}>R</div>
                <div id="1b" className="square col-sm-1" onClick={(event) => this.handleClick(event)}>N</div>
                <div id="1c" className="square col-sm-1 bs" onClick={(event) => this.handleClick(event)}>B</div>
                <div id="1d" className="square col-sm-1" onClick={(event) => this.handleClick(event)}>Q</div>
                <div id="1e" className="square col-sm-1 bs" onClick={(event) => this.handleClick(event)}>K</div>
                <div id="1f" className="square col-sm-1" onClick={(event) => this.handleClick(event)}>B</div>
                <div id="1g" className="square col-sm-1 bs" onClick={(event) => this.handleClick(event)}>N</div>
                <div id="1h" className="square col-sm-1" onClick={(event) => this.handleClick(event)}>R</div>
            </div>
        </div>
        )
    }
}

export default Board