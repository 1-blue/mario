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
    // 지상 맵
    if (type === "ground") {
      // 1층
      Array(Math.round(Math.round(innerWidth / 100)))
        .fill(null)
        .forEach((v, i) =>
          blocks.push(new GroundBlock({ x: i * 100, y: 900 }, "mid", "ground"))
        );
      // 2층
      Array(Math.round(Math.round(innerWidth / 100)))
        .fill(null)
        .forEach((v, i) => {
          switch (i) {
            case 0:
            case 1:
            case 2:
            case 3:
              blocks.push(
                new GroundBlock({ x: i * 100, y: 800 }, "top", "ground")
              );
              break;
            case 4:
              blocks.push(
                new GroundBlock(
                  { x: i * 100, y: 800 },
                  "leftTopAngle",
                  "ground"
                )
              );
              break;
            case 5:
            case 6:
            case 7:
            case 8:
            case 9:
            case 10:
              blocks.push(
                new GroundBlock({ x: i * 100, y: 800 }, "mid", "ground")
              );
              break;
            case 11:
              blocks.push(
                new GroundBlock(
                  { x: i * 100, y: 800 },
                  "rightTopAngle",
                  "ground"
                )
              );
              break;
            case 12:
            case 13:
              blocks.push(
                new GroundBlock({ x: i * 100, y: 800 }, "top", "ground")
              );
              break;
            default:
              blocks.push(
                new GroundBlock({ x: i * 100, y: 800 }, "top", "ground")
              );
              break;
          }
        });
      // 3층
      Array(Math.round(Math.round(innerWidth / 100)))
        .fill(null)
        .forEach((v, i) => {
          switch (i) {
            case 0:
            case 1:
            case 2:
            case 3:
              break;
            case 4:
              blocks.push(
                new GroundBlock({ x: i * 100, y: 700 }, "leftTop", "ground")
              );
              break;
            case 5:
              blocks.push(
                new GroundBlock(
                  { x: i * 100, y: 700 },
                  "leftTopAngle",
                  "ground"
                )
              );
              break;
            case 6:
            case 7:
            case 8:
            case 9:
              blocks.push(
                new GroundBlock({ x: i * 100, y: 700 }, "mid", "ground")
              );
              break;
            case 10:
              blocks.push(
                new GroundBlock(
                  { x: i * 100, y: 700 },
                  "rightTopAngle",
                  "ground"
                )
              );
              break;
            case 11:
              blocks.push(
                new GroundBlock({ x: i * 100, y: 700 }, "rightTop", "ground")
              );
              break;
            case 12:
            case 13:
              break;

            default:
              break;
          }
        });
      // 4층
      Array(Math.round(Math.round(innerWidth / 100)))
        .fill(null)
        .forEach((v, i) => {
          switch (i) {
            case 0:
            case 1:
            case 2:
            case 3:
            case 4:
              break;
            case 5:
              blocks.push(
                new GroundBlock({ x: i * 100, y: 600 }, "leftTop", "ground")
              );
              break;
            case 6:
              blocks.push(
                new GroundBlock(
                  { x: i * 100, y: 600 },
                  "leftTopAngle",
                  "ground"
                )
              );
              break;
            case 7:
            case 8:
              blocks.push(
                new GroundBlock({ x: i * 100, y: 600 }, "mid", "ground")
              );
              break;
            case 9:
              blocks.push(
                new GroundBlock(
                  { x: i * 100, y: 600 },
                  "rightTopAngle",
                  "ground"
                )
              );
              break;
            case 10:
              blocks.push(
                new GroundBlock({ x: i * 100, y: 600 }, "rightTop", "ground")
              );
              break;
            case 11:
            case 12:
            case 13:
              break;
            default:
              break;
          }
        });
      // 5층
      Array(Math.round(Math.round(innerWidth / 100)))
        .fill(null)
        .forEach((v, i) => {
          switch (i) {
            case 0:
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
              break;
            case 6:
              blocks.push(
                new GroundBlock({ x: i * 100, y: 500 }, "leftTop", "ground")
              );
              break;
            case 7:
              blocks.push(
                new GroundBlock(
                  { x: i * 100, y: 500 },
                  "leftTopAngle",
                  "ground"
                )
              );
              break;
            case 8:
              blocks.push(
                new GroundBlock(
                  { x: i * 100, y: 500 },
                  "rightTopAngle",
                  "ground"
                )
              );
              break;
            case 9:
              blocks.push(
                new GroundBlock({ x: i * 100, y: 500 }, "rightTop", "ground")
              );
              break;
            case 10:
            case 11:
            case 12:
            case 13:
              break;
            default:
              break;
          }
        });
      // 6층
      Array(Math.round(Math.round(innerWidth / 100)))
        .fill(null)
        .forEach((v, i) => {
          switch (i) {
            case 0:
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
            case 6:
              break;
            case 7:
              blocks.push(
                new GroundBlock({ x: i * 100, y: 400 }, "leftTop", "ground")
              );
              break;
            case 8:
              blocks.push(
                new GroundBlock({ x: i * 100, y: 400 }, "rightTop", "ground")
              );
              break;
            case 9:
            case 10:
            case 11:
            case 12:
            case 13:
              break;
            default:
              break;
          }
        });
      // 보너스 ( 우측 상단 블록 )
      blocks.push(new GroundBlock({ x: 1000, y: 200 }, "leftArc", "ground"));
      blocks.push(new GroundBlock({ x: 1100, y: 200 }, "horizontal", "ground"));
      blocks.push(new GroundBlock({ x: 1200, y: 200 }, "rightArc", "ground"));
    }
    // 지하 맵
    else if (type === "underground") {
      // 1층
      Array(Math.round(Math.round(innerWidth / 100)))
        .fill(null)
        .forEach((v, i) =>
          blocks.push(
            new UndergroundBlock({ x: i * 100, y: 900 }, "mid", "underground")
          )
        );
      // 2층
      Array(Math.round(Math.round(innerWidth / 100)))
        .fill(null)
        .forEach((v, i) => {
          switch (i) {
            case 0:
            case 1:
            case 2:
            case 3:
              blocks.push(
                new UndergroundBlock(
                  { x: i * 100, y: 800 },
                  "top",
                  "underground"
                )
              );
              break;
            case 4:
              blocks.push(
                new UndergroundBlock(
                  { x: i * 100, y: 800 },
                  "leftTopAngle",
                  "underground"
                )
              );
              break;
            case 5:
            case 6:
            case 7:
            case 8:
            case 9:
            case 10:
              blocks.push(
                new UndergroundBlock(
                  { x: i * 100, y: 800 },
                  "mid",
                  "underground"
                )
              );
              break;
            case 11:
              blocks.push(
                new UndergroundBlock(
                  { x: i * 100, y: 800 },
                  "rightTopAngle",
                  "underground"
                )
              );
              break;
            case 12:
            case 13:
              blocks.push(
                new UndergroundBlock(
                  { x: i * 100, y: 800 },
                  "top",
                  "underground"
                )
              );
              break;
            default:
              blocks.push(
                new UndergroundBlock(
                  { x: i * 100, y: 800 },
                  "top",
                  "underground"
                )
              );
              break;
          }
        });
      // 3층
      Array(Math.round(Math.round(innerWidth / 100)))
        .fill(null)
        .forEach((v, i) => {
          switch (i) {
            case 0:
            case 1:
            case 2:
            case 3:
              break;
            case 4:
              blocks.push(
                new UndergroundBlock(
                  { x: i * 100, y: 700 },
                  "leftTop",
                  "underground"
                )
              );
              break;
            case 5:
              blocks.push(
                new UndergroundBlock(
                  { x: i * 100, y: 700 },
                  "leftTopAngle",
                  "underground"
                )
              );
              break;
            case 6:
            case 7:
            case 8:
            case 9:
              blocks.push(
                new UndergroundBlock(
                  { x: i * 100, y: 700 },
                  "mid",
                  "underground"
                )
              );
              break;
            case 10:
              blocks.push(
                new UndergroundBlock(
                  { x: i * 100, y: 700 },
                  "rightTopAngle",
                  "underground"
                )
              );
              break;
            case 11:
              blocks.push(
                new UndergroundBlock(
                  { x: i * 100, y: 700 },
                  "rightTop",
                  "underground"
                )
              );
              break;
            case 12:
            case 13:
              break;

            default:
              break;
          }
        });
      // 4층
      Array(Math.round(Math.round(innerWidth / 100)))
        .fill(null)
        .forEach((v, i) => {
          switch (i) {
            case 0:
            case 1:
            case 2:
            case 3:
            case 4:
              break;
            case 5:
              blocks.push(
                new UndergroundBlock(
                  { x: i * 100, y: 600 },
                  "leftTop",
                  "underground"
                )
              );
              break;
            case 6:
              blocks.push(
                new UndergroundBlock(
                  { x: i * 100, y: 600 },
                  "leftTopAngle",
                  "underground"
                )
              );
              break;
            case 7:
            case 8:
              blocks.push(
                new UndergroundBlock(
                  { x: i * 100, y: 600 },
                  "mid",
                  "underground"
                )
              );
              break;
            case 9:
              blocks.push(
                new UndergroundBlock(
                  { x: i * 100, y: 600 },
                  "rightTopAngle",
                  "underground"
                )
              );
              break;
            case 10:
              blocks.push(
                new UndergroundBlock(
                  { x: i * 100, y: 600 },
                  "rightTop",
                  "underground"
                )
              );
              break;
            case 11:
            case 12:
            case 13:
              break;
            default:
              break;
          }
        });
      // 5층
      Array(Math.round(Math.round(innerWidth / 100)))
        .fill(null)
        .forEach((v, i) => {
          switch (i) {
            case 0:
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
              break;
            case 6:
              blocks.push(
                new UndergroundBlock(
                  { x: i * 100, y: 500 },
                  "leftTop",
                  "underground"
                )
              );
              break;
            case 7:
              blocks.push(
                new UndergroundBlock(
                  { x: i * 100, y: 500 },
                  "leftTopAngle",
                  "underground"
                )
              );
              break;
            case 8:
              blocks.push(
                new UndergroundBlock(
                  { x: i * 100, y: 500 },
                  "rightTopAngle",
                  "underground"
                )
              );
              break;
            case 9:
              blocks.push(
                new UndergroundBlock(
                  { x: i * 100, y: 500 },
                  "rightTop",
                  "underground"
                )
              );
              break;
            case 10:
            case 11:
            case 12:
            case 13:
              break;
            default:
              break;
          }
        });
      // 6층
      Array(Math.round(Math.round(innerWidth / 100)))
        .fill(null)
        .forEach((v, i) => {
          switch (i) {
            case 0:
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
            case 6:
              break;
            case 7:
              blocks.push(
                new UndergroundBlock(
                  { x: i * 100, y: 400 },
                  "leftTop",
                  "underground"
                )
              );
              break;
            case 8:
              blocks.push(
                new UndergroundBlock(
                  { x: i * 100, y: 400 },
                  "rightTop",
                  "underground"
                )
              );
              break;
            case 9:
            case 10:
            case 11:
            case 12:
            case 13:
              break;
            default:
              break;
          }
        });
      // 보너스 ( 우측 상단 블록 )
      blocks.push(
        new UndergroundBlock({ x: 1000, y: 200 }, "leftArc", "underground")
      );
      blocks.push(
        new UndergroundBlock({ x: 1100, y: 200 }, "horizontal", "underground")
      );
      blocks.push(
        new UndergroundBlock({ x: 1200, y: 200 }, "rightArc", "underground")
      );
    }
    // 눈 맵
    else if (type === "snow") {
      // 1층
      Array(Math.round(Math.round(innerWidth / 100)))
        .fill(null)
        .forEach((v, i) =>
          blocks.push(new SnowBlock({ x: i * 100, y: 900 }, "mid", "snow"))
        );
      // 2층
      Array(Math.round(Math.round(innerWidth / 100)))
        .fill(null)
        .forEach((v, i) => {
          switch (i) {
            case 0:
            case 1:
            case 2:
            case 3:
              blocks.push(new SnowBlock({ x: i * 100, y: 800 }, "top", "snow"));
              break;
            case 4:
              blocks.push(
                new SnowBlock({ x: i * 100, y: 800 }, "leftTopAngle", "snow")
              );
              break;
            case 5:
            case 6:
            case 7:
            case 8:
            case 9:
            case 10:
              blocks.push(new SnowBlock({ x: i * 100, y: 800 }, "mid", "snow"));
              break;
            case 11:
              blocks.push(
                new SnowBlock({ x: i * 100, y: 800 }, "rightTopAngle", "snow")
              );
              break;
            case 12:
            case 13:
              blocks.push(new SnowBlock({ x: i * 100, y: 800 }, "top", "snow"));
              break;
            default:
              blocks.push(new SnowBlock({ x: i * 100, y: 800 }, "top", "snow"));
              break;
          }
        });
      // 3층
      Array(Math.round(Math.round(innerWidth / 100)))
        .fill(null)
        .forEach((v, i) => {
          switch (i) {
            case 0:
            case 1:
            case 2:
            case 3:
              break;
            case 4:
              blocks.push(
                new SnowBlock({ x: i * 100, y: 700 }, "leftTop", "snow")
              );
              break;
            case 5:
              blocks.push(
                new SnowBlock({ x: i * 100, y: 700 }, "leftTopAngle", "snow")
              );
              break;
            case 6:
            case 7:
            case 8:
            case 9:
              blocks.push(new SnowBlock({ x: i * 100, y: 700 }, "mid", "snow"));
              break;
            case 10:
              blocks.push(
                new SnowBlock({ x: i * 100, y: 700 }, "rightTopAngle", "snow")
              );
              break;
            case 11:
              blocks.push(
                new SnowBlock({ x: i * 100, y: 700 }, "rightTop", "snow")
              );
              break;
            case 12:
            case 13:
              break;

            default:
              break;
          }
        });
      // 4층
      Array(Math.round(Math.round(innerWidth / 100)))
        .fill(null)
        .forEach((v, i) => {
          switch (i) {
            case 0:
            case 1:
            case 2:
            case 3:
            case 4:
              break;
            case 5:
              blocks.push(
                new SnowBlock({ x: i * 100, y: 600 }, "leftTop", "snow")
              );
              break;
            case 6:
              blocks.push(
                new SnowBlock({ x: i * 100, y: 600 }, "leftTopAngle", "snow")
              );
              break;
            case 7:
            case 8:
              blocks.push(new SnowBlock({ x: i * 100, y: 600 }, "mid", "snow"));
              break;
            case 9:
              blocks.push(
                new SnowBlock({ x: i * 100, y: 600 }, "rightTopAngle", "snow")
              );
              break;
            case 10:
              blocks.push(
                new SnowBlock({ x: i * 100, y: 600 }, "rightTop", "snow")
              );
              break;
            case 11:
            case 12:
            case 13:
              break;
            default:
              break;
          }
        });
      // 5층
      Array(Math.round(Math.round(innerWidth / 100)))
        .fill(null)
        .forEach((v, i) => {
          switch (i) {
            case 0:
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
              break;
            case 6:
              blocks.push(
                new SnowBlock({ x: i * 100, y: 500 }, "leftTop", "snow")
              );
              break;
            case 7:
              blocks.push(
                new SnowBlock({ x: i * 100, y: 500 }, "leftTopAngle", "snow")
              );
              break;
            case 8:
              blocks.push(
                new SnowBlock({ x: i * 100, y: 500 }, "rightTopAngle", "snow")
              );
              break;
            case 9:
              blocks.push(
                new SnowBlock({ x: i * 100, y: 500 }, "rightTop", "snow")
              );
              break;
            case 10:
            case 11:
            case 12:
            case 13:
              break;
            default:
              break;
          }
        });
      // 6층
      Array(Math.round(Math.round(innerWidth / 100)))
        .fill(null)
        .forEach((v, i) => {
          switch (i) {
            case 0:
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
            case 6:
              break;
            case 7:
              blocks.push(
                new SnowBlock({ x: i * 100, y: 400 }, "leftTop", "snow")
              );
              break;
            case 8:
              blocks.push(
                new SnowBlock({ x: i * 100, y: 400 }, "rightTop", "snow")
              );
              break;
            case 9:
            case 10:
            case 11:
            case 12:
            case 13:
              break;
            default:
              break;
          }
        });
      // 보너스 ( 우측 상단 블록 )
      blocks.push(new SnowBlock({ x: 1000, y: 200 }, "leftArc", "snow"));
      blocks.push(new SnowBlock({ x: 1100, y: 200 }, "horizontal", "snow"));
      blocks.push(new SnowBlock({ x: 1200, y: 200 }, "rightArc", "snow"));
    }
  }

  /**
   * 직선맵 생성
   * @param blocks 생성할 블록을 저장할 블록 배열
   */
  private createStraight(blocks: Block[], type: MapType) {
    // 지상 맵
    if (type === "ground") {
      // 1층
      Array(Math.round(Math.round(innerWidth / 100)))
        .fill(null)
        .forEach((v, i) =>
          blocks.push(new GroundBlock({ x: i * 100, y: 900 }, "mid", "ground"))
        );
      // 2층
      Array(Math.round(Math.round(innerWidth / 100)))
        .fill(null)
        .forEach((v, i) => {
          switch (i) {
            case 0:
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
            case 6:
            case 7:
            case 8:
            case 9:
            case 10:
            case 11:
            case 12:
            case 13:
              blocks.push(
                new GroundBlock({ x: i * 100, y: 800 }, "top", "ground")
              );
              break;
            default:
              blocks.push(
                new GroundBlock({ x: i * 100, y: 800 }, "top", "ground")
              );
              break;
          }
        });

      // 보너스 ( 우측 상단 블록 )
      blocks.push(new GroundBlock({ x: 1000, y: 500 }, "leftArc", "ground"));
      blocks.push(new GroundBlock({ x: 1100, y: 500 }, "horizontal", "ground"));
      blocks.push(new GroundBlock({ x: 1200, y: 500 }, "rightArc", "ground"));

      // 보너스 ( 좌측 상단 블록 )
      blocks.push(new GroundBlock({ x: 200, y: 500 }, "leftArc", "ground"));
      blocks.push(new GroundBlock({ x: 300, y: 500 }, "horizontal", "ground"));
      blocks.push(new GroundBlock({ x: 400, y: 500 }, "rightArc", "ground"));
    }
    // 지하 맵
    else if (type === "underground") {
      // 1층
      Array(Math.round(Math.round(innerWidth / 100)))
        .fill(null)
        .forEach((v, i) =>
          blocks.push(
            new UndergroundBlock({ x: i * 100, y: 900 }, "mid", "underground")
          )
        );
      // 2층
      Array(Math.round(Math.round(innerWidth / 100)))
        .fill(null)
        .forEach((v, i) => {
          switch (i) {
            case 0:
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
            case 6:
            case 7:
            case 8:
            case 9:
            case 10:
            case 11:
            case 12:
            case 13:
              blocks.push(
                new UndergroundBlock(
                  { x: i * 100, y: 800 },
                  "top",
                  "underground"
                )
              );
              break;
            default:
              blocks.push(
                new UndergroundBlock(
                  { x: i * 100, y: 800 },
                  "top",
                  "underground"
                )
              );
              break;
          }
        });

      // 보너스 ( 우측 상단 블록 )
      blocks.push(
        new UndergroundBlock({ x: 1000, y: 500 }, "leftArc", "underground")
      );
      blocks.push(
        new UndergroundBlock({ x: 1100, y: 500 }, "horizontal", "underground")
      );
      blocks.push(
        new UndergroundBlock({ x: 1200, y: 500 }, "rightArc", "underground")
      );

      // 보너스 ( 좌측 상단 블록 )
      blocks.push(
        new UndergroundBlock({ x: 200, y: 500 }, "leftArc", "underground")
      );
      blocks.push(
        new UndergroundBlock({ x: 300, y: 500 }, "horizontal", "underground")
      );
      blocks.push(
        new UndergroundBlock({ x: 400, y: 500 }, "rightArc", "underground")
      );
    }
    // 눈 맵
    else if (type === "snow") {
      // 1층
      Array(Math.round(Math.round(innerWidth / 100)))
        .fill(null)
        .forEach((v, i) =>
          blocks.push(new SnowBlock({ x: i * 100, y: 900 }, "mid", "snow"))
        );
      // 2층
      Array(Math.round(Math.round(innerWidth / 100)))
        .fill(null)
        .forEach((v, i) => {
          switch (i) {
            case 0:
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
            case 6:
            case 7:
            case 8:
            case 9:
            case 10:
            case 11:
            case 12:
            case 13:
              blocks.push(new SnowBlock({ x: i * 100, y: 800 }, "top", "snow"));
              break;
            default:
              blocks.push(new SnowBlock({ x: i * 100, y: 800 }, "top", "snow"));
              break;
          }
        });

      // 보너스 ( 우측 상단 블록 )
      blocks.push(new SnowBlock({ x: 1000, y: 500 }, "leftArc", "snow"));
      blocks.push(new SnowBlock({ x: 1100, y: 500 }, "horizontal", "snow"));
      blocks.push(new SnowBlock({ x: 1200, y: 500 }, "rightArc", "snow"));

      // 보너스 ( 좌측 상단 블록 )
      blocks.push(new SnowBlock({ x: 200, y: 500 }, "leftArc", "snow"));
      blocks.push(new SnowBlock({ x: 300, y: 500 }, "horizontal", "snow"));
      blocks.push(new SnowBlock({ x: 400, y: 500 }, "rightArc", "snow"));
    }
  }
}
