// ---------- DOM elements ----------
const allCells = document.querySelectorAll(".cell:not(.row-top)"); // All cells exept the row-top
const topCells = document.querySelectorAll(".cell.row-top");
const resetButton = document.querySelector(".reset");
const statusSpan = document.querySelector(".status");

// ---------- Board cell setup ---------
// columns- go left to right
const column0 = [
  allCells[35],
  allCells[28],
  allCells[21],
  allCells[14],
  allCells[7],
  allCells[0],
  topCells[0],
];
const column1 = [
  allCells[36],
  allCells[29],
  allCells[22],
  allCells[15],
  allCells[8],
  allCells[1],
  topCells[1],
];
const column2 = [
  allCells[37],
  allCells[30],
  allCells[23],
  allCells[16],
  allCells[9],
  allCells[2],
  topCells[2],
];
const column3 = [
  allCells[38],
  allCells[31],
  allCells[24],
  allCells[17],
  allCells[10],
  allCells[3],
  topCells[3],
];
const column4 = [
  allCells[39],
  allCells[32],
  allCells[25],
  allCells[18],
  allCells[11],
  allCells[4],
  topCells[4],
];
const column5 = [
  allCells[40],
  allCells[33],
  allCells[26],
  allCells[19],
  allCells[12],
  allCells[5],
  topCells[5],
];
const column6 = [
  allCells[41],
  allCells[34],
  allCells[27],
  allCells[20],
  allCells[13],
  allCells[6],
  topCells[6],
];
const columns = [column0, column1, column2, column3, column4, column5, column6];

// rows- go top to bottom
const topRow = [
  topCells[0],
  topCells[1],
  topCells[2],
  topCells[3],
  topCells[4],
  topCells[5],
  topCells[6],
];
const row0 = [
  allCells[0],
  allCells[1],
  allCells[2],
  allCells[3],
  allCells[4],
  allCells[5],
  allCells[6],
];
const row1 = [
  allCells[7],
  allCells[8],
  allCells[9],
  allCells[10],
  allCells[11],
  allCells[12],
  allCells[13],
];
const row2 = [
  allCells[14],
  allCells[15],
  allCells[16],
  allCells[17],
  allCells[18],
  allCells[19],
  allCells[20],
];
const row3 = [
  allCells[21],
  allCells[22],
  allCells[23],
  allCells[24],
  allCells[25],
  allCells[26],
  allCells[27],
];
const row4 = [
  allCells[28],
  allCells[29],
  allCells[30],
  allCells[31],
  allCells[32],
  allCells[33],
  allCells[34],
];
const row5 = [
  allCells[35],
  allCells[36],
  allCells[37],
  allCells[38],
  allCells[39],
  allCells[40],
  allCells[41],
];
const rows = [row0, row1, row2, row3, row4, row5, topRow];

// ---------- Variables -----------
let gameIsLive = true;
let blueIsNext = true;

// ***************************************************
// --------- Functions: General Utility --------------
// ***************************************************

// Converts the class list for each cell into an array and returns that to the handleCellMouseOver event
const getClassListArray = (cell) => {
  const activeClases = cell.classList; // Sets activeClases variable to the cell (e.target) classList
  return [...activeClases]; // Returns activeClasses in an array created from the spread of each cell's classList
};

// Find the cell location based on its assigned row-x and col-x classes
const getCellLocation = (cell) => {
  const cellClassList = getClassListArray(cell); // Calls function to convert each cell's classList into an array
  const rowClass = cellClassList.find((className) => className.includes("row")); // Finds all instances of classes that includes the word "row"
  const colClass = cellClassList.find((className) => className.includes("col")); // Finds all instances of classes that includes the word "col"

  const rowIndex = rowClass[4]; // The row number is always the 5th element (row-X) of the array (so index is 4)
  const colIndex = colClass[4]; // The col number is always the 5th element (col-X) of the array (so index is 4)

  const rowNumber = parseInt(rowIndex, 10); // converts rowIndex type into an intiger
  const colNumber = parseInt(colIndex, 10); // converts colIndex type into an intiger

  return [rowNumber, colNumber]; // Returns the row & col number as an array
};

// Find first open cell
const getFirstOpenCellForCol = (colIdx) => {
  const colWithoutTop = columns[colIdx].slice(0, 6); // Gets col array without the top row
  for (const cell of colWithoutTop) {
    const cellChips = getClassListArray(cell);
    if (!cellChips.includes("blue") && !cellChips.includes("red")) {
      return cell;
    }
  }
  return null;
};

// Check array of winningCells to see if it is 4, if so, add the win class to HTML
const checkWinningCells = (cells) => {
  if (cells.length < 4) return false; // Returns false if there are not 4 in a row & you should continue checking for win

  // If there are 4 winningCells then set gameIsLive to false & add the win class to the cells
  gameIsLive = false;
  for (const cell of cells) {
    cell.classList.add("win");
  }

  // Updates status area to anounce the winning color
  statusSpan.textContent = `SUCK IT ${blueIsNext ? "RED" : "BLUE"}, ${
    blueIsNext ? "BLUE" : "RED"
  } WINS!!!`;

  return true; //
};

// Get the color of a cell
const getColorOfCell = (cell) => {
  const cellActiveClasses = getClassListArray(cell);

  // Returns color of cell or null if there is no color
  if (cellActiveClasses.includes("blue")) {
    return "blue";
  } else if (cellActiveClasses.includes("red")) {
    return "red";
  } else {
    return null;
  }
};

