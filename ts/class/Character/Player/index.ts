// class
import Character from "../index";

// type
import type {
  PlayerKinds,
  ImagePosition,
  ImageSize,
  Keys,
  Position,
  Size,
} from "../../../types/index";

/**
 * 모든 플레이어의 가상 부모 클래스
 * ( 마리오 등 )
 *
 * @param kinds 종류 ( 마리오 등 )
 * @param isNext 이전 행동을 계속 유지해서 다음 형태로 보여줄지 정하는 변수
 * @param _keys 현재 입력된 키
 */
export default abstract class Player extends Character {
  protected kinds: PlayerKinds;
  protected isNext: boolean;
  private _keys: Keys;

  constructor(
    kinds: PlayerKinds,
    pos: Position,
    iPos: ImagePosition,
    size: Size,
    iSize: ImageSize,
    dir: boolean
  ) {
    super(pos, iPos, size, iSize, dir);

    this.kinds = kinds;
    this.isNext = false;
    this._keys = {};
  }

  protected abstract acceleration(): void;
  protected abstract move(): void;
  public abstract stand(key: string): void;
  protected abstract crawl(): void;
  protected abstract jump(): void;
  protected abstract fall(): void;
  protected abstract draw(): void;
  public abstract die(): void;

  /**
   * 키보드 입력에 의한 출력 실행
   */
  public process() {
    // 가속 처리
    this.acceleration();
    // 이동 처리
    this.move();
    // 얻드려 처리
    this.crawl();
    // 점프(상승) 처리
    this.jump();
  }

  // is jumping
  public isJumping() {
    return this.jumping.isUp || this.jumping.isDown;
  }
  // is running
  protected isRunning() {
    return this.speed !== 1;
  }
  // is crawl
  protected isCrawl() {
    return !!this.keys.ArrowDown;
  }
  // next 이미지 렌더링 여부 값 토글
  protected toggleIsNext() {
    this.isNext = !this.isNext;
  }

  // getter / setter
  get keys() {
    return this._keys;
  }
  set keys(_keys: Keys) {
    this._keys = { ...this._keys, ..._keys };
  }
}
