import React from "react";
import Buttons from './Buttons';


let isEraser = false;
let isMousedown = false;
let isPlaying = false;
let clearFrame = false;
let stable = true;

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

class Cell extends React.Component {
  
  constructor(key) {
    super();
    this.onClick = this.onClick.bind(this);
    this.state = {
      style: styles.dead
    };
    this.alive = false;
  }

  onClick() {
    isPlaying = false;
    this.setState({
      style: this.alive ? styles.dead: styles.alive
    });
    this.neighbors = 0;
    this.alive = !this.alive;
  }

  checkNeighbors() {

  }

  updateStatus() {

  }

  kill() {
    this.setState({ style: styles.dead });
    stable = this.alive = false;
  }

  revive() {
    this.setState({ style: styles.alive });
    stable = false;
    this.alive = true;
  }

  render() {
    return (
      <td style={this.state.style}
      onClick={this.onClick}></td>
    );
  }

};

class Row extends React.Component{
  constructor() {
    super();
  }

  render() {
    this.cells = [];
    let cells = this.props.cells;
    let {row, width} = this.props;
    for(let w = 0, key; w < width; w++) {
      key = w + "-" + row;
      cells.push(<Cell
        key={key}
        ></Cell>)
    }
    return (
      <tr style={styles.tr} >
        {cells}
      </tr>
    );
  }
};

class Board extends React.Component {

  constructor(){
    super();
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    console.log(this);
  }

  render() {
    this.rows = [];
    let {height, width} = this.props;
    for(let h = 0; h < height; h++) {
      this.rows.push(<Row key={"row" + h} width={width} row={height} cells={[]}/>);
    }
    return <tbody onClick={this.onClick}>{this.rows}</tbody>;
  }
};

const RowStateless = ({width=20, height=20, cells=[], row=0}) => {
  for(let w = 0; w < width; w++) {
    cells.push(<Cell key={w+'-'+row} />);
  }
  return (
    <tr key={"row"+row} style={styles.tr}>{cells}</tr>
  );
};
const BoardStateless = ({width=20, height=20, rows=[]}) => {
  for(let h = 0; h < height; h++) {
    rows[h] = (RowStateless({width, height, row: h}));
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
    this.state = {
      width: 20,
      height: 20,
      rows: []
    };
  }
  changeHeight(e, i, height) {
    console.log(this);
    this.setState({
      height
    });
  }
  changeWidth(e, i, width) {
    this.setState({
      width
    });
  }
  render() {
    return (
      <div>
      <table style={styles.board}>
        {BoardStateless(this.state)}
      </table>
      <Buttons settings={this.state} changeWidth={this.changeWidth} changeHeight={this.changeHeight}/>
      </div>
    );
  }
};
