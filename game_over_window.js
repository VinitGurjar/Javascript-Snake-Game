const gameOverWindow = document.getElementById("game-over-window");
const gameOverWindowScore = document.getElementById("game-over-window-score");
const gameOverWindowButton = document.getElementById("game-over-window-button");

gameOverWindowButton.addEventListener("pointerdown", refreshPage);

function refreshPage() {
  window.location = "/";
}

function updateGameOverWindowScore(score) {
  gameOverWindowScore.innerHTML = score;
}

export function openGameOverWindow(score) {
  gameOverWindow.setAttribute("data-is-open", true);
  updateGameOverWindowScore(score);
}

