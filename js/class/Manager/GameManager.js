// class
import Background from "../Map/Background.js";
import MapManager from "./MapManager.js";
import CollisionManager from "./CollisionManager.js";
import Block from "../Block/index.js";
import Mario from "../Character/Player/Mario.js";
import Goomba from "../Character/Enemy/Goomba.js";
import MyObject from "../MyObject/index.js";
import Door from "../MyObject/Door.js";
import Coin from "../MyObject/Coin.js";
// util
import { myObjectKeyTable } from "../../utils/index.js";
/**
 * 게임의 모든 과정을 처리하는 클래스 ( 준비, 플레이, 종료 ) >>>
 *
 * @param instance ( static ) 인스턴스 ( 싱글톤 )
 * @param ctx ( static ) canvas의 context
 *
 * @param background Backgroud의 인스턴스
 * @param mapManager MapManager의 인스턴스
 * @param collisionManager CollisionManager의 인스턴스
 * @param player Player의 인스턴스
 * @param blocks Block의 인스턴스들
 * @param enemies Emeny의 인스턴스들
 * @param doors Door의 인스턴스들
 * @param coins Coin의 인스턴스들
 *
 * @param state 현재 게임 상태 ( "ready" | "play" | "end" )
 * @param mapType 현재 맵의 타입 ( "ground" | "underground" | "snow" )
 * @param mapShape 현재 맵의 형태 ( "stairs" | "straight" )
 * @param score 점수
 * @param stage 스테이지
 * @param enemyCount 적 개수
 * @param holeCount 구멍 개수
 * @param coinCount 코인 개수
 *
 * @param $playUI play ui Element
 * @param $readyUI ready ui Element
 * @param $endUI end ui Element
 */
