// class
import Block from "./Block";

// util
import { marioKeycode } from "../utils/index";

// type
import type { Position, CharacterStatus, Keys, Size } from "../types/index";

/**
 * 마리오 클래스
 * @param ctx 배경화면을 그릴 "canvas"의 "context"
 * @param position 그려질 마리오의 x, y 좌표
 * @param imagePosition 이미지 스프라이트의 마리오의 x, y 좌표
 * @param size 그려질 마리오의 크기, 높이
 * @param imageSize 이미지 스프라이트의 마리오의 크기, 높이
 * @param image 마리오 이미지 스프라이트를 가진 이미지 객체
 * @param status 현재 캐릭터 상태
 * @param isNext 같은 키를 계속 누르고 있는 경우에 다음 동작으로 넘어가기위해 사용하는 변수
 * @param keys 현재 누른 key들
 * @param speed 현재 속도 ( 낮을수록 빠름 )
 * @param count 반복 횟수 ( 속도에 맞게 이미지 렌더링 순서를 지정하기 위함 )
 * @param direction 현재 보고있는 방향 ( true: 우측, false: 좌측 )
 * @param prevPos 이전에 그린 마리오의 x, y 좌표
 * @param minFallSpeed 최소 하강 속도
 * @param maxFallSpeed 최대 하강 속도
 * @param fallSpeed 하강 속도
 * @param isJumpingUp 점프중 판단 변수 ( 상승 )
 * @param isJumpingDown 점프중 판단 변수 ( 하강 )
 * @param jumpingPower 점프력 ( 점프할 높이 )
 * @param jumpingHeight 점프할 최종 목적지 ( 현재 위치 - ( 점프력 * 속도 ) )
 */
export default class Mario {
  private ctx: CanvasRenderingContext2D;
  private position: Position;
  private imagePosition: Position;
  private size: Size;
  private imageSize: Size;
  private image: HTMLImageElement;
  private status: CharacterStatus;
  private isNext: boolean;
  private keys: Keys;
  private speed: number;
  private count: number;
  private direction: boolean;
  private prevPos: Position;
  private minFallSpeed: number;
  private maxFallSpeed: number;
  private fallSpeed: number;
  private isJumpingUp: boolean;
  private isJumpingDown: boolean;
  private jumpingPower: number;
  private jumpingHeight: number;

  constructor(ctx: CanvasRenderingContext2D, position: Position) {
    const image = new Image();
    image.src = "./assets/images/mario.png";

    this.ctx = ctx;
    this.position = position;
    this.imagePosition = {
      x: marioKeycode.stand * marioKeycode.sWidth,
      y: marioKeycode.right,
    };
    this.size = { w: 60, h: 60 };
    this.imageSize = { w: marioKeycode.sWidth, h: marioKeycode.sHeight };
    this.image = image;
    this.status = "small";
    this.isNext = false;
    this.keys = {};
    this.speed = 1;
    this.count = 0;
    this.direction = true;
    this.prevPos = { x: 0, y: 0 };
    this.minFallSpeed = 4;
    this.maxFallSpeed = 12;
    this.fallSpeed = this.minFallSpeed;

    // 점프
    this.isJumpingUp = false;
    this.isJumpingDown = false;
    this.jumpingPower = 300;
    this.jumpingHeight = 0;

    // 이미지 로드 완료 시 그리기
    image.addEventListener("load", () => {
      ctx.drawImage(
        image,
        this.imagePosition.x,
        this.imagePosition.y,
        this.imageSize.w,
        this.imageSize.h,
        this.position.x,
        this.position.y,
        this.size.w,
        this.size.h
      );
    });
  }

