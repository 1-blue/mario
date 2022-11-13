// class
import Block from "./Block";

// type
import type { MapType } from "../types/index";

/**
 * 맵 생성과 관련된 모든 처리를 관리할 관리자 클래스 ( 싱글톤 )
 */
export default class MapManager {
  static instance: MapManager;

  constructor() {
    // 싱글톤으로 구현
    if (MapManager.instance) return MapManager.instance;

    MapManager.instance = this;
  }

  /**
   * 맵 성성 함수
   * @param type 맵의 종류 선택
   * @param blocks 생성할 블럭을 담을 배열
   */
  CreateMap(type: MapType, blocks: Block[]) {
    if (type === "stairs") {
      this.createStairs(blocks);
    }
  }

  /**
   * 계단맵 생성
   * @param 생성할 블록을 저장할 블록 배열
   */
  private createStairs(blocks: Block[]) {
    // 1층
    Array(Math.round(Math.round(innerWidth / 100)))
      .fill(null)
      .forEach((v, i) => blocks.push(new Block({ x: i * 100, y: 900 }, "mid")));
    // 2층
    Array(Math.round(Math.round(innerWidth / 100)))
      .fill(null)
      .forEach((v, i) => {
        switch (i) {
          case 0:
          case 1:
          case 2:
          case 3:
            blocks.push(new Block({ x: i * 100, y: 800 }, "top"));
            break;
          case 4:
            blocks.push(new Block({ x: i * 100, y: 800 }, "leftTopAngle"));
            break;
          case 5:
          case 6:
          case 7:
          case 8:
          case 9:
          case 10:
            blocks.push(new Block({ x: i * 100, y: 800 }, "mid"));
            break;
          case 11:
            blocks.push(new Block({ x: i * 100, y: 800 }, "rightTopAngle"));
            break;
          case 12:
          case 13:
            blocks.push(new Block({ x: i * 100, y: 800 }, "top"));
            break;
          default:
            blocks.push(new Block({ x: i * 100, y: 800 }, "top"));
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
            blocks.push(new Block({ x: i * 100, y: 700 }, "leftTop"));
            break;
          case 5:
            blocks.push(new Block({ x: i * 100, y: 700 }, "leftTopAngle"));
            break;
          case 6:
          case 7:
          case 8:
          case 9:
            blocks.push(new Block({ x: i * 100, y: 700 }, "mid"));
            break;
          case 10:
            blocks.push(new Block({ x: i * 100, y: 700 }, "rightTopAngle"));
            break;
          case 11:
            blocks.push(new Block({ x: i * 100, y: 700 }, "rightTop"));
            break;
          case 12:
          case 13:
            break;
          default:
            blocks.push(new Block({ x: i * 100, y: 700 }, "top"));
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
            blocks.push(new Block({ x: i * 100, y: 600 }, "leftTop"));
            break;
          case 6:
            blocks.push(new Block({ x: i * 100, y: 600 }, "leftTopAngle"));
            break;
          case 7:
          case 8:
            blocks.push(new Block({ x: i * 100, y: 600 }, "mid"));
            break;
          case 9:
            blocks.push(new Block({ x: i * 100, y: 600 }, "rightTopAngle"));
            break;
          case 10:
            blocks.push(new Block({ x: i * 100, y: 600 }, "rightTop"));
            break;
          case 11:
          case 12:
          case 13:
            break;
          default:
            blocks.push(new Block({ x: i * 100, y: 600 }, "top"));
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
            blocks.push(new Block({ x: i * 100, y: 500 }, "leftTop"));
            break;
          case 7:
            blocks.push(new Block({ x: i * 100, y: 500 }, "leftTopAngle"));
            break;
          case 8:
            blocks.push(new Block({ x: i * 100, y: 500 }, "rightTopAngle"));
            break;
          case 9:
            blocks.push(new Block({ x: i * 100, y: 500 }, "rightTop"));
            break;
          case 10:
          case 11:
          case 12:
          case 13:
            break;
          default:
            blocks.push(new Block({ x: i * 100, y: 500 }, "top"));
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
            blocks.push(new Block({ x: i * 100, y: 400 }, "leftTop"));
            break;
          case 8:
            blocks.push(new Block({ x: i * 100, y: 400 }, "rightTop"));
            break;
          case 9:
          case 10:
          case 11:
          case 12:
          case 13:
            break;
          default:
            blocks.push(new Block({ x: i * 100, y: 400 }, "top"));
            break;
        }
      });

    // 보너스 ( 우측 상단 블럭 )
    blocks.push(new Block({ x: 1000, y: 200 }, "leftArc"));
    blocks.push(new Block({ x: 1100, y: 200 }, "line"));
    blocks.push(new Block({ x: 1200, y: 200 }, "rightArc"));
  }
}
