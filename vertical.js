// ----------- Check for diagonal win -----------
winningCells = [cell];

////////////////// RIGHT //////////////////////
// Check cells diagonal to right bottom to top current cell
rowToCheck = rowIdx + 1; // Checks row above the current cell [rowIdx, colIdx]
colToCheck = colIdx - 1; // Checks the col index
// Loop to check cell to the left as long as the cell is on the game board
while (colToCheck >= 0 && rowToCheck <= 5) {
  const cellToCheck = rows[rowToCheck][colToCheck]; // Gives us the cell associated with chip being checked
  // If block that checks if the color of current cell equals the color of the previous cell
  if (getColorOfCell(cellToCheck) === color) {
    winningCells.push(cellToCheck); // Adds the current cell to the winningCell array
    rowToCheck++; // Decrements the colToCheck by 1 so it continues to look left
    colToCheck--;
  } else {
    break; // If the cell to the left is not the same color or it is empty, then break out of the loop
  }
}

// Check cells diagonal to right top to bottom current cell
rowToCheck = rowIdx - 1; // Checks row above the current cell [rowIdx, colIdx]
colToCheck = colIdx + 1; // Checks the col index
// Loop to check cell to the left as long as the cell is on the game board
while (colToCheck <= 6 && rowToCheck >= 0) {
  const cellToCheck = rows[rowToCheck][colToCheck]; // Gives us the cell associated with chip being checked
  // If block that checks if the color of current cell equals the color of the previous cell
  if (getColorOfCell(cellToCheck) === color) {
    winningCells.push(cellToCheck); // Adds the current cell to the winningCell array
    rowToCheck--; // Decrements the colToCheck by 1 so it continues to look left
    colToCheck++;
  } else {
    break; // If the cell to the left is not the same color or it is empty, then break out of the loop
  }
}
isWinningCombo = checkWinningCells(winningCells);
if (isWinningCombo) return; // If it was a winning set of chips, then do nothing and return

///////////////////////////// LEFT /////////////////////////////
// Check cells diagonal to left bottom to top current cell
rowToCheck = rowIdx - 1; // Checks row above the current cell [rowIdx, colIdx]
colToCheck = colIdx - 1; // Checks the col index
// Loop to check cell to the left as long as the cell is on the game board
while (colToCheck >= 0 && rowToCheck >= 0) {
  const cellToCheck = rows[rowToCheck][colToCheck]; // Gives us the cell associated with chip being checked
  // If block that checks if the color of current cell equals the color of the previous cell
  if (getColorOfCell(cellToCheck) === color) {
    winningCells.push(cellToCheck); // Adds the current cell to the winningCell array
    rowToCheck--; // Decrements the colToCheck by 1 so it continues to look left
    colToCheck--;
  } else {
    break; // If the cell to the left is not the same color or it is empty, then break out of the loop
  }
}

// Check cells diagonal to right top to bottom current cell
rowToCheck = rowIdx + 1; // Checks row above the current cell [rowIdx, colIdx]
colToCheck = colIdx + 1; // Checks the col index
// Loop to check cell to the left as long as the cell is on the game board
while (colToCheck <= 6 && rowToCheck <= 5) {
  const cellToCheck = rows[rowToCheck][colToCheck]; // Gives us the cell associated with chip being checked
  // If block that checks if the color of current cell equals the color of the previous cell
  if (getColorOfCell(cellToCheck) === color) {
    winningCells.push(cellToCheck); // Adds the current cell to the winningCell array
    rowToCheck++; // Decrements the colToCheck by 1 so it continues to look left
    colToCheck++;
  } else {
    break; // If the cell to the left is not the same color or it is empty, then break out of the loop
  }
}

isWinningCombo = checkWinningCells(winningCells);
if (isWinningCombo) return; // If it was a winning set of chips, then do nothing and return
// --------- END CHECK DIAGONAL ----------

// Function checking if there are 4 cells of the same color
checkWinningCells(winningCells);

//////////////////////// VERTICAL //////////////////////////
winningCells = [cell];
rowToCheck = rowIdx - 1; // Checks row above the current cell [rowIdx, colIdx]

// Check cells to the left of the current cell
colToCheck = colIdx; // Checks the col index
// Loop to check cell to the left as long as the cell is on the game board
while (rowToCheck >= 0) {
  const cellToCheck = rows[rowToCheck][colToCheck]; // Gives us the cell associated with chip being checked
  // If block that checks if the color of current cell equals the color of the previous cell
  if (getColorOfCell(cellToCheck) === color) {
    winningCells.push(cellToCheck); // Adds the current cell to the winningCell array
    rowToCheck--; // Decrements the colToCheck by 1 so it continues to look left
  } else {
    break; // If the cell to the left is not the same color or it is empty, then break out of the loop
  }
}

// Check cells to the right of the current cell
rowToCheck = rowIdx + 1; // Checks col to the right of the current cell [rowIdx, colIdx]
// Loop to check cell to the right as long as the cell is on the game board
while (rowToCheck <= 5) {
  const cellToCheck = rows[rowToCheck][colToCheck]; // Gives us the cell associated with chip being checked
  // If block that checks if the color of current cell equals the color of the previous cell
  if (getColorOfCell(cellToCheck) === color) {
    winningCells.push(cellToCheck); // Adds the current cell to the winningCell array
    rowToCheck++; // Increments the colToCheck by 1 so it continues to look right
  } else {
    break; // If the cell to the right is not the same color or it is empty, then break out of the loop
  }
}
isWinningCombo = checkWinningCells(winningCells);
if (isWinningCombo) return; // If it was a winning set of chips, then do nothing and return
// --------- END CHECK VERTICAL ----------
