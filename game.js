var WIDTH = 400;
var HEIGHT = 300;

var container = document.getElementById("container");
var canvas = document.getElementById("game");

var ctx = canvas.getContext("2d");

var ballX = 200;
var ballY = 150;
var xSpeed = 0;
var ySpeed = 0;
var radius = 25;

container.addEventListener("click", function() {
  var mouseX = event.x - container.offsetLeft;
  var mouseY = event.y - container.offsetTop;
  if (distance(ballX, ballY, mouseX, mouseY) < radius) {
    console.log("YAY");
  } else {
    console.log("BOO");
  }
});

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
  var speedVariance = 1;
  var maxSpeed = 5;
  xSpeed += (speedVariance / 2) - (Math.random() * speedVariance);
  ySpeed += (speedVariance / 2) - (Math.random() * speedVariance);
  xSpeed = clamp(xSpeed, -1 * maxSpeed, maxSpeed);
  ySpeed = clamp(ySpeed, -1 * maxSpeed, maxSpeed);

  ballX += xSpeed;
  ballY += ySpeed;
  if (ballX < 0 || ballX > WIDTH) {
    ballX = clamp(ballX, 0, WIDTH);
    xSpeed *= -1;
  }
  if (ballY < 0 || ballY > HEIGHT) {
    ballY = clamp(ballY, 0, HEIGHT);
    ySpeed *= -1;
  }
}

function clamp(num, min, max) {
  return Math.min(Math.max(num, min), max);
};

function distance(x1, y1, x2, y2) {
  return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
}
