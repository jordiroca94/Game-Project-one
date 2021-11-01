
class Game {
  constructor() {
    this.canvas = null;
    this.ctx = null;
    this.obstacles = [];
    this.allies = [];
    this.enemies = []
    this.player = null;
    this.gameIsOver = false;
    this.score = 0;

  }

   start() {
    // Append canvas to the DOM, create a Player and start the Canvas loop
    // Save reference to canvas and Create ctx
    this.canvas = document.querySelector("canvas");
    this.ctx = canvas.getContext("2d");

    // Create a new player for the current game
    this.player = new Player(this.canvas, 5);
    this.player.draw()
    //add event listener to move the player 
    this.handleKeyDown = (event) => {
        if(event.code === "ArrowUp"){
            this.player.setDirection("up");
        }else if (event.code ==="ArrowDown"){
            this.player.setDirection("down")
        }else if(event.code ==="ArrowRight"){
            this.player.setDirection("right")
        }else if (event.code ==="ArrowLeft"){
            this.player.setDirection("left")
        }
   }
   document.body.addEventListener("keydown",this.handleKeyDown);
   
   this.startLoop();
   }

   startLoop() {
    const loop = () => {
    //WE CREATE RANDOM OBSTACLES
    if (Math.random() > 0.99) {
        const x = Math.random() * this.canvas.width;
        const y = this.canvas.height - 20;
        this.obstacles.push(new Obstacle(this.ctx, x, y, 1));
      }

    if (Math.random() > 0.96) {
        const x = Math.random() * this.canvas.width;
        const y = this.canvas.height - 20;
        this.enemies.push(new Enemies(this.ctx, x, y, 1));
      }

      if (Math.random() > 0.99) {
        const x = Math.random() * this.canvas.width;
        const y = this.canvas.height - 20;
        this.allies.push(new Allies(this.ctx, x, y, 1));
      }

    

    //UPDATE THE PLAYER AND RANDOM OBSTACLES
    this.player.update();
    this.obstacles.forEach((obstacle) => {
        obstacle.move();
      });
    this.allies.forEach((allies) => {
        allies.move();
      });
    this.enemies.forEach((enemies) => {
        enemies.move();
      });

    this.checkCollisions();
    this.checkAlliesCollisions();
    this.checkEnemiesCollisions()

    //CLEAR CANVAS 
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    //DRAW PLAYER
    this.player.draw();

    //DRAW OBSTACLES
    this.obstacles.forEach((obstacle) => {
        obstacle.draw();
      }); 
    //DRAW ALLIES
    this.allies.forEach((allies) => {
        allies.draw();
      }); 
    //DRAW ENEMIES
    this.enemies.forEach((enemies) => {
        enemies.draw();
      }); 
      

    //CHECK GAME OVER
    if (!this.gameIsOver) {
        window.requestAnimationFrame(loop);
          } else {
            buildGameOverScreen();
          }
        };

    window.requestAnimationFrame(loop);
    
    }

    checkAlliesCollisions(){
        this.allies.forEach((allies)=>{
            if(this.player.didCollide(allies)){
                this.score+=50
            }
        });
    }

    checkEnemiesCollisions() {
        this.enemies.forEach((enemies) => {
            if (this.player.didCollide(enemies)) {
              console.log("line120")
            if(enemies.deadly){
                this.player.lives--;
                enemies.deadly = !enemies.deadly
            }if(this.player.lives <=0){
            this.gameIsOver = true;
            }
          }
        });
      }

    checkCollisions() {
        this.obstacles.forEach((obstacles) => {
            if (this.player.didCollide(obstacles)) {
              console.log("line120")
            if(obstacles.deadly){
                this.player.lives--;
                obstacles.deadly = !obstacles.deadly
            }if(this.player.lives <=0){
            this.gameIsOver = true;
            }
          }
        });
      }
}
