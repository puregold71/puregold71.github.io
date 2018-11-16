const playerPoints = document.getElementById('points');
let total = parseInt(playerPoints.innerHTML)
const body = document.querySelector('body');
const winner = document.getElementById('win');
const button = document.getElementById('button')
const play = document.getElementById('play')

// Enemies our player must avoid
class Enemy {
    // declare location (x, y) and speed variables
    constructor(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
update(dt) {
  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.
  this.x += (this.speed * dt)
  //reset enemy postition to the other side of the screen
    if(this.x > 505) {
      this.x = -100;
    }
    //check for collisions by comparing left and right margins
    //of the player and the enemy
    if(player.x <= this.x + 75 && player.x + 35 >= this.x &&
      player.y <= this.y + 25 && player.y + 30 >= this.y) {
      //add animation class to turn background red on collision
      body.classList.add('red')
      player.x = 201
      player.y = 390
      //remove red background after 1/2 second
      setTimeout(function() {
        body.classList.remove('red');
      }, 500)

    }
};



// Draw the enemy on the screen, required method for game
  render() {
      ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  };
}; //end Enemy Class definition

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

//heart class
class Heart {
  constructor(x, y) {
    this.x = x;;
    this.y = y;
    this.sprite = 'images/Heart.png'
    this.points = 100;
  }
  render(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y)
  }
}

class Player {
  //set default values for x, y coordinates of player
  constructor(x = 201, y = 390) {
  this.x = x;
  this.y = y;
  this.sprite = 'images/char-pink-girl.png';
}
  //draw player on the screen
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }

  //update player positions so they cannot move offscreen
  update() {
    //prevents movement off left side of canvas
    if(this.x < 0) {
      this.x = 0;
    }
    //prevents movement off right side of canvas
    if(this.x > 401) {
      this.x = 401;
    }
    //sets player back to grass area once the top of the page has been reached
    if(this.y < -10) {
      this.y = 390;
      //check if player is in first position, remove heart and add points
      if(this.x === 1){
        //remove heart from view
        heart1.x = -100;
        total += heart1.points;
        //display player Points
        playerPoints.innerHTML = total
        //set points back to zero to prevent getting points the next time through
        heart1.points = 0

    } //check if player is in first position, remove heart and add points
      if(this.x === 101){
        //remove heart from view
        heart2.x = -100;
        total += heart2.points;
        //display player Points
        playerPoints.innerHTML = total
        //set points back to zero to prevent getting points the next time through
        heart2.points = 0
      }
      //check if player is in first position, remove heart and add points
      if(this.x === 201){
        //remove heart from view
        heart3.x = -100;
        total += heart3.points;
        //display player Points
        playerPoints.innerHTML = total
        //set points back to zero to prevent getting points the next time through
        heart3.points = 0
        }
        //check if player is in first position, remove heart and add points
        if(this.x === 301){
        heart4.x = -100;
        total += heart4.points;
        //display player Points
        playerPoints.innerHTML = total
        //set points back to zero to prevent getting points the next time through
        heart4.points = 0
        }
      //check if player is in first position, remove heart and add points
      if(this.x === 401){
        //remove heart from view
        heart5.x = -100;
        total += heart5.points;
        //display player Points
        playerPoints.innerHTML = total
        //set points back to zero to prevent getting points the next time through
        heart5.points = 0
        }
     }

    //prevents movement below grass
    if(this.y > 390) {
      this.y = 390;
    }



    if(total === 500){
      //add the win class to show winner animation
      winner.style.display="block"
      winner.classList.add('win');
      //change text to show winner has total points
      winner.innerHTML = "WINNER";
      //make button visible
      button.style.display = "block";
      //remove background img and add color blue
      body.style.backgroundImage = "none";
      body.style.backgroundColor = "blue";
      //set speed of enemies to zero so bugs stop moving
      for(let enemy of allEnemies) {
        enemy.speed = 0;
      }
      //stop movement of player
    document.removeEventListener('keydown', presskey)


   } //end winner if statement
 } //end update definition





  //allow player to move horrizontally or vertically based on input
  handleInput(keypress){
    switch(keypress) {
      case 'left':
          //prevent player moving left when the hearts row is reached
          if(this.y === -10){
            this.x -= 0;
          } else {
            this.x -= 100;
          }
          break;
      case 'right':
          //prevent player moving right when the hearts row is reached
          if(this.y === -10){
            this.x += 0;
          } else {
            this.x += 100;
          }
          break;
      case 'up':
          this.y -= 80;
          break;
      case 'down':
          this.y += 80;
          break;
    }
    }

} //end Player Class definition


  // Now instantiate your objects.
  const enemy1 = new Enemy(100, 65, 150);
  const enemy2 = new Enemy(-75, 65, 150);
  const enemy3 = new Enemy(0, 145, 100);
  const enemy4 = new Enemy(250, 230, 230);
  const enemy5 = new Enemy(-10, 230, 230);
  const enemy6 = new Enemy(300, 145, 100);
  // Place all enemy objects in an array called allEnemies
  const allEnemies = [enemy1, enemy2, enemy3, enemy4, enemy5, enemy6]
  // Place the player object in a variable called player
  const player = new Player();
  //instantiate heart objects
  const heart1 = new Heart(1, -10);
  const heart2 = new Heart(101, -10);
  const heart3 = new Heart(201, -10);
  const heart4 = new Heart(301, -10);
  const heart5 = new Heart(401, -10);
  //place all hearts in an array called hearts
  const hearts = [heart1, heart2, heart3, heart4, heart5]

  // This listens for key presses and sends the keys to your
  // Player.handleInput() method. You don't need to modify this.
  //named the anonomous function so removeEventListener could be
  //used to stop movement at the end of the game
  function presskey(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
  }
document.addEventListener('keydown', presskey);
