/**
 * 캔버스 사이즈 지정
 * @param {*} $canvas canvas element
 */
export const resizeCanvas = ($canvas: HTMLCanvasElement) => {
  $canvas.width = innerWidth * 6;
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
 * 블록 키 테이블
 */
export const blockKeyTable = {
  // 지상 블록
  ground: {
    // 이미지의 "width"와 "height"
    width: 53,
    height: 53,

    // 이미지 y위치
    yPos: 0 * 53,

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
    horizontal: 13 * 53,
    vertical: 14 * 53,
    topArc: 15 * 53,
    rightArc: 16 * 53,
    bottomArc: 17 * 53,
    leftArc: 18 * 53,
    circle: 19 * 53,
  },

  // 지하 블록
  underground: {
    // 이미지의 "width"와 "height"
    width: 53,
    height: 53,

    // 이미지 y위치
    yPos: 1 * 53,

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
    horizontal: 13 * 53,
    vertical: 14 * 53,
    topArc: 15 * 53,
    rightArc: 16 * 53,
    bottomArc: 17 * 53,
    leftArc: 18 * 53,
    circle: 19 * 53,
  },

  // 눈 블록
  snow: {
    // 이미지의 "width"와 "height"
    width: 53,
    height: 53,

    // 이미지 y위치
    yPos: 2 * 53,

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
    horizontal: 13 * 53,
    vertical: 14 * 53,
    topArc: 15 * 53,
    rightArc: 16 * 53,
    bottomArc: 17 * 53,
    leftArc: 18 * 53,
    circle: 19 * 53,
  },
};

/**
 * 오브젝트 키 테이블
 */
export const myObjectKeyTable = {
  // 문
  door: {
    // 이미지의 "width"와 "height"
    width: 53,
    height: 106,

    // 이미지 y위치
    yPos: 0,

    // 이미지 x 위치
    xPos: 0,
  },

  // 코인
  coin: {
    //
    width: {
      front: 40,
      frontSide: 26,
      backSide: 20,
      back: 26,
    },
    height: 54,

    // 이미지 y 위치
    yPos: 106,

    // 이미지 x 위치
    xPos: {
      front: 0,
      frontSide: 0 + 40,
      backSide: 0 + 40 + 26,
      back: 0 + 40 + 26 + 20,
    },
  },
};
