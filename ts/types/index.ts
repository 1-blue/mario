/**
 * 그려질 캐릭터의 위치 / 이미지 스프라이트에서 그릴 이미지 위치 타입
 */
export type Position = {
  x: number;
  y: number;
};
/**
 * 그려질 캐릭터의 크기 / 이미지 스프라이트에서 캐릭터의 크기
 */
export type Size = {
  w: number;
  h: number;
};

/**
 * 캐릭터 타입 ( 작은 마리오, 큰 마리오 )
 */
export type CharacterStatus = "small" | "long";

/**
 * 입력 받은 키의 타입
 */
export type Keys = {
  [key: string]: {
    startTime: number;
  };
};

/**
 * 블럭 타입
 */
export type BlockType =
  | "leftTop"
  | "top"
  | "rightTop"
  | "left"
  | "mid"
  | "right"
  | "leftBottom"
  | "bottom"
  | "rightBottom"
  | "leftTopAngle"
  | "rightTopAngle"
  | "leftBottomAngle"
  | "rightBottomAngle"
  | "solo"
  | "soloLeft"
  | "soloMid"
  | "soloRight";

/**
 * 맵 타임
 */
export type MapType = "stairs";
