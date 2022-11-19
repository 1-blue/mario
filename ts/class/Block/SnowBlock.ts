// class
import Block from "./index";

// type
import type { SnowBlockShape, Position, BlockType } from "../../types/index";

/**
 * 눈 블록 클래스
 */
export default class SnowBlock extends Block {
  constructor(_pos: Position, shape: SnowBlockShape, type: BlockType) {
    super(_pos, shape, type);
  }
}
