var canvas = document.getElementById("myCanvas");
canvas.height = document.body.offsetHeight;
canvas.width = document.body.offsetWidth;
var ctx = canvas.getContext("2d");
var hex = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"];


times = [];
function loop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  update();
  draw();
  requestAnimationFrame(loop);
}

function Bubble () {
  this.x = Math.random() * canvas.width;
  this.y = Math.random() * canvas.height;
  this.color = "#00" + hex[Math.trunc(Math.random()*hex.length-1)] + "" + hex[Math.trunc(Math.random()*hex.length-1)] + "ff";
  this.alpha = Math.random() * 0.75;
  this.radius = 10 + (Math.random() * 40);
  this.vel = {
    x: Math.random() * 2 - 1,
    y: Math.random() * 2 - 1
  };
  this.update = function(canvas) {
    if (this.x > canvas.width + 50 || this.x < -50) {
      this.vel.x = -this.vel.x;
    }
    if (this.y > canvas.height + 50 || this.y < -50) {
      this.vel.y = -this.vel.y;
    }
    this.x += this.vel.x;
    this.y += this.vel.y;
  };
  this.draw = function(ctx) {
    ctx.beginPath();
    ctx.globalAlpha = this.alpha;
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.radius, 0, 2*Math.PI);
    ctx.lineWidth = 0;
    ctx.fill();
  }
}

var bubbles = [];
for (var i = 0; i < canvas.width * canvas.height / 10000; i++) {
  bubbles.push(new Bubble());
}

var lastTime = Date.now();

function update() {
  var diff = Date.now() - lastTime;
  for (var frame = 0; frame * 50 < diff; frame++) {
    for (var index = 0; index < bubbles.length; index++) {
      bubbles[index].update(canvas);
    }
  }
  lastTime = Date.now();
}

function draw() {
  for (var i = 0; i < bubbles.length; i++) {
    var bubble = bubbles[i];
    bubble.draw(ctx, canvas);
  }
}

function resize() {
  canvas.width = document.body.offsetWidth;
  canvas.height = document.body.scrollHeight;
}
window.addEventListener('orientationchange', resize, true);
window.addEventListener('resize', resize, true);

loop();
