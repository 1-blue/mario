// class
import Player from "./index";

// util
import { playerKeyTable } from "../../../utils/index";

// type
import type {
  SmallMarioKeyTable,
  MarioState,
  Position,
  Size,
  SmallMarioMotion,
} from "../../../types/index";

/**
 * 마리오 클래스
 *
 * @param keyTable 마리오 이미지 렌더링 관련 값을 갖는 테이블
 * @param state 현재 마리오 상태 ( "small", "long" 등 )
 * @param motion 마리오 몸짓 ( 행동 ) ( "walk", "run", "crawl" 등 )
 */
export default class Mario extends Player {
  private keyTable: SmallMarioKeyTable;
  private state: MarioState;
  private _motion: SmallMarioMotion;

  constructor(pos: Position, size: Size, dir: boolean = true) {
    super(
      "mario",
      pos,
      {
        ix: playerKeyTable.mario.small.stand,
        iy: playerKeyTable.mario.small.right,
      },
      size,
      {
        iw: playerKeyTable.mario.small.width,
        ih: playerKeyTable.mario.small.height,
      },
      dir
    );

    this.state = "small";
    this._motion = "stand";
    this.keyTable = playerKeyTable.mario[this.state];

    // 처음만 이미지 로딩
    if (!Mario.image) {
      Mario.image = new Image();
      Mario.image.src = "./assets/images/mario.png";
    }

    // 이미지 로드 완료 시 그리기
    Mario.image.addEventListener("load", () => {
      Mario.ctx.drawImage(
        Mario.image,
        this.iPos.ix,
        this.iPos.iy,
        this.iSize.iw,
        this.iSize.ih,
        this.pos.x,
        this.pos.y,
        this.size.w,
        this.size.h
      );
    });
  }

  /**
   * 가속
   */
  protected acceleration() {
    // 죽었을 경우
    if (this.motion === "die") return;

    // 현재 누르고 있는 키들
    const keys = this.keys;

    // 좌/우측중 하나를 누르고 있다면 누른 시점의 값을 얻음
    const startTime =
      keys.ArrowRight?.startTime || keys.ArrowLeft?.startTime || Date.now();

    // 가속 처리
    if (Date.now() - startTime > 1000) {
      // 엎드린 상태면 가속 X
      if (this.isCrawl()) this.speed = 1;
      // 점프와 가속 처리
      else if (this.isJumping()) {
        // 가속중에 점프라면 유지
        if (this.isRunning()) this.speed = 1.5;
        // 점프중 가속 금지
        else this.speed = 1;
      }
      // 그 외에 상황 시 가속
      else this.speed = 1.5;
    } else {
      this.speed = 1;
    }

    // 좌/우측을 계속 누르고 있다면
    // 가속도가 붙었다면 달리기 이미지 전환 속도 up
    if ((keys?.ArrowRight || keys?.ArrowLeft) && this.isRunning()) {
      this.toggleIsNext();
    }
    // 가속도가 붙기 전이라면 4번 화면을 그릴 때마다 이미지 전환 ( 이미지 변환의 주기를 줄이면 빨리 달리는 효과가 적용됨 )
    else if ((keys?.ArrowRight || keys?.ArrowLeft) && this.count % 4 === 0) {
      this.toggleIsNext();
    }
  }

  /**
   * 캐릭터 이동
   * 좌표 이동 및 렌더링 이미지 변경 ( 렌더링 X )
   *
   * >>> 관성 필요
   */
  protected move() {
    // 죽었을 경우
    if (this.motion === "die") return;

    // 현재 방향키를 누르고 있지 않다면
    if (!this.keys.ArrowLeft && !this.keys.ArrowRight) return;

    // 작은 마리오
    if (this.state === "small") {
      // 우측 이동
      if (this.keys.ArrowRight) {
        this.dir = true;

        // 엎드린 상태라면 움직임 X ( 단, 공중에서는 움직이기 가능 )
        if (this.keys.ArrowDown && !this.isJumping()) return;

        // 캔버스에서 우측 이동
        this.pos.x += this.distance * this.speed;
      }
      // 좌측 이동
      else if (this.keys.ArrowLeft) {
        this.dir = false;

        // 엎드린 상태라면 움직임 X ( 단, 공중에서는 움직이기 가능 )
        if (this.keys.ArrowDown && !this.isJumping()) return;

        // 캔버스에서 좌측 이동
        this.pos.x -= this.distance * this.speed;
      }

      // 달리는 중이라면
      if (this.isRunning()) this.motion = this.isNext ? "runStand" : "run";
      // 걷는 중이라면
      else this.motion = this.isNext ? "stand" : "walk";
    }
  }

  /**
   * 캐릭터 일어서기
   * 렌더링할 이미지 변경 ( 렌더링 X )
   */
  public stand(key: string) {
    // 죽었을 경우
    if (this.motion === "die") return;

    // 작은 마리오라면
    if (this.state === "small") {
      this.motion = "stand";

      // 점프중이 아니라면
      if (key === "ArrowDown" && !this.isJumping()) {
        this.pos.y -= this.keyTable.height - this.keyTable.crawlHeight;
      }
    }
  }

