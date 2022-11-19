// type
import type {
  FallSpeed,
  ImagePosition,
  ImageSize,
  Jumping,
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
 * @param _pos 캔버스에서 렌더링될 좌표 ( x, y )
 * @param iPos 이미지 스프라이트에서 렌더링될 이미지의 좌표 ( ix, iy )
 * @param _size 켄버스에서 렌더링될 크기 ( w, h )
 * @param iSize 이미지 스프라이트에서 렌더링될 이미지의 크기 ( iw, ih )
 * @param _prevPos 캔버스에서 바로 이전에 그려진 좌표 ( x, y )
 *
 * @param _speed 속도
 * @param _distance 한 번에 이동할 거리
 * @param _fallSpeed 떨어질 속도, 최솟값, 최댓값
 * @param _jumping 점프 관련 객체
 * @param _dir 이동 방향
 *
 * @param count 렌더링 속도 조절을 위한 변수
 */
export default abstract class Character {
  // 정적 변수
  protected static _ctx: CanvasRenderingContext2D;
  protected static image: HTMLImageElement;

  // 렌더링 좌표 관련
  private _pos: Position;
  protected iPos: ImagePosition;
  private _size: Size;
  protected iSize: ImageSize;
  private _prevPos: Position;

  // 이동 관련
  private _speed: number;
  private _distance: number;
  private _fallSpeed: FallSpeed;
  private _jumping: Jumping;
  private _dir: boolean;

  // 렌더링 관련
  protected count: number;

  /**
   * "Chactor class"의 생성자
   *
   * @param _pos 캔버스에서 렌더링될 좌표 ( x, y )
   * @param iPos 이미지 스프라이트에서 렌더링될 이미지의 좌표 ( ix, iy )
   * @param _size 켄버스에서 렌더링될 크기 ( w, h )
   * @param iSize 이미지 스프라이트에서 렌더링될 이미지의 크기 ( iw, ih )
   * @param _dir 이동 방향
   */
  constructor(
    _pos: Position,
    iPos: ImagePosition,
    _size: Size,
    iSize: ImageSize,
    _dir: boolean
  ) {
    this._pos = _pos;
    this.iPos = iPos;
    this._size = _size;
    this.iSize = iSize;
    this._prevPos = { x: 0, y: 0 };

    this._speed = 1;
    this._distance = 6;
    this._fallSpeed = { v: 4, min: 4, max: 12 };
    this._jumping = { isUp: false, isDown: false, power: 300, destination: 0 };
    this._dir = _dir;

    this.count = 0;
  }

  /**
   * 캐릭터 이동 ( 좌표 이동, 이미지 좌표 이동, 렌더링 X )
   */
  protected abstract move(): void;

  /**
   * 떨어지는 속도 조절
   */
  protected abstract fall(): void;

  /**
   * 캐릭터 렌더링
   * 이전 수행으로 이동된 좌표(pos)와 그려질 이미지(iPos)를 렌더링함
   */
  protected abstract draw(): void;

  /**
   * 캐릭터 사망
   */
  public abstract die(): void;

  /**
   * 반복 시 실행해야 할 것들을 실행
   * ( 하위 클래스에서 필요한 메서드 추가로 실행하기 )
   */
  public execute() {
    // 하강 처리
    this.fall();

    // 렌더링
    this.draw();

    // 반복 횟수
    this.count++;

    // 이전 좌표 기록 ( 충돌의 방향을 알아내기 위함 )
    this.prevPos.x = this.pos.x;
    this.prevPos.y = this.pos.y;

    // 일단 하강하고 밑에 블록이 있다면 충돌에서 검사 후 블록위로 올려줌
    this.pos.y += this.fallSpeed.v;
  }

  /**
   * 실행
   * ( 좌표 이동, 이미지 변경, 렌더링 등의 모든 처리 실행 메서드 )
   */
  public abstract process(): void;

  // getter / setter
  // ctx
  public static get ctx() {
    return this._ctx;
  }
  public static set ctx(_ctx: CanvasRenderingContext2D) {
    this._ctx = _ctx;
  }
  // pos
  public get pos() {
    return this._pos;
  }
  public set pos(_pos: Position) {
    this._pos = _pos;
  }
  // size
  public get size() {
    return this._size;
  }
  public set size(_size: Size) {
    this._size = _size;
  }
  // prevPos
  public get prevPos() {
    return this._prevPos;
  }
  public set prevPos(_prevPos: Position) {
    this._prevPos = _prevPos;
  }
  // distance
  public get distance() {
    return this._distance;
  }
  public set distance(_distance: number) {
    this._distance = _distance;
  }
  // speed
  public get speed() {
    return this._speed;
  }
  public set speed(_speed: number) {
    this._speed = _speed;
  }
  // fallSpeed
  public get fallSpeed() {
    return this._fallSpeed;
  }
  public set fallSpeed(_fallSpeed: FallSpeed) {
    this._fallSpeed = _fallSpeed;
  }
  // jumping
  public get jumping() {
    return this._jumping;
  }
  public set jumping(_jumping: Jumping) {
    this._jumping = _jumping;
  }
  // dir
  public get dir() {
    return this._dir;
  }
  public set dir(_dir: boolean) {
    this._dir = _dir;
  }
}
