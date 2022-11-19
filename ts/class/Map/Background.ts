// type
import type { MapType } from "../../types/map";

/**
 * 배경화면 클래스 ( + 싱글톤 )
 *
 * @param instance ( static ) 인스턴스
 *
 * @param ctx 배경화면을 그릴 "canvas"의 "context"
 * @param image 배경화면 이미지를 가진 이미지 객체
 */
export default class Background {
  private static instance: Background;
  public static ctx: CanvasRenderingContext2D;

  private image!: HTMLImageElement;
  private type!: MapType;

  constructor() {
    // 싱글톤으로 구현
    if (Background.instance) return Background.instance;

    Background.instance = this;
  }

  /**
   * 배경화면 그리기
   */
  draw(type: MapType) {
    if (this.type !== type) {
      const image = new Image();
      image.src = `./assets/images/${type}.jpg`;
      this.image = image;
      this.type = type;

      // 이미지 로드 완료 시 그리기
      this.image.addEventListener("load", () => {
        Background.ctx.clearRect(0, 0, innerWidth, innerHeight);
        Background.ctx.drawImage(this.image, 0, 0, innerWidth, innerHeight);
      });
    } else {
      Background.ctx.clearRect(0, 0, innerWidth, innerHeight);
      Background.ctx.drawImage(this.image, 0, 0, innerWidth, innerHeight);
    }
  }
}
