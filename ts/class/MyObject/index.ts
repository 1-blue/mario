// type
import type {
  ImagePosition,
  ImageSize,
  Position,
  Size,
} from "../../types/index";

/**
 * 모든 오브젝트의 부모
 *
 * @param ctx (static) "<canvas>"의 "context"
 * @param image (static) 렌더링 할 이미지 스프라이트
 *
 * @param _pos 캔버스에서 렌더링될 좌표 ( x, y )
 * @param iPos 이미지 스프라이트에서 렌더링될 이미지의 좌표 ( ix, iy )
 * @param _size 켄버스에서 렌더링될 크기 ( w, h )
 * @param iSize 이미지 스프라이트에서 렌더링될 이미지의 크기 ( iw, ih )
 */
export default abstract class MyObject {
  static image: HTMLImageElement;
  static ctx: CanvasRenderingContext2D;

  private _pos: Position;
  private _size: Size;
  protected iPos: ImagePosition;
  protected iSize: ImageSize;

  constructor(
    _pos: Position,
    _size: Size,
    iPos: ImagePosition,
    iSize: ImageSize
  ) {
    this._pos = _pos;
    this._size = _size;
    this.iPos = iPos;
    this.iSize = iSize;

    // 처음만 이미지 로딩
    if (!MyObject.image) {
      MyObject.image = new Image();
      MyObject.image.src = "./assets/images/object.png";
    }
  }

  /**
   * 오브젝트 렌더링
   */
  public render() {
    const { ix, iy } = this.iPos;
    const { iw, ih } = this.iSize;
    const { x, y } = this.pos;
    const { w, h } = this.size;

    MyObject.ctx.drawImage(MyObject.image, ix, iy, iw, ih, x, y, w, h);
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
