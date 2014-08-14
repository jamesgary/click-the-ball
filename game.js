$(function() {
  var canvas = document.getElementById("game");
  var context = canvas.getContext("2d");

  var x = 200;
  var y = 150;
  var xSpeed = 0;
  var ySpeed = 0;
  var radius = 25;

  canvas.addEventListener("click", function() {
    var mouseX = event.x - canvas.offsetLeft;
    var mouseY = event.y - canvas.offsetTop;
    if (distance(x, y, mouseX, mouseY) < radius) {
      flashText("YAY", mouseX, mouseY, 0, 255, 0)
    } else {
      flashText("BOO", mouseX, mouseY, 255, 0, 0)
    }
  });

  requestAnimationFrame(gameLoop);

  function gameLoop() {
    drawBall();
    processGame();
    requestAnimationFrame(gameLoop);
  }

  function drawBall() {
    context.fillStyle = "rgba(223, 239, 255, 0.1)";
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.beginPath();
    context.arc(x, y, radius, 0, 2 * Math.PI, false);
    context.fillStyle = 'green';
    context.fill();
    context.lineWidth = 2;
    context.strokeStyle = '#030';
    context.stroke();
  }

  function flashText(text, x, y, r, g, b) {
    var startTime = Date.now();
    context.font = "800 24pt Arial";
    context.textAlign = "center";
    var opacity = 1;
    var flashFunc = function() {
      context.fillStyle = "rgba("+[r,g,b,opacity].join(',')+")";
      context.strokeStyle = "rgba("+[0,0,0,opacity].join(',')+")";
      context.fillText(text, x, y);
      context.strokeText(text, x, y);
      y--;
      opacity -= .04;
      if (opacity > 0) {
        requestAnimationFrame(flashFunc);
      }
    }
    requestAnimationFrame(flashFunc);
  }

  function processGame() {
    //var speed = 10;
    //var maxSpeed = 10;
    //x += (speed / 2) - Math.random() * speed;
    //y += (speed / 2) - Math.random() * speed;
    //if (x < 0) { x = 0 }
    //if (y < 0) { y = 0 }
    //if (x > canvas.width) { x = canvas.width }
    //if (y > canvas.height) { y = canvas.height }
    var speedVariance = 1;
    var maxSpeed = 1;
    xSpeed += (speedVariance / 2) - (Math.random() * speedVariance);
    ySpeed += (speedVariance / 2) - (Math.random() * speedVariance);
    xSpeed = clamp(xSpeed, -1 * maxSpeed, maxSpeed);
    ySpeed = clamp(ySpeed, -1 * maxSpeed, maxSpeed);

    x += xSpeed;
    y += ySpeed;
    if (x < 0 || x > canvas.width) {
      xSpeed *= -1;
      x = clamp(x, 0, canvas.width);
    }
    if (y < 0 || y > canvas.height) {
      ySpeed *= -1;
      y = clamp(y, 0, canvas.height);
    }
  }

  function clamp(num, min, max) {
    return Math.min(Math.max(num, min), max);
  };
  function distance(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
  }
});

  //if (window.devicePixelRatio) {
  //  $(canvas).css('height', canvas.height);
  //  $(canvas).css('width', canvas.width);
  //  canvas.height *= window.devicePixelRatio;
  //  canvas.width *= window.devicePixelRatio;
  //  context.scale(window.devicePixelRatio, window.devicePixelRatio);
  //}

