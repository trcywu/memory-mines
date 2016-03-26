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

//  function randomMine(){
//    var randomNumber = Math.random();
//    if (randomNumber < 0.25) {
//      return ("x2y0","x3y0")
//    } else if (randomNumber < 0.50) {
//      return ("x1y1" "x2y1" || "x3y1")
//    } else if (randomNumber < 0.75) {
//      return ("x0y2" || "x1y2" || "x2y2" || "x3y2")
//    } else (randomNumber < 1.0) 
//    return ("x0y3" || "x1y3" || "x2y3")
//  }

//  var dangerMine = randomMine();

//  console.log(dangerMine)

//  $(this).addClass("mine")



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
  bindArrowEvents();
});

var width = 4;
var start = (width*width)-(width);
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
  $($(".grid li")[start]).html(player)
  $('body').on("keydown", function(squares) {
     squares.preventDefault();
     if (squares.which === 38){
      var moveTo = (playerPosition - width);
      $($('.grid li')[moveTo]).html(player);
        playerPosition = moveTo
     }
     else if (squares.which === 39){
      var moveTo = (playerPosition + 1);
      $($('.grid li')[moveTo]).html(player);
        playerPosition = moveTo
     }
 })
}

// check back

function bindArrowEvents(){
}


