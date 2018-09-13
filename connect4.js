/** Connect Four
 * 
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */




var currPlayer = 1;  // active player: 1 or 2
var board = [];      // array of rows, each row is array of cells  (board[y][x])


/** makeBoard: create in-JS board structure: 
 *    board = array of rows, each row is array of cells  (board[y][x]) 
 */

var WIDTH;
var HEIGHT;

var button = document.getElementsByTagName("button");
function setBoard(){
  button[0].disabled = true;
  
  WIDTH = document.getElementById('width').value
  HEIGHT = document.getElementById('height').value

  makeBoard()
  makeHtmlBoard()
}

function makeBoard() {
  // TODO: set "board" to empty HEIGHT x WIDTH matrix array
  
  //for iterate to push in rows
  for(let j = 0; j < HEIGHT; j++){
    board.push([]);
    for (let i=0; i<WIDTH; i++) {
      board[j].push(null);
    }
  }
// disables button after first use
  
}

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  // TODO: get "board" variable from the item in HTML w/ID of "board"
  let boardHTML = document.getElementById('board');
  // TODO: add comment for this code
  var top = document.createElement("tr");
  top.setAttribute("id", "column-top");
  top.addEventListener("click", handleClick);

  //creates clicking row, does not hold pieces!
  for (var x = 0; x < WIDTH; x++) {
    var headCell = document.createElement("th");
    headCell.setAttribute("id", x);  
    top.append(headCell);
  }
  boardHTML.append(top);

  // This creates the cells where the pieces will go!
  for (var y = 0; y < HEIGHT; y++) {
    var row = document.createElement("tr")
    for (var x = 0; x < WIDTH; x++) {
      var cell = document.createElement("td");
      cell.setAttribute("id", `${y}-${x}`);  
      row.append(cell);
  
    }
    boardHTML.append(row)
  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol(x) {
  // TODO: write the real version of this, rather than always returning 0
  //needs to return available slot to fill
  //look at each element at x pos it arrays from bottom up in that column
  //ask the element:are you empty/null?
  for (let i=HEIGHT-1; i>=0; i--) {
    let currentCell = board[i][x];
    if (!currentCell) {
      return i;
    }
  }
  alert('Column full. Choose a new column.');
  return null;
}

/** placeInTable: update DOM to place piece into HTML board */

function placeInTable(y, x) {
  // TODO: make a div and insert into correct table cell
  //if player is blue, place 1, if red place 2
  board[y][x] = currPlayer;
  let cell = document.getElementById(`${y}-${x}`);
  let currentPiece = document.createElement('div');
  currentPiece.classList.add(`piece`);
  currentPiece.classList.add(`piece-${currPlayer}`);
  cell.append(currentPiece);
}

/** endGame: announce game end */

function endGame(msg) {
  // TODO: pop up alert message
  setTimeout(function(){
    alert(msg); 
  },1000);
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
  var x = +evt.target.id;

  // get next spot in column (if none, ignore click)
  var y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  // TODO: add line to update in-memory board
  placeInTable(y, x)

  // check for tie
  // TODO: check if all cells in board are filled; if so call, call endGame

  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }
  //check for tie
  var tie = checkTie();
  if(tie){
    setTimeout(function(){
      alert('ITS A TIE!'); 
    },1000);
    ;}

  // switch players
  if(currPlayer === 1){
    currPlayer = 2;
  }
  else{
    currPlayer = 1;
  }
}

function checkTie() {
  return board[0].every(function(elem){
    return (elem === 1 || elem === 2);
  })

  // for(let i = 0; i< HEIGHT; i++){
  //   for (let j=0; j<WIDTH; j++){
  //     board[i][j].every(function(){
  //       return !null;
  //     });
  //   }   
  // }
}
/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {

  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(([y, x]) =>
      y >= 0 && y < HEIGHT && x >= 0 && x < WIDTH && board[y][x] === currPlayer
    )

  }

  // TODO: read and understand this code. Add comments to help you.

  for (var y = 0; y < HEIGHT; y++) {
    for (var x = 0; x < WIDTH; x++) {

      var horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      var vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      var diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      var diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

