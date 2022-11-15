// class
import Charactor from "../index";
import Block from "../../Map/Block";
import Enemy from "../Enemy/index";

// type
import type {
  PlayerKinds,
  ImagePosition,
  ImageSize,
  Jumping,
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
 * @param jumping 점프 처리에 필요한 값들
 */
export default abstract class Player extends Charactor {
  protected kinds: PlayerKinds;
  protected isNext: boolean;
  protected _keys: Keys;
  protected jumping: Jumping;

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
    this.jumping = { isUp: false, isDown: false, power: 300, destination: 0 };
  }

  protected abstract acceleration(): void;
  protected abstract move(): void;
  public abstract stand(key: string): void;
  protected abstract crawl(): void;
  protected abstract jump(): void;
  protected abstract fall(): void;

  /**
   * 충돌 처리
   * ( 기존 충돌 처리 + 캐릭터와 충돌 처리 )
   */
  protected collision(blocks: Block[], enemies: Enemy[] | Player) {
    // 블럭과의 충돌 처리
    super.collision(blocks, enemies);

    if (!(Array.isArray(enemies) && enemies[0] instanceof Enemy)) return;
    // >>> 적과 충돌 판단
  }

  /**
   * 키보드 입력에 의한 출력 실행
   */
  public process(blocks: Block[], enemies: Enemy[] | Player) {
    // 가속 처리
    this.acceleration();
    // 이동 처리
    this.move();
    // 얻드려 처리
    this.crawl();
    // 점프(상승) 처리
    this.jump();
    // 충돌처리
    this.collision(blocks, enemies);
    // 하강처리
    this.fall();
    // 렌더링
    this.draw();

    super.execute();
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
