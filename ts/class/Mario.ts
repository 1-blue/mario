import type { Position, CharacterStatus } from "../types/index";
import { smallMarioMoveKeyCode } from "../utils/index";

/**
 * 마리오 클래스
 * @param ctx 배경화면을 그릴 "canvas"의 "context"
 * @param position 현재 마리오의 x, y 좌표
 * @param image 마리오 이미지 스프라이트를 가진 이미지 객체
 * @param status 현재 캐릭터 상태
 * @param isKeyPress 현재 키를 누르고 있는 상태인지 여부
 * @param isNext 같은 키를 계속 누르고 있는 경우에 다음 동작으로 넘어가기위해 사용하는 변수
 * @param key 현재 누른 key
 * @param speed 현재 속도 ( 낮을수록 빠름 )
 * @param startTime 현재 누르고 있는 키를 처음 누른 시간값
 * @param endTime 현재 누르고 있는 키를 뗀 시간값
 * @param count "requestAnimationFrame"의 속도 조절을 위해 사용하는 변수
 */
export default class Mario {
  private ctx: CanvasRenderingContext2D;
  private position: Position;
  private image: HTMLImageElement;
  private status: CharacterStatus;
  private isKeyPress: boolean;
  private isNext: boolean;
  private key: string | null;
  private speed: number;
  private startTime: number;
  private endTime: number;
  private count: number;

  constructor(ctx: CanvasRenderingContext2D, position: Position) {
    const image = new Image();
    image.src = "./assets/images/mario.png";

    this.ctx = ctx;
    this.position = position;
    this.image = image;
    this.status = "small";
    this.isKeyPress = false;
    this.isNext = false;
    this.key = null;
    this.speed = 5;
    this.startTime = 0;
    this.endTime = 0;
    this.count = 0;

    // 이미지 로드 완료 시 그리기
    image.addEventListener("load", () => {
      const keycode = smallMarioMoveKeyCode;
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
    this.startTime = Date.now();
    this.endTime = Date.now();
    this.isKeyPress = false;
    this.key = null;
    this.speed = 5;
  }

  /**
   * 키를 누른 상태에 실행 ( 캐릭터 이동 )
   */
  move() {
    let keycode = null;

    // 작은 마리오
    if (this.status === "small") {
      // 우측 이동
      if (this.key === "ArrowRight") {
        this.position.x += 10;
        keycode = smallMarioMoveKeyCode;

        const pos =
          (this.isNext ? keycode.right : keycode.rightMove) * keycode.interval;

        this.ctx.drawImage(
          this.image,
          pos + 12,
          0 + 8,
          18,
          20,
          this.position.x,
          this.position.y,
          60,
          60
        );
      }
      // 좌측 이동
      else if (this.key === "ArrowLeft") {
        this.position.x -= 10;
        keycode = smallMarioMoveKeyCode;

        const pos =
          (this.isNext ? keycode.left : keycode.leftMove) * keycode.interval;

        this.ctx.drawImage(
          this.image,
          pos + 10,
          0 + 8,
          18,
          20,
          this.position.x,
          this.position.y,
          60,
          60
        );
      }
    }
  }

  /**
   * 화면 사이즈 변경으로 인한 캐릭터 위치 변화
   */
  resize() {
    this.position.y = innerHeight - (innerHeight / 6.8 + 60);
  }

  // ===== getter / setter =====

  // isKeyPress
  getIsKeyPress() {
    return this.isKeyPress;
  }
  setIsKeyPress(isKeyPress: boolean) {
    this.isKeyPress = isKeyPress;
  }
  // startTime
  getStartTime() {
    return this.startTime;
  }
  setStartTime(startTime: number) {
    this.startTime = startTime;
  }
  // key
  getKey() {
    return this.key;
  }
  setKey(key: string) {
    this.key = key;
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
