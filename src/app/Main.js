import React, {Component} from 'react';
import {deepOrange500} from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import AppBar from 'material-ui/AppBar';
import GameOfLife from "./GameOfLife";
import Menu from './Buttons';
import manipulateCells from "./manipulateCells";
import Board from "./Board";

const styles = {
  container: {
    textAlign: 'center',
    paddingTop: 0,
  },
};

const muiTheme = getMuiTheme({
  palette: {
    accent1Color: deepOrange500,
  },
});

class Main extends React.Component{
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
  render () {
    return (
    <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
      <div style={styles.container}>
      <AppBar title="GAME OF LIFE"
      showMenuIconButton={false}/>
      {Board(this.state)}
      <Menu options={this} />
      </div>
    </MuiThemeProvider>
    );
  }
};

export default Main;
