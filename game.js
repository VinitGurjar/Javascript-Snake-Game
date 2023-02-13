import {
  update as updateSnake,
  draw as drawSnake,
  SNAKE_SPEED,
  snakeBody,
  getSnakeHead,
  snakeIntersection,
} from "./snake.js";
import { update as updateFood, draw as drawFood } from "./food.js";
import { outsideGrid } from "./grid.js";
import { openGameOverWindow } from "./game_over_window.js";

let lastRenderTime = 0;
let gameOver = false;
const gameBoard = document.getElementById("game-board");
const highestScore = document.getElementById("highest-score");

function getHighestScore() {
  return + localStorage.getItem("highestScore") || 0;
}

function restoreHighestScore() {
  highestScore.innerHTML = getHighestScore();
}

function main(currentTime) {
  if (gameOver) {
    if (snakeBody.length > getHighestScore()) {
      localStorage.setItem("highestScore", snakeBody.length);
    }
    openGameOverWindow(snakeBody.length);
    return;
  }

  window.requestAnimationFrame(main);
  const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;
  if (secondsSinceLastRender < 1 / SNAKE_SPEED) return;

  lastRenderTime = currentTime;

  update();
  draw();
}

restoreHighestScore();
window.requestAnimationFrame(main);

function update() {
  updateSnake();
  updateFood();
  checkDeath();
}

function draw() {
  gameBoard.innerHTML = "";
  drawSnake(gameBoard);
  drawFood(gameBoard);
}

function checkDeath() {
  gameOver = outsideGrid(getSnakeHead()) || snakeIntersection();
}
