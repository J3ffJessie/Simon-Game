var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = !1;
var level = 0;

$(document).keypress(function () {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = !0
  }
});
$("#level-title").click(function(){
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = !0
  }
});
$(".btn").click(function () {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1)
});

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    $("p").text("Success!");
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence()
      }, 1000)
    }
  } else {
    $("#level-title").text("Game Over");
    $("p").text("Wrong!");
    gameOver()
  }
}

function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour)
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play()
}

function playWrong() {
  var audio = new Audio("sounds/wrong.mp3");
  audio.play()
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed")
  }, 100)
}

function gameOver() {
  $("body").addClass("game-over");
  setTimeout(function () {
    $("body").removeClass("game-over")
  }, 800);
  playWrong();
  $("#level-title").text("Game Over, Press Any Key to Restart");
  startOver()
}

function startOver() {
  level = 0;
  started = !1;
  gamePattern = []
}