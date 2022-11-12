import type { BlockType, MapType, Position, Size } from "../types/index";
import { blockKeycode } from "../utils/index";

export default class Block {
  static image: HTMLImageElement;
  static ctx: CanvasRenderingContext2D;

  private position: Position;
  private size: Size;
  private type: BlockType;

  constructor(type: BlockType, position: Position) {
    // 처음만 이미지 로딩
    if (!Block.image) {
      Block.image = new Image();
      Block.image.src = "./assets/images/block.png";
    }

    this.position = position;
    this.type = type;
    this.size = { w: 100, h: 100 };
  }

  draw() {
    const { x, y } = this.position;
    const { w, h } = this.size;

    Block.ctx.drawImage(
      Block.image,
      blockKeycode.width * blockKeycode[this.type],
      0,
      53,
      53,
      x,
      y,
      w,
      h
    );
  }

  // getter / setter

  // position
  getPosition() {
    return this.position;
  }
  // size
  getSize() {
    return this.size;
  }

  // static
  // 맵 성성 함수
  static CreateMap(type: MapType, blocks: Block[]) {
    if (type === "stairs") {
      Block.createStairs(blocks);
    }
  }

  // 계단맵 생성
  private static createStairs(blocks: Block[]) {
    // 1층
    Array(Math.round(Math.round(innerWidth / 100)))
      .fill(null)
      .forEach((v, i) => blocks.push(new Block("mid", { x: i * 100, y: 900 })));
    // 2층
    Array(Math.round(Math.round(innerWidth / 100)))
      .fill(null)
      .forEach((v, i) => {
        switch (i) {
          case 0:
          case 1:
          case 2:
          case 3:
            blocks.push(new Block("top", { x: i * 100, y: 800 }));
            break;
          case 4:
            blocks.push(new Block("leftTopAngle", { x: i * 100, y: 800 }));
            break;
          case 5:
          case 6:
          case 7:
          case 8:
          case 9:
            blocks.push(new Block("mid", { x: i * 100, y: 800 }));
            break;
          case 10:
            blocks.push(new Block("rightTopAngle", { x: i * 100, y: 800 }));
            break;
          case 11:
          case 12:
          case 13:
            blocks.push(new Block("top", { x: i * 100, y: 800 }));
            break;
          default:
            blocks.push(new Block("top", { x: i * 100, y: 800 }));
            break;
        }
      });
    // 3층
    Array(Math.round(Math.round(innerWidth / 100)))
      .fill(null)
      .forEach((v, i) => {
        switch (i) {
          case 0:
          case 1:
          case 2:
          case 3:
            break;
          case 4:
            blocks.push(new Block("leftTop", { x: i * 100, y: 700 }));
            break;
          case 5:
            blocks.push(new Block("leftTopAngle", { x: i * 100, y: 700 }));
            break;
          case 6:
          case 7:
          case 8:
            blocks.push(new Block("mid", { x: i * 100, y: 700 }));
            break;
          case 9:
            blocks.push(new Block("rightTopAngle", { x: i * 100, y: 700 }));
            break;
          case 10:
            blocks.push(new Block("rightTop", { x: i * 100, y: 700 }));
            break;
          case 11:
          case 12:
          case 13:
            break;
          default:
            blocks.push(new Block("top", { x: i * 100, y: 700 }));
            break;
        }
      });
    // 4층
    Array(Math.round(Math.round(innerWidth / 100)))
      .fill(null)
      .forEach((v, i) => {
        switch (i) {
          case 0:
          case 1:
          case 2:
          case 3:
          case 4:
            break;
          case 5:
            blocks.push(new Block("leftTop", { x: i * 100, y: 600 }));
            break;
          case 6:
          case 7:
          case 8:
            blocks.push(new Block("top", { x: i * 100, y: 600 }));
            break;
          case 9:
            blocks.push(new Block("rightTop", { x: i * 100, y: 600 }));
            break;
          case 10:
          case 11:
          case 12:
          case 13:
            break;
          default:
            blocks.push(new Block("top", { x: i * 100, y: 600 }));
            break;
        }
      });

    // >>> 보너스
    blocks.push(new Block("soloLeft", { x: 200, y: 300 }));
    blocks.push(new Block("soloMid", { x: 300, y: 300 }));
    blocks.push(new Block("soloRight", { x: 400, y: 300 }));
  }
}
