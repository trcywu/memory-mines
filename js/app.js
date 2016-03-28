//define the Grid as a function of (x,y)
//mines to appear in randomized coordinates Maths.random (x,y)
//set number of mines each game, and for every incremental game, increment the mines by 1
//use x and y axis to draw coordinates and maths random to select the numbers between 0-3
// create winning combination, which is to select square on all four sides of existing square ONLY, then avoiding the mines, go from start to finish
//Steps
//for the first game, click 'Play Game' and the mines will randomly be placed on the grid

//  $('li.mines').html(mine);
//  $('li.x0y0').html(player);
//  $('li.mines img').delay(5000).fadeOut();
//  $('li.mines').on("click", function(randomMine){
//  }) 
// randomInt(1,4)





var Grid
var score
var highestScore
var mine = '<img src = "http://logic.stanford.edu/intrologic/images/mine.png">'
var player = '<img src = "http://downloadicons.net/sites/default/files/blue-circle-button-icon-32722.png">'
var randomInt = function(min,max){
  return Math.floor(Math.random()*(max-min))+min
}


$(function(){
  gridBuilder();
  pathDrawing();
  dropMines(4);
  setupPlayer();
  // bindArrowEvents();
  winGame();
});

var width = 4;
var start = (width*width)-(width);
var finish = (width-1);
var path  = [start];
var playerPosition = start;

function gridBuilder(){
  $("body").append("<ul class='grid'></ul>");
  for (var i=0; i < (width*width); i++){
    $(".grid").append("<li class='squares'>"+i+"</li>")
  }
}

function pathDrawing(){
  // Make a path randomly choosing up and right
  var lastMove    = path[path.length-1];
  var moveOptions = [-width, +1];
  var randomMove  = moveOptions[Math.floor(Math.random()*moveOptions.length)]
  var nextMove    = lastMove + randomMove;

  // Check if end move
  if (lastMove % width === (width-1)) {
    nextMove = lastMove - width;
  } 

  // Check if top row
  if (nextMove < 0) {
    nextMove = lastMove + 1;
  }

  path.push(nextMove);
  // console.log(path);
  if (path[path.length-1] !== (width-1)) pathDrawing();
}

function dropMines(numberOfMines){
  var possibleMoves = [];
  for (var i = 0; i < (width*width); i++) {
    if (path.indexOf(i) === -1) possibleMoves.push(i);
  }

  for (var i = 0; i < numberOfMines; i++) {
    var randomPossibleSquare = possibleMoves[Math.floor(Math.random()*possibleMoves.length)]
    $($(".grid li")[randomPossibleSquare]).html(mine);
  }
    $('li.squares img').delay(5000).fadeOut();
}

function setupPlayer(){
  $($(".grid li")[start]).html(player);
  $('body').on("keydown", function(event) {
     event.preventDefault();

     // Up
     if (event.which === 38){
       // Change the position to up
       var moveTo = (playerPosition - width);
       // Move the player
       $($('.grid li')[moveTo]).html(player);
       // Clear the grid
       $($('.grid li')[playerPosition]).empty();

       playerPosition = moveTo;
     // Right
     } else if (event.which === 39){
       // Change the position to right
       var moveTo = (playerPosition + 1);
       // Move the player
       $($('.grid li')[moveTo]).html(player);
       // Clear the grid
       $($('.grid li')[playerPosition]).empty();

       playerPosition = moveTo;
     }

     checkForWin();
   });
}

// establish a winGame function whereby if the playerPosition does not coincide with where the mines have been dropped randomPossibleSquare and arrives at the finish square then it's a win

function checkForWin() {
  if (playerPosition === finish) {
    alert("Win!");
  }
}







