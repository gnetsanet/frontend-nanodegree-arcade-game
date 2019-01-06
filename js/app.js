'use strict';

// Enemies our player must avoid
var Enemy = function(speed, x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.speed = speed;
    this.x = x;
    this.y = y;
};

var Player = function(speed, x, y) {
    this.sprite = 'images/char-princess-girl.png';
    this.speed = speed;
    this.x = x;
    this.y = y;
};

Player.prototype.handleInput = function(keyPress) {
    if (keyPress == 'left') {
        this.x = this.x - (this.speed + 60);
    }
    if (keyPress == 'up') {
        this.y = this.y - (this.speed - 20);
    }
    if (keyPress == 'right') {
        this.x = this.x + this.speed + 60;
    }
    if (keyPress == 'down') {
        this.y = this.y + this.speed - 20;
    }
    console.log('keyPress is: ' + keyPress);
};

Player.prototype.update = function() {
    // Move the player back to the initial starting location when it is outside of the canvas on the y-axis
    // We may need to change this later since the player reaching this y-axis location means winning/scoring.
    if(this.y <= -100) {
        this.y = -50;
    }

    if(this.x >= 505) {
        this.x = 450;
    }
    if(this.x <= -50) {
        this.x = -50;
    }
    if(this.y >= 500) {
        this.y = 390;
    }
};

var contactWithEnemy = function(myEnemy) {

    if (
        player.x < myEnemy.x + 60 &&
        player.x + 37 > myEnemy.x &&
        player.y < myEnemy.y + 25 &&
        30 + player.y > myEnemy.y
        ) {

        player.x = 70;
        player.y = 320;
        announceGameStatus('Game Over. You lose!');
        addReplayFunctionality();
        endGame(allEnemies);
        
    }

};

var endGame = function(enemies) {
     for ( var k=0; k < enemies.length; k++) {
            enemies[k].speed = 0;
    }
};

var announceGameStatus = function(message) {
    var canvas = document.getElementsByTagName('canvas')[0];
    var replayButton = '<div class="restart"><i class="fa fa-repeat"></i></div>' 
    gameStatusElement.innerHTML =  message + replayButton;
    document.body.appendChild(gameStatusElement, canvas);
};


var addReplayFunctionality = function() {
    var replayElement = document.getElementsByClassName('fa-repeat');
    replayElement[0].addEventListener('click', function() {
        location.reload();
    });
};

var checkIfGameIsWon = function() {
    if(player.y <= 0 ) {
        player.x = 70;
        player.y = 320;
        announceGameStatus('Congratulation. You won!');
        addReplayFunctionality();
        endGame(allEnemies);
    }
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    checkIfGameIsWon();
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + this.speed * dt;

    // Keep the enemy within the canvas and have it come back to its original starting x-axis position
    if(this.x >= 505) {
        this.x = 0;
    }

    contactWithEnemy(this);
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = []; // there will be multiple enemies depending on level of game.

var myEnemy = new Enemy(50, 0, 150);
var player = new Player(50,  70, 320);

var gameStatusElement = document.createElement('div');

for (var i=0; i<5; i++) {
    var myEnemy = new Enemy(Math.random()*200, 0, Math.random()*170 + 55);
    allEnemies.push(myEnemy);
}


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
