// class
import GameManager from "./class/Manager/GameManager";

// util
import { resizeCanvas } from "./utils/index";

(() => {
  // canvas
  const $canvas = document.querySelector("#canvas");
  if (!($canvas instanceof HTMLCanvasElement))
    return alert("#canvas가 존재하지 않습니다.");

  // canvas의 context
  const ctx = $canvas.getContext("2d");
  if (!ctx) return alert("#canvas의 context가 존재하지 않습니다.");

  // 게임 매니저 생성
  GameManager.ctx = ctx;
  const gameManager = new GameManager();

  // 애니메이션 실행 함수
  const startAnimation = () => {
    // 게임 시작, 게임 중, 게임 종료 등 상황에 맞게 렌더링
    gameManager.render();

    // 애니메이션 실행
    requestAnimationFrame(startAnimation);
  };

  // 애니메이션 실행
  startAnimation();

  window.addEventListener("DOMContentLoaded", () => {
    resizeCanvas($canvas);
  });
  window.addEventListener("resize", () => {
    resizeCanvas($canvas);
  });
})();
