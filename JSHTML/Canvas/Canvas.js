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
    this.BitMap.plane[y][x] = color;
    this.context.fillStyle = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
    this.context.fillRect(
      x * this.pixelWidth,
      y * this.pixelHeight,
      this.pixelWidth,
      this.pixelHeight
    );
  }

  line(x1, y1, x2, y2, color){
    if (this.lock) return;
    this.BitMap.plane[y][x] = color;

  }

}

let ySize = 16;
let xSize = Math.ceil(ySize * 1.638);
const display = new Display(canvas, ySize, xSize);
display.putPixel(15, 0, [0, 255, 0]);
display.putPixel(0, 26, [255, 0, 0]);
display.putPixel(7.5, 13, [0, 0, 255]);
