function GameOfLife(width,height) {
  this.width = width;
  this.height = height;
}

GameOfLife.prototype.createAndShowBoard = function () {
  // create <table> element
  var goltable = document.createElement("tbody");
  
  // build Table HTML
  var tablehtml = '';
  for (var h=0; h<this.height; h++) {
    tablehtml += "<tr id='row+" + h + "'>";
    for (var w=0; w<this.width; w++) {
      tablehtml += "<td data-status='dead' id='" + w + "-" + h + "'></td>";
    }
    tablehtml += "</tr>";
  }
  goltable.innerHTML = tablehtml;
  
  // add table to the #board element
  var board = document.getElementById('board');
  board.appendChild(goltable);
  
  // once html elements are added to the page, attach events to them
  this.setupBoardEvents();
};

GameOfLife.prototype.setupBoardEvents = function() {
  // each board cell has an CSS id in the format of: "x-y" 
  // where x is the x-coordinate and y the y-coordinate
  // use this fact to loop through all the ids and assign
  // them "on-click" events that allow a user to click on 
  // cells to setup the initial state of the game
  // before clicking "Step" or "Auto-Play"
  
  // clicking on a cell should toggle the cell between "alive" & "dead"
  // for ex: an "alive" cell be colored "blue", a dead cell could stay white
  
  // EXAMPLE FOR ONE CELL
  // Here is how we would catch a click event on just the 0-0 cell
  // You need to add the click event on EVERY cell on the board
  
  var onCellClick = function (e) {
    // coordinates of cell, in case you need them
    var coord_array = this.id.split('-');
    var coord_hash = {x: coord_array[0], y: coord_array[1]};
    
    // how to set the style of the cell when it's clicked
    if (this.getAttribute('data-status') == 'dead') {
      this.className = "alive";
      this.setAttribute('data-status', 'alive');
    } else {
      this.className = "dead";
      this.setAttribute('data-status', 'dead');
    }
  };

  // var cell00 = document.getElementById('0-0');
  // cell00.onclick = onCellClick;
  var board = document.getElementById("board");
  board.addEventListener("click", function() {
    console.log(event.target);
    var cellxy = event.target;
    //var cellxy = document.getElementById(event.target.id);
    cellxy.onclick = onCellClick;
  })
};

Object.prototype.checkCell = function()
{
  //var sum = s || 0;
  // var width = w || -1;
  // var height = h || -1;
  //debugger;
  var sum = 0;
  var id = this.id.split('-');
  var width = parseInt(id[0]);
  var height = parseInt(id[1]);
  var counti = 0;
  var countj = 0;

  for(var i = height-1; i < height+2; i++)
  {
    counti++;
    for(var j = width-1; j < width+2; j++)
    {

      //debugger;
      currCell = document.getElementById(j+"-"+i);
      if(currCell && currCell.getAttribute('data-status') == 'alive')
      {
        sum++;
      }
    }
  }

  // console.log(i);
  // counti = 0;
  //this.getAttribute('data-status') == 'alive'
  //sum++;
          //check h-1, w-1
          //check h-1, w
          //check h-1, w+1
          //check h, w-1
          //check h, w+1
          //check h+1, w-1
          //check h+1, w
          //check h+1, w+1 

  return sum;
}

GameOfLife.prototype.step = function () {
  // Here is where you want to loop through all the cells
  // on the board and determine, based on it's neighbors,
  // whether the cell should be dead or alive in the next
  // evolution of the game
  var currCell;
  var tempSum = 0;

  for (var h=0; h<this.height; h++) {
    //debugger;
      
    for (var w=0; w<this.width; w++) {

      currCell = document.getElementById(w+"-"+h);

      // debugger;

      if(currCell.getAttribute('data-status') == 'alive')
      {

        tempSum = currCell.checkCell();
        tempSum--;

        if(tempSum != 2 && tempSum != 3)
        {
           currCell.className += " change";
          //currCell.setAttribute("class", "change");
        }

      }

      else
      {

        tempSum = currCell.checkCell();

        if(tempSum == 3)
        {
          currCell.className += " change";
          //currCell.setAttribute("class", "change");
        }

      }
    }
  }
      //console.log(currCell);
      //check alive or dead
        //if alive
          //check h-1, w-1
          //check h-1, w
          //check h-1, w+1
          //check h, w-1
          //check h, w+1
          //check h+1, w-1
          //check h+1, w
          //check h+1, w+1
          //if sum of alive == 2 || 3, live on
          //else, dead (add class change)
        //if dead
          //check h-1, w-1
          //check h-1, w
          //check h-1, w+1
          //check h, w-1
          //check h, w+1
          //check h+1, w-1
          //check h+1, w
          //check h+1, w+1
          //if sum of alive == 3, live (add class change)

  var changedEls = document.getElementsByClassName("change");
  // debugger;
  for (var i = 0; i < changedEls.length; i++) {
    changedEls[i].className = changedEls[i].className.replace(" change", "");
    if(changedEls[i] && changedEls[i].className == "alive") {
      changedEls[i].className = "dead";
      changedEls[i].setAttribute('data-status', 'dead');
    }
    else if (changedEls[i]) {
      changedEls[i].className = "alive";
      changedEls[i].setAttribute('data-status', 'alive');
    }
  }

  //document.getElementsByClassName('change')
    //if data-status dead, change to alive
    //if data-status alive, change to dead
    //remove class change
  //debugger;
  console.log(this.height, this.width);
};

GameOfLife.prototype.enableAutoPlay = function () {
  // Start Auto-Play by running the 'step' function
  // automatically repeatedly every fixed time interval
  
};

var gol = new GameOfLife(5,5);
gol.createAndShowBoard();


















