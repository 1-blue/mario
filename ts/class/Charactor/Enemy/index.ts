// class
import Charactor from "../index";
import Player from "../Player/index";
import Block from "../../Map/Block";

// type
import type {
  EmenyKinds,
  GoombaState,
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
 * @param state 상태 ( 왼발, 오른발 등 )
 * @param dir 이동 방향
 */
export default abstract class Enemy extends Charactor {
  protected kinds: EmenyKinds;
  protected state: GoombaState;

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
    this.state = dir ? "right" : "left";
  }

  protected abstract move(): void;
  protected abstract draw(): void;

  /**
   * 충돌 처리
   * ( 기존 충돌 처리 + 캐릭터와 충돌 처리 )
   */
  protected collision(blocks: Block[], player: Player | Enemy[]) {
    // 블럭과의 충돌 처리
    super.collision(blocks, player);

    if (!(player instanceof Player)) return;
    // >>> 플레이어와의 충돌 판단
  }

  /**
   * 실행 ( 행동 + 렌더링 )
   */
  public process(blocks: Block[], player: Player | Enemy[]) {
    this.move();
    this.draw();
    this.collision(blocks, player);

    super.execute();
  }
}
