

// COMP2361 Mobile Application Development: Application Report
// Student Number: 16008021.
// Submission Date: Tuesday 8th May 2018.
// Assignment Number: Assignment 2.
// Assignment Title: COMP2361 Mobile Application Development.


// https://cordova.apache.org/docs/en/latest/ (Cordova.apache.org, 2018)




// Canvas Variables 
var canvas; // Variable for the Canvas.
var body; // Variable for the Body.


// Image Variables
var level; // Array which will hold the level templates.
var mainAssets; // Array which holds the Balls, Holes and Goal.
var wallAssets; // Array which holds the Walls.


// Player Variables
var playerPositionX; // Array which holds X Position of Goal and Player.
var playerPositionY; // Array which holds Y Position of Goal and Player.
var playerVelocityX; // Variable which holds X Velocity of Player.
var playerVelocityY; // Variable which holds Y Velocity of Player.
var playerAccelerationX; // Variable which holds X Acceleration of Player.
var playerAccelerationY; // Variable which holds Y Acceleration of Player.


// Enemy Variables
var enemyType; // Array which holds the Enemy Type.
var enemyPositionX; // Array which holds X Position of Enemy.
var enemyPositionY; // Array which holds Y Position of Enemy.
var enemyVelocityX; // Variable which holds X Velocity of Enemy.
var enemyVelocityY; // Variable which holds Y Velocity of Enemy.
var enemyAccelerationX; // Variable which holds X Acceleration of Enemy.
var enemyAccelerationY; // Variable which holds Y Acceleration of Enemy.


// Wall Variables
var wallType; // Array which holds the Wall Type.
var wallDefaultType; // Array which holds the Default Wall Type.
var wallPositionX; // Array which holds X Position of Wall.
var wallPositionY; // Array which holds Y Position of Wall.
var wallVelocityX; // Variable which holds X Velocity of Wall.
var wallVelocityY; // Variable which holds Y Velocity of Wall.
var wallAccelerationX; // Variable which holds X Acceleration of Wall.
var wallAccelerationY; // Variable which holds Y Acceleration of Wall.
var wallAccelerationZ; // Variable which holds Z Acceleration of Wall.


// Loop Variables
var loop; // Variable for loops
var loopTwo; // A back up Variable for loops
var loopThree; // A back up Variable for loops
var loopFour; // A back up Variable for loops


// Other Variables
var pause; // Variable which pauses the game.
var limit; // Variable which limits actions.
var limitTwo; // A back up Variable which limits actions.
var previous; // Variable which stores .
var previousTwo;
var switcher;
var breaker;
var touch;
var time;
var rating;
var ratingSwitch;
var renderTime;




// 1	----------------------------------------------------------------------------------------------------------------------------------------------------------------	1




