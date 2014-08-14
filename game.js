var WIDTH = 400;
var HEIGHT = 300;

var container = document.getElementById("container");
var canvas = document.getElementById("game");

var ctx = canvas.getContext("2d");

var ballX = 200;
var ballY = 150;
var radius = 25;

gameLoop();

function gameLoop() {
  drawBall();
  moveBall();
  requestAnimationFrame(gameLoop);
}

function drawBall() {
  ctx.fillStyle = "rgba(223, 239, 255, 0.2)";
  ctx.fillRect(0, 0, WIDTH, HEIGHT);

  ctx.beginPath();
  ctx.arc(ballX, ballY, radius, 0, 2 * Math.PI, false);
  ctx.fillStyle = '#0f0';
  ctx.fill();
  ctx.lineWidth = 2;
  ctx.strokeStyle = '#030';
  ctx.stroke();
}

function moveBall() {
  var speed = 10;
  ballX += (speed / 2) - Math.random() * speed;
  ballY += (speed / 2) - Math.random() * speed;
  ballX = clamp(ballX, 0, WIDTH);
  ballY = clamp(ballY, 0, HEIGHT);
}

function clamp(num, min, max) {
  return Math.min(Math.max(num, min), max);
};
