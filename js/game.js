
class Game {
  constructor() {
    this.canvas = null;
    this.ctx = null;
    this.obstacles = [];
    this.allies = [];
    this.enemies = []
    this.projectiles = []
    this.player = null;
    this.gameIsOver = true;
    this.lives = 5;
    this.score = 0;
    this.piratesSong = new Audio()
    this.piratesSong.src = "/music/song.mp3"
    

  }

  reset(){
    this.obstacles = [];
    this.allies = [];
    this.enemies = []
    this.projectiles = []
    this.gameIsOver = true;
    this.lives = 5;
    this.score = 0; 
    this.piratesSong = new Audio()
    this.piratesSong.src = "/music/song.mp3"
  }
  
  start() {
    // Append canvas to the DOM, create a Player and start the Canvas loop
    // Save reference to canvas and Create ctx
    this.reset();
    this.gameIsOver=false;
    this.canvas = document.querySelector("canvas");
    this.ctx = canvas.getContext("2d");
    this.drawLives();
    this.drawScore();
    this.piratesSong.play();
    
    
    // Create a new player for the current game
    this.player = new Player(this.canvas, 5);
    this.player.reset();
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

   //EVENT LISTENER TO MOVE PROJECTILES

   this.handleKeyup = (event) =>{
     if(event.code === "Space"){
       const projectile = new Projectile(this.ctx,this.player.x+20,this.player.y)
       this.projectiles.push(projectile)
       setInterval(()=>{
        projectile.y+=20
       },1*30);
     }
   }

   document.body.addEventListener("keydown",this.handleKeyDown);
   document.body.addEventListener("keydown",this.handleKeyup);
   
   this.startLoop();
   }

   startLoop() {
    const loop = () => {
    //WE CREATE RANDOM OBSTACLES
    if (Math.random() > 0.99) {
        const x = Math.random() * this.canvas.width;
        const y = this.canvas.height;
        this.obstacles.push(new Obstacle(this.ctx, x, y, 1));
      }

    if (Math.random() > 0.97) {
        const x = Math.random() * this.canvas.width;
        const y = this.canvas.height;
        this.enemies.push(new Enemies(this.ctx, x, y, 1));
      }

      if (Math.random() > 0.995) {
        const x = Math.random() * this.canvas.width;
        const y = this.canvas.height;
        this.allies.push(new Allies(this.ctx, x, y, 1));
      }
 
        // CLEAN ARRAYS TO OPTIMIZE 
    
    this.obstacles = this.obstacles.filter((el)=> el.y + el.size > 0)
    this.enemies = this.enemies.filter((el)=> el.y + el.size > 0)
    this.allies = this.allies.filter((el)=> el.y + el.size > 0)
    

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
    this.checkEnemiesCollisions();
    this.checkProjectilesCollisionsEnemies()
    this.checkProjectilesCollisionsObstacles()
    this.checkProjectilesCollisionsAllies()
    this.drawLives()
    this.drawScore()
   

    //CLEAR CANVAS 
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    //PAINT PROJECTILES 

    this.projectiles.forEach((el) =>{
      el.draw();
    });
     

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
            buildGameOverScreen(this.score);
            this.piratesSong.pause();
          }
        };

    window.requestAnimationFrame(loop);
    
    }

    //COLISIONS

    //BULLET COLISIONS:

    checkProjectilesCollisionsEnemies(){
      this.enemies.forEach((enemy,index)=>{
        this.projectiles.forEach((projectile,el)=>{
          if(projectile.didCollide(enemy)){
            this.enemies.splice(index,1)
            this.projectiles.splice(el,1)
            if(enemy.upscore){
              this.score+=10;
              enemy.upscore = !enemy.upscore
          
            }
          }
        })
      })
    }

    checkProjectilesCollisionsObstacles(){
    this.obstacles.forEach((obstacle)=>{
      this.projectiles.forEach((projectile,el)=>{
        if(projectile.didCollide(obstacle)){
          this.projectiles.splice(el,1)
        }
      })
    })
    }

    checkProjectilesCollisionsAllies(){
      this.allies.forEach((ally,index)=>{
        this.projectiles.forEach((projectile,el)=>{
          if(projectile.didCollide(ally)){
            this.allies.splice(index,1)
            this.projectiles.splice(el,1)
           if(ally.deadly){
             this.lives--;
             ally.deadly = !ally.deadly
           }if(this.lives <=0){
             this.gameIsOver = true; 
           }
          }
        })
      })
    }

    //PLAYERS COLIISIONS

    checkAlliesCollisions(){
        this.allies.forEach((allies,index)=>{
            if(this.player.didCollide(allies)){
              if(allies.upscore){
                this.score+=50;
                allies.upscore = !allies.upscore
                this.allies.splice(index,1);
              }
            }
        });
    }

    checkEnemiesCollisions() {
        this.enemies.forEach((enemies) => {
            if (this.player.didCollide(enemies)) {
            if(enemies.deadly){
                this.lives--;
                enemies.deadly = !enemies.deadly
            }if(this.lives <=0){
            this.gameIsOver = true;
            }
          }
        });
      }

    checkCollisions() {
        this.obstacles.forEach((obstacles) => {
            if (this.player.didCollide(obstacles)) {
            if(obstacles.deadly){
                this.lives--;
                obstacles.deadly = !obstacles.deadly
            }if(this.lives <=0){
            this.gameIsOver = true;
            }
          }
        });
      }
 
      // LIVES 

      drawLives(){
        let indicator = document.querySelector(".lives")

        let indicatorContent = "";
        for(let i =0; i<this.lives; i++){
          indicatorContent+= "<img src='images/heart.png'/>"
        }
        indicator.innerHTML = indicatorContent
      }

      // SCORE 

      drawScore(){
        let indicator = document.querySelector(".score")

        indicator.innerHTML = this.score
      }

      

}
