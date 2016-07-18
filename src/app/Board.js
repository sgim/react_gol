import React from "react";

const styles = {
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

const Cell = (props, alive) => (
  <td
  key={props}
  style={alive.length ? styles.alive : styles.dead}
  ></td>
);

const Row = ({width=20, height=20, cells=[], row=0}) => {
  const cols = [];
  for(let w = 0; w < width; w++) {
    cols.push(Cell(w+"-"+row, cells[row][w]));
  }
  return <tr key={"row"+row} style={styles.tr}>{cols}</tr>;
};

const Board = ({width=20, height=20, cells=[]}) => {
  const rows = [];
  for(let h = 0; h < height; h++) {
    rows.push(Row({width, height, row: h, cells}));
  }
  return <tbody>{rows}</tbody>;
};

export default Board;
