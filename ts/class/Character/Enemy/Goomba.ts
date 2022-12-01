// class
import Enemy from "./index";

// util
import { enemyKeyTable } from "../../../utils/index";

// type
import type {
  GoombaKeyTable,
  GoombaMotion,
  Position,
  Size,
} from "../../../types/index";
import GameManager from "../../Manager/GameManager";

/**
 * 굼바 클래스
 * ( 마리오 등 )
 *
 * @param keyTable 굼바 이미지 렌더링 관련 값을 갖는 테이블
 * @param state 상태 ( 왼발, 오른발 등 )
 */
export default class Goomba extends Enemy {
  private keyTable: GoombaKeyTable;
  private _motion: GoombaMotion;

  constructor(pos: Position, size: Size, dir: boolean = true) {
    super(
      "goomba",
      pos,
      {
        ix: enemyKeyTable["goomba"][dir ? "left" : "right"],
        iy: enemyKeyTable["goomba"].yPos,
      },
      size,
      { iw: enemyKeyTable["goomba"].width, ih: enemyKeyTable["goomba"].height },
      dir
    );

    // 처음만 이미지 로딩
    if (!Goomba.image) {
      Goomba.image = new Image();
      Goomba.image.src = "./assets/images/enemy.png";
    }

    this.keyTable = enemyKeyTable["goomba"];
    this._motion = dir ? "right" : "left";
  }

  /**
   * 굼바 움직이기 ( 데이터만 변경, 렌더링 X )
   */
  protected move() {
    // 죽었을 경우
    if (this.motion === "die") return;

    if (this.count % 4 !== 0) return;

    // 현재 걷는 상태 변경 ( 왼발, 오른발 )
    this.motion = this.motion === "right" ? "left" : "right";

    // 렌더링할 좌표 변경
    const moveDistance =
      this.pos.x + (this.dir ? +this.distance : -this.distance);
    this.pos.x = moveDistance;
  }

  /**
   * 굼바 떨어지는 속도 조절 ( 가속 )
   */
  protected fall() {
    // 죽었을 경우
    if (this.motion === "die") return;

    // 현재 하강중인지 판단
    this.jumping.isDown = this.prevPos.y - this.pos.y < 0;

    // 하강중
    if (this.jumping.isDown) {
      // 점점 빨리 하강하지만 최대 하강속도는 유지
      this.fallSpeed.v += 0.1;
      if (this.fallSpeed.v >= this.fallSpeed.max) {
        this.fallSpeed.v = this.fallSpeed.max;
      }
    } else {
      this.fallSpeed.v = this.fallSpeed.min;
    }

    // 맵밖에 떨어진 경우
    if (this.pos.y >= innerHeight + this.size.h * 2) {
      this.motion = "die";

      const gameManager = new GameManager();
      gameManager.removeEnemy(this);
    }
  }

  /**
   * 굼바 렌더링
   */
  protected draw() {
    if (!Goomba.ctx) return console.error("ctx가 없습니다.");

    // 죽은 경우
    if (this.motion === "die") {
      this.iSize.ih = this.keyTable.dieHeight;
      this.size.h = this.keyTable.dieHeight;
    }

    // 현재 행동
    this.iPos.ix = this.keyTable[this.motion];
    // 현재 굼바가 보고 있는 방향
    this.iPos.iy = this.keyTable.yPos;

    const { ix, iy } = this.iPos;
    const { iw, ih } = this.iSize;
    const { x, y } = this.pos;
    const { w, h } = this.size;

    Goomba.ctx.drawImage(Goomba.image, ix, iy, iw, ih, x, y, w, h);
  }

  /**
   * 굼바 사망
   */
  public die() {
    this.motion = "die";
  }

  // getter / setter
  get motion() {
    return this._motion;
  }
  set motion(_motion: GoombaMotion) {
    this._motion = _motion;
  }
}
