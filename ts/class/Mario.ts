import type { Position, CharacterStatus, Keys } from "../types/index";
import { smallMarioKeyCode } from "../utils/index";

/**
 * 마리오 클래스
 * @param ctx 배경화면을 그릴 "canvas"의 "context"
 * @param position 현재 마리오의 x, y 좌표
 * @param image 마리오 이미지 스프라이트를 가진 이미지 객체
 * @param status 현재 캐릭터 상태
 * @param isNext 같은 키를 계속 누르고 있는 경우에 다음 동작으로 넘어가기위해 사용하는 변수
 * @param keys 현재 누른 key들
 * @param speed 현재 속도 ( 낮을수록 빠름 )
 * @param count 반복 횟수 ( 속도에 맞게 이미지 렌더링 순서를 지정하기 위함 )
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
  private image: HTMLImageElement;
  private status: CharacterStatus;
  private isNext: boolean;
  private keys: Keys;
  private speed: number;
  private count: number;

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
      x: smallMarioKeyCode.right * smallMarioKeyCode.interval + 12,
      y: 8,
    };
    this.image = image;
    this.status = "small";
    this.isNext = false;
    this.keys = {};
    this.speed = 1;
    this.count = 0;

    // 점프
    this.isJumpingUp = false;
    this.isJumpingDown = false;
    this.jumpingPower = 300;
    this.jumpingHeight = 0;
    this.jumpingArray = [];

    // 이미지 로드 완료 시 그리기
    image.addEventListener("load", () => {
      const keycode = smallMarioKeyCode;
      const pos = keycode.right * keycode.interval;

      // "+12", "+8"의 이유는 이미지 스프라이트가 정확하게 이미지 크기에 맞지 않아서 그 격차만큼 더해주는 것 ( 노가다로 구함 )
      ctx.drawImage(
        image,
        pos + 12,
        0 + 8,
        18,
        20,
        this.position.x,
        this.position.y,
        60,
        60
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

    let keycode = null;

    // 작은 마리오
    if (this.status === "small") {
      // 우측 이동
      if (this.keys.hasOwnProperty("ArrowRight")) {
        this.position.x += 7 * this.speed;

        keycode = smallMarioKeyCode;
        this.imagePosition.x =
          (this.isNext ? keycode.right : keycode.rightMove) * keycode.interval +
          12;
      }
      // 좌측 이동
      else if (this.keys.hasOwnProperty("ArrowLeft")) {
        this.position.x -= 7 * this.speed;

        keycode = smallMarioKeyCode;
        this.imagePosition.x =
          (this.isNext ? keycode.left : keycode.leftMove) * keycode.interval +
          10;
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
      if (this.isJumpingUp === false && this.isJumpingDown === false) {
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

        if (this.jumpingHeight > this.position.y) {
          this.jumpingHeight += this.jumpingPower;
          this.isJumpingUp = false;
          this.isJumpingDown = true;
        }
      }
      // 점프중 ( 하강 )
      if (this.isJumpingDown && this.jumpingArray.length !== 0) {
        this.position.y += this.jumpingArray.pop() || 1;

        if (this.jumpingArray.length === 0) {
          this.isJumpingDown = false;
          delete this.keys.Space;
        }
      }

      // >>> 이미지 편집 후 수정
      // this.imagePosition.x = 0;
    }
  }

  /**
   * 캐릭터 렌더링
   */
  draw() {
    this.ctx.drawImage(
      this.image,
      this.imagePosition.x,
      this.imagePosition.y,
      18,
      20,
      this.position.x,
      this.position.y,
      60,
      60
    );
  }

  /**
   * 화면 사이즈 변경으로 인한 캐릭터 위치 변화
   */
  resize() {
    this.position.y = innerHeight - (innerHeight / 6.8 + 60);
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
}
