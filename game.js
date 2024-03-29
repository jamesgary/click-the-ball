var WIDTH = 400;
var HEIGHT = 300;

var container = document.getElementById("container");
var canvas = document.getElementById("game");
var effectsCanvas = document.getElementById("game-effects");

var ctx = canvas.getContext("2d");
var effectsCtx = effectsCanvas.getContext("2d");
effectsCtx.font = "800 24pt Arial";
effectsCtx.textAlign = "center";

var ballX = 200;
var ballY = 150;
var xSpeed = 0;
var ySpeed = 0;
var radius = 25;
var texts = [];

container.addEventListener("click", function() {
  var mouseX = event.x - container.offsetLeft;
  var mouseY = event.y - container.offsetTop;
  if (distance(ballX, ballY, mouseX, mouseY) < radius) {
    texts.push({text: "YAY", x: mouseX, y: mouseY, r: 0, g: 255, b: 0, opacity: 1})
  } else {
    texts.push({text: "BOO", x: mouseX, y: mouseY, r: 255, g: 0, b: 0, opacity: 1})
  }
});

gameLoop();

function gameLoop() {
  drawBall();
  drawText();
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

function drawText(text, x, y, r, g, b) {
  effectsCtx.clearRect(0, 0, WIDTH, HEIGHT);
  for (var i = 0; i < texts.length; i++) {
    var t = texts[i];
    effectsCtx.fillStyle = "rgba("+[t.r,t.g,t.b,t.opacity].join(',')+")";
    effectsCtx.strokeStyle = "rgba("+[0,0,0,t.opacity].join(',')+")";
    effectsCtx.fillText(t.text, t.x, t.y);
    effectsCtx.strokeText(t.text, t.x, t.y);
    t.y--;
    t.opacity -= .04;
    if (t.opacity <= 0) {
      texts.splice(i, 1);
      i--;
    }
  }
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
