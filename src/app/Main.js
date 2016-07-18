import React, {Component} from 'react';
import {deepOrange500} from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import AppBar from 'material-ui/AppBar';
import GameOfLife from "./GameOfLife";

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

const Main = () => (
  <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
    <div style={styles.container}>
    <AppBar title="GAME OF LIFE"
    showMenuIconButton={false}/>
      <GameOfLife />
    </div>
  </MuiThemeProvider>
);

export default Main;
