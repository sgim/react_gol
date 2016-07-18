export default (cells) => {
  let height = cells.length;
  let width = cells[0].length;
  return cells.map((row, i) => {
    // get count of surrounding neighbors for each cell
    let endRow = i + 1 === height ? i: i + 1;
    let startR = i === 0 ? i : i - 1;
    return row.map((cell, j) => {
      cell.neighbors = 0;
      let startCol = j === 0 ? j : j - 1;
      let endCol = j + 1 === width ? j : j + 1;
      for(let startRow = startR; startRow <= endRow; startRow++) {
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
};
