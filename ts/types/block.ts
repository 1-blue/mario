// util
import { blockKeyTable } from "../utils/index";

/**
 * 블록 키 테이블 타입
 */
export type BlockKeyTable = typeof blockKeyTable[keyof typeof blockKeyTable];
/**
 * 블록 타입
 */
export type BlockType = keyof typeof blockKeyTable;

/**
 * 지상 블록 형태
 */
export type GroundBlockShape = Exclude<
  keyof typeof blockKeyTable["ground"],
  "width" | "height" | "yPos"
>;

/**
 * 지하 블록 형태
 */
export type UndergroundBlockShape = Exclude<
  keyof typeof blockKeyTable["underground"],
  "width" | "height" | "yPos"
>;

/**
 * 눈 블록 형태
 */
export type SnowBlockShape = Exclude<
  keyof typeof blockKeyTable["snow"],
  "width" | "height" | "yPos"
>;
