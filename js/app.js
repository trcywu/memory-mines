//define the Grid as a function of (x,y)
//mines to appear in randomized coordinates Maths.random (x,y)
//set number of mines each game, and for every incremental game, increment the mines by 1
//use x and y axis to draw coordinates and maths random to select the numbers between 0-3
// create winning combination, which is to select square on all four sides of existing square ONLY, then avoiding the mines, go from start to finish
//Steps
//for the first game, click 'Play Game' and the mines will randomly be placed on the grid

var playGame
var Grid
var score
var highestScore
var mine = '<img src = "http://logic.stanford.edu/intrologic/images/mine.png">'
var player = '<img src = "http://downloadicons.net/sites/default/files/blue-circle-button-icon-32722.png">'
var randomInt = function(min,max){
  return Math.floor(Math.random()*(max-min))+min
}

$(function(){
  $('li.mines').html(mine);
  $('li.x0y0').html(player);
  $('li.mines img').delay(5000).fadeOut();
  $('li.mines').on("click", function(randomMine){
  }) 
 randomInt(1,4)

  function randomMine(){
    var randomNumber = Math.random();
    if (randomNumber < 0.25) {
      return ("x2y0","x3y0")
    } else if (randomNumber < 0.50) {
      return ("x1y1" "x2y1" || "x3y1")
    } else if (randomNumber < 0.75) {
      return ("x0y2" || "x1y2" || "x2y2" || "x3y2")
    } else (randomNumber < 1.0) 
    return ("x0y3" || "x1y3" || "x2y3")
  }

  var dangerMine = randomMine();

  console.log(dangerMine)



  $(this).addClass("mine")
});