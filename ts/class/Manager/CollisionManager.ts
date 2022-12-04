// class
import Character from "../Character/index";
import Player from "../Character/Player/index";
import Enemy from "../Character/Enemy/index";
import Block from "../Block/index";
import Mario from "../Character/Player/Mario";
import Goomba from "../Character/Enemy/Goomba";
import MyObject from "../MyObject/index";
import Door from "../MyObject/Door";
import Coin from "../MyObject/Coin";

/**
 * 충돌 처리 매니저 ( 싱글톤 )
 *
 * @param instance ( static ) 인스턴스
 */
export default class CollisionManager {
  private static instance: CollisionManager;

  constructor() {
    // 싱글톤으로 구현
    if (CollisionManager.instance) return CollisionManager.instance;

    CollisionManager.instance = this;
  }

  /**
   * 캐릭터와 블록 충돌 처리
   * @param charactor 캐릭터 인스턴스
   * @param blocks 블록 인스턴스들
   */
  public collisionCAndB(charactor: Character, blocks: Block[]) {
    if (charactor instanceof Mario && charactor.motion === "die") return;

    // 캐릭터의 상하좌우 좌표
    const { x, y } = charactor.pos;
    const { w, h } = charactor.size;
    const cLeft = x;
    const cRight = x + w;
    const cTop = y;
    const cBottom = y + h;

    blocks.forEach((block) => {
      // 블록의 상하좌우 좌표
      const { x, y } = block.pos;
      const { w, h } = block.size;
      const bLeft = x;
      const bRight = x + w;
      const bTop = y;
      const bBottom = y + h;

      // 충돌인 경우 이전 좌표로 돌아가기 ( 즉, 가로막혀서 움직일 수 없는 효과를 보여줌 )
      if (
        bLeft <= cRight &&
        bRight >= cLeft &&
        bTop <= cBottom &&
        bBottom >= cTop
      ) {
        // "좌 -> 우" 충돌인 경우
        const isLeft = charactor.prevPos.x + charactor.size.w - bLeft;
        if (
          isLeft < 0 &&
          bTop < charactor.pos.y + charactor.size.h - charactor.fallSpeed.v
        ) {
          charactor.pos.x -= charactor.distance * charactor.speed;

          if (charactor instanceof Enemy) charactor.dir = !charactor.dir;

          return;
        }
        // "우 -> 좌" 충돌인 경우
        const isRight = bRight - charactor.prevPos.x;
        if (
          isRight < 0 &&
          bTop < charactor.pos.y + charactor.size.h - charactor.fallSpeed.v
        ) {
          charactor.pos.x += charactor.distance * charactor.speed;

          if (charactor instanceof Enemy) charactor.dir = !charactor.dir;

          return;
        }
        // "아래 -> 위" 충돌인 경우
        const isTop = charactor.pos.y - bBottom;
        if (
          isTop < 0 &&
          bTop < charactor.pos.y + charactor.size.h - charactor.fallSpeed.v
        ) {
          if (charactor instanceof Player) {
            charactor.jumping.destination = charactor.pos.y;
            charactor.fallSpeed.v = charactor.fallSpeed.min;
            charactor.jumping.isUp = false;
            charactor.jumping.isDown = true;

            return;
          }
        }

        // "위 -> 아래" 충돌인 경우
        charactor.pos.y = bTop - charactor.size.h;
      }
    });
  }

  /**
   * 플레이어와 적 충돌 처리
   * @param player 플레이어 인스턴스
   * @param enemies 적 인스턴스들
   * @returns 죽은 적 인스턴스들
   */
  public collisionPAndE(player: Player, enemies: Enemy[]) {
    if (player instanceof Mario && player.motion === "die") return;

    // 삭제될 적들 ( 죽은 적 )
    let targetEnemies: Enemy[] = [];

    // 플레이어의 상하좌우 좌표
    const { x, y } = player.pos;
    const { w, h } = player.size;
    const pLeft = x;
    const pRight = x + w;
    const pTop = y;
    const pBottom = y + h;

    enemies.forEach((enemy) => {
      // 죽은 굼바라면 무시
      if (enemy instanceof Goomba && enemy.motion === "die") return;

      // 적의 상하좌우 좌표
      const { x, y } = enemy.pos;
      const { w, h } = enemy.size;
      const eLeft = x;
      const eRight = x + w;
      const eTop = y;
      const eBottom = y + h;

      // 충돌인 경우 이전 좌표로 돌아가기 ( 즉, 가로막혀서 움직일 수 없는 효과를 보여줌 )
      if (
        eLeft <= pRight &&
        eRight >= pLeft &&
        eTop <= pBottom &&
        eBottom >= pTop
      ) {
        // 플레이어 기준 "좌 -> 우" 충돌인 경우
        const isLeft = player.prevPos.x + player.size.w - eLeft;
        if (
          isLeft > 0 &&
          eTop < player.pos.y + player.size.h - player.fallSpeed.v
        ) {
          player.die();
          return;
        }
        // 플레이어 기준 "우 -> 좌" 충돌인 경우
        const isRight = player.prevPos.x - eRight;
        if (
          isRight < 0 &&
          eTop < player.pos.y + player.size.h - player.fallSpeed.v
        ) {
          player.die();
          return;
        }

        // "위 -> 아래" 충돌인 경우
        player.pos.y = eTop - player.size.h;

        // 적 죽이기
        enemy.die();
        targetEnemies.push(enemy);

        // 플레이어 점프
        player.trample();
      }
    });

    return targetEnemies;
  }