export default class GameManager {
  constructor() {
    // 싱글톤으로 구현
    if (GameManager.instance) return GameManager.instance;
    // "ctx" 등록
    Background.ctx = GameManager.ctx;
    this.background = new Background();
    this.mapManager = new MapManager("ground");
    this.collisionManager = new CollisionManager();
    this.player = null;
    this.blocks = [];
    this.enemies = [];
    this.doors = [];
    this.coins = [];
    this.state = "ready";
    this.mapType = "ground";
    this.mapShape = "straight";
    this.score = 0;
    this.stage = 1;
    this.enemyCount = 20;
    this.holeCount = 6;
    this.coinCount = 20;
    this.$playUI = document.getElementById("play-ui");
    this.$readyUI = document.getElementById("ready-ui");
    this.$endUI = document.getElementById("end-ui");
    GameManager.instance = this;
  }
  /**
   * 현재 상태에 맞는 렌더링
   */
  render() {
    // 배경 그리기
    this.background.draw(this.mapType);
    // 게임 준비/실행/종료
    switch (this.state) {
      case "ready":
        this.renderReadyUI();
        break;
      case "play":
        this.play();
        break;
      case "end":
        this.renderEndUI();
        break;
    }
  }
  /**
   * 게임 준비 UI
   */
  renderReadyUI() {
    document.querySelector("html").style.overflowX = "hidden";
    // UI 렌더링
    this.$playUI.classList.add("none");
    this.$readyUI.classList.remove("none");
    this.$endUI.classList.add("none");
    // 이미 UI를 채웠다면
    if (this.$readyUI.childElementCount !== 0) return;
    // 타이틀
    const $$title = document.createElement("h1");
    $$title.innerText = "TS + Canvas로 만든 마리오 웹 게임";
    this.$readyUI.appendChild($$title);
    // 맵 형태 선택
    const $$mapShape = document.createElement("ul");
    const $$mapShapeLI1 = document.createElement("li");
    const $$mapShapeLI2 = document.createElement("li");
    const $$mapShapeBtn1 = document.createElement("button");
    const $$mapShapeBtn2 = document.createElement("button");
    $$mapShape.style.top = "35%";
    $$mapShapeBtn1.type = "button";
    $$mapShapeBtn1.innerText = "직선 맵";
    $$mapShapeBtn1.classList.add("active");
    $$mapShapeBtn1.dataset.shape = "straight";
    $$mapShapeBtn2.type = "button";
    $$mapShapeBtn2.innerText = "언덕 맵";
    $$mapShapeBtn2.dataset.shape = "stairs";
    $$mapShapeLI1.appendChild($$mapShapeBtn1);
    $$mapShapeLI2.appendChild($$mapShapeBtn2);
    $$mapShape.append($$mapShapeLI1, $$mapShapeLI2);
    this.$readyUI.appendChild($$mapShape);
    // 맵 타입 선택
    const $$mapType = document.createElement("ul");
    const $$mapTypeLI1 = document.createElement("li");
    const $$mapTypeLI2 = document.createElement("li");
    const $$mapTypeLI3 = document.createElement("li");
    const $$mapTypeBtn1 = document.createElement("button");
    const $$mapTypeBtn2 = document.createElement("button");
    const $$mapTypeBtn3 = document.createElement("button");
    $$mapType.style.top = "50%";
    $$mapTypeBtn1.type = "button";
    $$mapTypeBtn1.innerText = "지상";
    $$mapTypeBtn1.dataset.type = "ground";
    $$mapTypeBtn1.classList.add("active");
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
    this.$readyUI.appendChild($$mapType);
    // 시작 버튼
    const $$startBtnUL = document.createElement("ul");
    const $$startBtnLI = document.createElement("li");
    const $$startBtn = document.createElement("button");
    $$startBtnUL.style.top = "70%";
    $$startBtn.type = "button";
    $$startBtn.innerHTML = "게임 시작";
    $$startBtn.dataset.start = "start";
    $$startBtnLI.appendChild($$startBtn);
    $$startBtnUL.appendChild($$startBtnLI);
    this.$readyUI.appendChild($$startBtnUL);
    // 이벤트 등록 ( 버블링 )
    this.$readyUI.addEventListener("click", (e) => {
      if (!(e.target instanceof HTMLElement)) return;
      const { type, shape, start } = e.target.dataset;
      // 맵 형태
      if (shape) {
        [...$$mapShape.childNodes]
          .filter(($$li) => $$li instanceof HTMLElement)
          .forEach(($$li) => {
            var _a;
            return (_a = $$li.firstElementChild) === null || _a === void 0
              ? void 0
              : _a.classList.remove("active");
          });
        e.target.classList.toggle("active");
        this.mapShape = shape;
      }
      // 맵 타입
      else if (type) {
        [...$$mapType.childNodes]
          .filter(($$li) => $$li instanceof HTMLElement)
          .forEach(($$li) => {
            var _a;
            return (_a = $$li.firstElementChild) === null || _a === void 0
              ? void 0
              : _a.classList.remove("active");
          });
        e.target.classList.toggle("active");
        this.mapType = type;
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
  play() {
    document.querySelector("html").style.overflowX = "scroll";
    if (!this.player) return;
    // UI 렌더링
    this.$playUI.classList.remove("none");
    this.$readyUI.classList.add("none");
    this.$endUI.classList.add("none");
    // 블록 렌더링
    this.blocks.forEach((block) => block.draw());
    // 적 이동
    this.enemies.forEach((enemy) => enemy.process());
    // 플레이어 키보드 이벤트 처리
    this.player.process();
    // 플레이어 / 블록 충돌 체크
    this.collisionManager.collisionCAndB(this.player, this.blocks);
    // 적 / 블록 충돌 체크
    this.enemies.forEach((enemy) =>
      this.collisionManager.collisionCAndB(enemy, this.blocks)
    );
    // 적 / 적 충돌 체크
    this.collisionManager.collisionEandE(this.enemies);
    const deadEnemies = this.collisionManager.collisionPAndE(
      this.player,
      this.enemies
    );
    // 플레이어 코인 충돌체크
    const removedCoins = this.collisionManager.collisionPandC(
      this.player,
      this.coins
    );
    // 이동 제한
    this.collisionManager.moveRangeLimitPlayer(this.player);
    this.collisionManager.moveRangeLimitEnemy(this.enemies);
    // 적을 죽였다면
    if (deadEnemies && deadEnemies.length !== 0) {
      setTimeout(() => {
        deadEnemies.forEach((e) => {
          this.enemies = this.enemies.filter((enemy) => enemy !== e);
          const $enemy = this.$playUI.querySelector("#play-ui .enemy");
          if ($enemy) {
            $enemy.innerHTML = "Enemy : " + this.enemies.length;
          }
        });
      }, 500);
      this.score += deadEnemies.length * (100 * this.stage * 0.5);
      const $score = this.$playUI.querySelector("#play-ui .score");
      if ($score) {
        $score.innerHTML = "Score : " + this.score;
      }
    }
    // 코인이 먹혔다면
    if (removedCoins.length !== 0) {
      removedCoins.filter((c) => {
        this.coins = this.coins.filter((coin) => coin !== c);
      });
      this.score += removedCoins.length * (100 * this.stage * 0.5);
      const $score = this.$playUI.querySelector("#play-ui .score");
      if ($score) {
        $score.innerHTML = "Score : " + this.score;
      }
      const $coin = this.$playUI.querySelector("#play-ui .coin");
      if ($coin) {
        $coin.innerHTML = "Coin : " + this.coins.length;
      }
    }
    // 문 렌더링
    this.doors.forEach((door) => door.render());
    // 코인 렌더링
    Coin.count++;
    this.coins.forEach((coin) => {
      coin.rotate();
      coin.render();
    });
    // 마리오/적 렌더링
    this.enemies.forEach((enemy) => enemy.execute());
    this.player.execute();
  }
  /**
   * 게임 종료 UI
   */
  renderEndUI() {
    window.scrollTo(0, 0);
    document.querySelector("html").style.overflowX = "hidden";
    // UI 렌더링
    this.$playUI.classList.add("none");
    this.$readyUI.classList.add("none");
    this.$endUI.classList.remove("none");
    // 이미 UI를 채웠다면
    if (this.$endUI.childElementCount !== 0) {
      // 점수만 교체
      const $score = document.querySelector("#end-ui .score");
      if (!$score) return;
      if ($score.innerHTML.includes("" + this.score)) return;
      $score.innerHTML = "최종 점수 : " + this.score;
      return;
    }
    // 타이틀
    const $$title = document.createElement("h1");
    $$title.innerText = "게임 종료";
    this.$endUI.appendChild($$title);
    // 점수
    const $$scoreUI = document.createElement("ul");
    const $$scoreLI = document.createElement("li");
    $$scoreUI.style.top = "30%";
    $$scoreLI.innerHTML = "최종 점수 : " + this.score;
    $$scoreLI.style.fontSize = "1.8rem";
    $$scoreLI.style.whiteSpace = "pre-wrap";
    $$scoreLI.classList.add("score");
    $$scoreUI.appendChild($$scoreLI);
    this.$endUI.appendChild($$scoreUI);
    // 재시작 버튼
    const $$restartBtnUI = document.createElement("ul");
    const $$restartBtnLI = document.createElement("li");
    const $$restartBtn = document.createElement("button");
    $$restartBtnUI.style.top = "40%";
    $$restartBtn.type = "button";
    $$restartBtn.innerHTML = "다시 시작";
    $$restartBtn.dataset.restart = "restart";
    $$restartBtnLI.appendChild($$restartBtn);
    $$restartBtnUI.appendChild($$restartBtnLI);
    this.$endUI.appendChild($$restartBtnUI);
    // 이벤트 등록
    this.$endUI.addEventListener("click", (e) => {
      if (!(e.target instanceof HTMLElement)) return;
      const { restart } = e.target.dataset;
      // 시작 UI로 변경 ( 맵 선택 )
      if (restart) this.state = "ready";
    });
  }
  /**
   * 떨어져서 죽은 적 제거를 위한 메서드
   * @param enemy 떨어져서 죽은 적 객체
   */
  removeEnemy(enemy) {
    this.enemies = this.enemies.filter((e) => e !== enemy);
    const $enemy = this.$playUI.querySelector("#play-ui .enemy");
    if ($enemy) {
      $enemy.innerHTML = "Enemy : " + this.enemies.length;
    }
  }
  /**
   * 다음 스테이지
   */
  nextState() {
    this.score += 1000 * this.stage;
    this.stage += 1;
    this.enemyCount += 10;
    this.holeCount += 2;
    this.coinCount += 10;
    this.player.pos.x = 240;
    this.player.pos.y = 200;
    this.enemies = [];
    this.blocks = [];
    this.doors = [];
    this.coins = [];
    // 맵 생성
    this.mapManager.createMap(
      this.blocks,
      this.mapShape,
      this.mapType,
      this.holeCount
    );
    // 적(굼바) 생성
    Array(this.enemyCount)
      .fill(null)
      .map(() => {
        const randomX = Math.ceil(
          Math.random() * (innerWidth * 5) + innerWidth
        );
        this.enemies.push(
          new Goomba(
            { x: randomX, y: 600 },
            { w: 60, h: 60 },
            randomX % 2 === 0
          )
        );
      });
    // 문 생성
    this.doors.push(
      new Door({
        x: innerWidth * 6 - 300,
        y:
          Math.floor(innerHeight / 100) * 100 -
          100 -
          myObjectKeyTable.door.height,
      })
    );
    // 코인 생성
    Array(this.coinCount)
      .fill(null)
      .forEach(() => this.coins.push(new Coin()));
    const $score = this.$playUI.querySelector("#play-ui .score");
    if ($score) $score.innerHTML = "Score : " + this.score;
    const $stage = this.$playUI.querySelector("#play-ui .stage");
    if ($stage) $stage.innerHTML = "Stage " + this.stage;
    const $enemy = this.$playUI.querySelector("#play-ui .enemy");
    if ($enemy) $enemy.innerHTML = "Enemy : " + this.enemies.length;
    const $coin = this.$playUI.querySelector("#play-ui .coin");
    if ($coin) $coin.innerHTML = "Coin : " + this.coins.length;
  }
  /**
   * 게임 종료
   */
  gameOver() {
    this.player = null;
    this.blocks = [];
    this.enemies = [];
    this.doors = [];
    this.coins = [];
    this.state = "end";
    this.enemyCount = 20;
    this.holeCount = 6;
    this.coinCount = 20;
  }
  /**
   * 게임 시작 시 초기화
   */
  initPlay() {
    if (!this.mapManager) return;
    // 맵 생성
    this.mapManager.createMap(
      this.blocks,
      this.mapShape,
      this.mapType,
      this.holeCount
    );
    // UI 렌더링
    this.$playUI.classList.remove("none");
    this.$readyUI.classList.add("none");
    this.$endUI.classList.add("none");
    // "ctx" 등록
    Block.ctx = GameManager.ctx;
    Mario.ctx = GameManager.ctx;
    Goomba.ctx = GameManager.ctx;
    MyObject.ctx = GameManager.ctx;
    // 플레이어(마리오) 생성
    this.player = new Mario({ x: 200, y: 200 }, { w: 60, h: 60 });
    // 적(굼바) 생성
    Array(this.enemyCount)
      .fill(null)
      .map(() => {
        const randomX = Math.ceil(
          Math.random() * (innerWidth * 5) + innerWidth
        );
        this.enemies.push(
          new Goomba(
            { x: randomX, y: 600 },
            { w: 60, h: 60 },
            randomX % 2 === 0
          )
        );
      });
    // 문 생성
    this.doors.push(
      new Door({
        x: innerWidth * 6 - 300,
        y:
          Math.floor(innerHeight / 100) * 100 -
          100 -
          myObjectKeyTable.door.height,
      })
    );
    // 코인 생성
    Array(this.coinCount)
      .fill(null)
      .forEach(() => this.coins.push(new Coin()));
    // 점수/스테이지 초기화
    this.score = 0;
    this.stage = 1;
    const $score = this.$playUI.querySelector("#play-ui .score");
    if ($score) $score.innerHTML = "Score : " + this.score;
    const $stage = this.$playUI.querySelector("#play-ui .stage");
    if ($stage) $stage.innerHTML = "Stage " + this.stage;
    const $enemy = this.$playUI.querySelector("#play-ui .enemy");
    if ($enemy) $enemy.innerHTML = "Enemy : " + this.enemies.length;
    const $coin = this.$playUI.querySelector("#play-ui .coin");
    if ($coin) {
      $coin.innerHTML = "Coin : " + this.coins.length;
    }
    // 키 누름 시작 이벤트 등록
    window.addEventListener("keydown", this.keydownEvent());
    // 키 누름 중지
    window.addEventListener("keyup", this.keyupEvent());
  }
  /**
   * 키 누름 이벤트 콜백 함수를 반환하는 함수
   */
  keydownEvent() {
    return (e) => {
      if (!this.player) return;
      if (e.key === "ArrowUp") {
        const door = this.doors[0];
        const isCollision = this.collisionManager.collisionPandO(
          this.player,
          door
        );
        if (isCollision) {
          this.nextState();
        }
      }
      if (
        !(
          e.key === "ArrowRight" ||
          e.key === "ArrowLeft" ||
          e.key === "ArrowDown" ||
          e.key === " "
        )
      )
        return;
      const key = e.key === " " ? "Space" : e.key;
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
  keyupEvent() {
    return (e) => {
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
      const key = e.key === " " ? "Space" : e.key;
      // 걷기 중지 및 엎드리기를 중지하면 서있는 모션으로 변경
      if (key.includes("Arrow")) this.player.stand(key);
      // 이전에 눌렀던 기록 제거
      delete this.player.keys[key];
    };
  }
}
