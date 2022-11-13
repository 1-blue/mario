// class
import Background from "./class/Background";
import MapManager from "./class/MapManager";
import Block from "./class/Block";
import Mario from "./class/Mario";

// util
import { resizeCanvas } from "./utils/index";

// type
import type { KeyType } from "./types/index";

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

  // 맵 관리자
  const mapManager = new MapManager();

  // 블럭
  Block.ctx = ctx;
  const blocks: Block[] = [];

  // 계단맵 생성
  mapManager.CreateMap("stairs", blocks);

  // 키 누름 시작
  window.addEventListener("keydown", (e) => {
    // >>> 가능하면 로직 수정
    if (
      !(
        e.key === "ArrowRight" ||
        e.key === "ArrowLeft" ||
        e.key === "ArrowDown" ||
        e.key === " "
      )
    )
      return;
    const key = (e.key === " " ? "Space" : e.key) as KeyType;

    if (mario.getKeys().hasOwnProperty(key))
      // 이미 같은 키를 누르고 있다면
      return;

    // 점프중에 다시 점프 금지
    if (key === "Space" && mario.isJumping()) return;

    // 점프중이라면 엎드리기 금지
    if (key === "ArrowDown" && mario.isJumping()) return;

    // 좌/우 방향키 동시 입력 금지
    if (key === "ArrowRight" && mario.getKeys().ArrowLeft) {
      delete mario.getKeys()["ArrowLeft"];
    } else if (key === "ArrowLeft" && mario.getKeys().ArrowRight) {
      delete mario.getKeys()["ArrowRight"];
    }

    // 현재 누른 키를 등록
    mario.setKeys({ [key]: { startTime: Date.now() } });
  });

  // 키 누름 중지
  window.addEventListener("keyup", (e) => {
    // >>> 가능하면 로직 수정
    if (
      !(
        e.key === "ArrowRight" ||
        e.key === "ArrowLeft" ||
        e.key === "ArrowDown" ||
        e.key === " "
      )
    )
      return;
    const key = (e.key === " " ? "Space" : e.key) as KeyType;

    // 걷기 중지 및 엎드리기를 중지하면 서있는 모션으로 변경
    if (key.includes("Arrow")) {
      mario.stand(key);
      mario.draw();
    }

    // 이전에 눌렀던 기록 제거
    delete mario.getKeys()[key];
  });

  // 애니메이션 실행 함수
  const startAnimation = () => {
    // 배경 렌더링
    background.draw();

    // 블럭 렌더링
    blocks.forEach((block) => block.draw());

    // 마리오 키보드 이벤트 처리 및 렌더링
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
