class Bullet {
    constructor(x, y, speed,radius,) {
      this.x = x;
      this.y = y;
      this.color = "pink";
      this.speed = speed;
      this.size = 5;
      this.radius = radius
    }

    draw() {
     
      this.ctx.fillStyle = this.color;
      this.ctx.fillRect(this.x, this.y, this.size, this.size);
    }

}