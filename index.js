var gamePattern = [];

var userClickedPattern = [];

var buttonColours = ["red", "blue", "green", "yellow"];

var level = 0;

var started = false;

$(document).keypress(function() {
    if (!started) {
        nextSequence();
        $("h1").text("Level" + " " + level);
        started = true;
    }
})

$(".btn").click(function() {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    animatePress(userChosenColour);
    playSound(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});


function nextSequence() {
    userClickedPattern = [];
    level++;
    $("h1").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

function playSound(name) {
    var audio = new Audio ("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour) {
    var clicked = $("#" + currentColour).addClass("pressed");
    setTimeout(function() {
        clicked.removeClass("pressed");}, 100);
}

function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        
        if (gamePattern.length === userClickedPattern.length) {
            setTimeout(function() {
                nextSequence();}, 1000);
        }
    } else {
        var wrongSound = new Audio ("sounds/wrong.mp3");
        wrongSound.play();

        var gameOver = $("body").addClass("game-over");
        setTimeout(function() {
            gameOver.removeClass("game-over");}, 200)

        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function startOver () {
    gamePattern = [];
    level = 0;
    started = false;
}