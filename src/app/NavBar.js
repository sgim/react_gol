import React from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import Gallery from "./Gallery";
import GameOfLife from "./GameOfLife";

const styles = {
  headline: {
    fontSize: 54,
    paddingTop: 6,
    fontWeight: 400,
    width: "100%",
  },
};

export default class NavBar extends React.Component {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      value: 'a',
    };
  }

  handleChange(value) {
    this.setState({ value });
  };

  render() {
    return (
      <Tabs
      value={this.state.value}
      onChange={this.handleChange}
      style={styles.headline}
      >
      <Tab label="GAME OF LIFE" value="a" >
      <GameOfLife />
      </Tab>
      <Tab label="GALLERY" value="b">
      <Gallery />
      </Tab>
      <Tab label="OPTIONS" value="c">
      
      </Tab>
      </Tabs>
    );
  }
}
