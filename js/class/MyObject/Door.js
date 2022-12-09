import MyObject from "./index.js";
// util
import { myObjectKeyTable } from "../../utils/index.js";
/**
 * 문 오브젝트
 */
export default class Door extends MyObject {
  constructor(_pos) {
    const { width, height, xPos, yPos } = myObjectKeyTable.door;
    super(
      _pos,
      { w: width, h: height },
      { ix: xPos, iy: yPos },
      { iw: width, ih: height }
    );
  }
}
