// class
import Background from "../Map/Background";
import Block from "../Block/index";
import GroundBlock from "../Block/GroundBlock";
import UndergroundBlock from "../Block/UndergroundBlock";
import SnowBlock from "../Block/SnowBlock";

// type
import type { MapShape, MapType } from "../../types/index";

/**
 * 맵 생성과 관련된 모든 처리를 관리할 관리자 클래스 ( 싱글톤 )
 *
 * @param instance ( static ) 인스턴스
 */
export default class MapManager {
  private static instance: MapManager;
  private static background: Background;

  constructor(type: MapType) {
    // 싱글톤으로 구현
    if (MapManager.instance) return MapManager.instance;

    MapManager.instance = this;
    MapManager.background = new Background();

    // 초기 배경 렌더링
    MapManager.background.draw(type);
  }

  /**
   * 맵 성성 함수
   * @param blocks 생성할 블록을 담을 배열
   * @param shape 맵 형태 선택
   * @param type 맵 타입 선택
   */
  CreateMap(blocks: Block[], shape: MapShape, type: MapType) {
    switch (shape) {
      case "stairs":
        this.createStairs(blocks, type);
        break;
      case "straight":
        this.createStraight(blocks, type);
        break;

      default:
        this.createStraight(blocks, type);
        break;
    }
  }

