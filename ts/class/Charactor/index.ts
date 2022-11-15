// class
import Player from "./Player/index";
import Enemy from "./Enemy/index";
import Block from "../Map/Block";

// type
import type {
  FallSpeed,
  ImagePosition,
  ImageSize,
  Position,
  Size,
} from "../../types/index";

/**
 * 모든 캐릭터의 가상 부모 클래스
 * ( 마리오, 굼바 등 )
 *
 * @param ctx (static) "<canvas>"의 "context"
 * @param image (static) 렌더링 할 이미지 스프라이트
 *
 * @param pos 캔버스에서 렌더링될 좌표 ( x, y )
 * @param iPos 이미지 스프라이트에서 렌더링될 이미지의 좌표 ( ix, iy )
 * @param size 켄버스에서 렌더링될 크기 ( w, h )
 * @param iSize 이미지 스프라이트에서 렌더링될 이미지의 크기 ( iw, ih )
 * @param prevPos 캔버스에서 바로 이전에 그려진 좌표 ( x, y )
 *
 * @param speed 속도
 * @param distance 한 번에 이동할 거리
 * @param fallSpeed 떨어질 속도, 최솟값, 최댓값
 * @param dir 이동 방향
 *
 * @param count 렌더링 속도 조절을 위한 변수
 */
export default abstract class Charactor {
  // 정적 변수
  static ctx: CanvasRenderingContext2D;
  static image: HTMLImageElement;

  // 렌더링 좌표 관련
  protected pos: Position;
  protected iPos: ImagePosition;
  protected size: Size;
  protected iSize: ImageSize;
  protected prevPos: Position;

  // 이동 관련
  protected speed: number;
  protected distance: number;
  protected fallSpeed: FallSpeed;
  protected dir: boolean;

  // 렌더링 관련
  protected count: number;

  /**
   * "Chactor class"의 생성자
   *
   * @param pos 캔버스에서 렌더링될 좌표 ( x, y )
   * @param iPos 이미지 스프라이트에서 렌더링될 이미지의 좌표 ( ix, iy )
   * @param size 켄버스에서 렌더링될 크기 ( w, h )
   * @param iSize 이미지 스프라이트에서 렌더링될 이미지의 크기 ( iw, ih )
   * @param dir 이동 방향
   */
  constructor(
    pos: Position,
    iPos: ImagePosition,
    size: Size,
    iSize: ImageSize,
    dir: boolean
  ) {
    this.pos = pos;
    this.iPos = iPos;
    this.size = size;
    this.iSize = iSize;
    this.prevPos = { x: 0, y: 0 };

    this.speed = 1;
    this.distance = 6;
    this.fallSpeed = { v: 4, min: 4, max: 12 };
    this.dir = dir;

    this.count = 0;
  }

  /**
   * 캐릭터 이동 ( 좌표 이동, 이미지 좌표 이동, 렌더링 X )
   */
  protected abstract move(): void;

  /**
   * 캐릭터 충돌 처리
   * 블럭과 충돌 시 좌표를 원래대로 되돌림
   * 적과 충돌 시 방향에 따라 죽이거나 / 죽음
   *
   * @param blocks 그려진 블록
   * @param chractor 하위에서 메서드 재정의 시 사용하는 인수
   */
  protected collision(blocks: Block[], chractor: Player | Enemy[]) {
    // 캐릭터의 상하좌우 좌표
    const { x, y } = this.pos;
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
        if (isLeft < 0 && bTop < this.pos.y + this.size.h - this.fallSpeed.v) {
          this.pos.x -= this.distance * this.speed;
          return;
        }
        // "우 -> 좌" 충돌인 경우
        const isRight = bRight - this.prevPos.x;
        if (isRight < 0 && bTop < this.pos.y + this.size.h - this.fallSpeed.v) {
          this.pos.x += this.distance * this.speed;
          return;
        }
        // "위 -> 아래" 충돌인 경우
        this.pos.y = bTop - this.size.h;
      }
    });
  }

  /**
   * 캐릭터 렌더링
   * 이전 수행으로 이동된 좌표(pos)와 그려질 이미지(iPos)를 렌더링함
   */
  protected abstract draw(): void;

  /**
   * 반복 시 실행해야 할 것들을 실행
   * ( 하위 클래스에서 필요한 메서드 추가로 실행하기 )
   */
  protected execute() {
    // 이전 좌표 기록 ( 충돌의 방향을 알아내기 위함 )
    this.prevPos.x = this.pos.x;
    this.prevPos.y = this.pos.y;

    // 일단 하강하고 밑에 블럭이 있다면 충돌에서 검사 후 블럭위로 올려줌
    this.pos.y += this.fallSpeed.v;

    // 반복 횟수
    this.count++;
  }

  /**
   * 실행
   * ( 좌표 이동, 이미지 변경, 렌더링 등의 모든 처리 실행 메서드 )
   * 오버로딩
   */
  public abstract process(blocks: Block[], player: Player): void;
  public abstract process(blocks: Block[], enemies: Enemy[]): void;
}
