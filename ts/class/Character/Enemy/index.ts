// class
import Character from "../index";

// type
import type {
  EmenyKinds,
  ImagePosition,
  ImageSize,
  Position,
  Size,
} from "../../../types/index";

/**
 * 모든 적의 가상 부모 클래스
 * ( 굼바 등 )
 *
 * @param kinds 종류 ( 굼바 등 )
 
 */
export default abstract class Enemy extends Character {
  protected kinds: EmenyKinds;

  /**
   * "Enemy class"의 생성자
   *
   * @param kinds 종류 ( 굼바 등 )
   * @param pos 캔버스에서 렌더링될 좌표 ( x, y )
   * @param iPos 이미지 스프라이트에서 렌더링될 이미지의 좌표 ( ix, iy )
   * @param size 켄버스에서 렌더링될 크기 ( w, h )
   * @param iSize 이미지 스프라이트에서 렌더링될 이미지의 크기 ( iw, ih )
   * @param dir 이동 방향
   */
  constructor(
    kinds: EmenyKinds,
    pos: Position,
    iPos: ImagePosition,
    size: Size,
    iSize: ImageSize,
    dir: boolean
  ) {
    super(pos, iPos, size, iSize, dir);

    this.kinds = kinds;
  }

  protected abstract move(): void;
  protected abstract fall(): void;
  protected abstract draw(): void;
  public abstract die(): void;

  /**
   * 실행 ( 행동 + 렌더링 )
   */
  public process() {
    this.move();
  }
}
