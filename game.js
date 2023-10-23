/*Step 3 - Declare the array of colors */
let buttonsColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let level = 0; // Step 7.1 Create a variable
let currentPosition = 0;

/* step 1 - Incorporate Jquery inside */

/*Step 2 - Create A New Pattern */
function nextSequence() {
  level++; // Step 7.4 increase the level every this nextSequence is called
  $("#level-title").text("Level " + level); // Step 7.5 Update h1 text

  let randomNumber = Math.round(Math.random() * 3);
  gamePattern.push(buttonsColours[randomNumber]);
  //Step 3 - Show the Sequence to the User with Animations and Sounds
  $("#" + buttonsColours[randomNumber]) // Make the random button flashes and play the sound
    .fadeOut(100)
    .fadeIn(100);
  playSound(buttonsColours[randomNumber]);
}

// Step 7 - Start the Game
$(document).keydown(function () {
  // check if a key was pressed
  let option = $("#level-title").text();
  switch (option) {
    case "Press A Key to Start":
      $("#level-title").text("Level " + level); // Step 7.3 // set h1 value
      nextSequence();
      break;
    case "Game Over, Press Any Key to Restart":
      startOver();
      $("#level-title").text("Level " + level);
      nextSequence();
      break;
    default:
      console.log("");
  }  
});

//Step 4 - Check Which Button is Pressed
$("div.btn").click(function () {
  // listen to all clicks done on the buttons
  let userChosenColour = this;

  userClickedPattern.push($(userChosenColour).attr("id"));

  // Step 5 - Add Sounds to Button Clicks
  playSound($(userChosenColour).attr("id"));

  // Step 6 - Add Animations to User Clicks
  animatePress($(userChosenColour).attr("id"));

  // check user answer
  checkAnswer();
});

// Step 5.1 - Create a playsound function
function playSound(name) {
  let sound = new Audio("sounds/" + name + ".mp3");
  sound.play();
}

//Step 6.1 - Create the animation Function
function animatePress(currentColour) {
  // get the id from the pressed button
  let pressedBtn = $("#" + currentColour);

  //Step 6.2 - Add class after btn have been pressed
  pressedBtn.addClass("pressed");

  //Step 6.3 removes the class after 100milisseconds
  setTimeout(function () {
    pressedBtn.removeClass("pressed");
  }, 100); // 1ms = 0.001s | 100ms = 0.1s
}

// checkAnswer
function checkAnswer() {
  if (
    gamePattern[currentPosition] ===
    userClickedPattern[userClickedPattern.length - 1]
  ) {
    // check if the compared values for both arrays
    // are at the end.
    if (currentPosition === gamePattern.length - 1) {
      // increase the level and flash the button for the game to continue
      setTimeout(function () {
        nextSequence();
      }, 1000);
      currentPosition = 0;
    } else {
      currentPosition++;
    }
  } else {
    // game over
    gameOver();
    startOver();
  }
}

function startOver() {
  // empyt both arrays
  gamePattern = [];
  userClickedPattern = [];
  level = 0;
}

function gameOver() {
  playSound("wrong");
  $("#level-title").text("Game Over, Press Any Key to Restart");
  // flash with the red the background color of the game
  $("body").addClass("game-over");
  // waits a 1s and remove the background-color
  setTimeout(function () {
    $("body").removeClass("game-over");
  }, 200);
}
