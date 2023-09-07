const cells = document.querySelectorAll(".cell");
const restartButton = document.querySelector(".restart-button");
let currentPlayer = "X";
let gameActive = true;

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

cells.forEach((cell) => {
  cell.addEventListener("click", () => handleCellClick(cell));
});

function handleCellClick(cell) {
  const cellIndex = Array.from(cells).indexOf(cell);
  if (!gameActive || cell.textContent !== "") {
    return;
  }

  cell.textContent = currentPlayer;
  cell.classList.add(currentPlayer);

  if (checkWin(currentPlayer)) {
    endGame(false);
  } else if (isBoardFull()) {
    endGame(true);
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
  }
}

function checkWin(player) {
  return winningCombinations.some((combination) => {
    return combination.every((index) =>
      cells[index].classList.contains(player)
    );
  });
}

function isBoardFull() {
  return Array.from(cells).every((cell) => cell.textContent !== "");
}

function endGame(draw) {
  gameActive = false;
  if (draw) {
    document.querySelector(".game-container h1").textContent = "It's a Draw!";
  } else {
    document.querySelector(
      ".game-container h1"
    ).textContent = `${currentPlayer} Wins!`;
  }
}

restartButton.addEventListener("click", () => {
  cells.forEach((cell) => {
    cell.textContent = "";
    cell.classList.remove("X", "O");
  });

  document.querySelector(".game-container h1").textContent = "Tic Tac Toe";
  currentPlayer = "X";
  gameActive = true;
});