// ----------- Check game status ------------
const checkGameStatus = (cell) => {
  const color = getColorOfCell(cell);
  if (!color) return; // If getColorOfCell returns null, then just return & do nothing
  const [rowIdx, colIdx] = getCellLocation(cell);

  // ----------- Check for horizonal win -----------
  let winningCells = [cell];
  let rowToCheck = rowIdx; // Checks the row index

  // Check cells to the left of the current cell
  let colToCheck = colIdx - 1; // Checks col to the left of the current cell [rowIdx, colIdx]
  // Loop to check cell to the left as long as the cell is on the game board
  while (colToCheck >= 0) {
    const cellToCheck = rows[rowToCheck][colToCheck]; // Gives us the cell associated with chip being checked
    // If block that checks if the color of current cell equals the color of the previous cell
    if (getColorOfCell(cellToCheck) === color) {
      winningCells.push(cellToCheck); // Adds the current cell to the winningCell array
      colToCheck--; // Decrements the colToCheck by 1 so it continues to look left
    } else {
      break; // If the cell to the left is not the same color or it is empty, then break out of the loop
    }
  }

  // Check cells to the right of the current cell
  colToCheck = colIdx + 1; // Checks col to the right of the current cell [rowIdx, colIdx]
  // Loop to check cell to the right as long as the cell is on the game board
  while (colToCheck <= 6) {
    const cellToCheck = rows[rowToCheck][colToCheck]; // Gives us the cell associated with chip being checked
    // If block that checks if the color of current cell equals the color of the previous cell
    if (getColorOfCell(cellToCheck) === color) {
      winningCells.push(cellToCheck); // Adds the current cell to the winningCell array
      colToCheck++; // Increments the colToCheck by 1 so it continues to look right
    } else {
      break; // If the cell to the right is not the same color or it is empty, then break out of the loop
    }
  }
  let isWinningCombo = checkWinningCells(winningCells);
  if (isWinningCombo) return; // If it was a winning set of chips, then do nothing and return

  // --------- END CHECK HORIZONTAL ----------

  // ----------- Check for vertical win -----------
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

  // Function checking if there are 4 cells of the same color
  checkWinningCells(winningCells);
};
// ************ END Functions: General Utility ************
//

// ***************************************************
// ---------- Functions: Event handlers --------------
// ***************************************************

// Executes whenever a mouseover event is detected in any of the cells
const handleCellMouseOver = (e) => {
  if (!gameIsLive) return; // Ir gameIsLive is false, then nothing happens and the function is simply returned
  const cell = e.target; // Gets the target value of each cell & sends that info to getCellLocation function
  const [rowIdx, colIdx] = getCellLocation(cell); // Destructure the row & col number array
  //   console.log(rowIdx, colIdx);

  // Determine the mouseover col & show the player's chip in the topCells
  const topCell = topCells[colIdx]; // Sets topCell to be the corresponding topCells with the index of colIdx
  topCell.classList.add(blueIsNext ? "blue" : "red"); // Adds the active player's (blue or red) chip to be visible on the appropriate topCell
};

// Executes whenever a mouseout event is detected in any of the cells
const handleCellMouseOut = (e) => {
  const cell = e.target; // Gets the target value of each cell & sends that info to getCellLocation function
  const [rowIdx, colIdx] = getCellLocation(cell); // Destructure the row & col number array

  const topCell = topCells[colIdx]; // Sets topCell to be the corresponding topCells with the index of colIdx
  topCell.classList.remove("blue"); // Removes blue class, if it exists
  topCell.classList.remove("red"); // Removes red class, if it exists
};

// Executes whenever a click event is detected in any of the cells
const handleCellClick = (e) => {
  if (!gameIsLive) return; // Ir gameIsLive is false, then nothing happens and the function is simply returned
  const cell = e.target; // Gets the target value of each cell & sends that info to getCellLocation function
  const [rowIdx, colIdx] = getCellLocation(cell); // Destructure the row & col number array
  const openCell = getFirstOpenCellForCol(colIdx);

  if (!openCell) return; // If there are no open cells in that column then just return & do nothing

  openCell.classList.add(blueIsNext ? "blue" : "red"); // If cell is open then add either blue or red chip

  // Check game status
  checkGameStatus(openCell);

  // Toggles players chip between blue & red
  const topCell = topCells[colIdx];
  if (gameIsLive) {
    topCell.classList.toggle("blue");
    topCell.classList.toggle("red");
    blueIsNext ? (blueIsNext = false) : (blueIsNext = true); // Flips between blue being true & false
  }
};
// ************ END Functions: Event handlers ************

// ***************************************************
// ---------------- Event Listeners ------------------
// ***************************************************

// Get all cells by looping over the rows arr & then over each row
// Loops over every rows (which is an array of each row's cells)
for (const row of rows) {
  // Loops over every cell in the row
  for (const cell of row) {
    cell.addEventListener("mouseover", handleCellMouseOver); // Listens for a mouseover event & then runs the handleCellMouseOver function
    cell.addEventListener("mouseout", handleCellMouseOut); // Listens for a mouseout event & then runs the handleCellMouseOut function
    cell.addEventListener("click", handleCellClick); // Listens for click event & then runs handleCellClick function
  }
}

// Reset button event listener to clear the board and reset game variable to initial setting
resetButton.addEventListener("click", () => {
  // Loops over every row array (which contains all of the individual row arrays)
  for (const row of rows) {
    // Now loops over each individual row array to get the cell
    for (const cell of row) {
      // Removes alll of the 'blue', 'red', & 'win' classes so the board is blannk
      cell.classList.remove("blue");
      cell.classList.remove("red");
      cell.classList.remove("win");
    }
  }

  gameIsLive = true; // Resets gameIsLive to its original true value
  blueIsNext = true; // Resets blueIsNext to its original true value
  statusSpan.textContent = ""; // Resets the statusSpan message back to an empty string
});
// ************ END Event Listeners ************