  /**
   * 캐릭터 엎드리기
   * 렌더링 이미지 변경 ( 렌더링 X )
   */
  protected crawl() {
    // 죽었을 경우
    if (this.motion === "die") return;

    // 아래 방향키를 누르고 있지 않다면
    if (!this.keys.ArrowDown) return;

    // 작은 마리오라면
    if (this.state === "small") {
      this.motion = "crawl";

      // >>> 아래 방향키를 누르고 첫 수행인 경우
      if (this.iSize.ih !== this.keyTable.crawlHeight) {
        // this.pos.y += this.keyTable.sHeight - this.keyTable.crawlHeight;
      }
    }
  }

  /**
   * 캐릭터 점프
   * 좌표 이동 및 렌더링 이미지 변경 ( 렌더링 X )
   */
  protected jump() {
    // 죽었을 경우
    if (this.motion === "die") return;

    // 점프 키를 누른 경우
    if (this.keys.Space) {
      // 현재 점프중이 아닌 경우
      if (!this.isJumping()) {
        this.jumping.isUp = true;
        this.jumping.destination =
          this.pos.y - this.jumping.power * (this.speed === 1 ? 1 : 1.2);
      }
    }

    // 작은 마리오
    if (this.state === "small") {
      // 점프중 ( 상승 )
      if (
        this.jumping.isUp &&
        this.jumping.destination &&
        this.jumping.destination < this.pos.y
      ) {
        // 점점 느려지는 효과 적용
        const delta =
          (this.pos.y - this.jumping.destination) / 20 + this.fallSpeed.v + 2;
        this.pos.y -= delta;

        // 달리는 중이라면 달리기 점프
        if (this.isRunning()) this.motion = "jumpRun";
        // 걷는 중이라면 점프 상승
        else this.motion = "jumpUp";

        // 엎드린 점프라면
        if (this.keys.ArrowDown) this.motion = "crawl";

        // 점프 상승의 끝
        if (this.jumping.destination >= this.pos.y) {
          this.pos.y = this.jumping.destination;
          this.fallSpeed.v = this.fallSpeed.min;
          this.jumping.isUp = false;
          this.jumping.isDown = true;
        }
      }
    }
  }

  /**
   * 하강
   * 렌더링 이미지 변경 ( 렌더링 X )
   */
  protected fall() {
    // 죽었을 경우
    if (this.motion === "die") return;

    // 작은 마리오라면
    if (this.state === "small") {
      // 땅에 닿은 시점에 서 있는 이미지 적용
      if (
        this.jumping.isDown &&
        this.prevPos.y - this.pos.y >= 0 &&
        !this.keys.ArrowDown
      ) {
        this.fallSpeed.v = this.fallSpeed.min;
        this.motion = "stand";
      }

      // 현재 하강중인지 판단
      this.jumping.isDown = this.prevPos.y - this.pos.y < 0;

      // 상승과 하강이 변하는 시점 예외 처리
      if (this.pos.y === this.jumping.destination) this.jumping.isDown = true;

      // 하강중
      if (this.jumping.isDown) {
        // 점점 빨리 하강하지만 최대 하강속도는 유지
        this.fallSpeed.v += 0.1;
        if (this.fallSpeed.v >= this.fallSpeed.max) {
          this.fallSpeed.v = this.fallSpeed.max;
        }

        // 달리는 중이라면 "달리기 점프"
        if (this.isRunning()) this.motion = "jumpRun";
        // 걷는 중이라면 "점프 하강"
        else this.motion = "JumpDown";

        // 엎드린 점프라면 "엎드리기"
        if (this.keys.ArrowDown) this.motion = "crawl";
      }
    }
  }

  /**
   * 캐릭터 렌더링
   */
  protected draw() {
    // // 죽었을 경우
    // if (this.motion === "die") return;

    // 작은 마리오
    if (this.state === "small") {
      this.iSize.iw = this.keyTable.width;

      // 엎드린 경우
      if (this.motion === "crawl") {
        this.iSize.ih = this.keyTable.crawlHeight;
        this.size.h = this.keyTable.crawlHeight;
      }
      // 죽은 경우
      else if (this.motion === "die") {
        this.iSize.ih = this.keyTable.dieHight;
        this.size.h = this.keyTable.dieHight;
      }
      // 그 외에 경우 ( 서있는/달리는 )
      else {
        this.iSize.ih = this.keyTable.height;
        this.size.h = this.keyTable.height;
      }
    }

    // 현재 행동
    this.iPos.ix = this.keyTable[this.motion];
    // 현재 마리오가 보고 있는 방향
    this.iPos.iy = this.keyTable[this.dir ? "right" : "left"];

    const { ix, iy } = this.iPos;
    const { iw, ih } = this.iSize;
    const { x, y } = this.pos;
    const { w, h } = this.size;

    Mario.ctx.drawImage(Mario.image, ix, iy, iw, ih, x, y, w, h);
  }

  /**
   * 캐릭터 사망
   */
  public die() {
    this.motion = "die";

    this.pos.y -= 100;

    setTimeout(() => {
      // 게임 다시하기 및 기록 등 UI 렌더링
    }, 1000);
  }

  // getter / setter
  get motion() {
    return this._motion;
  }
  set motion(_motion: SmallMarioMotion) {
    this._motion = _motion;
  }
}
