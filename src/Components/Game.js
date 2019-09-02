import React, { Component } from "react";
import Board from "./Board";

class Game extends Component {
  render() {
    return (
      <div className='App'>
        <Board nrows={3} ncols={3}/>
      </div>
    );
  }
}

export default Game;
