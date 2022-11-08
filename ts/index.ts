import Background from "./class/Background";
import Mario from "./class/Mario";

/**
 * 2022/11/07 - 캔버스 사이즈 지정 - by 1-blue
 * @param {*} $canvas canvas element
 */
const resizeCanvas = ($canvas: HTMLCanvasElement) => {
  $canvas.width = innerWidth;
  $canvas.height = innerHeight;
};

(() => {
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
    x: 500,
    y: innerHeight - (innerHeight / 6.8 + 60),
  });

  // 키 누름 이벤트
  window.addEventListener("keydown", (e) => {
    if (!e.key.includes("Arrow")) return;

    // 처음 키를 누른 시간 기록
    if (false === mario.getIsKeyPress()) mario.setStartTime(Date.now());

    // 누른 키 기록
    mario.setIsKeyPress(true);
    mario.setKey(e.key);
  });

  // 키 누름 중지
  window.addEventListener("keyup", () => {
    mario.setIsNext(true);

    // 클릭이 끝나면 마지막 행동 수정 ( ex) 걷는 중에 끝나면 서 있는 모션 )
    mario.move();

    // 초기화
    mario.reset();
  });

  // 애니메이션 실행 함수
  const startAnimation = () => {
    if (!mario.getKey()) return requestAnimationFrame(startAnimation);

    // 계속 클릭 시 가속
    if (Date.now() - mario.getStartTime() > 1000) mario.setSpeed(2);

    if (mario.getCount() % mario.getSpeed() === 0) {
      // 계속 클릭 중이라면 실행
      if (mario.getIsKeyPress()) mario.toggleIsNext();

      // >>> 캐릭터 렌더링 바로 이전에 실행되지 않아서 캐릭터가 중복 그려지는 문제 있음
      background.draw();

      // 이동
      mario.move();
    }

    // "requestAnimationFrame()"의 반복 속도가 빨라서 조금 늦주기 위해 사용하는 변수
    mario.addCount(1);

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
