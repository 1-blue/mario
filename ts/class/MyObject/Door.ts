import MyObject from "./index";

// util
import { myObjectKeyTable } from "../../utils/index";

// type
import type { Position } from "../../types/index";

/**
 * 문 오브젝트
 */
export default class Door extends MyObject {
  constructor(_pos: Position) {
    const { width, height, xPos, yPos } = myObjectKeyTable.door;

    super(
      _pos,
      { w: width, h: height },
      { ix: xPos, iy: yPos },
      { iw: width, ih: height }
    );
  }
}
