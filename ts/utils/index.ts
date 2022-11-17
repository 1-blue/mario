/**
 * 캔버스 사이즈 지정
 * @param {*} $canvas canvas element
 */
export const resizeCanvas = ($canvas: HTMLCanvasElement) => {
  $canvas.width = innerWidth;
  $canvas.height = innerHeight;
};

/**
 * 플레이어 키 테이블
 * ( 이미지 스프라이트를 사용하기 때문에 어느 위치에 어떤 이미지인지 매핑해줄 테이블이 필요 )
 */
export const playerKeyTable = {
  // 마리오
  mario: {
    // 작은
    small: {
      // 이미지의 "width"와 "height"
      width: 46,
      height: 64,
      crawlHeight: 46,
      dieHight: 69,

      // 이미지의 y위치
      right: 0 * 69,
      left: 1 * 69,

      // 이미지 x위치
      stand: 0 * 46,
      walk: 1 * 46,
      runStand: 2 * 46,
      run: 3 * 46,
      jumpUp: 4 * 46,
      JumpDown: 5 * 46,
      jumpRun: 6 * 46,
      crawl: 7 * 46,
      die: 8 * 46,
    },

    // 큰
    long: {},
  },
};

/**
 * 적 키 테이블
 */
export const enemyKeyTable = {
  // 굼바
  goomba: {
    // 이미지의 "width"와 "height"
    width: 52,
    height: 52,
    dieHeight: 29,

    // 이미지 y위치
    yPos: 0,

    // 이미지 x위치
    left: 0 * 52,
    right: 1 * 52,
    die: 2 * 52,
  },
};

/**
 * 블록 키코드
 */
export const blockKeyTable = {
  // 일반 블록
  normal: {
    // 이미지의 "width"와 "height"
    width: 53,
    height: 53,

    // 이미지 y위치
    yPos: 0,

    // 이미지 x위치
    leftTop: 0 * 53,
    top: 1 * 53,
    rightTop: 2 * 53,
    left: 3 * 53,
    mid: 4 * 53,
    right: 5 * 53,
    leftBottom: 6 * 53,
    bottom: 7 * 53,
    rightBottom: 8 * 53,
    leftTopAngle: 9 * 53,
    rightTopAngle: 10 * 53,
    leftBottomAngle: 11 * 53,
    rightBottomAngle: 12 * 53,
    line: 13 * 53,
    topArc: 14 * 53,
    rightArc: 15 * 53,
    bottomArc: 16 * 53,
    leftArc: 17 * 53,
    circle: 18 * 53,
  },
};
