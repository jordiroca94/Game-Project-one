class Enemies {
    constructor(ctx, x, y, speed) {
      this.ctx = ctx;
      this.x = x;
      this.y = y;
      this.color = "green";
      this.speed = speed;
      this.size = 50;
      this.deadly = true; 
      this.upscore = true; 
    }
  
    draw() {
      
      const enemyImg = new Image();
      enemyImg.src = "../images/shark.png"
      this.ctx.drawImage(enemyImg, this.x, this.y, this.size, this.size);
    }
  
    move() {
      this.y += this.speed * -2;
    }
  }
  