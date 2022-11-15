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

export type {
  EmenyKinds,
  GoombaKeyTable,
  GoombaState,
  FallSpeed,
  Jumping,
  PlayerKinds,
  MarioStatus,
  SmallMarioKeyTable,
} from "./charactor";

export type { BlockKeyTable, BlockShape, BlockType, MapType } from "./map";
