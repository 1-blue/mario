import Background from "./class/Background";
import Mario from "./class/Mario";
import Block from "./class/Block";

/**
 * 2022/11/07 - 캔버스 사이즈 지정 - by 1-blue
 * @param {*} $canvas canvas element
 */
const resizeCanvas = ($canvas: HTMLCanvasElement) => {
  $canvas.width = innerWidth;
  $canvas.height = innerHeight;
};

(() => {
  // canvas
  const $canvas = document.querySelector("#canvas");
  if (!($canvas instanceof HTMLCanvasElement))
    return alert("#canvas가 존재하지 않습니다.");

  // canvas의 context
  const ctx = $canvas.getContext("2d");
  if (!ctx) return alert("#canvas의 context가 존재하지 않습니다.");

  // 배경화면 객체 생성
  const background = new Background(ctx);
  // 마리오 객체 생성
  const mario = new Mario(ctx, {
    x: 240,
    y: 200,
  });

  // 키 누름 시작
  window.addEventListener("keydown", (e) => {
    const key = e.key === " " ? "Space" : e.key;

    // 이미 같은 키를 누르고 있다면
    if (mario.getKeys().hasOwnProperty(key)) return;

    // 점프중에 다시 점프 금지
    if (key === "Space" && mario.isJumping()) return;

    // 점프중이라면 엎드리기 금지
    if (key === "ArrowDown" && mario.isJumping()) return;

    // // >>> 좌/우 방향키 동시 입력 금지
    // if (key === "ArrowRight" && mario.getKeys().hasOwnProperty("ArrowLeft")) {
    //   delete mario.getKeys()["ArrowLeft"];
    // } else if (
    //   key === "ArrowLeft" &&
    //   mario.getKeys().hasOwnProperty("ArrowRight")
    // ) {
    //   delete mario.getKeys()["ArrowRight"];
    // }

    // 현재 누른 키를 등록
    mario.setKeys({ [key]: { startTime: Date.now() } });
  });

  // 키 누름 중지
  window.addEventListener("keyup", (e) => {
    const key = e.key === " " ? "Space" : e.key;

    mario.setIsNext(true);

    // 걷기 중지 및 엎드리기를 중지하면 서있는 모션으로 변경
    if (key.includes("Arrow")) {
      mario.stand(key);
      mario.draw();
    }

    // 이전에 눌렀던 기록 제거
    delete mario.getKeys()[key];

    // 초기화
    mario.reset();
  });

  // 애니메이션 실행 함수
  const startAnimation = () => {
    // 현재 누르고 있는 키들
    const keys = mario.getKeys();

    // 좌/우측중 하나를 누르고 있다면 누른 시점의 값을 얻음
    const startTime =
      keys?.ArrowRight?.startTime || keys?.ArrowLeft?.startTime || Date.now();

    // 계속 클릭 시 가속 ( >>> 단, 점프중 가속 금지 )
    if (Date.now() - startTime > 1000) mario.setSpeed(1.5);
    else mario.setSpeed(1);

    // 좌/우측을 계속 누르고 있다면
    // 가속도가 붙었다면 달리기 이미지 전환 속도 up
    if ((keys?.ArrowRight || keys?.ArrowLeft) && mario.getSpeed() === 1.5) {
      mario.toggleIsNext();
    }
    // 가속도가 붙기 전이라면 4번 화면을 그릴 때마다 이미지 전환 ( 이미지 변환의 주기를 줄이면 빨리 달리는 느낌 )
    else if (
      (keys?.ArrowRight || keys?.ArrowLeft) &&
      mario.getCount() % 4 === 0
    ) {
      mario.toggleIsNext();
    }

    // 배경 색칠
    background.draw();

    // 마리오 실행
    mario.execute(blocks);

    // 애니메이션 실행
    requestAnimationFrame(startAnimation);
  };

  // 애니메이션 실행
  startAnimation();

  window.addEventListener("DOMContentLoaded", () => {
    resizeCanvas($canvas);
    background.draw();
  });
  window.addEventListener("resize", () => {
    resizeCanvas($canvas);
    background.draw();
    mario.resize();
  });
})();
