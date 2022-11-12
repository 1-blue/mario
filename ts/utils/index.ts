/**
 * 작은 마리오 키코드 ( 이미지 스프라이트를 사용하기 때문에 어느 위치에 어떤 이미지인지 매핑해줄 테이블이 필요 )
 */
export const marioKeycode = {
  // 작은 마리오 크기
  sWidth: 50,
  sHeight: 70,

  // 엎드린 마리오 크기
  crawlHeight: 50,

  // 마리오 위치 ( 우측 스프라이트는 0 ~ 70, 좌측 스프라이트는 70 ~ 140 )
  right: 0,
  left: 70,

  // 각 모션의 순서 ( x: "크기 * 순서", y: 위치 => 원하는 이미지 )
  stand: 0,
  walk: 1,
  runStand: 2,
  run: 3,
  jumpUp: 4,
  JumpDown: 5,
  jumpRun: 6,
  crawl: 7,
};

export const blockKeycode = {
  width: 53,
  height: 53,

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

  // >>> 나머지 이름 정하기
  solo: 13,
  soloLeft: 14,
  soloMid: 15,
  soloRight: 16,
};

export const initialBackground = () => {};
