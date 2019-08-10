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
    for (var i = 0; i < this.props.nrows; i++) {
      let row = []
      for (var j = 0; j < this.props.ncols; j++) {
        let onOff = Math.floor(Math.random()* 8)
        {onOff == this.props.chanceLightStartsOn ? row.push(1):row.push(0)}
      }
      board.push(row)
    }
    this.setState({board})
    return board
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

    // win when every cell is turned off
    // TODO: determine is the game has been won

    // this.setState({board, hasWon});
  }


  /** Render game board or winning message. */

  render() {

    // if the game is won, just show a winning msg & render nothing else

    // TODO

    // make table board

    // TODO
    return(
      <div className="Board">
        
      </div>
    )
  }
}


export default Board;
