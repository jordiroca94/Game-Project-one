class Allies {
    constructor(ctx, x, y, speed) {
      this.ctx = ctx;
      this.x = x;
      this.y = y;
      this.color = "yellow";
      this.speed = speed;
      this.size = 50;
      this.upscore = true;
      this.deadly = true;
    }
  
    draw() {
      // DRAW OBSTACLES
      this.ctx.fillStyle = this.color;
      this.ctx.fillRect(this.x, this.y, this.size, this.size);
    }
  
    move() {
      this.y += this.speed * -2;
    }
  }
  