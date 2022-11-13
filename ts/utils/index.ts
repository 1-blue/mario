/**
 * 캔버스 사이즈 지정
 * @param {*} $canvas canvas element
 */
export const resizeCanvas = ($canvas: HTMLCanvasElement) => {
  $canvas.width = innerWidth;
  $canvas.height = innerHeight;
};

/**
 * 마리오 키코드
 * ( 이미지 스프라이트를 사용하기 때문에 어느 위치에 어떤 이미지인지 매핑해줄 테이블이 필요 )
 */
export const marioKeycode = {
  // 스프라이트에서 작은 마리오 크기
  sWidth: 46,
  sHeight: 64,

  // 엎드린 마리오 크기
  crawlHeight: 46,

  // 마리오 이미지 y위치
  right: 0,
  left: 64,

  // 마리오 이미지 x위치
  stand: 0,
  walk: 1,
  runStand: 2,
  run: 3,
  jumpUp: 4,
  JumpDown: 5,
  jumpRun: 6,
  crawl: 7,
};

/**
 * 블럭 키코드
 */
export const blockKeycode = {
  // 스프라이트에서 블럭 크기
  width: 53,
  height: 53,

  // 블럭 이미지 y위치
  default: 0,

  // 블럭 이미지 x위치
  leftTop: 0,
  top: 1,
  rightTop: 2,
  left: 3,
  mid: 4,
  right: 5,
  leftBottom: 6,
  bottom: 7,
  rightBottom: 8,
  leftTopAngle: 9,
  rightTopAngle: 10,
  leftBottomAngle: 11,
  rightBottomAngle: 12,
  line: 13,
  topArc: 14,
  rightArc: 15,
  bottomArc: 16,
  leftArc: 17,
  circle: 18,
};
