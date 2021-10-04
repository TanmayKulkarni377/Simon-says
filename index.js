var buttonColours=["red","blue","green","yellow"];

var gamePattern =[], userClickedPattern=[];

function nextSequence() {
//6. Once nextSequence() is triggered, reset the userClickedPattern to an empty array ready for the next level.
  userClickedPattern = [];

	var randomNumber=Math.floor(Math.random()*4);

	var randomChosenColour= buttonColours[randomNumber];
	
	gamePattern.push(randomChosenColour);
	
	$("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
	
	var audio = new Audio('sounds/'+randomChosenColour + '.mp3');
	audio.play();
	 level++;
	 $("#level-title").text("Level "+ level);

};

$(".btn").on("click", function(){

    var userChosenColour = $(this).attr("id");

    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);

 checkAnswer(userClickedPattern.length-1);
  });

function playSound(name){
var audio = new Audio('sounds/'+name + '.mp3');
	audio.play();
};


function animatePress(currentColour) {
  	$("#" + currentColour).addClass("pressed");

  	setTimeout(function() {
  		$("#" + currentColour).removeClass("pressed");
  	}, 100);
}

var  startred= false; 
var level =0;

$(".Start").on("click", function() {
  if (!startred) {
    $("#level-title").text("Level " + level);
    nextSequence();
    startred = true;
    $(".Start").hide();
  }
});

function checkAnswer(currentLevel){

	 if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

      console.log("success");

      //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
      if (userClickedPattern.length === gamePattern.length){

        //5. Call nextSequence() after a 1000 millisecond delay.
        setTimeout(function () {
          nextSequence();
        }, 1000);

      }

    } else {

    	var audio = new Audio('sounds/wrong.mp3');
	audio.play();
	$(".Start").show();
 $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    $("h1").text("Game Over , Press Start Key to Restart, Score:"+level-1);
    startOver();
  };
};

function startOver(){
	startred=false;
	level=0;
	gamePattern=[];
	userClickedPattern=[];
	
}
