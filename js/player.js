class Player {
    constructor(canvas, lives) {
      this.canvas = canvas;
      this.ctx = this.canvas.getContext("2d");
      this.lives = lives;
      this.size =50;
      this.x = 300;
      this.y =75;
      this.xDirection = 0;
      this.yDirection = 0;
      this.speed = 4;
      this.score = 0
    }
  
    reset() {
      this.x = 300;
      this.y =75;
      this.xDirection = 0;
      this.yDirection = 0;
      this.speed = 4;
      this.score = 0
    }
  
    update() {
      this.y = this.y + this.yDirection * this.speed;
      this.x = this.x + this.xDirection * this.speed; 

      this.checkScreen();
    }

  //Check direction 
    setDirection(direction) {
      if (direction === "up"){
         this.yDirection = -1;
         this.xDirection = 0;  
      } 
      else if (direction === "down"){ 
        this.yDirection = 1; 
        this.xDirection = 0;
      }else if (direction === "right"){
        this.xDirection = 1;
        this.yDirection = 0;
      }else if (direction === "left"){
        this.xDirection = -1; 
        this.yDirection = 0; 
      } 
    }
  
    // Check if DRAW its out of CANVAS
    checkScreen() {
      if (this.y + this.size - this.size < 0) {
        this.y = 0;
      } else if (this.y + this.size > 600) {
        this.y = 550;
      }else if(this.x + this.size -this.size <0){
          this.x =0;
      }else if (this.x + this.size >600){
          this.x =550; 
      }
    }
  
    draw() {

      const playerImg = new Image();
    playerImg.src = "images/playerboat4.png"
    this.ctx.drawImage(playerImg, this.x, this.y, this.size, this.size);
      
    
      // this.ctx.fillStyle = "red";
      // // fillRect(x, y, width, height)
      // this.ctx.fillRect(this.x, this.y, this.size, this.size);
    }
  
    didCollide(obstacle) {
      if (
        this.x + this.size >= obstacle.x &&
        this.y + this.size > obstacle.y &&
        this.y < obstacle.y + obstacle.size &&
        this.x <= obstacle.x + obstacle.size &&
        this.y + this.size > obstacle.y &&
        this.y < obstacle.y + obstacle.size
      ) {
        return true;
      } else {
        return false;
      }
    }

  
  }