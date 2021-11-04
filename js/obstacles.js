class Obstacle {
    constructor(ctx, x, y, speed) {
      this.ctx = ctx;
      this.x = x;
      this.y = y;
      this.color = "black";
      this.speed = speed;
      this.size = 50;
      this.deadly = true;
    }
  
    draw() {
      
      const obsImg = new Image();
      obsImg.src = "./images/barrel.png"
      this.ctx.drawImage(obsImg, this.x, this.y, this.size, this.size);

    }
  
    move() {
      this.y += this.speed * -2;
    }
  }
  