  /**
   * 계단맵 생성
   * @param blocks 생성할 블록을 저장할 블록 배열
   */
  private createStairs(blocks: Block[], type: MapType) {
    // 랜덤한 블록 Y위치 후보
    const candidateY = [200, 100];

    // 지상 맵
    if (type === "ground") {
      // 1층
      Array(Math.ceil((innerWidth * 6) / 100))
        .fill(null)
        .forEach((v, i) =>
          blocks.push(new GroundBlock({ x: i * 100, y: 900 }, "mid", type))
        );
      // 2층
      Array(Math.ceil((innerWidth * 6) / 100))
        .fill(null)
        .forEach((v, i) => {
          if (i % 12 === 0 || i % 12 === 1) {
            blocks.push(new GroundBlock({ x: i * 100, y: 800 }, "top", type));
          } else if (i % 12 === 2) {
            blocks.push(
              new GroundBlock({ x: i * 100, y: 800 }, "leftTopAngle", type)
            );
          } else if (
            i % 12 === 3 ||
            i % 12 === 4 ||
            i % 12 === 5 ||
            i % 12 === 6 ||
            i % 12 === 7 ||
            i % 12 === 8
          ) {
            blocks.push(new GroundBlock({ x: i * 100, y: 800 }, "mid", type));
          } else if (i % 12 === 9) {
            blocks.push(
              new GroundBlock({ x: i * 100, y: 800 }, "rightTopAngle", type)
            );
          } else if (i % 12 === 10 || i % 12 === 11) {
            blocks.push(new GroundBlock({ x: i * 100, y: 800 }, "top", type));
          }
        });
      // 3층
      Array(Math.ceil((innerWidth * 6) / 100))
        .fill(null)
        .forEach((v, i) => {
          if (i % 12 === 0 || i % 12 === 1) return;
          else if (i % 12 === 2) {
            blocks.push(
              new GroundBlock({ x: i * 100, y: 700 }, "leftTop", type)
            );
          } else if (i % 12 === 3) {
            blocks.push(
              new GroundBlock({ x: i * 100, y: 700 }, "leftTopAngle", type)
            );
          } else if (
            i % 12 === 4 ||
            i % 12 === 5 ||
            i % 12 === 6 ||
            i % 12 === 7
          ) {
            blocks.push(new GroundBlock({ x: i * 100, y: 700 }, "mid", type));
          } else if (i % 12 === 8) {
            blocks.push(
              new GroundBlock({ x: i * 100, y: 700 }, "rightTopAngle", type)
            );
          } else if (i % 12 === 9) {
            blocks.push(
              new GroundBlock({ x: i * 100, y: 700 }, "rightTop", type)
            );
          } else if (i % 12 === 10 || i % 12 === 11) {
            return;
          }
        });
      // 4층
      Array(Math.ceil((innerWidth * 6) / 100))
        .fill(null)
        .forEach((v, i) => {
          if (i % 12 === 0 || i % 12 === 1 || i % 12 === 2) return;
          else if (i % 12 === 3) {
            blocks.push(
              new GroundBlock({ x: i * 100, y: 600 }, "leftTop", type)
            );
          } else if (i % 12 === 4) {
            blocks.push(
              new GroundBlock({ x: i * 100, y: 600 }, "leftTopAngle", type)
            );
          } else if (i % 12 === 5 || i % 12 === 6) {
            blocks.push(new GroundBlock({ x: i * 100, y: 600 }, "mid", type));
          } else if (i % 12 === 7) {
            blocks.push(
              new GroundBlock({ x: i * 100, y: 600 }, "rightTopAngle", type)
            );
          } else if (i % 12 == 8) {
            blocks.push(
              new GroundBlock({ x: i * 100, y: 600 }, "rightTop", type)
            );
          } else if (i % 12 === 9 || i % 12 === 10 || i % 12 === 11) {
            return;
          }
        });
      // 5층
      Array(Math.ceil((innerWidth * 6) / 100))
        .fill(null)
        .forEach((v, i) => {
          if (i % 12 === 0 || i % 12 === 1 || i % 12 === 2 || i % 12 === 3)
            return;
          else if (i % 12 === 4) {
            blocks.push(
              new GroundBlock({ x: i * 100, y: 500 }, "leftTop", type)
            );
          } else if (i % 12 === 5) {
            blocks.push(
              new GroundBlock({ x: i * 100, y: 500 }, "leftTopAngle", type)
            );
          } else if (i % 12 === 6) {
            blocks.push(
              new GroundBlock({ x: i * 100, y: 500 }, "rightTopAngle", type)
            );
          } else if (i % 12 === 7) {
            blocks.push(
              new GroundBlock({ x: i * 100, y: 500 }, "rightTop", type)
            );
          } else if (
            i % 12 === 8 ||
            i % 12 === 9 ||
            i % 12 === 10 ||
            i % 12 === 11
          ) {
            return;
          }
        });
      // 6층
      Array(Math.ceil((innerWidth * 6) / 100))
        .fill(null)
        .forEach((v, i) => {
          if (
            i % 12 === 0 ||
            i % 12 === 1 ||
            i % 12 === 2 ||
            i % 12 === 3 ||
            i % 12 === 4
          )
            return;
          else if (i % 12 === 5) {
            blocks.push(
              new GroundBlock({ x: i * 100, y: 400 }, "leftTop", type)
            );
          } else if (i % 12 === 6) {
            blocks.push(
              new GroundBlock({ x: i * 100, y: 400 }, "rightTop", type)
            );
          } else if (
            i % 12 === 7 ||
            i % 12 === 8 ||
            i % 12 === 9 ||
            i % 12 === 10 ||
            i % 12 === 11
          ) {
            return;
          }
        });
    }
    // 지하 맵
    else if (type === "underground") {
      // 1층
      Array(Math.ceil((innerWidth * 6) / 100))
        .fill(null)
        .forEach((v, i) =>
          blocks.push(new GroundBlock({ x: i * 100, y: 900 }, "mid", type))
        );
      // 2층
      Array(Math.ceil((innerWidth * 6) / 100))
        .fill(null)
        .forEach((v, i) => {
          if (i % 12 === 0 || i % 12 === 1) {
            blocks.push(new GroundBlock({ x: i * 100, y: 800 }, "top", type));
          } else if (i % 12 === 2) {
            blocks.push(
              new GroundBlock({ x: i * 100, y: 800 }, "leftTopAngle", type)
            );
          } else if (
            i % 12 === 3 ||
            i % 12 === 4 ||
            i % 12 === 5 ||
            i % 12 === 6 ||
            i % 12 === 7 ||
            i % 12 === 8
          ) {
            blocks.push(new GroundBlock({ x: i * 100, y: 800 }, "mid", type));
          } else if (i % 12 === 9) {
            blocks.push(
              new GroundBlock({ x: i * 100, y: 800 }, "rightTopAngle", type)
            );
          } else if (i % 12 === 10 || i % 12 === 11) {
            blocks.push(new GroundBlock({ x: i * 100, y: 800 }, "top", type));
          }
        });
      // 3층
      Array(Math.ceil((innerWidth * 6) / 100))
        .fill(null)
        .forEach((v, i) => {
          if (i % 12 === 0 || i % 12 === 1) return;
          else if (i % 12 === 2) {
            blocks.push(
              new GroundBlock({ x: i * 100, y: 700 }, "leftTop", type)
            );
          } else if (i % 12 === 3) {
            blocks.push(
              new GroundBlock({ x: i * 100, y: 700 }, "leftTopAngle", type)
            );
          } else if (
            i % 12 === 4 ||
            i % 12 === 5 ||
            i % 12 === 6 ||
            i % 12 === 7
          ) {
            blocks.push(new GroundBlock({ x: i * 100, y: 700 }, "mid", type));
          } else if (i % 12 === 8) {
            blocks.push(
              new GroundBlock({ x: i * 100, y: 700 }, "rightTopAngle", type)
            );
          } else if (i % 12 === 9) {
            blocks.push(
              new GroundBlock({ x: i * 100, y: 700 }, "rightTop", type)
            );
          } else if (i % 12 === 10 || i % 12 === 11) {
            return;
          }
        });
      // 4층
      Array(Math.ceil((innerWidth * 6) / 100))
        .fill(null)
        .forEach((v, i) => {
          if (i % 12 === 0 || i % 12 === 1 || i % 12 === 2) return;
          else if (i % 12 === 3) {
            blocks.push(
              new GroundBlock({ x: i * 100, y: 600 }, "leftTop", type)
            );
          } else if (i % 12 === 4) {
            blocks.push(
              new GroundBlock({ x: i * 100, y: 600 }, "leftTopAngle", type)
            );
          } else if (i % 12 === 5 || i % 12 === 6) {
            blocks.push(new GroundBlock({ x: i * 100, y: 600 }, "mid", type));
          } else if (i % 12 === 7) {
            blocks.push(
              new GroundBlock({ x: i * 100, y: 600 }, "rightTopAngle", type)
            );
          } else if (i % 12 == 8) {
            blocks.push(
              new GroundBlock({ x: i * 100, y: 600 }, "rightTop", type)
            );
          } else if (i % 12 === 9 || i % 12 === 10 || i % 12 === 11) {
            return;
          }
        });
      // 5층
      Array(Math.ceil((innerWidth * 6) / 100))
        .fill(null)
        .forEach((v, i) => {
          if (i % 12 === 0 || i % 12 === 1 || i % 12 === 2 || i % 12 === 3)
            return;
          else if (i % 12 === 4) {
            blocks.push(
              new GroundBlock({ x: i * 100, y: 500 }, "leftTop", type)
            );
          } else if (i % 12 === 5) {
            blocks.push(
              new GroundBlock({ x: i * 100, y: 500 }, "leftTopAngle", type)
            );
          } else if (i % 12 === 6) {
            blocks.push(
              new GroundBlock({ x: i * 100, y: 500 }, "rightTopAngle", type)
            );
          } else if (i % 12 === 7) {
            blocks.push(
              new GroundBlock({ x: i * 100, y: 500 }, "rightTop", type)
            );
          } else if (
            i % 12 === 8 ||
            i % 12 === 9 ||
            i % 12 === 10 ||
            i % 12 === 11
          ) {
            return;
          }
        });
      // 6층
      Array(Math.ceil((innerWidth * 6) / 100))
        .fill(null)
        .forEach((v, i) => {
          if (
            i % 12 === 0 ||
            i % 12 === 1 ||
            i % 12 === 2 ||
            i % 12 === 3 ||
            i % 12 === 4
          )
            return;
          else if (i % 12 === 5) {
            blocks.push(
              new GroundBlock({ x: i * 100, y: 400 }, "leftTop", type)
            );
          } else if (i % 12 === 6) {
            blocks.push(
              new GroundBlock({ x: i * 100, y: 400 }, "rightTop", type)
            );
          } else if (
            i % 12 === 7 ||
            i % 12 === 8 ||
            i % 12 === 9 ||
            i % 12 === 10 ||
            i % 12 === 11
          ) {
            return;
          }
        });
    }
    // 눈 맵
    else if (type === "snow") {
      // 1층
      Array(Math.ceil((innerWidth * 6) / 100))
        .fill(null)
        .forEach((v, i) =>
          blocks.push(new GroundBlock({ x: i * 100, y: 900 }, "mid", type))
        );
      // 2층
      Array(Math.ceil((innerWidth * 6) / 100))
        .fill(null)
        .forEach((v, i) => {
          if (i % 12 === 0 || i % 12 === 1) {
            blocks.push(new GroundBlock({ x: i * 100, y: 800 }, "top", type));
          } else if (i % 12 === 2) {
            blocks.push(
              new GroundBlock({ x: i * 100, y: 800 }, "leftTopAngle", type)
            );
          } else if (
            i % 12 === 3 ||
            i % 12 === 4 ||
            i % 12 === 5 ||
            i % 12 === 6 ||
            i % 12 === 7 ||
            i % 12 === 8
          ) {
            blocks.push(new GroundBlock({ x: i * 100, y: 800 }, "mid", type));
          } else if (i % 12 === 9) {
            blocks.push(
              new GroundBlock({ x: i * 100, y: 800 }, "rightTopAngle", type)
            );
          } else if (i % 12 === 10 || i % 12 === 11) {
            blocks.push(new GroundBlock({ x: i * 100, y: 800 }, "top", type));
          }
        });
      // 3층
      Array(Math.ceil((innerWidth * 6) / 100))
        .fill(null)
        .forEach((v, i) => {
          if (i % 12 === 0 || i % 12 === 1) return;
          else if (i % 12 === 2) {
            blocks.push(
              new GroundBlock({ x: i * 100, y: 700 }, "leftTop", type)
            );
          } else if (i % 12 === 3) {
            blocks.push(
              new GroundBlock({ x: i * 100, y: 700 }, "leftTopAngle", type)
            );
          } else if (
            i % 12 === 4 ||
            i % 12 === 5 ||
            i % 12 === 6 ||
            i % 12 === 7
          ) {
            blocks.push(new GroundBlock({ x: i * 100, y: 700 }, "mid", type));
          } else if (i % 12 === 8) {
            blocks.push(
              new GroundBlock({ x: i * 100, y: 700 }, "rightTopAngle", type)
            );
          } else if (i % 12 === 9) {
            blocks.push(
              new GroundBlock({ x: i * 100, y: 700 }, "rightTop", type)
            );
          } else if (i % 12 === 10 || i % 12 === 11) {
            return;
          }
        });
      // 4층
      Array(Math.ceil((innerWidth * 6) / 100))
        .fill(null)
        .forEach((v, i) => {
          if (i % 12 === 0 || i % 12 === 1 || i % 12 === 2) return;
          else if (i % 12 === 3) {
            blocks.push(
              new GroundBlock({ x: i * 100, y: 600 }, "leftTop", type)
            );
          } else if (i % 12 === 4) {
            blocks.push(
              new GroundBlock({ x: i * 100, y: 600 }, "leftTopAngle", type)
            );
          } else if (i % 12 === 5 || i % 12 === 6) {
            blocks.push(new GroundBlock({ x: i * 100, y: 600 }, "mid", type));
          } else if (i % 12 === 7) {
            blocks.push(
              new GroundBlock({ x: i * 100, y: 600 }, "rightTopAngle", type)
            );
          } else if (i % 12 == 8) {
            blocks.push(
              new GroundBlock({ x: i * 100, y: 600 }, "rightTop", type)
            );
          } else if (i % 12 === 9 || i % 12 === 10 || i % 12 === 11) {
            return;
          }
        });
      // 5층
      Array(Math.ceil((innerWidth * 6) / 100))
        .fill(null)
        .forEach((v, i) => {
          if (i % 12 === 0 || i % 12 === 1 || i % 12 === 2 || i % 12 === 3)
            return;
          else if (i % 12 === 4) {
            blocks.push(
              new GroundBlock({ x: i * 100, y: 500 }, "leftTop", type)
            );
          } else if (i % 12 === 5) {
            blocks.push(
              new GroundBlock({ x: i * 100, y: 500 }, "leftTopAngle", type)
            );
          } else if (i % 12 === 6) {
            blocks.push(
              new GroundBlock({ x: i * 100, y: 500 }, "rightTopAngle", type)
            );
          } else if (i % 12 === 7) {
            blocks.push(
              new GroundBlock({ x: i * 100, y: 500 }, "rightTop", type)
            );
          } else if (
            i % 12 === 8 ||
            i % 12 === 9 ||
            i % 12 === 10 ||
            i % 12 === 11
          ) {
            return;
          }
        });
      // 6층
      Array(Math.ceil((innerWidth * 6) / 100))
        .fill(null)
        .forEach((v, i) => {
          if (
            i % 12 === 0 ||
            i % 12 === 1 ||
            i % 12 === 2 ||
            i % 12 === 3 ||
            i % 12 === 4
          )
            return;
          else if (i % 12 === 5) {
            blocks.push(
              new GroundBlock({ x: i * 100, y: 400 }, "leftTop", type)
            );
          } else if (i % 12 === 6) {
            blocks.push(
              new GroundBlock({ x: i * 100, y: 400 }, "rightTop", type)
            );
          } else if (
            i % 12 === 7 ||
            i % 12 === 8 ||
            i % 12 === 9 ||
            i % 12 === 10 ||
            i % 12 === 11
          ) {
            return;
          }
        });
    }

    // 랜덤 위치
    Array(10)
      .fill(null)
      .forEach((v, i) => {
        // 0 ~ (innerWidth * 6) - 300
        const randomX = Math.floor(Math.random() * (innerWidth * 6 - 300));
        // 300 ~ 600
        const randomY = candidateY[Math.floor(Math.random() * 2)];

        blocks.push(
          new GroundBlock({ x: randomX + 0, y: randomY }, "leftArc", type)
        );
        blocks.push(
          new GroundBlock({ x: randomX + 100, y: randomY }, "horizontal", type)
        );
        blocks.push(
          new GroundBlock({ x: randomX + 200, y: randomY }, "rightArc", type)
        );
      });
  }

