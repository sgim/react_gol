import React from "react";
import Buttons from './Buttons';
import Board from "./Board";
import manipulateCells from "./manipulateCells";

const styles = {
  board: {
    margin: "0 auto",
    paddingTop: 10,
    borderCollapse: "collapse"
  }
};

export default class GameOfLife extends React.Component {
  constructor() {
    super();
    this.changeWidth = this.changeWidth.bind(this);
    this.changeHeight = this.changeHeight.bind(this);
    this.playGame = this.playGame.bind(this);
    this.pauseGame = this.pauseGame.bind(this);
    this.setupCells = this.setupCells.bind(this);
    this.autoPlay = this.autoPlay.bind(this);
    this.state = {
      width: 20,
      height: 20,
      cells: [],
      isPlaying: false
    };
    this.clearFrame = false;
    this.interval = 100;
    this.setupCells();
  }
  setupCells(e, width=this.state.width, height=this.state.height) {
    let {cells} = this.state;
    let h = 0;
    cells.length = 0;
    while(h < height) {
      const row = [];
      let w = width;
      while (w--) {
        row.push((Math.random() * 100 < 50) ? []: [0]);
      }
      cells.push(row);
      h++;
    }
    // only update setState if called from an event
    // this ensures setState isn't called before component is mounted
    e && this.setState({cells});
  }
  playGame() {
    this.setState({ cells: manipulateCells(this.state.cells) });
  }
  autoPlay() {
    this.state.isPlaying = true;
    this.clearFrame = setInterval(() => this.playGame(), this.interval);
  }
  pauseGame() {
    clearInterval(this.clearFrame);
    this.setState({ isPlaying: false });
  }
  changeHeight(e, i, height) {
    this.setupCells(false, this.state.width, height);
    this.setState({ height });
  }
  changeWidth(e, i, width) {
    this.setupCells(false, width, this.state.height);
    this.setState({ width });
  }
  render() {
    return (
      <div>
      <table style={styles.board}>
        {Board(this.state)}
      </table>
      <Buttons options={this} />
      </div>
    );
  }
};
