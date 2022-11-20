/**
 * 켄버스에 그려질 오브젝트 위치 타입
 */
export type Position = {
  x: number;
  y: number;
};
/**
 * 이미지 스프라이트에서 이미지의 위치 타입
 */
export type ImagePosition = {
  ix: number;
  iy: number;
};
/**
 * 캔버스에 그려질 오브젝트 크기 타입
 */
export type Size = {
  w: number;
  h: number;
};
/**
 * 이미지 스프라이트에서 이미지의 크기 타입
 */
export type ImageSize = {
  iw: number;
  ih: number;
};
/**
 * 입력 받은 키의 타입
 */
export type KeyType = "ArrowRight" | "ArrowLeft" | "ArrowDown" | "Space";
export type Keys = {
  [key in KeyType]?: {
    startTime: number;
  };
};
/**
 * 게임 진행 상태
 */
export type GameState = "start" | "play" | "end";

export type {
  EmenyKinds,
  GoombaKeyTable,
  GoombaMotion,
  FallSpeed,
  Jumping,
  PlayerKinds,
  MarioState,
  SmallMarioMotion,
  SmallMarioKeyTable,
} from "./charactor";

export type { MapShape, MapType } from "./map";

export type {
  BlockKeyTable,
  BlockType,
  GroundBlockShape,
  UndergroundBlockShape,
  SnowBlockShape,
} from "./block";
