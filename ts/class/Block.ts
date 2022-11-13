// util
import { blockKeycode } from "../utils/index";

// type
import type { BlockShape, BlockType, Position, Size } from "../types/index";

/**
 * 블럭 클래스
 * @param image 블럭의 스프라이트 이미지
 * @param ctx 배경화면을 그릴 "canvas"의 "context"
 *
 * @param position 블럭이 그려질 캔버스의 좌표
 * @param size 그려질 블럭의 크기
 * @param shape 그려질 블럭의 형태
 * @param type 그려질 블럭의 종류
 */
export default class Block {
  static image: HTMLImageElement;
  static ctx: CanvasRenderingContext2D;

  private position: Position;
  private size: Size;
  private shape: BlockShape;
  private type: BlockType;

  constructor(
    position: Position,
    shape: BlockShape,
    type: BlockType = "default"
  ) {
    // 처음만 이미지 로딩
    if (!Block.image) {
      Block.image = new Image();
      Block.image.src = "./assets/images/block.png";
    }

    this.position = position;
    this.shape = shape;
    this.size = { w: 100, h: 100 };
    this.type = type;
  }

  /**
   * 블럭 렌더링
   */
  draw() {
    const { x, y } = this.position;
    const { w, h } = this.size;

    Block.ctx.drawImage(
      Block.image,
      blockKeycode.width * blockKeycode[this.shape],
      blockKeycode[this.type],
      blockKeycode.width,
      blockKeycode.height,
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
}
