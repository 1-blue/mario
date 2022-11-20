// class
import Background from "../Map/Background";
import MapManager from "./MapManager";
import CollisionManager from "./CollisionManager";
import Block from "../Block/index";
import Player from "../Character/Player/index";
import Enemy from "../Character/Enemy/index";
import Mario from "../Character/Player/Mario";
import Goomba from "../Character/Enemy/Goomba";

// type
import type { GameState, KeyType, MapShape, MapType } from "../../types/index";

export default class GameManager {
  private static instance: GameManager;

  private ctx!: CanvasRenderingContext2D;
  private state!: GameState;
  private mapType!: MapType;
  private mapShape!: MapShape;

  //
  private background!: Background | null;
  private mapManager!: MapManager | null;
  private collisionManager!: CollisionManager | null;
  private player!: Player | null;

  //
  private blocks!: Block[];
  private enemies!: Enemy[];

  //
  private $UI!: HTMLElement;

  constructor(ctx: CanvasRenderingContext2D) {
    // 싱글톤으로 구현
    if (GameManager.instance) return GameManager.instance;

    this.ctx = ctx;
    this.state = "start";
    this.mapType = "ground";
    this.mapShape = "straight";

    //
    this.background = null;
    this.mapManager = null;
    this.collisionManager = null;
    this.player = null;

    //
    this.blocks = [];
    this.enemies = [];

    this.$UI = document.getElementById("ui")!;

    // 초기화
    this.init();

    GameManager.instance = this;
  }

  /**
   *
   */
  public render() {
    if (!this.background) return;

    // 배경 그리기
    this.background.draw(this.mapType);

    // 시작 UI
    if (this.state === "start") {
      this.renderStartUI();
    }
    // 게임중 UI
    else if (this.state === "play") {
      this.play();
    }
    // 게임끝 UI
    else if (this.state === "end") {
    }
  }

  /**
   * 초기화
   */
  public init() {
    // "ctx" 등록
    Background.ctx = this.ctx;

    // 배경
    this.background = new Background();

    // 맵 관리자
    this.mapManager = new MapManager(this.mapType);
  }

  /**
   * 게임 시작 시 초기화
   */
  public initPlay() {
    if (!this.mapManager) return;

    // 맵 생성
    this.mapManager.CreateMap(this.blocks, this.mapShape, this.mapType);

    // UI 숨기기
    this.$UI.classList.add("none");

    // "ctx" 등록
    Block.ctx = this.ctx;
    Mario.ctx = this.ctx;
    Goomba.ctx = this.ctx;

    // 충돌 처리 매니저
    this.collisionManager = new CollisionManager();

    // 플레이어(마리오) 생성
    this.player = new Mario({ x: 240, y: 200 }, { w: 60, h: 60 });

    // 적(굼바) 생성
    Array(14)
      .fill(null)
      .map((v, i) =>
        this.enemies.push(
          new Goomba({ x: i * 100, y: 600 }, { w: 60, h: 60 }, i % 2 === 0)
        )
      );

    // 키 누름 시작 이벤트 등록
    window.addEventListener("keydown", this.keydownEvent());

    // 키 누름 중지
    window.addEventListener("keyup", this.keyupEvent());
  }

  /**
   * 게임 리셋
   */
  public reset() {
    this.state = "start";

    //
    this.background = null;
    this.mapManager = null;
    this.collisionManager = null;
    this.player = null;

    //
    this.blocks = [];
    this.enemies = [];
  }

