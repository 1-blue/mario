// util
import { myObjectKeyTable } from "../utils/index";

/**
 * 오브젝트 키 테이블 타입
 */
export type MyObjectKeyTable =
  typeof myObjectKeyTable[keyof typeof myObjectKeyTable];
/**
 * 오브젝트 타입
 */
export type MyObjectType = keyof typeof myObjectKeyTable;

/**
 * 코인 상태
 */
export type CoinState = keyof typeof myObjectKeyTable.coin.xPos;
