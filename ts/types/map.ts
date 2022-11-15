// util
import { blockKeyTable } from "../utils/index";

/**
 * 맵 종류
 */
export type MapType = "stairs";

// ========== 블록 ==========
/**
 * 블록 키 테이블 타입
 */
export type BlockKeyTable = typeof blockKeyTable[keyof typeof blockKeyTable];
/**
 * 블럭 타입
 */
export type BlockType = keyof typeof blockKeyTable;
/**
 * 블럭 형태
 */
export type BlockShape = Exclude<
  keyof typeof blockKeyTable["normal"],
  "width" | "height" | "default"
>;
