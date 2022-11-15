// util
import { blockKeyTable } from "../../utils/index";

// type
import type { BlockShape, BlockType, Position, Size } from "../../types/index";

/**
 * 블럭 클래스
 * @param image ( static ) 블럭의 스프라이트 이미지
 * @param ctx ( static ) 배경화면을 그릴 "canvas"의 "context"
 *
 * @param _pos 블럭이 그려질 캔버스의 좌표
 * @param _size 그려질 블럭의 크기
 * @param shape 그려질 블럭의 형태
 * @param type 그려질 블럭의 종류
 */
export default class Block {
  static image: HTMLImageElement;
  static ctx: CanvasRenderingContext2D;

  private _pos: Position;
  private _size: Size;
  private shape: BlockShape;
  private type: BlockType;

  constructor(_pos: Position, shape: BlockShape, type: BlockType = "normal") {
    // 처음만 이미지 로딩
    if (!Block.image) {
      Block.image = new Image();
      Block.image.src = "./assets/images/block.png";
    }

    this._pos = _pos;
    this.shape = shape;
    this._size = { w: 100, h: 100 };
    this.type = type;
  }

  /**
   * 블럭 렌더링
   */
  draw() {
    const { x, y } = this._pos;
    const { w, h } = this.size;
    this.type;
    Block.ctx.drawImage(
      Block.image,
      blockKeyTable["normal"][this.shape],
      blockKeyTable["normal"].yPos,
      blockKeyTable["normal"].width,
      blockKeyTable["normal"].height,
      x,
      y,
      w,
      h
    );
  }

  // getter / setter

  // position
  get position() {
    return this._pos;
  }
  // size
  get size() {
    return this._size;
  }
}
