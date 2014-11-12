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
  board.addEventListener("click", function(event) {
    console.log(event.target);
    var cellxy = event.target;
    //var cellxy = document.getElementById(event.target.id);
    //cellxy.onclick = onCellClick;
    onCellClick.call(cellxy,event);
    //call replaces this with cellxy and passes event as its argument
  });



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
  // var counti = 0;
  // var countj = 0;

  for(var i = height-1; i < height+2; i++)
  {
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

// function getCell(x,y)
// {
//   return document.getElementById(x + '-' + y);
// }

// function countLiveNeighbors(x,y)
// {
//   for(var xOffset = -1; xOffset <= 1; xOffset++)
//   {
//     for(var yOffset = -1; yOffset <=1; yOffset++)
//     {
//       if(xOffset !== 0 || yOffset !== 0)
//       {
      
//         var neighbor = getCell(x+xOffset,y+yOffset);
//         //if(neighbor && )
//         {
//           console.log(getCell(neighbor)); 
//         }
//       }
//     }
//   }
// }

GameOfLife.prototype.step = function () {
  // Here is where you want to loop through all the cells
  // on the board and determine, based on it's neighbors,
  // whether the cell should be dead or alive in the next
  // evolution of the game

  // for(var x = 0; x < this.height; x++)
  // {
  //   for(var y = 0; y < this.width; y++)
  //   {
  //     var cell = getCell(x,y);
  //     var countAliveNeighbors = countLiveNeighbors(x,y);
  //   }
  // }

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
  //     //console.log(currCell);
  //     //check alive or dead
  //       //if alive
  //         //check h-1, w-1
  //         //check h-1, w
  //         //check h-1, w+1
  //         //check h, w-1
  //         //check h, w+1
  //         //check h+1, w-1
  //         //check h+1, w
  //         //check h+1, w+1
  //         //if sum of alive == 2 || 3, live on
  //         //else, dead (add class change)
  //       //if dead
  //         //check h-1, w-1
  //         //check h-1, w
  //         //check h-1, w+1
  //         //check h, w-1
  //         //check h, w+1
  //         //check h+1, w-1
  //         //check h+1, w
  //         //check h+1, w+1
  //         //if sum of alive == 3, live (add class change)

  //var changedEls = {}
  var changedEls = document.getElementsByClassName("change");
  var tempChangEl;
  //debugger;
  //changedEls.forEach(function(ele) 
  while(changedEls[0])
  { 
    tempChangEl = changedEls[0];
    tempChangEl.className = tempChangEl.className.replace(" change", "");
    if(tempChangEl && tempChangEl.className == "alive") {
      tempChangEl.className = "dead";
      tempChangEl.setAttribute('data-status', 'dead');
    }
    else if (tempChangEl) {
      tempChangEl.className = "alive";
      tempChangEl.setAttribute('data-status', 'alive');
    }
  }
  //}

  //document.getElementsByClassName('change')
    //if data-status dead, change to alive
    //if data-status alive, change to dead
    //remove class change
  //debugger;
  console.log(this.height, this.width);
};

GameOfLife.prototype.clear = function()
{
  location.reload();
}

GameOfLife.prototype.pause = function ()
{
  clearInterval(cInterval);
}

GameOfLife.prototype.tableLoop = function(func)
{
  for(var h = 0; h < this.height; h++)
  {
    for(var w = 0; w < this.width; w++)
    {
      func(w,h);
    }
  }
}

GameOfLife.prototype.resetRandom = function()
{
  this.pause();
  var randNum = function(){ return Math.round(Math.random()) };
  var cell;
  var w = arguments[0] || null,
      y = arguments[1] || null;
 
  this.tableLoop(function()
  {
      // cell = document.getElementById(y+"-"+x);
      // if(randNum())
      // {
      //   cell.className = "alive";
      //   cell.setAttribute('data-status', 'alive');
      // }
      // else
      // {
      //   cell.className = "dead";
      //   cell.setAttribute('data-status', 'dead');
      // }
      arguments[2] = document.getElementById(w+"-"+h);
      if(arguments[1]())
      {
        arguments[2].className = "alive";
        arguments[2].setAttribute('data-status', 'alive');
      }
      else
      {
        arguments[2].className = "dead";
        arguments[2].setAttribute('data-status', 'dead');
      }

  }, randNum, cell);

  // for(var x = 0; x < this.height; x++)
  // {
  //   for(var y = 0; y < this.width; y++)
  //   {
      // cell = document.getElementById(y+"-"+x);
      // if(randNum())
      // {
      //   cell.className = "alive";
      //   cell.setAttribute('data-status', 'alive');
      // }
      // else
      // {
      //   cell.className = "dead";
      //   cell.setAttribute('data-status', 'dead');
      // }
  //   }
  // }
}

var cInterval;

GameOfLife.prototype.enableAutoPlay = function () {
  // Start Auto-Play by running the 'step' function
  // automatically repeatedly every fixed time interval
  cInterval = setInterval(function()
  {
    gol.step();
  }, 200);
};

var gol = new GameOfLife(6,6);
gol.createAndShowBoard();

