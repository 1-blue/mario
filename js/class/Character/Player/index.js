// class
import Character from "../index.js";
/**
 * 모든 플레이어의 가상 부모 클래스
 * ( 마리오 등 )
 *
 * @param kinds 종류 ( 마리오 등 )
 * @param isNext 이전 행동을 계속 유지해서 다음 형태로 보여줄지 정하는 변수
 * @param _keys 현재 입력된 키
 */
export default class Player extends Character {
  constructor(kinds, pos, iPos, size, iSize, dir) {
    super(pos, iPos, size, iSize, dir);
    this.kinds = kinds;
    this.isNext = false;
    this._keys = {};
  }
  /**
   * 키보드 입력에 의한 출력 실행
   */
  process() {
    // 가속 처리
    this.acceleration();
    // 이동 처리
    this.move();
    // 얻드려 처리
    this.crawl();
    // 점프(상승) 처리
    this.jump();
    // 시점 변화
    this.viewPoint();
  }
  // is jumping
  isJumping() {
    return this.jumping.isUp || this.jumping.isDown;
  }
  // is running
  isRunning() {
    return this.speed !== 1;
  }
  // is crawl
  isCrawl() {
    return !!this.keys.ArrowDown;
  }
  // next 이미지 렌더링 여부 값 토글
  toggleIsNext() {
    this.isNext = !this.isNext;
  }
  // getter / setter
  get keys() {
    return this._keys;
  }
  set keys(_keys) {
    this._keys = Object.assign(Object.assign({}, this._keys), _keys);
  }
}
