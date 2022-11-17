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
export default class CollisitionManager {
  private static instance: CollisitionManager;

  constructor() {
    // 싱글톤으로 구현
    if (CollisitionManager.instance) return CollisitionManager.instance;

    CollisitionManager.instance = this;
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
  public collisitionPAndE(player: Player, enemies: Enemy[]) {
    if (player instanceof Mario && player.motion === "die") return;

    // 삭제될 적의 인덱스
    let targetEnemy: Enemy | null = null;

    // 플레이어의 상하좌우 좌표
    const { x, y } = player.pos;
    const { w, h } = player.size;
    const cLeft = x;
    const cRight = x + w;
    const cTop = y;
    const cBottom = y + h;

    enemies.forEach((enemy) => {
      // 죽은 굼바라면 무시
      if (enemy instanceof Goomba && enemy.motion === "die") return;

      // 적의 상하좌우 좌표
      const { x, y } = enemy.pos;
      const { w, h } = enemy.size;
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
        const isLeft = player.prevPos.x + player.size.w - bLeft;
        if (
          isLeft < 0 &&
          bTop < player.pos.y + player.size.h - player.fallSpeed.v
        ) {
          player.die();
          return;
        }
        // "우 -> 좌" 충돌인 경우
        const isRight = bRight - player.prevPos.x;
        if (
          isRight < 0 &&
          bTop < player.pos.y + player.size.h - player.fallSpeed.v
        ) {
          player.die();
          return;
        }
        // "아래 -> 위" 충돌인 경우
        // 사망3

        // "위 -> 아래" 충돌인 경우
        player.pos.y = bTop - player.size.h;

        // 적 죽이기
        enemy.die();

        targetEnemy = enemy;
      }
    });

    return targetEnemy;
  }

  // 적과 적 충돌
  public CollisitionEandE(enemies: Enemy[]) {}
}
