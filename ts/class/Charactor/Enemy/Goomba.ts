// class
import Enemy from "./index";

// util
import { enemyKeyTable } from "../../../utils/index";

// type
import type { GoombaKeyTable, Position, Size } from "../../../types/index";

/**
 * 굼바 클래스
 * ( 마리오 등 )
 *
 * @param keyTable 굼바 이미지 렌더링 관련 값을 갖는 테이블
 */
export default class Goomba extends Enemy {
  protected keyTable: GoombaKeyTable;

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
  }

  /**
   * 굼바 움직이기 ( 데이터만 변경, 렌더링 X )
   */
  protected move() {
    if (this.count % 4 !== 0) return;

    // 현재 걷는 상태 변경 ( 왼발, 오른발 )
    this.state = this.state === "right" ? "left" : "right";

    // 렌더링할 이미지 위치 변경 ( 걷는 이미지 변경 )
    this.iPos = { ...this.iPos, ix: this.keyTable[this.state] };

    const moveDistance =
      this.pos.x + (this.dir ? +this.distance : -this.distance);
    // 렌더링할 좌표 변경
    this.pos = { ...this.pos, x: moveDistance };
  }

  /**
   * 굼바 렌더링
   */
  protected draw() {
    if (!Goomba.ctx) return console.error("ctx가 없습니다.");

    const { ix, iy } = this.iPos;
    const { iw, ih } = this.iSize;
    const { x, y } = this.pos;
    const { w, h } = this.size;

    Goomba.ctx.drawImage(Goomba.image, ix, iy, iw, ih, x, y, w, h);
  }
}
