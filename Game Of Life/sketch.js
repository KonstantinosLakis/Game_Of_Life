  var scl = 5;
  var rows;
  var cols;
  var previous = [];
  var boxes = [];
  function setup(){
    rectMode(CENTER);
    frameRate(60);
    createCanvas(640, 360);
    rows = height / scl;
    cols = width / scl;
    for (var y = 0; y < rows; y ++){
      for (var x = 0; x < cols; x ++){
        boxes.push(new Box(y, x));
      }
    }
  }

  function draw() {
    background(51);
    nextStep();
    fill(0,255,0);
    for (var i = 0; i < boxes.length; i ++){
      var b = boxes[i];
      b.show();
    }
  }
  function mousePressed(){
    var row = Math.floor(mouseY / scl);
    var col = Math.floor(mouseX / scl);
    var index = row * cols + col;
    boxes[index - cols].switch = true;
    boxes[index + 1].switch = true;
    boxes[index + cols].switch = true;
    boxes[index + cols + 1].switch = true;
    boxes[index + cols - 1].switch = true;
    boxes[index].switch = false;
    boxes[index - 1].switch = false;
    boxes[index - cols - 1].switch = false;
    boxes[index - cols + 1].switch = false;
  }