window.onload = function() {
	
	
	// Canvas, Body and Graphics context
	canvas = document.getElementById("canvas");
    canvas.width = (8/10)*window.innerWidth;
    canvas.height = (8/10)*window.innerHeight;
	body = canvas.getContext("2d");
	
	
	// Images and Variables for Images
	level = document.getElementById("levelBase");
	mainAssets = [document.getElementById("playerGoal"), document.getElementById("playerBall"), document.getElementById("enemyHole"), document.getElementById("enemyBall")];
	wallAssets = [document.getElementById("wallBase"), document.getElementById("wallArrowShake"), document.getElementById("wallArrowTilt"), document.getElementById("wallArrowTouch"), document.getElementById("wallCloudShake"), document.getElementById("wallCloudTilt"), document.getElementById("wallCloudTouch"), document.getElementById("wallRotatedArrowShake"), document.getElementById("wallRotatedArrowTilt"), document.getElementById("wallRotatedArrowTouch")];
	
	
	// Player Variables: [Goal, Player]
	playerPositionX = [canvas.width - canvas.width/20,  0];
	playerPositionY = [canvas.height/2,  0];
	playerVelocityX = 0;
	playerVelocityY = 0;
	playerAccelerationX = 0;
	playerAccelerationY = 0;
	
	
	// Enemy Variables: [Bottom Right Hole, Bottom Middle Hole, Bottom Left Hole, Remaining Hole, Enemy Ball]
	enemyType = [2,2,2,2,3]; 
	enemyPositionX = [canvas.width - canvas.width/20,  canvas.width/2 - canvas.width/20,  0,  canvas.width - 3*canvas.width/20,  canvas.width - canvas.width/20];
	enemyPositionY = [canvas.height - canvas.height/10,canvas.height - canvas.height/10,canvas.height - canvas.height/10,     canvas.height/2,0];
	enemyVelocityX = [0,0,0,0,0];
	enemyVelocityY = [0,0,0,0,0];
	enemyAccelerationX = [0,0,0,0,0];
	enemyAccelerationY = [0,0,0,0,0];

	
	// Wall Variables: First Set of Base, Second Set of Base, Third Set of Base, One of each Interactive Wall.
	wallType = [0,0,0,0,0,0,0,     0,0,0,0,0,0,0,     0,0,0,0,0,0,0,     1,2,3,4,5,6,7,8,9];
	wallDefaultType = [0,0,0,0,0,0,0,     0,0,0,0,0,0,0,     0,0,0,0,0,0,0,     1,2,3,4,5,6,7,8,9];
	wallPositionX = [canvas.width/10,canvas.width/10,canvas.width/10,canvas.width/10,canvas.width/10,canvas.width/10,canvas.width/10,     canvas.width/2,canvas.width/2,canvas.width/2,canvas.width/2,canvas.width/2,canvas.width/2,canvas.width/2,     canvas.width - canvas.width/20,canvas.width - 2*canvas.width/20,canvas.width - 3*canvas.width/20,canvas.width - 4*canvas.width/20,canvas.width - 4*canvas.width/20,canvas.width - 4*canvas.width/20,canvas.width - 4*canvas.width/20,     4*canvas.width/20,4*canvas.width/20,8*canvas.width/20,5*canvas.width/20,canvas.width/2 - canvas.width/20,canvas.width - 4*canvas.width/20,canvas.width/2 + canvas.width/20,canvas.width - 4*canvas.width/20,4*canvas.width/20];
	wallPositionY = [0,canvas.height/10,2*canvas.height/10,3*canvas.height/10,4*canvas.height/10,5*canvas.height/10,6*canvas.height/10,     canvas.height - canvas.height/10,canvas.height - 2*canvas.height/10,canvas.height - 3*canvas.height/10,canvas.height - 4*canvas.height/10,canvas.height - 5*canvas.height/10,canvas.height - 6*canvas.height/10,canvas.height - 7*canvas.height/10,     canvas.height/2 - canvas.height/10,canvas.height/2 - canvas.height/10,canvas.height/2 - canvas.height/10,canvas.height/2 - canvas.height/10,canvas.height/2,canvas.height/2 + canvas.height/10,canvas.height/2 + 2*canvas.height/10,     3*canvas.height/10,6*canvas.height/10,6*canvas.height/10,5*canvas.height/10,0,8*canvas.height/10,0,0,0];                                          
	wallVelocityX = [0,0,0,0,0,0,0,     0,0,0,0,0,0,0,     0,0,0,0,0,0,0,     0,0,0,0,0,0,0,0,0];
	wallVelocityY = [0,0,0,0,0,0,0,     0,0,0,0,0,0,0,     0,0,0,0,0,0,0,     0,0,0,0,0,0,0,0,0];
	wallAccelerationX = [0,0,0,0,0,0,0,     0,0,0,0,0,0,0,     0,0,0,0,0,0,0,     0,0,0,0,0,0,0,0,0];
	wallAccelerationY = [0,0,0,0,0,0,0,     0,0,0,0,0,0,0,     0,0,0,0,0,0,0,     0,0,0,0,0,0,0,0,0];
	wallAccelerationZ = [0,0,0,0,0,0,0,     0,0,0,0,0,0,0,     0,0,0,0,0,0,0,     0,0,0,0,0,0,0,0,0];
	
	
	// Other Variables
	pause = true;
	limit = 0;
	limitTwo = 0;
	switcher = 1;
	previous = 1;
	previousTwo = 1;
	breaker = 1;
	touch = 0;
	time = 0;
	rating = 5;
	ratingSwitch = [15,12,10,8];
	renderTime = 1;
	
	
	// Adds Level
	body.beginPath();
	body.drawImage(level,0,0,canvas.width,canvas.height);
	
	
	// Adds Player and Goal.
	for(loop = 0; loop < playerPositionX.length; loop+=1) {
		body.drawImage(mainAssets[loop],playerPositionX[loop],playerPositionY[loop],canvas.width/20,canvas.height/10);	
	}
	
	
	// Add Enemies
	for(loop = 0; loop < enemyType.length; loop+=1) {
		body.drawImage(mainAssets[enemyType[loop]],enemyPositionX[loop],enemyPositionY[loop],canvas.width/20,canvas.height/10);
	}
	
	
	// Add Walls
	for(loop = 0; loop < wallType.length; loop+=1) {
		body.drawImage(wallAssets[wallType[loop]],wallPositionX[loop],wallPositionY[loop],canvas.width/20,canvas.height/10);
	}
	
	
	// CODE from SWEETALERT. "Sweetalert". T4t5.github.io. N.p., 2017. Web. 09 Apr. 2018.
	swal({
		title: "How to Play", // Title of Alert Box.
		text: "Tilt your phone to control the Red Ball. Guide the Red Ball to the Yellow Goal. Avoid the Blue Holes otherwise you end up where you started. Beware of the Purple Ball who is just as Evil. Tilt, Touch and Shake your Phone to Control the special type of Walls allowing you to change the maze to benefit you. Good Luck!", // Main Text of Alert Box.
		confirmButtonColor: "#0b8e42", // Colour of Confirm Button.
		confirmButtonText: "Start Game", // Text within Confirm Button
		closeOnConfirm: true // The Alert disappears when the confirm button is pressed.
	},
	function(){
		window.location = "#pageone"; // Goes to Page one.
		pause = false; // Unpause.
	});
	// End of Code.
	
	
	// Events
	document.addEventListener("deviceready", onDeviceReady, false); // Event which runs the function onDeviceReady() when Device is Ready.
	
	
	// Setting Intervals
	window.setInterval(render,renderTime);
	render();
	
	
}




