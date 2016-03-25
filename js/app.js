//define the Grid as a function of (x,y)
//mines to appear in randomized coordinates Maths.random (x,y)
//set number of mines each game, and for every incremental game, increment the mines by 1
//use x and y axis to draw coordinates and maths random to select the numbers between 0-3
// create winning combination, which is to select square on all four sides of existing square ONLY, then avoiding the mines, go from start to finish
//Steps
//for the first game, click 'Play Game' and the mines will randomly be placed on the grid

var playGame
var Grid
var x
var y
var score
var highestScore
// var mine = '<img src = "http://logic.stanford.edu/intrologic/images/mine.png">'

$(function(){
  $('li.mines').html(mine);
  $('li.mines img').delay(5000).fadeOut();
  $('li.mines').on("click", function(){
    console.log("MINES!!!")
  }) 

  $(this).addClass("mine")
function randomMine(){
      var randomNumber = Math.random();
      if (randomNumber < 0.33) {
          return "x0y1";
      } else if (randomNumber < 0.66) {
          return "x0y2";
      } else if (randomNumber < 1.00) {
          return "x0y3";
      }
    }

  var dangerMine = randomMine();

  console.log(dangerMine)

});