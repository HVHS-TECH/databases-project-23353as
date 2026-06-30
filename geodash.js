/*******************************************************/
// P5.play: A simple game
// 
// This game can be used as an extra game for the 12COMP
// and 13COMP Databases assessments
//
// Written by Mr Britton
/*******************************************************/
let currentUserID = null;
console.log("Running the game");
firebase.auth().onAuthStateChanged(authStateChanged);

function authStateChanged(user) {
    if (user) {
        currentUserID = user.uid;
        console.log("Logged in user ID:", currentUserID);
    } else {
        currentUserID = null;
        console.log("No user logged in. Scores will not be saved.");
    }
}

// End game code
function endGame(_player, _obstacle) {
    console.log("Game ended, you got " + score + " points.")
    screenSelector = "end";
    player.remove();
    obstacles.removeAll();


    if (currentUserID) {
        const scoreRef =
            firebase.database().ref("geodash/" + currentUserID);

        scoreRef.once("value").then((snapshot) => {
            const data = snapshot.val();

            if (!data || score > data.score) {
                const userInfoRef = firebase.database().ref("userInfo/" + currentUserID);

                userInfoRef.once("value").then((snapshot) => {

                    const userData = snapshot.val();

                    return scoreRef.set({
                        name: userData.gameName,
                        score: score
                    });

                });
            }
        });
    }
}


































const SCREEN_WIDTH = 400;
const SCREEN_HEIGHT = 200;
const PLAYER_HEIGHT = 25;
const PLAYER_WIDTH = 25;


const OBSTACLE_HEIGHT = PLAYER_HEIGHT;
const OBSTACLE_WIDTH = PLAYER_WIDTH;

var spawnDist = 0;
var nextSpawn = 0;
var score = 0;
var player;

var screenSelector = "start";

var obstacles;
/*******************************************************/
// setup()
/*******************************************************/
function setup() {
    cnv = createCanvas(windowWidth, windowHeight);


    obstacles = new Group();

    floor = new Sprite(
        windowWidth / 2,
        windowHeight - 2,
        windowWidth,
        4,
        's'
    );
    floor.color = color("black");
    world.gravity.y = 90;

    document.addEventListener("keydown",
        function (event) {
            if (screenSelector == "start" || screenSelector == "end") {
                screenSelector = "game"
                resetGame();
            } else {
                if (event.code === "Space" && player.colliding(floor)) {
                    player.vel.y = -20;
                }
            }
        });

}

/*******************************************************/
// draw()
/*******************************************************/
function draw() {
    if (screenSelector == "game") {
        gameScreen();
    } else if (screenSelector == "end") {
        endScreen();
    } else if (screenSelector == "start") {
        startScreen();
    } else {
        text("wrong screen - you shouldnt get here", 50, 50);
        console.log("wrong screen - you shouldnt get here")
    }
}

function newObstacle() {
    let obstacle = new Sprite(
        windowWidth + 50,
        windowHeight - OBSTACLE_HEIGHT,
        OBSTACLE_WIDTH,
        OBSTACLE_HEIGHT,
        'k'
    );

    obstacle.color = color("yellow");
    obstacle.vel.x = -10;

    obstacles.add(obstacle);
}

// Main screen functions

function startScreen() {
    background("white");

    allSprites.visible = false;
    textSize(32);
    fill(255);
    stroke(0);
    strokeWeight(4);
    text("Welcome to the game", 50, 50);
    textSize(24);
    text("Press any key to start", 50, 110); textSize(24);
    text("Press space to jump", 50, 150);
}

function gameScreen() {
    background("#C39BD3");
    allSprites.visible = true;
    score++;
    if (frameCount > nextSpawn) {
        newObstacle();
        nextSpawn = frameCount + random(10, 100);
    }
    textSize(32);
    fill(255);
    stroke(0);
    strokeWeight(4);
    text(score, 50, 50);
}

function endScreen() {
    background("white");

    allSprites.visible = false;
    textSize(32);
    fill(255);
    stroke(0);
    strokeWeight(4);
    text("You died! Too bad :-(", 50, 50);
    textSize(24);
    text("your score was: " + score, 50, 110);
    textSize(14);
    text("press any key to restart", 50, 150);
}

function resetGame() {

    if (player) {
        player.remove();
    }

    obstacles.removeAll();

    player = new Sprite(
        PLAYER_WIDTH * 1.2,
        windowHeight - PLAYER_HEIGHT / 2 - 4,
        PLAYER_WIDTH,
        PLAYER_HEIGHT,
        'd'
    );

    player.color = color("purple");
    player.collides(obstacles, endGame);

    score = 0;
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);

    floor.x = windowWidth / 2;
    floor.y = windowHeight - 2;
    floor.w = windowWidth;
}

/*******************************************************/
//  END OF APP
/*******************************************************/