// 2	----------------------------------------------------------------------------------------------------------------------------------------------------------------	2




// Function which creates the application's Pause, Resume and Menubutton Listeners.
function onDeviceReady() {
    document.addEventListener("pause", onPause, false);
    document.addEventListener("resume", onResume, false);
    document.addEventListener("menubutton", onMenuKeyDown, false);
}


// onPause Function
function onPause() {
	pause = true; // Pause.
	window.location = "#pagetwo"; // Goes to Page two.
}


// onResume Function
function onResume() {
	pause = true; // Pause.
	window.location = "#pagetwo"; // Goes to Page two.
}


// onMenuKeyDown Function
function onMenuKeyDown() {
	pause = true; // Pause.
	window.location = "#pagetwo"; // Goes to Page two.
}


// unPause Function
function unPause() {
	pause = false; // Unpause.
	window.location = "#pageone"; // Goes to Page one.
}


// restart Function
function restart() {
	window.location = "#pageone"; // Goes to Page one.
	location.reload(); // Reloads page
}




// 3	----------------------------------------------------------------------------------------------------------------------------------------------------------------	3




// Main Function
function render() {
	
	
	if (pause == false) {

		time = (Number(time) + Number(renderTime/200));
		document.getElementById('time').innerHTML = "Time: " + time.toFixed(2);


		// Motion Function
		window.ondevicemotion = function(deviceMotionEvent) {
		
		
			// Player Acceleration
			if ( playerAccelerationX/(Math.abs(playerAccelerationX)) == deviceMotionEvent.accelerationIncludingGravity.y/(Math.abs(deviceMotionEvent.accelerationIncludingGravity.y)) ) {
			playerAccelerationX = (1/40)*deviceMotionEvent.accelerationIncludingGravity.y;
			}
			else {
				playerAccelerationX = (1/80)*deviceMotionEvent.accelerationIncludingGravity.y;
			}
			if ( playerAccelerationY/(Math.abs(playerAccelerationY)) == deviceMotionEvent.accelerationIncludingGravity.x/(Math.abs(deviceMotionEvent.accelerationIncludingGravity.x)) ) {
			playerAccelerationY = (1/40)*deviceMotionEvent.accelerationIncludingGravity.x;
			}
			else {
				playerAccelerationY = (1/80)*deviceMotionEvent.accelerationIncludingGravity.x;
			}
		
		
			// Enemy Acceleration
			for(loop = 0; loop < enemyType.length; loop+=1) {
				
				
				// Enemy Ball
				if (enemyType[loop] == 3) {
					if ( enemyAccelerationX[loop]/(Math.abs(enemyAccelerationX[loop])) == deviceMotionEvent.accelerationIncludingGravity.y/(Math.abs(deviceMotionEvent.accelerationIncludingGravity.y)) ) {
						enemyAccelerationX[loop] = (1/40)*deviceMotionEvent.accelerationIncludingGravity.y;
					}
					else {
						enemyAccelerationX[loop] = (1/80)*deviceMotionEvent.accelerationIncludingGravity.y;
					}		
					if ( enemyAccelerationY[loop]/(Math.abs(enemyAccelerationY[loop])) == deviceMotionEvent.accelerationIncludingGravity.x/(Math.abs(deviceMotionEvent.accelerationIncludingGravity.x)) ) {
						enemyAccelerationY[loop] = (1/40)*deviceMotionEvent.accelerationIncludingGravity.x;
					}
					else {
						enemyAccelerationY[loop] = (1/80)*deviceMotionEvent.accelerationIncludingGravity.x;
					}
				}		
			}
			
			
			// Wall Acceleration
			for(loop = 0; loop < wallType.length; loop+=1) {	

			
				// wallArrowShake
				if (wallDefaultType[loop] == 1) {
					if (Math.abs(wallAccelerationZ[loop] - deviceMotionEvent.accelerationIncludingGravity.z) > 3) {
						wallAccelerationX[loop] = -0.1;
					}
					else {
						wallAccelerationX[loop] =  0.01;
					}
					wallAccelerationZ[loop] = deviceMotionEvent.accelerationIncludingGravity.z;
				}
				
				
				// wallArrowTilt
				if (wallDefaultType[loop] == 2) {
					if ( wallAccelerationX[loop]/(Math.abs(wallAccelerationX[loop])) == deviceMotionEvent.accelerationIncludingGravity.y/(Math.abs(deviceMotionEvent.accelerationIncludingGravity.y)) ) {
						wallAccelerationX[loop] = (1/40)*deviceMotionEvent.accelerationIncludingGravity.y;
					}
					else {
						wallAccelerationX[loop] = (1/80)*deviceMotionEvent.accelerationIncludingGravity.y;
					}
				}
			
				
				// wallCloudShake
				if (wallDefaultType[loop] == 4) {
					for(loopTwo = 0; loopTwo < enemyType.length; loopTwo+=1) {
						if (Math.abs(wallAccelerationZ[loop] - deviceMotionEvent.accelerationIncludingGravity.z) < 3) {
							wallType[loop] = 10;
							limit = 1;
						}
						else if (((playerPositionX[1] >= wallPositionX[loop] + canvas.width/20 || playerPositionX[1] <= wallPositionX[loop] - canvas.width/20) && (playerPositionY[1] >= wallPositionY[loop] + canvas.height/10 || playerPositionY[1] <= wallPositionY[loop] - canvas.height/10)) && ((enemyPositionX[loopTwo] >= wallPositionX[loop] + canvas.width/20 || enemyPositionX[loopTwo] <= wallPositionX[loop] - canvas.width/20) && (enemyPositionY[loopTwo] >= wallPositionY[loop] + canvas.height/10 || enemyPositionY[loopTwo] <= wallPositionY[loop] - canvas.height/10))) {
							limit = limit - 0.01;
							if (limit < 0) {
								wallType[loop] = 4;
							}
						}	
					}
				}
				
				
				// wallCloudTilt
				if (wallDefaultType[loop] == 5) {
					for(loopTwo = 0; loopTwo < enemyType.length; loopTwo+=1) {
						if (Math.abs(previous) + Math.abs(previousTwo) + 1.5 < Math.abs(deviceMotionEvent.accelerationIncludingGravity.x) + Math.abs(deviceMotionEvent.accelerationIncludingGravity.y)) {
							switcher = -1*switcher;
							if (switcher == 1) {
								wallType[loop] = 10;
							}
							if (switcher == -1) {
								if (((playerPositionX[1] >= wallPositionX[loop] + canvas.width/20 || playerPositionX[1] <= wallPositionX[loop] - canvas.width/20) && (playerPositionY[1] >= wallPositionY[loop] + canvas.height/10 || playerPositionY[1] <= wallPositionY[loop] - canvas.height/10)) && ((enemyPositionX[loopTwo] >= wallPositionX[loop] + canvas.width/20 || enemyPositionX[loopTwo] <= wallPositionX[loop] - canvas.width/20) && (enemyPositionY[loopTwo] >= wallPositionY[loop] + canvas.height/10 || enemyPositionY[loopTwo] <= wallPositionY[loop] - canvas.height/10))) {
									wallType[loop] = 5;
								}
								else {
									wallType[loop] = 10;
								}
							}
						}
					}
					previous = deviceMotionEvent.accelerationIncludingGravity.x;
					previousTwo = deviceMotionEvent.accelerationIncludingGravity.y;
				}
				
				
				// wallRotatedArrowShake
				if (wallDefaultType[loop] == 7) {
					if (Math.abs(wallAccelerationZ[loop] - deviceMotionEvent.accelerationIncludingGravity.z) > 3) {
						wallAccelerationY[loop] = -0.1;
					}
					else {
						wallAccelerationY[loop] =  0.01;
					}
					wallAccelerationZ[loop] = deviceMotionEvent.accelerationIncludingGravity.z;
				}
				
				
				// wallRotatedArrowTilt
				if (wallDefaultType[loop] == 8) {
					if ( wallAccelerationY[loop]/(Math.abs(wallAccelerationY[loop])) == deviceMotionEvent.accelerationIncludingGravity.y/(Math.abs(deviceMotionEvent.accelerationIncludingGravity.y)) ) {
						wallAccelerationY[loop] = (1/40)*deviceMotionEvent.accelerationIncludingGravity.y;
					}
					else {
						wallAccelerationY[loop] = (1/80)*deviceMotionEvent.accelerationIncludingGravity.y;
					}
				}
			}	
		}
		


		
// 4	----------------------------------------------------------------------------------------------------------------------------------------------------------------	4
		


		
		// Sets Player Velocity and Position
		playerVelocityX = playerVelocityX + playerAccelerationX;
		playerVelocityY = playerVelocityY + playerAccelerationY;
		playerPositionX[1] = playerPositionX[1] + (1/4)*playerVelocityX;
		playerPositionY[1] = playerPositionY[1] + (1/4)*playerVelocityY;
		
		
		// Check to prevent Player from leaving the Canvas
		if (playerPositionX[1] > canvas.width - (1/20)*canvas.width) {
			playerPositionX[1] = canvas.width - (1/20)*canvas.width;	
			playerVelocityX = (-1/4)*playerVelocityX;
		}
		else if (playerPositionX[1] < 0) {
			playerPositionX[1] = 0;
			playerVelocityX = (-1/4)*playerVelocityX;
		}
		
		
		if (playerPositionY[1] > canvas.height - (1/10)*canvas.height) {
			playerPositionY[1] = canvas.height - (1/10)*canvas.height;
			playerVelocityY = (-1/4)*playerVelocityY;
		}
		else if (playerPositionY[1] < 0) {
			playerPositionY[1] = 0;
			playerVelocityY = (-1/4)*playerVelocityY;
		}
		
		
		// Check to see if Player wins
		if ( (playerPositionX[1] < playerPositionX[0] + canvas.width/30 && playerPositionX[1] > playerPositionX[0] - canvas.width/30) && (playerPositionY[1] < playerPositionY[0] + canvas.height/15 && playerPositionY[1] > playerPositionY[0] - canvas.height/15) ) {
			pause = true;
			
			for (loop = 0; loop < ratingSwitch.length; loop+=1) {
				if (ratingSwitch[loop] < time) {
					rating = loop + 1
				}
			}
			
			// CODE from SWEETALERT. "Sweetalert". T4t5.github.io. N.p., 2017. Web. 09 Apr. 2018.
			swal({
				title: "YOU WIN", // Title of Alert Box.
				text: "Your Time was " + time.toFixed(2) + ". Overall Rating: " + rating + "/5", // Main Text of Alert Box.
				confirmButtonColor: "#0b8e42", // Color of Confirm Button.
				confirmButtonText: "Restart Game", // Text within Confirm Button
				closeOnConfirm: false // The Alert disappears when the confirm button is pressed.
			},
			function(){
				location.reload(); // Reloads page
			});
			// End of code

			
		}
		
		
		// Enemy Mechanics
		for(loop = 0; loop < enemyType.length; loop+=1) {
			
			
			// The enemy must be alive.
			if (enemyType[loop] == 2 || enemyType[loop] == 3) {
				
				
				// Sets Enemy Velocity and Position.
				enemyVelocityX[loop] = enemyVelocityX[loop] + enemyAccelerationX[loop];
				enemyVelocityY[loop] = enemyVelocityY[loop] + enemyAccelerationY[loop];
				enemyPositionX[loop] = enemyPositionX[loop] + (1/4)*enemyVelocityX[loop];
				enemyPositionY[loop] = enemyPositionY[loop] + (1/4)*enemyVelocityY[loop];
			
			
				// Check to prevent Enemy from leaving the Canvas
				if (enemyPositionX[loop] >  canvas.width - (1/20)*canvas.width) {
					enemyPositionX[loop] =  canvas.width - (1/20)*canvas.width;
					enemyVelocityX[loop] =  (-1/4)*enemyVelocityX[loop];
				}
				else if (enemyPositionX[loop] < 0) {
					enemyPositionX[loop] =  0;
					enemyVelocityX[loop] =  (-1/4)*enemyVelocityX[loop];
				}
				if (enemyPositionY[loop] >  canvas.height - (1/10)*canvas.height) {
					enemyPositionY[loop] =  canvas.height - (1/10)*canvas.height;
					enemyVelocityY[loop] =  (-1/4)*enemyVelocityY[loop];
				}
				else if (enemyPositionY[loop] < 0) {
					enemyPositionY[loop] =  0;
					enemyVelocityY[loop] =  (-1/4)*enemyVelocityY[loop];
				}
				

				// IF Enemy hits Player/Goal.
				for(loopTwo = 0; loopTwo < playerPositionX.length; loopTwo+=1) {
					if ( (playerPositionX[loopTwo] < enemyPositionX[loop] + canvas.width/30 && playerPositionX[loopTwo] > enemyPositionX[loop] - canvas.width/30) && (playerPositionY[loopTwo] < enemyPositionY[loop] + canvas.height/15 && playerPositionY[loopTwo] > enemyPositionY[loop] - canvas.height/15) ) {	
						if (loopTwo == 1) {
							restart();
							pause = true;
						}
					}
				}
				
				
				// IF Enemy hits Wall.
				for(loopTwo = 0; loopTwo < wallType.length; loopTwo+=1) {
					if ( (enemyPositionX[loop] < wallPositionX[loopTwo] + canvas.width/20 && enemyPositionX[loop] > wallPositionX[loopTwo] - canvas.width/20) && (enemyPositionY[loop] < wallPositionY[loopTwo] + canvas.height/10 && enemyPositionY[loop] > wallPositionY[loopTwo] - canvas.height/10) && wallType[loopTwo] >= 0 && wallType[loopTwo] <= 9 ) {
						enemyPositionX[loop] = enemyPositionX[loop] - (1/4)*enemyVelocityX[loop];
						enemyPositionY[loop] = enemyPositionY[loop] - (1/4)*enemyVelocityY[loop];
						enemyVelocityX[loop] = (-1/4)*enemyVelocityX[loop];
						enemyVelocityY[loop] = (-1/4)*enemyVelocityY[loop];
						wallPositionX[loopTwo] = wallPositionX[loopTwo] - (1/4)*wallVelocityX[loopTwo];
						wallPositionY[loopTwo] = wallPositionY[loopTwo] - (1/4)*wallVelocityY[loopTwo];
						wallVelocityX[loopTwo] = (-1/4)*wallVelocityX[loopTwo];
						wallVelocityY[loopTwo] = (-1/4)*wallVelocityY[loopTwo];
					}
				}
		
		
				// IF Enemy Ball hits Enemy Hole.
				if (enemyType[loop] == 3) {
					for(loopTwo = 0; loopTwo < enemyType.length; loopTwo+=1) {
						if ( (enemyPositionX[loop] < enemyPositionX[loopTwo] + canvas.width/30 && enemyPositionX[loop] > enemyPositionX[loopTwo] - canvas.width/30) && (enemyPositionY[loop] < enemyPositionY[loopTwo] + canvas.height/15 && enemyPositionY[loop] > enemyPositionY[loopTwo] - canvas.height/15) && enemyType[loopTwo] == 2) {
							enemyType[loop] = 4;
						}
					}
				}	
			}
		}	
		
	

	
// 5	----------------------------------------------------------------------------------------------------------------------------------------------------------------	5
		
	

	
		// Wall Mechanics
		for(loop = 0; loop < wallType.length; loop+=1) {
			
			
			// The wall must be alive.
			if (wallType[loop] >= 0 && wallType[loop] <= 9) {
				
				
				// Sets Wall Velocity and Position.
				wallVelocityX[loop] = wallVelocityX[loop] + wallAccelerationX[loop];
				wallVelocityY[loop] = wallVelocityY[loop] + wallAccelerationY[loop];
				wallPositionX[loop] = wallPositionX[loop] + (1/4)*wallVelocityX[loop];
				wallPositionY[loop] = wallPositionY[loop] + (1/4)*wallVelocityY[loop];
			
			
				// Check to prevent Wall from leaving the Canvas
				if (wallPositionX[loop] >  canvas.width - (1/20)*canvas.width) {
					wallPositionX[loop] =  canvas.width - (1/20)*canvas.width;
					wallVelocityX[loop] =  (-1/4)*wallVelocityX[loop];
				}
				else if (wallPositionX[loop] < 0) {
					wallPositionX[loop] =  0;
					wallVelocityX[loop] =  (-1/4)*wallVelocityX[loop];
				}
				if (wallPositionY[loop] >  canvas.height - (1/10)*canvas.height) {
					wallPositionY[loop] =  canvas.height - (1/10)*canvas.height;
					wallVelocityY[loop] =  (-1/4)*wallVelocityY[loop];
				}
				else if (wallPositionY[loop] < 0) {
					wallPositionY[loop] =  0;
					wallVelocityY[loop] =  (-1/4)*wallVelocityY[loop];
				}
				
				
				// IF Player/Goal hits Wall.	
				for(loopTwo = 0; loopTwo < playerPositionX.length; loopTwo+=1) {
					if ( (playerPositionX[loopTwo] < wallPositionX[loop] + canvas.width/20 && playerPositionX[loopTwo] > wallPositionX[loop] - canvas.width/20) && (playerPositionY[loopTwo] < wallPositionY[loop] + canvas.height/10 && playerPositionY[loopTwo] > wallPositionY[loop] - canvas.height/10) ) {			
						playerPositionX[loopTwo] = playerPositionX[loopTwo] - (1/4)*playerVelocityX;
						playerPositionY[loopTwo] = playerPositionY[loopTwo] - (1/4)*playerVelocityY;
						playerVelocityX = (-1/4)*playerVelocityX;
						playerVelocityY = (-1/4)*playerVelocityY;	
						wallPositionX[loop] = wallPositionX[loop] - (1/4)*wallVelocityX[loop];
						wallPositionY[loop] = wallPositionY[loop] - (1/4)*wallVelocityY[loop];
						wallVelocityX[loop] = (-1/4)*wallVelocityX[loop];
						wallVelocityY[loop] = (-1/4)*wallVelocityY[loop];
					}
				}
				
				
				// IF Wall hits Wall.	
				for(loopTwo = 0; loopTwo < wallType.length; loopTwo+=1) {
					if (wallType[loopTwo] >= 0 && wallType[loopTwo] <= 9 && loopTwo != loop) {
						if ( (wallPositionX[loopTwo] < wallPositionX[loop] + canvas.width/20 && wallPositionX[loopTwo] > wallPositionX[loop] - canvas.width/20) && (wallPositionY[loopTwo] < wallPositionY[loop] + canvas.height/10 && wallPositionY[loopTwo] > wallPositionY[loop] - canvas.height/10) ) {
							wallPositionX[loop] = wallPositionX[loop] - (1/4)*wallVelocityX[loop];
							wallPositionY[loop] = wallPositionY[loop] - (1/4)*wallVelocityY[loop];
							wallVelocityX[loop] = (-1/4)*wallVelocityX[loop];
							wallVelocityY[loop] = (-1/4)*wallVelocityY[loop];
						}
					}
				}
			}	
		}	
		
		
		// Add Base and Player
		body.beginPath();
		body.clearRect(0,0,canvas.width,canvas.height);
		body.drawImage(level,0,0,canvas.width,canvas.height);
		body.drawImage(mainAssets[0],playerPositionX[0],playerPositionY[0],canvas.width/20,canvas.height/10);
		body.drawImage(mainAssets[1],playerPositionX[1],playerPositionY[1],canvas.width/20,canvas.height/10);
			
		
		// Add Enemies	
		for(loop = 0; loop < enemyType.length; loop+=1) {
			if (enemyType[loop] == 2 || enemyType[loop] == 3) {
				body.beginPath();
				body.drawImage(mainAssets[enemyType[loop]],enemyPositionX[loop],enemyPositionY[loop],canvas.width/20,canvas.height/10);
			}
		}
		
		
		// Add Walls
		for(loop = 0; loop < wallType.length; loop+=1) {
			if (wallType[loop] >= 0 && wallType[loop] <= 9) {	
				body.beginPath();
				body.drawImage(wallAssets[wallType[loop]],wallPositionX[loop],wallPositionY[loop],canvas.width/20,canvas.height/10);	
			}		
		}	
	}
}