  /**
   * 직선맵 생성
   * @param blocks 생성할 블록을 저장할 블록 배열
   */
  private createStraight(blocks: Block[], type: MapType) {
    // 랜덤한 블록 Y위치 후보
    const candidateY = [600, 500, 400, 300];

    // 블록을 비울 랜덤한 공간
    const randomPosX = Array(6)
      .fill(null)
      .map(() => Math.ceil((Math.random() * (innerWidth * 6)) / 100));

    console.log(randomPosX);

    // 지상 맵
    if (type === "ground") {
      // 1층
      Array(Math.ceil((innerWidth * 6) / 100))
        .fill(null)
        .forEach((v, i) => {
          if (randomPosX.find((v) => v === i || v === i - 1 || v === i + 1))
            return;

          blocks.push(new GroundBlock({ x: i * 100, y: 900 }, "mid", type));
        });
      // 2층
      Array(Math.ceil((innerWidth * 6) / 100))
        .fill(null)
        .forEach((v, i) => {
          if (randomPosX.find((v) => v === i || v === i - 1 || v === i + 1))
            return;

          blocks.push(new GroundBlock({ x: i * 100, y: 800 }, "top", type));
        });
    }
    // 지하 맵
    else if (type === "underground") {
      // 1층
      Array(Math.ceil((innerWidth * 6) / 100))
        .fill(null)
        .forEach((v, i) => {
          if (randomPosX.find((v) => v === i || v === i - 1 || v === i + 1))
            return;

          blocks.push(
            new UndergroundBlock({ x: i * 100, y: 900 }, "mid", type)
          );
        });
      // 2층
      Array(Math.ceil((innerWidth * 6) / 100))
        .fill(null)
        .forEach((v, i) => {
          if (randomPosX.find((v) => v === i || v === i - 1 || v === i + 1))
            return;

          blocks.push(
            new UndergroundBlock({ x: i * 100, y: 800 }, "top", type)
          );
        });
    }
    // 눈 맵
    else if (type === "snow") {
      // 1층
      Array(Math.ceil((innerWidth * 6) / 100))
        .fill(null)
        .forEach((v, i) => {
          if (randomPosX.find((v) => v === i || v === i - 1 || v === i + 1))
            return;

          blocks.push(new SnowBlock({ x: i * 100, y: 900 }, "mid", type));
        });
      // 2층
      Array(Math.ceil((innerWidth * 6) / 100))
        .fill(null)
        .forEach((v, i) => {
          if (randomPosX.find((v) => v === i || v === i - 1 || v === i + 1))
            return;

          blocks.push(new SnowBlock({ x: i * 100, y: 800 }, "top", type));
        });
    }

    // 낭떠러지
    randomPosX.forEach((v) => {
      // 좌측
      blocks.push(
        new GroundBlock({ x: (v - 1) * 100, y: 800 }, "rightTop", type)
      );
      blocks.push(new GroundBlock({ x: (v - 1) * 100, y: 900 }, "right", type));

      // 우측
      blocks.push(
        new GroundBlock({ x: (v + 1) * 100, y: 800 }, "leftTop", type)
      );
      blocks.push(new GroundBlock({ x: (v + 1) * 100, y: 900 }, "left", type));
    });

    // 랜덤 위치
    Array(10)
      .fill(null)
      .forEach((v, i) => {
        // 0 ~ (innerWidth * 6) - 300
        const randomX = Math.floor(Math.random() * (innerWidth * 6 - 300));
        // 300 ~ 600
        const randomY = candidateY[Math.floor(Math.random() * 4)];

        blocks.push(
          new GroundBlock({ x: randomX + 0, y: randomY }, "leftArc", type)
        );
        blocks.push(
          new GroundBlock({ x: randomX + 100, y: randomY }, "horizontal", type)
        );
        blocks.push(
          new GroundBlock({ x: randomX + 200, y: randomY }, "rightArc", type)
        );
      });
  }
}