  /**
   * 가속
   */
  private acceleration() {
    // 현재 누르고 있는 키들
    const keys = this.getKeys();

    // 좌/우측중 하나를 누르고 있다면 누른 시점의 값을 얻음
    const startTime =
      keys?.ArrowRight?.startTime || keys?.ArrowLeft?.startTime || Date.now();

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
   * >>> 관성처리하기
   */
  private move() {
    // 현재 방향키를 누르고 있지 않다면
    if (!this.keys.ArrowLeft && !this.keys.ArrowRight) return;

    let keycode = null;

    // 작은 마리오
    if (this.status === "small") {
      // 우측 이동
      if (this.keys.ArrowRight) {
        this.direction = true;

        // 보여줄 이미지의 x 결정 ( 우측을 보는 이미지 )
        this.imagePosition.y = marioKeycode.right;

        // 엎드린 상태라면 움직임 X ( 단, 공중에서는 움직이기 가능 )
        if (this.keys.ArrowDown && !this.isJumping()) return;

        // 캔버스에서 우측 이동
        this.position.x += 7 * this.speed;
      }
      // 좌측 이동
      else if (this.keys.ArrowLeft) {
        this.direction = false;

        // 보여줄 이미지의 y 결정 ( 좌측을 보는 이미지 )
        this.imagePosition.y = marioKeycode.left;

        // 엎드린 상태라면 움직임 X ( 단, 공중에서는 움직이기 가능 )
        if (this.keys.ArrowDown && !this.isJumping()) return;

        // 캔버스에서 좌측 이동
        this.position.x -= 7 * this.speed;
      }

      keycode = marioKeycode;

      // 달리는 중이라면
      if (this.isRunning()) {
        this.imagePosition.x =
          (this.isNext ? keycode.runStand : keycode.run) * keycode.sWidth;
      }
      // 걷는 중이라면
      else {
        this.imagePosition.x =
          (this.isNext ? keycode.stand : keycode.walk) * keycode.sWidth;
      }
    }
  }

  /**
   * 캐릭터 일어서기
   * 렌더링 이미지 변경 ( 렌더링 X )
   */
  stand(key: string) {
    // 우측을 보고 있다면
    if (this.direction) {
      this.imagePosition.x = marioKeycode.stand * marioKeycode.sWidth;
      this.imagePosition.y = marioKeycode.right;
    }
    // 좌측을 보고 있다면
    else {
      this.imagePosition.x = marioKeycode.stand * marioKeycode.sWidth;
      this.imagePosition.y = marioKeycode.left;
    }

    // 점프중이 아니라면
    if (key === "ArrowDown" && !this.isJumping()) {
      this.position.y -= marioKeycode.sHeight - marioKeycode.crawlHeight;
    }
  }

  /**
   * 캐릭터 엎드리기
   * 렌더링 이미지 변경 ( 렌더링 X )
   */
  private crawl() {
    // 아래 방향키를 누르고 있지 않다면
    if (!this.keys.ArrowDown) return;

    // 작은 마리오라면
    if (this.status === "small") {
      this.imagePosition.x = marioKeycode.sWidth * marioKeycode.crawl;

      // 아래 방향키를 누르고 첫 수행인 경우
      if (this.imageSize.h !== marioKeycode.crawlHeight) {
        // this.position.y += marioKeycode.sHeight - marioKeycode.crawlHeight;
      }
    }
  }

  /**
   * 캐릭터 점프
   * 좌표 이동 및 렌더링 이미지 변경 ( 렌더링 X )
   */
  private jump() {
    // 점프 키를 누른 경우
    if (this.keys.Space) {
      // 현재 점프중이 아닌 경우
      if (false === this.isJumping()) {
        this.isJumpingUp = true;
        this.jumpingHeight =
          this.position.y - this.jumpingPower * (this.speed === 1 ? 1 : 1.2);
      }
    }

    // 작은 마리오
    if (this.status === "small") {
      // 점프중 ( 상승 )
      if (
        this.isJumpingUp &&
        this.jumpingHeight &&
        this.jumpingHeight < this.position.y
      ) {
        // 점점 느려지는 효과 적용
        const delta =
          (this.position.y - this.jumpingHeight) / 20 + this.fallSpeed + 2;
        this.position.y -= delta;

        // 렌더링할 이미지 지정
        // 달리는 중이라면
        if (this.isRunning()) {
          // 달리기 점프
          this.imagePosition.x = marioKeycode.sWidth * marioKeycode.jumpRun;
        }
        // 걷는 중이라면
        else {
          // 점프 상승
          this.imagePosition.x = marioKeycode.sWidth * marioKeycode.jumpUp;
        }

        // 엎드린 점프라면
        if (this.keys.ArrowDown) {
          this.imagePosition.x = marioKeycode.sWidth * marioKeycode.crawl;
        }

        // 점프 상승의 끝
        if (this.jumpingHeight > this.position.y) {
          this.fallSpeed = this.minFallSpeed;
          this.isJumpingUp = false;
          this.isJumpingDown = true;
        }
      }
    }
  }

  /**
   * 하강
   * 렌더링 이미지 변경 ( 렌더링 X )
   */
  private fall() {
    // 땅에 닿은 시점에 서 있는 이미지 적용
    if (
      this.isJumpingDown &&
      this.prevPos.y - this.position.y >= 0 &&
      !this.keys.ArrowDown
    ) {
      this.fallSpeed = this.minFallSpeed;
      this.imagePosition.x = marioKeycode.sWidth * marioKeycode.right;
    }

    // 현재 하강중인지 판단
    this.isJumpingDown = this.prevPos.y - this.position.y < 0;

    // 하강중
    if (this.isJumpingDown) {
      // 점점 빨리 하강하지만 최대 하강속도는 유지
      this.fallSpeed += 0.1;
      if (this.fallSpeed >= this.maxFallSpeed) {
        this.fallSpeed = this.maxFallSpeed;
      }
      // 렌더링할 이미지 지정
      // 달리는 중이라면
      if (this.isRunning()) {
        // 달리기 점프
        this.imagePosition.x = marioKeycode.sWidth * marioKeycode.jumpRun;
      }
      // 걷는 중이라면
      else {
        // 점프 하강
        this.imagePosition.x = marioKeycode.sWidth * marioKeycode.JumpDown;
      }

      // 엎드린 점프라면
      if (this.keys.ArrowDown) {
        this.imagePosition.x = marioKeycode.sWidth * marioKeycode.crawl;
      }
    }
  }

  /**
   * 블럭과 충돌 여부 판단 후 위치 조정
   * @param blocks 블럭 배열
   */
  private isCollision(blocks: Block[]) {
    // 캐릭터의 상하좌우 좌표
    const { x, y } = this.position;
    const { w, h } = this.size;
    const cLeft = x;
    const cRight = x + w;
    const cTop = y;
    const cBottom = y + h;

    blocks.forEach((block) => {
      // 블럭의 상하좌우 좌표
      const { x, y } = block.getPosition();
      const { w, h } = block.getSize();
      const bLeft = x;
      const bRight = x + w;
      const bTop = y;
      const bBottom = y + h;

      // 충돌인 경우 이전 좌표로 돌아가기 ( 즉, 가로막혀서 움직일 수 없는 효과를 보여줌 )
      if (
        bLeft <= cRight &&
        bRight >= cLeft &&
        bTop <= cBottom &&
        bBottom >= cTop
      ) {
        // "좌 -> 우" 충돌인 경우
        const isLeft = this.prevPos.x + this.size.w - bLeft;
        if (
          isLeft < 0 &&
          bTop < this.position.y + this.size.h - this.fallSpeed - 1
        ) {
          this.position.x -= 7 * this.speed;
          return;
        }
        // "우 -> 좌" 충돌인 경우
        const isRight = bRight - this.prevPos.x;
        if (
          isRight < 0 &&
          bTop < this.position.y + this.size.h - this.fallSpeed - 1
        ) {
          this.position.x += 7 * this.speed;
          return;
        }
        // // >>> "아래 -> 위" 충돌인 경우
        // const isBottom = bBottom - this.prevPos.y;
        // if (isBottom < 0) {
        //   this.position.y += 7 * this.speed;
        //   return;
        // }
        // "위 -> 아래" 충돌인 경우
        this.position.y = bTop - this.size.h;
      }
    });
  }

  /**
   * 캐릭터 렌더링
   */
  draw() {
    // 작은 마리오
    if (this.status === "small") {
      this.imageSize.w = marioKeycode.sWidth;

      // 엎드린 경우
      if (this.keys.ArrowDown) {
        this.imageSize.h = marioKeycode.crawlHeight;
        this.size.h = marioKeycode.crawlHeight;
      }
      // 그 외에 경우 ( 서있는/달리는 )
      else {
        this.imageSize.h = marioKeycode.sHeight;
        this.size.h = marioKeycode.sHeight;
      }
    }

    this.ctx.drawImage(
      this.image,
      this.imagePosition.x,
      this.imagePosition.y,
      this.imageSize.w,
      this.imageSize.h,
      this.position.x,
      this.position.y,
      this.size.w,
      this.size.h
    );
  }

  /**
   * 키보드 입력에 의한 출력 실행
   */
  execute(blocks: Block[]) {
    // 가속 처리
    this.acceleration();
    // 이동 처리
    this.move();
    // 얻드려 처리
    this.crawl();
    // 점프(상승) 처리
    this.jump();
    // 충돌처리
    this.isCollision(blocks);
    // 하강처리
    this.fall();
    // 렌더링
    this.draw();

    // 이전 좌표 기록 ( 충돌의 방향을 알아내기 위함 )
    this.prevPos.x = this.position.x;
    this.prevPos.y = this.position.y;

    // 일단 하강하고 밑에 블럭이 있다면 충돌에서 검사 후 블럭위로 올려줌
    this.position.y += this.fallSpeed;

    // 반복 횟수
    this.addCount(1);
  }

  /**
   * 화면 사이즈 변경으로 인한 캐릭터 위치 변화
   */
  resize() {
    this.position.y = innerHeight - (innerHeight / 6.8 + this.size.h);
  }

  // is jumping
  isJumping() {
    return this.isJumpingUp || this.isJumpingDown;
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
  // 실행 횟수를 얻기 위한 처리
  addCount(number: number) {
    this.count += number;
  }

  // ===== getter / setter =====

  // keys
  getKeys() {
    return this.keys;
  }
  setKeys(keys: Keys) {
    this.keys = {
      ...this.keys,
      ...keys,
    };
  }
}
