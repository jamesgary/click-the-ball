var WIDTH = 400;
var HEIGHT = 300;

var container = document.getElementById("container");
var canvas = document.getElementById("game");

var ctx = canvas.getContext("2d");

var ballX = 200;
var ballY = 150;
var radius = 25;

drawBall();

function drawBall() {
  ctx.beginPath();
  ctx.arc(ballX, ballY, radius, 0, 2 * Math.PI, false);
  ctx.fillStyle = '#0f0';
  ctx.fill();
  ctx.lineWidth = 2;
  ctx.strokeStyle = '#030';
  ctx.stroke();
}
