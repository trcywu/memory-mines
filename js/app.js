$(startGame);

function startGame(){
  gridBuilder();
  pathDrawing();
  dropMines(20);
  setupPlayer();
}

var width          = 6;
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
  
  $('li.squares img').delay(2500).fadeOut();
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
  var $squares = $(".grid li");

  $($squares[playerPosition]).css("backgroundColor", "#778899");
  
  var audio = new Audio('./audio/bloop.mp3');
  audio.play();
  var moveTo;

  switch (event.which) {
    case 38: 
      moveTo = (playerPosition -= width);
      break;
    case 39:
      moveTo = (playerPosition += 1);
      break;
  }

  $($squares[moveTo]).html(player);
  playerPosition = moveTo;

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
  $.each($(".squares"), function(i, square){
    $(square).html("");
    $(square).removeClass();
  });

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