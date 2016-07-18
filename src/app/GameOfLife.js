import React from "react";
import Buttons from './Buttons';


const boardSettings = {
  width: 20,
  height: 20,
  stepInterval: 27
};

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

const Row = (h) => {
  const row = [];
  for(let w = 0, key; w < boardSettings.width; w++) {
    key = w + "-" + h;
    row.push(<Cell
      key={key}
      ></Cell>)
  }
  return (
    <tr style={styles.tr} key={"row" + h}>
      {row}
    </tr>
  );
};
//class Row extends React.Component{


  //render() {
    //const row = [];
    //let {height, width} = this.props;
    //for(let w = 0, key; w < width; w++) {
      //key = w + "-" + height;
      //row.push(<Cell
        //key={key}
        //></Cell>)
    //}
    //return (
      //<tr style={styles.tr} >
        //{row}
      //</tr>
    //);
  //}
//};

//class Board extends React.Component {

  //constructor(){
    //super();
    //this.onClick = this.onClick.bind(this);
  //}

  //onClick() {
    //console.log(this);
  //}

  //render() {
    //this.rows = [];
    //let {height, width} = this.props;
    //for(let h = 0; h < height; h++) {
      ////     this.rows.push(<Row key={"row" + h} width={width} height={height}/>);
      //this.rows.push(Row(h));
    //}
    //return <tbody onClick={this.onClick}>{this.rows}</tbody>;
  //}
//};
const Board = () => {

  const rows = [];
  let {height, width} = boardSettings;
  for(let h = 0; h < height; h++) {
    rows.push(Row(h));
  }
  return <tbody>{rows}</tbody>;
};


export default class GameOfLife extends React.Component {
  constructor() {
    super();
    this.test = this.test.bind(this);
  }
  test(){
    console.log(this);
  }
  render() {
    return (
      <div>
      <table style={styles.board}>
        <Board width={20} height={20}/>
      </table>
      <Buttons func={this.test}/>
      </div>
    );
  }
};
