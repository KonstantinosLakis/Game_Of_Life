
function Box(row, col) {
  this.row = row;
  this.col = col;
  this.x = col * scl + scl / 2 - 1;
  this.y = row * scl + scl / 2 - 1;
  this.switch = (random(1) < 0.1);
  this.show = function(){
    if (this.switch){
      rect(this.x, this.y, scl, scl);
    }
  }
  this.isInner = function(){
    return ((this.row != 0 && this.col != 0) &&
            (this.row != 0 && this.col != cols - 1) &&
            (this.row != rows - 1 && this.col != 0) &&
            (this.row != rows - 1 && this.col != cols - 1))
       }
  this.countNeighbors = function(){
    var ownIndex = boxes.indexOf(this);
    var s = 0;
    if (this.isInner){
    for (var i = 0; i < 9; i ++){
      var neighIndex = ownIndex;
      if (i < 3) {
        if (this.row != 0){
         neighIndex -= cols;
         neighIndex += i - 1
       };
      } else if (i < 6 && i != 4){
        neighIndex += i - 4;
        if ((this.col == 0 && i == 3) || (this.col == cols - 1 && i == 5)){
          neighIndex = ownIndex;
        }
      } else if (i >= 6){
        if (this.row != rows - 1){
        neighIndex += cols;
        neighIndex += i - 7;
      }
      }
      if ((neighIndex >= 0) && (neighIndex < boxes.length) && (neighIndex != ownIndex) && (previous[neighIndex] == true)){
        s ++;
      }
    }
  }
  else {
    if (this.row == 0 && this.col == 0){
      if (previous[1] == true){
        s++;
      }
      if (previous[cols] == true){
        s++;
      }
      if (previous[cols + 1] == true){
        s++;
      }
    }
    if (this.row == 0 && this.col == cols - 1){
      if (previous[cols - 2] == true){
        s++;
      }
      if (previous[2 * cols - 2] == true){
        s++;
      }
      if (previous[2 * cols - 1] == true){
        s++;
      }
    }
    if (this.row == rows - 1 && this.col == 0){
      if (previous[(rows-1) * cols + 1] == true){
        s++;
      }
      if (previous[(rows-2) * cols + 1] == true){
        s++;
      }
      if (previous[(rows-2) * cols] == true){
        s++;
      }
    }
    if (this.row == rows - 1 && this.col == cols - 1){
      if (previous[rows * cols - 2] == true){
        s++;
      }
      if (previous[(rows-2) * cols + 1] == true){
        s++;
      }
      if (previous[(rows-2) * cols + 2] == true){
        s++;
      }
    }
  }
    return s;
  }
}

function nextStep(){
  for (var i = 0; i < boxes.length; i ++){
    previous[i] = boxes[i].switch;
  }
  for (var i = 0; i < boxes.length; i ++){
    var b = boxes[i];
    var neigh = b.countNeighbors();
    if (b.switch == false && neigh == 3){
      b.switch = true;
    }
    if (b.switch == true){
      if (neigh < 2 || neigh > 3){
        b.switch = false;
      }
    }
    //console.log(neigh);
    //console.log(b);
  }
}
