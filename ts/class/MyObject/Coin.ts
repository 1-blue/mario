import MyObject from "./index";

// util
import { myObjectKeyTable } from "../../utils/index";

// type
import type { CoinState, Position } from "../../types/index";

/**
 * 코인 오브젝트
 */
export default class Coin extends MyObject {
  public static count: number;

  private state: CoinState;

  constructor(_pos?: Position) {
    const { width, height, xPos, yPos } = myObjectKeyTable.coin;

    // 랜덤 위치에 생성
    if (!_pos) {
      // 랜덤한 Y위치 후보
      const candidateY = [700, 600, 500, 400, 300, 200];

      // 랜덤한 X위치
      const randomPosX = Math.ceil(Math.random() * (innerWidth * 6));

      _pos = {
        x: randomPosX,
        y: candidateY[Math.floor(Math.random() * candidateY.length)],
      };
    }

    super(
      _pos,
      { w: width.front, h: height },
      { ix: xPos.front, iy: yPos },
      { iw: width.front, ih: height }
    );

    this.state = "front";

    if (!Coin.count) Coin.count = 0;
  }

  /**
   * 동전 렌더링 이미지 변경 ( 회전 )
   */
  public rotate() {
    // 회전
    if (Coin.count % 16 === 0) {
      const coinWidth = myObjectKeyTable.coin.width.front;

      switch (this.state) {
        case "front":
          this.state = "frontSide";
          this.pos.x +=
            coinWidth / 2 - myObjectKeyTable.coin.width[this.state] / 2;
          break;

        case "frontSide":
          this.pos.x -=
            coinWidth / 2 - myObjectKeyTable.coin.width[this.state] / 2;
          this.state = "backSide";
          this.pos.x +=
            coinWidth / 2 - myObjectKeyTable.coin.width[this.state] / 2;
          break;

        case "backSide":
          this.pos.x -=
            coinWidth / 2 - myObjectKeyTable.coin.width[this.state] / 2;
          this.state = "back";
          this.pos.x +=
            coinWidth / 2 - myObjectKeyTable.coin.width[this.state] / 2;
          break;

        case "back":
          this.pos.x -=
            coinWidth / 2 - myObjectKeyTable.coin.width[this.state] / 2;
          this.state = "front";
          break;
      }

      this.size.w = myObjectKeyTable.coin.width[this.state];
      this.iPos.ix = myObjectKeyTable.coin.xPos[this.state];
      this.iSize.iw = myObjectKeyTable.coin.width[this.state];
    }
  }
}
