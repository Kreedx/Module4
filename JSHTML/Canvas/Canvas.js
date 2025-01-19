const canvas = document.querySelector("canvas");

class BitMap {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.plane = new Array(x * y).fill([0, 0, 0]);
  }

}
class Display {
  constructor(canvas, x, y) {
    this.canvas = canvas;
    this.context = this.canvas.getContext("2d");
    this.x = x;
    this.y = y;
    this.BitMap = new BitMap(x, y);
    this.pixelWidth = this.canvas.width / this.x;
    this.pixelHeight = this.canvas.height / this.y;
    this.lock = false;
  }

  putPixel(x, y, color) {
    if (this.lock) return;

    if (x >= 0 && x < this.x && y >= 0 && y < this.y) {
      this.BitMap.plane[y][x] = color;
      this.context.fillStyle = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
      this.context.fillRect(
        x * this.pixelWidth,
        y * this.pixelHeight,
        this.pixelWidth,
        this.pixelHeight
      );
    }
  }

  line(x1, y1, x2, y2, color) {
    if (this.lock) return;

    const dx = x2 - x1;
    const dy = y2 - y1;
    const steps = Math.max(Math.abs(dx), Math.abs(dy));
    const xInc = dx / steps;
    const yInc = dy / steps;

    let x = x1;
    let y = y1;

    for (let i = 0; i < steps; i++) {
      this.putPixel(x, y, color);
      x += xInc;
      y += yInc;
    }
  }

  circle(x1, y1, r, color) {
    if (this.lock) return;

    for (let i = 1; i <= 360; i += 1 / r) {
      this.putPixel(
        Math.round(x1 + r * Math.cos(i)),
        Math.round(y1 + r * Math.sin(i)),
        color
      );
    }
  }

  rectange(x1, y1, x2, y2, color) {
    if (this.lock) return;

    this.line(x1, y1, x2, y1, color); // Top
    this.line(x2, y2, x1, y2, color); // Bottom
    this.line(x2, y1, x2, y2, color); // Right
    this.line(x1, y2, x1, y1, color); // Left
  }

  triangle(x1, y1, x2, y2, x3, y3, color) {
    if (this.lock) return;

    this.line(x1, y1, x2, y2, color);
    this.line(x2, y2, x3, y3, color);
    this.line(x3, y3, x1, y1, color);
  }

  clear(color) {
    this.context.fillStyle = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  resize(x,y){
    if (this.lock) return;

    this.x = x;
    this.y = y;
    this.BitMap = new BitMap(x, y);
    this.pixelWidth = this.canvas.width / this.x;
    this.pixelHeight = this.canvas.height / this.y;
  }

  drawGrid() {
    this.context.strokeStyle = "rgba(0, 0, 0, 1)";
    this.context.lineWidth = 1;
  
    for (let x = 0; x <= this.x; x++) {
      const xPos = x * this.pixelWidth;
      this.context.beginPath();
      this.context.moveTo(xPos, 0);
      this.context.lineTo(xPos, this.canvas.height);
      this.context.stroke();
    }
  
    // Draw horizontal lines
    for (let y = 0; y <= this.y; y++) {
      const yPos = y * this.pixelHeight;
      this.context.beginPath();
      this.context.moveTo(0, yPos);
      this.context.lineTo(this.canvas.width, yPos);
      this.context.stroke();
    }
  }
}

let ySize = 16;
let xSize = Math.ceil(ySize * 1.618);
const display = new Display(canvas, ySize, xSize);
display.drawGrid();
display.triangle(5, 5, 15, 5, 10, 15, [0, 255, 255]); 