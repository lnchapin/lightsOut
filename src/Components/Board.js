import React, {Component} from "react";
import Cell from "./Cell";
import './Board.css';


/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - hasWon: boolean, true when board is all off
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

class Board extends Component {
  static defaultProps = {
    nrows: 5,
    ncols: 5,
    chanceLightStartsOn: 2
    };

  constructor(props) {
    super(props);
    this.state={
      board:[],
      hasWon:false
    };
  }

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
componentDidMount(){
  this.createBoard()
}

  createBoard() {
    let board = [];
    for (let i = 0; i < this.props.nrows; i++) {
      let row = []
      for (let j = 0; j < this.props.ncols; j++) {
        let onOff = Math.floor(Math.random()* 8)
        row.push(onOff === this.props.chanceLightStartsOn)
      }
      board.push(row)
    }
    this.setState({board})
    return board
  }

  playAgain = () => {
    this.setState({ hasWon: false })
    this.createBoard()
  }

  /** handle changing a cell: update board & determine if winner */

  flipCellsAround(coord) {
    let {ncols, nrows} = this.props;
    let board = this.state.board;
    let [y, x] = coord.split("-").map(Number);


    function flipCell(y, x) {
      // if this coord is actually on board, flip it
      if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
        board[y][x] = !board[y][x];
      }
    }
    // TODO: flip this cell and the cells around it
    flipCell(y,x);
    flipCell(y-1,x);
    flipCell(y+1,x);
    flipCell(y,x-1);
    flipCell(y,x+1);

    // win when every cell is turned off
    let hasWon = board.every(row => row.every(cell => !cell))

    // TODO: determine is the game has been won
    this.setState({board, hasWon});
  }

  render() {
    if (this.state.hasWon) {
      return(
        <>
          <h1>You win</h1>
          <button onClick={this.playAgain}>Play Again</button>
        </>
      )
    } else {
      return(
        <>
        <h1>Lights Out</h1>
        <table className="Board">
          <tbody>
            {this.state.board.map((row, rIndex)=> <tr key={rIndex}>{row.map((single, sIndex)=><Cell key={`${rIndex}-${sIndex}`} isLit={single} flipCellsAroundMe={()=>this.flipCellsAround(`${rIndex}-${sIndex}`)}/>)}</tr>)}
          </tbody>
        </table>
        <button onClick={this.playAgain}>Try a New Board</button>
      </>
      )
    }
  }
}


export default Board;
