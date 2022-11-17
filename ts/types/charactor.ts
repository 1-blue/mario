import { enemyKeyTable, playerKeyTable } from "../utils/index";

// ============================== 캐릭터 ==============================
/**
 * 하강 속도 관련 타입
 */
export type FallSpeed = {
  v: number;
  min: number;
  max: number;
};
/**
 * 점프관련 상태 타입
 */
export type Jumping = {
  isUp: boolean;
  isDown: boolean;
  power: number;
  destination: number;
};

// ============================== 플레이어 ==============================
/**
 * 플레이어 종류 ( 마리오 등 )
 */
export type PlayerKinds = keyof typeof playerKeyTable;
/**
 * 마리오 상태 ( 작은, 큰 등 )
 */
export type MarioState = keyof typeof playerKeyTable["mario"];
/**
 * 작은 마리오 몸짓 ( 행동 )
 * 걷기, 달리기, 엎드리기 등
 */
export type SmallMarioMotion = Exclude<
  keyof typeof playerKeyTable["mario"]["small"],
  "width" | "height" | "crawlHeight" | "right" | "left"
>;
/**
 * 작은 마리오 키 테이블 타입
 */
export type SmallMarioKeyTable = typeof playerKeyTable["mario"]["small"];

// ============================== 적 ==============================
/**
 * 적 종류
 */
export type EmenyKinds = keyof typeof enemyKeyTable;
/**
 * 굼바 몸짓 ( 행동 )
 * 왼발 걷는 중, 오른발 걷는 중, 죽기
 */
export type GoombaMotion = Exclude<
  keyof typeof enemyKeyTable["goomba"],
  "width" | "height" | "dieHeight" | "yPos"
>;
/**
 * 굼바 키 테이블 타입
 */
export type GoombaKeyTable = typeof enemyKeyTable["goomba"];
