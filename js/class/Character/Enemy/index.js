// class
import Character from "../index.js";
/**
 * 모든 적의 가상 부모 클래스
 * ( 굼바 등 )
 *
 * @param kinds 종류 ( 굼바 등 )
 
 */
export default class Enemy extends Character {
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
  constructor(kinds, pos, iPos, size, iSize, dir) {
    super(pos, iPos, size, iSize, dir);
    this.kinds = kinds;
  }
  /**
   * 실행 ( 행동 + 렌더링 )
   */
  process() {
    this.move();
  }
}
