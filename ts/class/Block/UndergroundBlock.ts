// class
import Block from "./index";

// type
import type {
  UndergroundBlockShape,
  Position,
  BlockType,
} from "../../types/index";

/**
 * 지하 블록 클래스
 */
export default class UndergroundBlock extends Block {
  constructor(_pos: Position, shape: UndergroundBlockShape, type: BlockType) {
    super(_pos, shape, type);
  }
}