// 6	----------------------------------------------------------------------------------------------------------------------------------------------------------------	6


// The Remaining Code has been Modified from http://bencentra.com/code/2014/12/05/html5-canvas-touch-events.html (Ben Centra, 2018)

// wallArrowTouch Functions 
window.addEventListener("touchstart", function wallArrowTouchStart(event) {
	if (pause == false) {
		touch = event.touches[0];
		breaker = 0;

		for(loopThree = 0; loopThree < wallType.length; loopThree+=1) {		

			// wallCloudTouch
			if (wallDefaultType[loopThree] == 6) {
				if (touch.pageX - (1/10)*window.innerWidth < wallPositionX[loopThree] + canvas.width/20 && touch.pageX - (1/10)*window.innerWidth > wallPositionX[loopThree] && touch.pageY - (1/10)*window.innerHeight < wallPositionY[loopThree] + canvas.height/10 && touch.pageY - (1/10)*window.innerHeight > wallPositionY[loopThree]) {			
					wallType[loopThree] = 10;			
				}		
			}	
		}
	}	
});
window.addEventListener("touchmove", function wallArrowTouchMove(event) {
	if (pause == false) {
		touch = event.touches[0];
		for(loopThree = 0; loopThree < wallType.length; loopThree+=1) {	

			// wallArrowTouch
			if (wallDefaultType[loopThree] == 3 && breaker == 0) {
				if (touch.pageX - (1/10)*window.innerWidth < wallPositionX[loopThree] + canvas.width/20 && touch.pageX - (1/10)*window.innerWidth > wallPositionX[loopThree] - (1/2)*canvas.width/20 && touch.pageY - (1/10)*window.innerHeight < wallPositionY[loopThree] + 2*canvas.height/10 && touch.pageY - (1/10)*window.innerHeight > wallPositionY[loopThree]  - canvas.height/10) {	
					wallPositionX[loopThree] = touch.pageX - (1/10)*window.innerWidth;	
				}
				
		
				// IF Player/Goal hits Wall.		
				for(loopFour = 0; loopFour < playerPositionX.length; loopFour+=1) {
					if ( (playerPositionX[loopFour] < wallPositionX[loopThree] + canvas.width/20 && playerPositionX[loopFour] > wallPositionX[loopThree] - canvas.width/20) && (playerPositionY[loopFour] < wallPositionY[loopThree] + canvas.height/10 && playerPositionY[loopFour] > wallPositionY[loopThree] - canvas.height/10) ) {
						wallPositionX[loopThree] = (canvas.width/20)*(Math.floor(wallPositionX[loopThree]/(canvas.width/20))) + (canvas.width/20)*(((wallPositionX[loopThree] - playerPositionX[loopFour])/(Math.abs(wallPositionX[loopThree] - playerPositionX[loopFour]))));
					}		
				}
				
				
				// IF Enemy hits Wall.
				for(loopFour = 0; loopFour < enemyType.length; loopFour+=1) {		
					if ( (enemyPositionX[loopFour] < wallPositionX[loopThree] + canvas.width/20 && enemyPositionX[loopFour] > wallPositionX[loopThree] - canvas.width/20) && (enemyPositionY[loopFour] < wallPositionY[loopThree] + canvas.height/10 && enemyPositionY[loopFour] > wallPositionY[loopThree] - canvas.height/10) && (enemyType[loopFour] == 2 || enemyType[loopFour] == 3)) {
						wallPositionX[loopThree] = (canvas.width/20)*(Math.floor(wallPositionX[loopThree]/(canvas.width/20))) + (canvas.width/20)*(((wallPositionX[loopThree] - enemyPositionX[loopFour])/(Math.abs(wallPositionX[loopThree] - enemyPositionX[loopFour]))));	
					}		
				}
				
				
				// IF Wall hits Wall.	
				for(loopFour = 0; loopFour < wallType.length; loopFour+=1) {
					if (wallType[loopFour] >= 0 && wallType[loopFour] <= 9 && loopFour != loopThree) {
						if ( (wallPositionX[loopFour] < wallPositionX[loopThree] + canvas.width/20 && wallPositionX[loopFour] > wallPositionX[loopThree] - canvas.width/20) && (wallPositionY[loopFour] < wallPositionY[loopThree] + canvas.height/10 && wallPositionY[loopFour] > wallPositionY[loopThree] - canvas.height/10) ) {
							wallPositionX[loopThree] = (canvas.width/20)*(Math.floor(wallPositionX[loopThree]/(canvas.width/20))) + (canvas.width/20)*(((wallPositionX[loopThree] - wallPositionX[loopFour])/(Math.abs(wallPositionX[loopThree] - wallPositionX[loopFour]))));
						}
					}
				}
			}

			
			// wallRotatedArrowTouch
			if (wallDefaultType[loopThree] == 9 && breaker == 0) {
				if (touch.pageX - (1/10)*window.innerWidth < wallPositionX[loopThree] + 2*canvas.width/20 && touch.pageX - (1/10)*window.innerWidth > wallPositionX[loopThree] - canvas.width/20 && touch.pageY - (1/10)*window.innerHeight < wallPositionY[loopThree] + 2*canvas.height/10 && touch.pageY - (1/10)*window.innerHeight > wallPositionY[loopThree]  - canvas.height/10) {	
					wallPositionY[loopThree] = touch.pageY - (1/10)*window.innerHeight;	
				}
				
		
				// IF Player/Goal hits Wall.		
				for(loopFour = 0; loopFour < playerPositionX.length; loopFour+=1) {
					if ( (playerPositionX[loopFour] < wallPositionX[loopThree] + canvas.width/20 && playerPositionX[loopFour] > wallPositionX[loopThree] - canvas.width/20) && (playerPositionY[loopFour] < wallPositionY[loopThree] + canvas.height/10 && playerPositionY[loopFour] > wallPositionY[loopThree] - canvas.height/10) ) {
						wallPositionY[loopThree] = canvas.height/10*(Math.floor(wallPositionY[loopThree]/canvas.height/20));
					}		
				}
				
				
				// IF Enemy hits Wall.
				for(loopFour = 0; loopFour < enemyType.length; loopFour+=1) {		
					if ( (enemyPositionX[loopFour] < wallPositionX[loopThree] + canvas.width/20 && enemyPositionX[loopFour] > wallPositionX[loopThree] - canvas.width/20) && (enemyPositionY[loopFour] < wallPositionY[loopThree] + canvas.height/10 && enemyPositionY[loopFour] > wallPositionY[loopThree] - canvas.height/10) && (enemyType[loopFour] == 2 || enemyType[loopFour] == 3)) {
						wallPositionY[loopThree] = canvas.height/10*(Math.floor(wallPositionY[loopThree]/(canvas.height/10)));
					}		
				}
				
				
				// IF Wall hits Wall.	
				for(loopFour = 0; loopFour < wallType.length; loopFour+=1) {
					if (wallType[loopFour] >= 0 && wallType[loopFour] <= 9 && loopFour != loopThree) {
						if ( (wallPositionX[loopFour] < wallPositionX[loopThree] + canvas.width/20 && wallPositionX[loopFour] > wallPositionX[loopThree] - canvas.width/20) && (wallPositionY[loopFour] < wallPositionY[loopThree] + canvas.height/10 && wallPositionY[loopFour] > wallPositionY[loopThree] - canvas.height/10) ) {
							wallPositionY[loopThree] = (canvas.height/10)*(Math.floor(wallPositionY[loopThree]/(canvas.height/10))) + (canvas.height/10)*(((wallPositionY[loopThree] - wallPositionY[loopFour])/(Math.abs(wallPositionY[loopThree] - wallPositionY[loopFour]))));
						}
					}
				}
			}
		}
	}
});
window.addEventListener("touchend", function wallArrowTouchEnd(event) {
	if (pause == false) {
		breaker = 1;
	}
});

