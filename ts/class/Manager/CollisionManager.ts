// class
import Character from "../Character/index";
import Player from "../Character/Player/index";
import Enemy from "../Character/Enemy/index";
import Block from "../Map/Block";
import Mario from "../Character/Player/Mario";
import Goomba from "../Character/Enemy/Goomba";

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

  // 캐릭터와 블록 충돌
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
      // 블럭의 상하좌우 좌표
      const { x, y } = block.position;
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
        // "위 -> 아래" 충돌인 경우
        charactor.pos.y = bTop - charactor.size.h;
      }
    });
  }

  // 플레이어와 적 충돌
  public collisionPAndE(player: Player, enemies: Enemy[]) {
    if (player instanceof Mario && player.motion === "die") return;

    // 삭제될 적의 인덱스
    let targetEnemy: Enemy | null = null;

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
        // "좌 -> 우" 충돌인 경우
        const isLeft = player.prevPos.x + player.size.w - eLeft;
        if (
          isLeft > 0 &&
          eTop < player.pos.y + player.size.h - player.fallSpeed.v
        ) {
          player.die();
          return;
        }
        // "우 -> 좌" 충돌인 경우
        const isRight = player.prevPos.x - eRight;
        if (
          isRight > 0 &&
          eTop < player.pos.y + player.size.h - player.fallSpeed.v
        ) {
          player.die();
          return;
        }
        // "아래 -> 위" 충돌인 경우
        // 사망3

        // "위 -> 아래" 충돌인 경우
        player.pos.y = eTop - player.size.h;

        // 적 죽이기
        enemy.die();
        targetEnemy = enemy;

        // 플레이어 점프
        player.trample();
      }
    });

    return targetEnemy;
  }

  // 적과 적 충돌
  public CollisionEandE(enemies: Enemy[]) {
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
          // "아래 -> 위" 충돌인 경우
          // 사망3

          // "위 -> 아래" 충돌인 경우
          enemy.pos.y = e2Top - enemy.size.h;
        }
      }
    });
  }
}
