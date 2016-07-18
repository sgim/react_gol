import React from "react";

const styles = {
  board: {
    margin: "0 auto",
    paddingTop: 10,
    borderCollapse: "collapse"
  }
};

export default class GameOfLife extends React.Component {
  render() {
    return (
      <div>
      <table>
        {Board(this.state)}
      </table>
      </div>
    );
  }
};
