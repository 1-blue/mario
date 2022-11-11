import type { Position, CharacterStatus, Keys, Size } from "../types/index";
import { marioKeycode } from "../utils/index";

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
 * @param isJumpingUp 점프중 판단 변수 ( 상승 )
 * @param isJumpingDown 점프중 판단 변수 ( 하강 )
 * @param jumpingPower 점프력 ( 점프할 높이 )
 * @param jumpingHeight 점프할 최종 목적지 ( 현재 위치 - ( 점프력 * 속도 ) )
 * @param jumpingArray 점프중 상승 시 위치 값들을 기록할 배열 ( 하강 시 반대로 실행하기 위함 )
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

  // 점프
  private isJumpingUp: boolean;
  private isJumpingDown: boolean;
  private jumpingPower: number;
  private jumpingHeight: number;
  private jumpingArray: number[];

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

    // 점프
    this.isJumpingUp = false;
    this.isJumpingDown = false;
    this.jumpingPower = 300;
    this.jumpingHeight = 0;
    this.jumpingArray = [];

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
   * 값 초기화 ( 한 번 누른 키를 떼는 시점에 실행 )
   */
  reset() {
    this.speed = 1;
  }

  /**
   * 캐릭터 이동 ( 좌표만 이동... 렌더링 X )
   */
  move() {
    // 이동이 아니라면
    if (
      !(
        this.keys.hasOwnProperty("ArrowLeft") ||
        this.keys.hasOwnProperty("ArrowRight")
      )
    )
      return;

    // >>> 관성처리하기
    // 엎드린 상태라면 움직임 X
    // if (this.keys.hasOwnProperty("ArrowDown")) return;

    let keycode = null;

    // 작은 마리오
    if (this.status === "small") {
      // 우측 이동
      if (this.keys.hasOwnProperty("ArrowRight")) {
        this.direction = true;

        // 보여줄 이미지의 x 결정 ( 우측을 보는 이미지 )
        this.imagePosition.y = marioKeycode.right;

        // 캔버스에서 우측 이동
        this.position.x += 7 * this.speed;
      }
      // 좌측 이동
      else if (this.keys.hasOwnProperty("ArrowLeft")) {
        this.direction = false;

        // 보여줄 이미지의 y 결정 ( 좌측을 보는 이미지 )
        this.imagePosition.y = marioKeycode.left;

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
   * 캐릭터 점프 ( 좌표만 이동... 렌더링 X )
   */
  jump() {
    // 점프 키를 누른 경우
    if (this.keys.hasOwnProperty("Space")) {
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
        const delta = (this.position.y - this.jumpingHeight) / 20 + 4;
        this.position.y -= delta;

        this.jumpingArray.push(delta);

        // 렌더링할 이미지 지정
        // 달리는 중이라면
        if (this.speed !== 1) {
          // 달리기 점프
          this.imagePosition.x = marioKeycode.sWidth * marioKeycode.jumpRun;
        }
        // 걷는 중이라면
        else {
          // 점프 상승
          this.imagePosition.x = marioKeycode.sWidth * marioKeycode.jumpUp;
        }

        if (this.jumpingHeight > this.position.y) {
          this.jumpingHeight += this.jumpingPower;
          this.isJumpingUp = false;
          this.isJumpingDown = true;
        }
      }
      // 점프중 ( 하강 )
      if (this.isJumpingDown && this.jumpingArray.length !== 0) {
        this.position.y += this.jumpingArray.pop() || 1;

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

        if (this.jumpingArray.length === 0) {
          this.isJumpingDown = false;
          delete this.keys.Space;

          // 하강 완료 시 기본 이미지로 변경
          this.imagePosition.x = marioKeycode.sWidth * marioKeycode.right;
        }
      }
    }
  }

  /**
   * 캐릭터 엎드리기
   */
  crawl() {
    if (this.status === "small") {
      if (this.keys.hasOwnProperty("ArrowDown")) {
        this.imagePosition.x = marioKeycode.sWidth * marioKeycode.crawl;

        // 아래 방향키를 누르고 첫 수행인 경우
        if (this.imageSize.h !== marioKeycode.crawlHeight) {
          this.position.y += marioKeycode.sHeight - marioKeycode.crawlHeight;
        }
      }
    }
  }

  /**
   * 캐릭터 일어서기
   */
  stand(key: string) {
    if (this.direction) {
      this.imagePosition.x = marioKeycode.stand * marioKeycode.sWidth;
      this.imagePosition.y = marioKeycode.right;
    } else {
      this.imagePosition.x = marioKeycode.stand * marioKeycode.sWidth;
      this.imagePosition.y = marioKeycode.left;
    }

    if (key === "ArrowDown" && !this.isJumping()) {
      this.position.y -= marioKeycode.sHeight - marioKeycode.crawlHeight;
    }
  }

  /**
   * 캐릭터 렌더링
   */
  draw() {
    // 작은 마리오
    if (this.status === "small") {
      this.imageSize.w = marioKeycode.sWidth;

      // 엎드린 경우
      if (this.keys.hasOwnProperty("ArrowDown")) {
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
   * 화면 사이즈 변경으로 인한 캐릭터 위치 변화
   */
  resize() {
    this.position.y = innerHeight - (innerHeight / 6.8 + this.size.h);
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
  // isNext
  getIsNext() {
    return this.isNext;
  }
  setIsNext(isNext: boolean) {
    this.isNext = isNext;
  }
  toggleIsNext() {
    this.isNext = !this.isNext;
  }
  // speed
  getSpeed() {
    return this.speed;
  }
  setSpeed(speed: number) {
    this.speed = speed;
  }
  // count
  getCount() {
    return this.count;
  }
  setCount(count: number) {
    this.count = count;
  }
  addCount(number: number) {
    this.count += number;
  }
  // is jumping
  isJumping() {
    return this.isJumpingUp || this.isJumpingDown;
  }
  // is running
  isRunning() {
    return this.speed !== 1;
  }
}
