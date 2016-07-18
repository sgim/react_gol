import React from "react";

const Cell = (props, alive) => (
  <td
  key={props}
  data-status={alive.length ? "alive" : "dead"}
  ></td>
);

const Row = ({width=20, height=20, cells=[], row=0}) => {
  const cols = [];
  for(let w = 0; w < width; w++) {
    cols.push(Cell(w+"-"+row, cells[row][w]));
  }
  return <tr key={"row"+row} >{cols}</tr>;
};

const Board = ({width=20, height=20, cells=[]}) => {
  const rows = [];
  for(let h = 0; h < height; h++) {
    rows.push(Row({width, height, row: h, cells}));
  }
  return <table><tbody>{rows}</tbody></table>;
};

export default Board;
