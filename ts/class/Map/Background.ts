/**
 * 배경화면 클래스 ( + 싱글톤 )
 *
 * @param instance ( static ) 인스턴스
 *
 * @param ctx 배경화면을 그릴 "canvas"의 "context"
 * @param image 배경화면 이미지를 가진 이미지 객체
 */
export default class Background {
  static instance: Background;

  private ctx!: CanvasRenderingContext2D;
  private image!: HTMLImageElement;

  constructor(ctx: CanvasRenderingContext2D) {
    // 싱글톤으로 구현
    if (Background.instance) return Background.instance;

    const image = new Image();
    image.src = "./assets/images/background.jpg";

    this.ctx = ctx;
    this.image = image;

    // 이미지 로드 완료 시 그리기
    image.addEventListener("load", () => {
      ctx.drawImage(image, 0, 0, innerWidth, innerHeight);
    });

    // 싱글톤으로 구현
    Background.instance = this;
  }

  /**
   * 배경화면 그리기
   */
  draw() {
    this.ctx.clearRect(0, 0, innerWidth, innerHeight);
    this.ctx.drawImage(this.image, 0, 0, innerWidth, innerHeight);
  }
}
