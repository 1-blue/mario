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
export default class Character {
    /**
     * "Chactor class"의 생성자
     *
     * @param _pos 캔버스에서 렌더링될 좌표 ( x, y )
     * @param iPos 이미지 스프라이트에서 렌더링될 이미지의 좌표 ( ix, iy )
     * @param _size 켄버스에서 렌더링될 크기 ( w, h )
     * @param iSize 이미지 스프라이트에서 렌더링될 이미지의 크기 ( iw, ih )
     * @param _dir 이동 방향
     */
    constructor(_pos, iPos, _size, iSize, _dir) {
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
     * 반복 시 실행해야 할 것들을 실행
     * ( 하위 클래스에서 필요한 메서드 추가로 실행하기 )
     */
    execute() {
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
    // getter / setter
    // ctx
    static get ctx() {
        return this._ctx;
    }
    static set ctx(_ctx) {
        this._ctx = _ctx;
    }
    // pos
    get pos() {
        return this._pos;
    }
    set pos(_pos) {
        this._pos = _pos;
    }
    // size
    get size() {
        return this._size;
    }
    set size(_size) {
        this._size = _size;
    }
    // prevPos
    get prevPos() {
        return this._prevPos;
    }
    set prevPos(_prevPos) {
        this._prevPos = _prevPos;
    }
    // distance
    get distance() {
        return this._distance;
    }
    set distance(_distance) {
        this._distance = _distance;
    }
    // speed
    get speed() {
        return this._speed;
    }
    set speed(_speed) {
        this._speed = _speed;
    }
    // fallSpeed
    get fallSpeed() {
        return this._fallSpeed;
    }
    set fallSpeed(_fallSpeed) {
        this._fallSpeed = _fallSpeed;
    }
    // jumping
    get jumping() {
        return this._jumping;
    }
    set jumping(_jumping) {
        this._jumping = _jumping;
    }
    // dir
    get dir() {
        return this._dir;
    }
    set dir(_dir) {
        this._dir = _dir;
    }
}
