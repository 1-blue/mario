// util
import { blockKeyTable } from "../../utils/index.js";
/**
 * 모든 블록의 가상 부모 클래스
 *
 * @param image ( static ) 블록의 스프라이트 이미지
 * @param ctx ( static ) 배경화면을 그릴 "canvas"의 "context"
 *
 * @param _pos 캔버스에서 렌더링될 좌표 ( x, y )
 * @param _size 켄버스에서 렌더링될 크기 ( w, h )
 * @param type 그려질 블록의 종류
 *
 * @param iPos 이미지 스프라이트에서 렌더링될 이미지의 좌표 ( ix, iy )
 * @param iSize 이미지 스프라이트에서 렌더링될 이미지의 크기 ( iw, ih )
 */
export default class Block {
  constructor(_pos, shape, type = "ground") {
    // 처음만 이미지 로딩
    if (!Block.image) {
      Block.image = new Image();
      Block.image.src = "./assets/images/block.png";
    }
    this._pos = _pos;
    this._size = { w: 100, h: 100 };
    this.type = type;
    this.shape = shape;
    this.iPos = {
      ix: blockKeyTable[this.type][this.shape],
      iy: blockKeyTable[this.type].yPos,
    };
    this.iSize = {
      iw: blockKeyTable[this.type].width,
      ih: blockKeyTable[this.type].height,
    };
  }
  /**
   * 블록 렌더링
   */
  draw() {
    const { x, y } = this.pos;
    const { w, h } = this.size;
    const { ix, iy } = this.iPos;
    const { iw, ih } = this.iSize;
    Block.ctx.drawImage(Block.image, ix, iy, iw, ih, x, y, w, h);
  }
  // getter / setter
  // pos
  get pos() {
    return this._pos;
  }
  // size
  get size() {
    return this._size;
  }
}
