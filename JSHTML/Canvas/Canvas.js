const canvas = document.querySelector("canvas");
class BitMap {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.plane = new Array(x * y).fill([0, 0, 0]);
  }

  getIndex() {}
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
}

let ySize = 32;
let xSize = Math.ceil(ySize * 1.638);
const display = new Display(canvas, ySize, xSize);
display.circle(9, 5, 3, [192, 192, 192]);
