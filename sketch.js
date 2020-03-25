var X = [];
var Y = [];
var colors = ['#e6194b', '#3cb44b', '#ffe119', '#4363d8', '#f58231',
			 '#911eb4', '#46f0f0', '#f032e6', '#bcf60c', '#fabebe',
			 '#008080', '#e6beff', '#9a6324', '#fffac8', '#800000', 
			 '#aaffc3', '#808000', '#ffd8b1', '#000075', '#808080', 
			 '#ffffff', '#000000']

var T;
var learningRate = 0.00005;
let button;
function setup () {
  createCanvas(windowWidth, windowHeight-80);
  T = [Math.random(height), 4.0];
  button = createButton('Random Points');
  button.mousePressed(function() {
  	let increment = 5;
  	for (var i = 0; i < 100; i++) {
  	X.push(random(increment, width));
  	Y.push(random(increment, height-increment));
  	increment+=5;
  }
  })
}

function draw () {
  background(20);

  fill(255);
  noStroke();
  textFont('arial');
  textSize(25);
  text("Linear Regression", width/2 - 100, 40);
  textSize(20);
  fill(100);
  text(`Data Points: ${X.length}`, 20, height - 30)
  textSize(15);
  noFill();
  noStroke();

  plotData();
  if (X.length >= 2) {
    gradientDescent();
    fit();
    // console.log(cost());
  }
  noFill();
}

function mouseClicked () {
	if(mouseX>0 && mouseX<width && mouseY>0 && mouseY<height){
  X.push(mouseX);
  Y.push(mouseY);
}
}

function gradientDescent () {
  T[0] -= learningRate * gradient(0) * 10000;
  T[1] -= learningRate * gradient(1) * 0.01;
}

function gradient (n) {
  ans = 0.0;
  for (var i = 0; i < X.length; i++) {
    if (n == 0) {
      ans += (h(X[i]) - Y[i]);
    } else if (n == 1) {
      ans += (h(X[i]) - Y[i]) * X[i];
    }
  }
  // console.log(ans);
  return ans / X.length;
}

function cost () {
  ans = 0.0;
  for (var i = 0; i < X.length; i++) {
    ans += (h(X[i]) - Y[i]) * (h(X[i]) - Y[i]);
  }
  return ans / X.length;
}

function fit () {
  x1 = 0;
  y1 = Math.trunc(h(x1));
  x2 = width;
  y2 = Math.trunc(h(x2));

  stroke(255);
  line(x1, y1, x2, y2);
}

function h (x) {
  return T[0] + T[1] * x;
}


function plotData () {
  noStroke();
  fill('#40e0d0');
  for (var i = 0; i < X.length; i++) {
    ellipse(X[i], Y[i], 10);
  }
  noFill();
}

function setRadomly () {
  T[0] = Math.tan(Math.random(Math.PI));
  T[1] = Math.random(20);
}