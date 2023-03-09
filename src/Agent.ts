import { MaybeCell, ScreenPart } from "./GameRunner";

export type Player = "A" | "B" | "C" | "D";

export type Motion = "up" | "down" | "left" | "right";

// C uses these moves in order, repeatedly
const cycle: Motion[] = ["up", "up", "right", "down", "right"];

export function randomMotion(part: ScreenPart): Motion {
  const randomNumber: number = Math.random() * 4; // random float in the half-open range [0, 4)

  let motion: Motion;
  if (randomNumber < 1) motion = "up";
  else if (randomNumber < 2) motion = "down";
  else if (randomNumber < 3) motion = "left";
  else motion = "right";

  // try not to hit anything
  if (tryMove(motion, part) != "apple" && tryMove(motion, part) != "empty") {
    switch (motion) {
      case "up":
        return "down";
      case "right":
        return "left";
      case "down":
        return "up";
      case "left":
        return "right";
    }
  }

  return motion;
}

function tryMove(motion: Motion, screenPart: ScreenPart): MaybeCell {
  // the snake is positioned in the center at p[2][2]
  switch (motion) {
    case "left":
      return screenPart[2][1];
    case "right":
      return screenPart[2][3];
    case "up":
      return screenPart[1][2];
    case "down":
      return screenPart[3][2];
  }
}
/**
 * This is the parent class for all players.
 * When creating a new agent, simply write in
 * a child class of this class and add in
 * the agentMove function containing your
 * unique behaviors. 
 */
export class Agent {
  agentMove(screenPart: ScreenPart): Motion {
    throw new Error("Unimplemented method: agentMove");
  }
}
/**
 * This is the class for the A player
 */
export class AgentA extends Agent {
  agentMove(screenPart: ScreenPart): Motion {
    return "right";
  }
}
/**
 * This is the class for the B player
 */
export class AgentB extends Agent {
  agentMove(screenPart: ScreenPart): Motion {
    return randomMotion(screenPart);
  }
}
/**
 * This is the class for the C player
 */
export class AgentC extends Agent {
  private index: number;

  constructor() {
    super();
    this.index = 0;
  }

  agentMove(screenPart: ScreenPart): Motion {
    const c: Motion = cycle[this.index];
    this.index++;
    this.index = this.index % cycle.length;
    return c;
  }
}
/**
 * This is the class for the D player
 */
export class AgentD extends Agent {
  agentMove(screenPart: ScreenPart): Motion {
    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 5; j++) {
        if (screenPart[j][i] == "apple") {
          if (i > 3) return "right";
          else if (i < 3) return "left";
          else if (j > 3) return "down";
          else if (j < 3) return "up";
        }
      }
    }
    return randomMotion(screenPart);
  }
}
