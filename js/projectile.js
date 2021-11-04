class Projectile {
    constructor(ctx,x, y) {
      this.ctx = ctx;
      this.x = x;
      this.y = y;
      this.color = "pink";
      this.speed = 15;
      this.size = 20;
    }

    draw() {

      const projImg = new Image();
      projImg.src = "../images/proj.png"
      this.ctx.drawImage(projImg, this.x, this.y, this.size, this.size);

      // this.ctx.fillStyle = this.color;
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