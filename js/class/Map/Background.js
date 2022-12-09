/**
 * 배경화면 클래스 ( + 싱글톤 )
 *
 * @param instance ( static ) 인스턴스
 *
 * @param ctx 배경화면을 그릴 "canvas"의 "context"
 * @param image 배경화면 이미지를 가진 이미지 객체
 */
export default class Background {
    constructor() {
        // 싱글톤으로 구현
        if (Background.instance)
            return Background.instance;
        Background.instance = this;
    }
    /**
     * 배경화면 그리기
     */
    draw(type) {
        if (this.type !== type) {
            const image = new Image();
            image.src = `./assets/images/${type}.jpg`;
            this.image = image;
            this.type = type;
            // 이미지 로드 완료 시 그리기
            this.image.addEventListener("load", () => {
                Background.ctx.clearRect(0, 0, innerWidth, innerHeight);
                Array(6)
                    .fill(null)
                    .forEach((v, i) => Background.ctx.drawImage(this.image, innerWidth * i, 0, innerWidth * (i + 1), innerHeight));
            });
        }
        else {
            Background.ctx.clearRect(0, 0, innerWidth, innerHeight);
            Array(6)
                .fill(null)
                .forEach((v, i) => Background.ctx.drawImage(this.image, innerWidth * i, 0, innerWidth * (i + 1), innerHeight));
        }
    }
}
