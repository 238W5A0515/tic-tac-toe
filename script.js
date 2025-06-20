const board = document.getElementById("board");
const status = document.getElementById("status");
const resetBtn = document.getElementById("reset");
let currentPlayer = "X";
let cells = Array(9).fill(null);

function checkWinner() {
  const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];
  for (let pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
      status.innerText = `${cells[a]} Wins!`;
      document.querySelectorAll(".cell").forEach(cell => cell.classList.add("disabled"));
      return true;
    }
  }
  if (!cells.includes(null)) {
    status.innerText = "It's a Draw!";
    return true;
  }
  return false;
}

function computerMove() {
  let availableCells = cells.map((val, index) => val === null ? index : null).filter(val => val !== null);
  if (availableCells.length > 0) {
    let randomIndex = availableCells[Math.floor(Math.random() * availableCells.length)];
    cells[randomIndex] = "O";
    document.getElementById(`cell-${randomIndex}`).innerText = "O";
    if (!checkWinner()) {
      currentPlayer = "X";
      status.innerText = `Player X's Turn`;
    }
  }
}

function handleClick(index) {
  if (!cells[index] && currentPlayer === "X") {
    cells[index] = currentPlayer;
    document.getElementById(`cell-${index}`).innerText = currentPlayer;
    if (!checkWinner()) {
      currentPlayer = "O";
      status.innerText = "Computer's Turn";
      setTimeout(computerMove, 500);
    }
  }
}

function createBoard() {
  board.innerHTML = "";
  cells = Array(9).fill(null);
  status.innerText = "Player X's Turn";
  currentPlayer = "X";
  for (let i = 0; i < 9; i++) {
    let cell = document.createElement("div");
    cell.classList.add("cell");
    cell.id = `cell-${i}`;
    cell.addEventListener("click", () => handleClick(i));
    board.appendChild(cell);
  }
}

resetBtn.addEventListener("click", createBoard);

createBoard();
