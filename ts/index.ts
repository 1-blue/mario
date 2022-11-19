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

  // "ctx" 등록
  Background.ctx = ctx;
  Block.ctx = ctx;
  Mario.ctx = ctx;
  Goomba.ctx = ctx;

  // 배경
  const background = new Background();

  // 맵 관리자
  const mapManager = new MapManager(type);

  // 충돌 처리 매니저
  const collisionManager = new CollisionManager();

  // 블록
  const blocks: Block[] = [];

  // 계단맵 생성
  mapManager.CreateMap(blocks, "straight", type);

  // 마리오 생성
  const mario = new Mario({ x: 240, y: 200 }, { w: 60, h: 60 });

  // 적 생성
  let enemies: Enemy[] = [];
  Array(14)
    .fill(null)
    .map((v, i) =>
      enemies.push(
        new Goomba({ x: i * 100, y: 600 }, { w: 60, h: 60 }, i % 2 === 0)
      )
    );

  // 키 누름 시작
  window.addEventListener("keydown", (e) => {
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

    // 이미 같은 키를 누르고 있다면
    if (mario.keys.hasOwnProperty(key)) return;

    // 점프중이라면 엎드리기 금지
    if (key === "ArrowDown" && mario.isJumping()) return;

    // 좌/우 방향키 동시 입력 금지
    if (key === "ArrowRight" && mario.keys.ArrowLeft) {
      delete mario.keys["ArrowLeft"];
    } else if (key === "ArrowLeft" && mario.keys.ArrowRight) {
      delete mario.keys["ArrowRight"];
    }

    // 현재 누른 키를 등록
    mario.keys = { [key]: { startTime: Date.now() } };
  });

  // 키 누름 중지
  window.addEventListener("keyup", (e) => {
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
    if (key.includes("Arrow")) mario.stand(key);

    // 이전에 눌렀던 기록 제거
    delete mario.keys[key];
  });

  // 애니메이션 실행 함수
  const startAnimation = () => {
    // 배경 그리기
    background.draw(type);

    // 블록 렌더링
    blocks.forEach((block) => block.draw());

    // 적 이동
    enemies.forEach((enemy) => enemy.process());

    // 마리오 키보드 이벤트 처리
    mario.process();

    // 충돌 체크
    collisionManager.collisionCAndB(mario, blocks);
    enemies.forEach((enemy) => collisionManager.collisionCAndB(enemy, blocks));
    collisionManager.CollisionEandE(enemies);
    const deadEnemy = collisionManager.collisionPAndE(mario, enemies);

    // 적이 죽었다면
    if (deadEnemy) {
      setTimeout(() => {
        enemies = enemies.filter((enemy) => enemy !== deadEnemy);
      }, 500);
    }

    // 마리오/적 렌더링
    enemies.forEach((enemy) => enemy.execute());
    mario.execute();

    // 애니메이션 실행
    requestAnimationFrame(startAnimation);
  };

  // 애니메이션 실행
  startAnimation();

  window.addEventListener("DOMContentLoaded", () => {
    resizeCanvas($canvas);
    background.draw(type);
  });
  window.addEventListener("resize", () => {
    resizeCanvas($canvas);
    background.draw(type);
  });
})();
