// class
import CollisionManager from "./class/Manager/CollisionManager";
import MapManager from "./class/Manager/MapManager";
import Background from "./class/Map/Background";
import Block from "./class/Block/index";
import Mario from "./class/Character/Player/Mario";
import Goomba from "./class/Character/Enemy/Goomba";
import Enemy from "./class/Character/Enemy/index";

// util
import { resizeCanvas } from "./utils/index";

// type
import type { KeyType, MapType } from "./types/index";
import GameManager from "./class/Manager/GameManager";

// >>> 임시
let type: MapType = "snow";

(() => {
  // canvas
  const $canvas = document.querySelector("#canvas");
  if (!($canvas instanceof HTMLCanvasElement))
    return alert("#canvas가 존재하지 않습니다.");

  // canvas의 context
  const ctx = $canvas.getContext("2d");
  if (!ctx) return alert("#canvas의 context가 존재하지 않습니다.");

  // 게임 매니저 생성
  const gameManager = new GameManager(ctx);

  // 애니메이션 실행 함수
  const startAnimation = () => {
    gameManager.render();

    // 애니메이션 실행
    requestAnimationFrame(startAnimation);
  };

  // 애니메이션 실행
  startAnimation();

  window.addEventListener("DOMContentLoaded", () => {
    resizeCanvas($canvas);
    // background.draw(type);
  });
  window.addEventListener("resize", () => {
    resizeCanvas($canvas);
    // background.draw(type);
  });
})();
