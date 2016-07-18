import React from "react";
import Buttons from './Buttons';

const styles = {
  board: {
    margin: "0 auto",
    paddingTop: 10,
    borderCollapse: "collapse"
  },
  tr: {
    margin: 0,
    padding: 0
  },
  alive: {
    border: "1px solid #ddd",
    width: 18,
    height: 18,
    margin: 0,
    padding: 0,
    background: "blue"
  },
  dead: {
    border: "1px solid #ddd",
    width: 18,
    height: 18,
    margin: 0,
    padding: 0,
    background: "white"
  }
};

const CellStateless = (props, alive) => (
  <td
  key={props}
  style={alive.length ? styles.alive : styles.dead}
  ></td>
);

const RowStateless = ({width=20, height=20, cells=[], row=0}) => {
  const cols = [];
  for(let w = 0; w < width; w++) {
    cols.push(CellStateless(w+"-"+row, cells[row][w]));
  }
  return (
    <tr key={"row"+row} style={styles.tr}>{cols}</tr>
  );
};
const BoardStateless = ({width=20, height=20, rows=[], cells=[]}) => {
  for(let h = 0; h < height; h++) {
    rows[h] = (RowStateless({width, height, row: h, cells}));
  }
  rows = rows.slice(0, height);
  return (
    <tbody>{rows}</tbody>
  );
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
      rows: [],
      cells: [],
      isPlaying: false
    };
    this.clearFrame = false;
    this.interval = 27;
    this.setupCells();
  }
  setupCells(e, width=this.state.width, height=this.state.height) {
    let {cells} = this.state;
    let h = 0;
    cells.length = 0;
    while(h < height) {
      const row = [];
      let w = width;
      // there must be a better way to do this
      // but this works if I check aliveness with array.length
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
    let {width, height, cells} = this.state;
    cells = cells.map((row, i, rows) => {
      // get count of surrounding neighbors for each cell
      return row.map((cell, j) => {
        cell.neighbors = 0;
        let startRow = i === 0 ? i : i - 1;
        let endRow = i + 1 === height ? i: i + 1;
        let startCol = j === 0 ? j : j - 1;
        let endCol = j + 1 === width ? j : j + 1;
        for(; startRow <= endRow; startRow++) {
          for(let col = startCol; col <= endCol; col++) {
            let neighbor = cells[startRow][col];
            neighbor.length && (neighbor !== cell) && cell.neighbors++;
          }
        }
        return cell;
      });
      // determine whether to keep cell alive or dead depending on neighbor count
    }).map(row => row.map(cell => {
      let n = cell.neighbors;
      let alive = cell.length;
      if(!alive) {
        return n === 3 ? [0]: [];
      }
      return (n === 3 || n === 2) ? [0]: [];
    }));
    this.setState({cells});
  }
  autoPlay() {
    this.state.isPlaying = true;
    this.clearFrame = setInterval(() => this.playGame(), this.interval);
  }
  pauseGame() {
    this.state.isPlaying = false;
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
        {BoardStateless(this.state)}
      </table>
      <Buttons options={this} />
      </div>
    );
  }
};
