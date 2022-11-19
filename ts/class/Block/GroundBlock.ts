// class
import Block from "./index";

// type
import type { BlockType, GroundBlockShape, Position } from "../../types/index";

/**
 * 지상 블록 클래스
 */
export default class GroundBlock extends Block {
  constructor(_pos: Position, shape: GroundBlockShape, type: BlockType) {
    super(_pos, shape, type);
  }
}