  /**
   * 게임 시작 UI
   */
  public renderStartUI() {
    // UI 보이기
    this.$UI.classList.remove("none");

    // 이미 UI를 채웠다면
    if (this.$UI.childElementCount !== 0) return;

    // 맵 형태 선택
    const $$mapShape = document.createElement("ul");
    const $$mapShapeLI1 = document.createElement("li");
    const $$mapShapeLI2 = document.createElement("li");
    const $$mapShapeBtn1 = document.createElement("button");
    const $$mapShapeBtn2 = document.createElement("button");

    $$mapShape.style.top = "20%";
    $$mapShapeBtn1.type = "button";
    $$mapShapeBtn1.innerText = "직선 맵";
    $$mapShapeBtn1.dataset.shape = "straight";
    $$mapShapeBtn2.type = "button";
    $$mapShapeBtn2.innerText = "언덕 맵";
    $$mapShapeBtn2.dataset.shape = "stairs";

    $$mapShapeLI1.appendChild($$mapShapeBtn1);
    $$mapShapeLI2.appendChild($$mapShapeBtn2);
    $$mapShape.append($$mapShapeLI1, $$mapShapeLI2);
    this.$UI.appendChild($$mapShape);

    // 맵 타입 선택
    const $$mapType = document.createElement("ul");
    const $$mapTypeLI1 = document.createElement("li");
    const $$mapTypeLI2 = document.createElement("li");
    const $$mapTypeLI3 = document.createElement("li");
    const $$mapTypeBtn1 = document.createElement("button");
    const $$mapTypeBtn2 = document.createElement("button");
    const $$mapTypeBtn3 = document.createElement("button");

    $$mapType.style.top = "40%";
    $$mapTypeBtn1.type = "button";
    $$mapTypeBtn1.innerText = "지상";
    $$mapTypeBtn1.dataset.type = "ground";
    $$mapTypeBtn2.type = "button";
    $$mapTypeBtn2.innerText = "지하";
    $$mapTypeBtn2.dataset.type = "underground";
    $$mapTypeBtn3.type = "button";
    $$mapTypeBtn3.innerText = "눈";
    $$mapTypeBtn3.dataset.type = "snow";

    $$mapTypeLI1.appendChild($$mapTypeBtn1);
    $$mapTypeLI2.appendChild($$mapTypeBtn2);
    $$mapTypeLI3.appendChild($$mapTypeBtn3);
    $$mapType.append($$mapTypeLI1, $$mapTypeLI2, $$mapTypeLI3);
    this.$UI.appendChild($$mapType);

    // 시작 버튼
    const $$startBtn = document.createElement("button");
    $$startBtn.type = "button";
    $$startBtn.innerHTML = "게임 시작";
    $$startBtn.dataset.start = "start";
    this.$UI.appendChild($$startBtn);

    // 이벤트 등록
    this.$UI.addEventListener("click", (e) => {
      if (!(e.target instanceof HTMLElement)) return;

      const { type, shape, start } = e.target.dataset;

      // 맵 형태
      if (shape) {
        [...$$mapShape.childNodes]
          .filter(($$li): $$li is HTMLElement => $$li instanceof HTMLElement)
          .forEach(($$li) =>
            $$li.firstElementChild?.classList.remove("active")
          );
        e.target.classList.toggle("active");

        this.mapShape = shape as MapShape;
      }
      // 맵 타입
      else if (type) {
        [...$$mapType.childNodes]
          .filter(($$li): $$li is HTMLElement => $$li instanceof HTMLElement)
          .forEach(($$li) =>
            $$li.firstElementChild?.classList.remove("active")
          );
        e.target.classList.toggle("active");

        this.mapType = type as MapType;
      }
      // 게임 시작
      else if (start) {
        this.state = "play";
        this.initPlay();
      }
    });
  }

  /**
   * 게임 실행
   */
  private play() {
    if (!this.player || !this.background || !this.collisionManager) return;

    // 블록 렌더링
    this.blocks.forEach((block) => block.draw());

    // 적 이동
    this.enemies.forEach((enemy) => enemy.process());

    // 플레이어 키보드 이벤트 처리
    this.player.process();

    // 충돌 체크
    this.collisionManager.collisionCAndB(this.player, this.blocks);
    this.enemies.forEach((enemy) =>
      this.collisionManager!.collisionCAndB(enemy, this.blocks)
    );
    this.collisionManager.CollisionEandE(this.enemies);
    const deadEnemy = this.collisionManager.collisionPAndE(
      this.player,
      this.enemies
    );

    // 적이 죽었다면
    if (deadEnemy) {
      setTimeout(() => {
        this.enemies = this.enemies.filter((enemy) => enemy !== deadEnemy);
      }, 500);
    }

    // 마리오/적 렌더링
    this.enemies.forEach((enemy) => enemy.execute());
    this.player.execute();
  }

  /**
   * 키 누름 이벤트 콜백 함수를 반환하는 함수
   */
  private keydownEvent() {
    return (e: KeyboardEvent) => {
      if (!this.player) return;

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
      if (this.player.keys.hasOwnProperty(key)) return;

      // 점프중이라면 엎드리기 금지
      if (key === "ArrowDown" && this.player.isJumping()) return;

      // 좌/우 방향키 동시 입력 금지
      if (key === "ArrowRight" && this.player.keys.ArrowLeft) {
        delete this.player.keys["ArrowLeft"];
      } else if (key === "ArrowLeft" && this.player.keys.ArrowRight) {
        delete this.player.keys["ArrowRight"];
      }

      // 현재 누른 키를 등록
      this.player.keys = { [key]: { startTime: Date.now() } };
    };
  }
  /**
   * 키 떼기 이벤트 콜백 함수를 반환하는 함수
   */
  private keyupEvent() {
    return (e: KeyboardEvent) => {
      if (!this.player) return;

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
      if (key.includes("Arrow")) this.player.stand(key);

      // 이전에 눌렀던 기록 제거
      delete this.player.keys[key];
    };
  }
}