  /**
   * 적과 적 충돌 처리
   * @param enemies 적 인스턴스들
   */
  public collisionEandE(enemies: Enemy[]) {
    enemies.forEach((enemy, index, arr) => {
      // 죽은 굼바라면 무시
      if (enemy instanceof Goomba && enemy.motion === "die") return;

      // 적1의 상하좌우 좌표
      const { x, y } = enemy.pos;
      const { w, h } = enemy.size;
      const e1Left = x;
      const e1Right = x + w;
      const e1Top = y;
      const e1Bottom = y + h;

      for (let i = index + 1; i < arr.length; i++) {
        // 적2의 상하좌우 좌표
        const { x, y } = arr[i].pos;
        const { w, h } = arr[i].size;
        const e2Left = x;
        const e2Right = x + w;
        const e2Top = y;
        const e2Bottom = y + h;

        // 충돌인 경우 이전 좌표로 돌아가기 ( 즉, 가로막혀서 움직일 수 없는 효과를 보여줌 )
        if (
          e2Left <= e1Right &&
          e2Right >= e1Left &&
          e2Top <= e1Bottom &&
          e2Bottom >= e1Top
        ) {
          // "좌 -> 우" 충돌인 경우
          const isLeft = enemy.prevPos.x + enemy.size.w - e2Left;
          if (
            isLeft > 0 &&
            e2Top < enemy.pos.y + enemy.size.h - enemy.fallSpeed.v
          ) {
            enemy.pos.x -= enemy.distance * enemy.speed;

            enemy.dir = false;
            arr[i].dir = true;

            return;
          }
          // "우 -> 좌" 충돌인 경우
          const isRight = enemy.prevPos.x - e2Right;
          if (
            isRight < 0 &&
            e2Top < enemy.pos.y + enemy.size.h - enemy.fallSpeed.v
          ) {
            enemy.pos.x += enemy.distance * enemy.speed;

            enemy.dir = true;
            arr[i].dir = false;

            return;
          }

          // "위 -> 아래" 충돌인 경우
          enemy.pos.y = e2Top - enemy.size.h;
        }
      }
    });
  }

  /**
   * 플레이어 움직임 제한 ( 맵 밖으로 이동 제한 )
   * @param player 플레이어 인스턴스
   */
  public moveRangeLimitPlayer(player: Player) {
    // 좌측 제한
    if (player.pos.x < 0) {
      player.pos.x = 0;
    }
    // 우측 제한
    else if (player.pos.x > innerWidth * 6 - player.size.w) {
      player.pos.x = innerWidth * 6 - player.size.w;
    }
  }

  /**
   * 적 움직임 제한 ( 맵 밖으로 이동 제한 )
   * @param enemies 적 인스턴스들
   */
  public moveRangeLimitEnemy(enemies: Enemy[]) {
    enemies.forEach((enemy) => {
      // 좌측 제한
      if (enemy.pos.x < 0) {
        enemy.dir = true;
        enemy.pos.x = 0;
      }
      // 우측 제한
      else if (enemy.pos.x > innerWidth * 6 - enemy.size.w) {
        enemy.dir = false;
        enemy.pos.x = innerWidth * 6 - enemy.size.w;
      }
    });
  }

  /**
   * 플레이어와 문이 겹치는지 여부
   * @param player 플레이어 객체
   * @param door 문 객체
   * @returns T / F
   */
  public collisionPandO(player: Player, door: Door) {
    // 플레이어의 상하좌우 좌표
    const { x, y } = player.pos;
    const { w, h } = player.size;
    const pLeft = x;
    const pRight = x + w;
    const pTop = y;
    const pBottom = y + h;

    {
      // 문의 상하좌우 좌표
      const { x, y } = door.pos;
      const { w, h } = door.size;
      const dLeft = x;
      const dRight = x + w;
      const dTop = y;
      const dBottom = y + h;

      // 플레이어와 문이 겹치는 경우
      if (
        dLeft <= pRight &&
        dRight >= pLeft &&
        dTop <= pBottom &&
        dBottom >= pTop
      ) {
        return true;
      }
    }

    return false;
  }

  /**
   * 플레이어와 동전이 겹치는지 여부
   * @param player 플레이어 객체
   * @param coins 동전 객체들
   * @returns 제거될 코인 객체들
   */
  public collisionPandC(player: Player, coins: Coin[]) {
    const removedCoins: Coin[] = [];

    // 플레이어의 상하좌우 좌표
    const { x, y } = player.pos;
    const { w, h } = player.size;
    const pLeft = x;
    const pRight = x + w;
    const pTop = y;
    const pBottom = y + h;

    coins.forEach((coin) => {
      // 동전의 상하좌우 좌표
      const { x, y } = coin.pos;
      const { w, h } = coin.size;
      const cLeft = x;
      const cRight = x + w;
      const cTop = y;
      const cBottom = y + h;

      // 플레이어와 동전이 겹치는 경우
      if (
        cLeft <= pRight &&
        cRight >= pLeft &&
        cTop <= pBottom &&
        cBottom >= pTop
      ) {
        removedCoins.push(coin);
      }
    });

    return removedCoins;
  }
}
