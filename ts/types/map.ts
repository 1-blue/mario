// util
import { blockKeyTable } from "../utils/index";

/**
 * 맵 형태
 */
export type MapShape = "stairs" | "straight";
/**
 * 맵 타입
 */
export type MapType = keyof typeof blockKeyTable;
