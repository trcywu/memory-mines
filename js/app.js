$(startGame);

var width          = 6;
var difficulty     = 10;
var start          = (width*width)-(width);
var finish         = (width-1);
var path           = [start];
var playerPosition = start;
var scoreCounter   = 0;
var mines          = [];
var mine           = '<img src="images/mine.png">'
var player         = '<img src="images/whiteDot.png">'
var finishImg      = '<img src="images/pot-of-gold.png">'
var highScore      = [];
var play           = false;

function startGame(){
  gridBuilder();
  pathDrawing();
  dropMines(difficulty);
  setupPlayer();
}

function gridBuilder(){
  var $body = $("body");

  $body.append("<ul class='grid'></ul>");
  for (var i=0; i < (width*width); i++){
    $(".grid").append("<li class='squares' id='"+i+"'></li>")
  }
}

function pathDrawing(){
  // Make a path randomly choosing up and right
  var lastMove    = path[path.length-1];
  // The final move needs to be where the pot of gold is
  var moveOptions = [-width, +1];
  var randomMove  = moveOptions[Math.floor(Math.random()*moveOptions.length)]
  var nextMove    = lastMove + randomMove;

  // Check if the next move is outside the grid
  if (lastMove % width === (width-1)) {
    nextMove = lastMove - width;
  } 

  // Check if top row
  if (nextMove < 0) {
    nextMove = lastMove + 1;
  }

  path.push(nextMove);
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
  
  $('li.squares img').delay(2500 * (1/difficulty)).fadeOut("slow", function(){
    play = true;
  });
}

function setupPlayer(){
  var $squares = $(".grid li");
  var $body    = $("body");

  $($squares[start]).html(player);
  $($squares[finish]).html(finishImg);
  $body.on("keydown", move);
}

function move() {
  event.preventDefault();
  if (!play) return false;

  var $squares = $(".grid li");  
  var audio = new Audio('./audio/bloop.mp3');
  audio.play();

  var previousPosition = playerPosition;
  var nextPosition;

  switch (event.which) {
    case 38: // right
      nextPosition = (playerPosition - width);
      break;
    case 39: // up 
      nextPosition = (playerPosition + 1);
      break;
    case 37: // left
      nextPosition = (playerPosition - 1);
      break;
    case 40: // down
      nextPosition = (playerPosition + width);
      break;
    default:
      return false;
  }

  // Check if the next move is outside the grid
  if (nextPosition % width === 0) {
    nextPosition = previousPosition;
    return true;
  } 

  // Check if top row
  if (nextPosition < 0) {
    nextPosition = previousPosition;
    return true;
  }

  $($squares[previousPosition]).css("backgroundColor", "#778899");
  $($squares[previousPosition]).html("");
  $($squares[nextPosition]).html(player);
  playerPosition = nextPosition;

  checkForWin();
}

function checkForWin() {
  var $squares      = $(".grid li");
  var $scoreCounter = $('li#scoreCounter');

  if (playerPosition === finish) {
    var audio = new Audio('./audio/win.mp3');
    audio.play();
    scoreCounter++;
    $scoreCounter.html(scoreCounter);
    reset();
  }

  $.each(mines, function(i, mine){
    if (playerPosition == mine) {
    $($squares[playerPosition]).css("backgroundImage", "url(/images/fire.gif) no-repeat;");
      var audio = new Audio('./audio/explosion1.mp3');
      audio.play();
      alert("you've hit a mine. Game Over");
      scoreCounter = 0;
      $scoreCounter.html(scoreCounter)
      
      reset();
    }  
  });

  showHighScore(scoreCounter);
}

function reset() {
  var $squares      = $(".grid li");

  $.each($squares, function(i, square){
    $(square).html("");
    $(square)[0].style = null;
    $(square).attr("class", "squares");
  });

  playerPosition = start;
  pathDrawing();
  mines = [];
  dropMines(difficulty++);

  $($squares[start]).html(player);
  $($squares[finish]).html(finishImg);
}


function showHighScore(scoreCounter){
  highScore.push(scoreCounter);
  highScore.sort().reverse()
  $('#HighScoreCounter').html(highScore[0]);
}



