//define the Grid as a function of (x,y)
//mines to appear in randomized coordinates Maths.random (x,y)
//set number of mines each game, and for every incremental game, increment the mines by 1
//use x and y axis to draw coordinates and maths random to select the numbers between 0-3
// create winning combination, which is to select square on all four sides of existing square ONLY, then avoiding the mines, go from start to finish
//Steps
//for the first game, click 'Play Game' and the mines will randomly be placed on the grid



$(function(){
 startGame();
});

function startGame(){
  gridBuilder();
  pathDrawing();
  dropMines(20);
  setupPlayer();
}

var width = 6;
var start = (width*width)-(width);
var finish = (width-1);
var path  = [start];
var playerPosition = start;
var scoreCounter = 0;
var mines = [];
var mine = '<img src = "https://cdn4.iconfinder.com/data/icons/mining-icons/100/3-512.png">'
var player = '<img src ="http://www.vican.no/lei-et-foredrag/img/wdot.png">'
var finishImg = '<img src= "http://icons.iconarchive.com/icons/iconka/st-patricks-day/256/pot-of-gold-icon.png">'
var randomInt = function(min,max){
  return Math.floor(Math.random()*(max-min))+min
}
var highScore = [];


function gridBuilder(){
  $("body").append("<ul class='grid'></ul>");
  for (var i=0; i < (width*width); i++){
    $(".grid").append("<li class='squares' id='"+i+"'></li>")
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
    mines.push(randomPossibleSquare);
  }
    $('li.squares img').delay(3000).fadeOut();
}

function setupPlayer(){
  $($(".grid li")[start]).html(player);
  $($(".grid li")[finish]).html(finishImg);
  $('body').on("keydown", function(event) {
     event.preventDefault();
     $($('.grid li')[playerPosition]).css("backgroundColor", "#778899");
     // Up
     if (event.which === 38){
       // Change the position to up
       console.log("playerPosition up: " + playerPosition)
       var moveTo = (playerPosition -= width);
       // Move the player
       $($('.grid li')[moveTo]).html(player);
       
       

       playerPosition = moveTo;
     // Right
     } else if (event.which === 39){
       // Change the position to right
       console.log("playerPosition right: " + playerPosition)
       var moveTo = (playerPosition += 1);
       // Move the player
       $($('.grid li')[moveTo]).html(player);
       playerPosition = moveTo;
     }

     checkForWin();
   });
}


function checkForWin() {
  if (playerPosition === finish) {
    // alert("you win!")
    scoreCounter++;
    $('li#scoreCounter').html(scoreCounter);
    reset();
  }
  $.each(mines, function(i, mine){
    if (playerPosition == mine) {
    $($('.grid li')[playerPosition]).css("backgroundImage", "url(/images/fire.gif) no-repeat;")
      alert("you've hit a mine. Game Over");
      scoreCounter = 0;
      $('li#scoreCounter').html(scoreCounter)
      
      reset();
      console.log("scoreCounter is 0")

      //function that happens when you lose
    }  
  });
  showHighScore(scoreCounter);
}

function reset() {
  console.log("reset")
 $.each($(".squares"), function(i, square){
  $(square).html("");
  $(square).removeClass();
 })
  $('ul.grid').remove();
  playerPosition = start;
  
  gridBuilder();
  pathDrawing();
  mines = [];
  dropMines(20);
  $($(".grid li")[start]).html(player);
  $($(".grid li")[finish]).html(finishImg);
}

function showHighScore(scoreCounter){
 highScore.push(scoreCounter);
 highScore.sort().reverse()
 $('#HighScoreCounter').html(highScore[0]);
}




//   for (var i = 0; i < boxes.length; i++) {
//     boxes[i].innerHTML = "";
//     boxes[i].setAttribute("class", "clear");
//   }
//   moveCount    = 1;
//   oMoves     = [];
//   xMoves     = [];
//   turnText.innerHTML = "It is X's turn";
// }

//reset the game but keep the score

// else if player position equals any of the mines, you've lost use each and for loop





