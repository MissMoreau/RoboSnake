import { Agent, AgentA, AgentB, AgentC, AgentD, Motion } from "./Agent";
import { scheduleNextUpdate, updateApples, updateLost } from "./DrawingLibrary";
import { Cell, draw, GameScreen } from "./GameScreen";

// a MaybeCell is either a Cell or the string "outside"
export type MaybeCell = Cell | "outside";

// a ScreenPart is a 5x5 array of MaybeCell arrays
export type ScreenPart = MaybeCell[][];

export class Point {
  public x: number;
  public y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}

export class SnakeState extends Point {
  public apples: number;
  public lost: boolean;
  public agent: Agent;
  public cell: Cell;

  constructor(x: number, y: number, agent: Agent, cell: Cell) {
    super(x, y); // call Point constructor to set x and y
    this.apples = 0;
    this.lost = false;
    this.agent = agent;
    this.cell = cell;
  }

  public setPoint(p: Point): void {
    this.x = p.x;
    this.y = p.y;
  }
}

// x and y are the left and top coordinate of a 5x5 square region.
// cells outside the bounds of the board are represented with "outside"
export function getScreenPart(screen: GameScreen, s: SnakeState): ScreenPart {
  const part: ScreenPart = new Array<MaybeCell[]>(5);
  for (let j = 0; j < 5; j++) {
    part[j] = new Array<MaybeCell>(5);
    for (let i = 0; i < 5; i++) {
      if (
        s.x + i - 2 >= 0 &&
        s.y - 2 + j >= 0 &&
        s.x - 2 + i < screen.length &&
        s.y - 2 + j < screen.length
      )
        part[j][i] = screen[s.y + j - 2][s.x + i - 2];
      else part[j][i] = "outside";
    }
  }
  return part;
}

// stepTime is a number of milliseconds
/**
 * For users, lines 75-83 are where you will make your changes.
 * All that you will need to change is the new Agent_() part
 * of any of that code to fit your added agent. Replace
 * the _ part of that example with the letter of your new agent
 * and you will be good to go!
 */
export function run(
  stepTime: number,
  newApplesEachStep: number,
  screen: GameScreen
): void {
  // player initial positions
  const a = new SnakeState(0, 0, new AgentA(), "A");
  const b = new SnakeState(screen.length - 1, 0, new AgentB(), "B");
  const c = new SnakeState(0, screen.length - 1, new AgentC(), "C");
  const d = new SnakeState(
    screen.length - 1,
    screen.length - 1,
    new AgentD(),
    "D"
  );

  // draw starting screen
  screen[a.y][a.x] = a.cell;
  screen[b.y][b.x] = b.cell;
  screen[c.y][c.x] = c.cell;
  screen[d.y][d.x] = d.cell;
  draw(screen);

  // this will wait for stepTime milliseconds and then call step with these arguments
  scheduleNextUpdate(stepTime, () =>
    step(stepTime, newApplesEachStep, screen, a, b, c, d)
  );
  // the "() =>" part is important!
  // without it, step will get called immediately instead of waiting
}

function locationAfterMotion(motion: Motion, snake: SnakeState): Point {
  switch (motion) {
    case "left":
      return new Point(snake.x - 1, snake.y);
    case "right":
      return new Point(snake.x + 1, snake.y);
    case "up":
      return new Point(snake.x, snake.y - 1);
    case "down":
      return new Point(snake.x, snake.y + 1);
  }
}

export function step(
  stepTime: number,
  newApplesEachStep: number,
  screen: GameScreen,
  snakeA: SnakeState,
  snakeB: SnakeState,
  snakeC: SnakeState,
  snakeD: SnakeState
): void {
  // generate new apples
  for (let i = 0; i < newApplesEachStep; i++) {
    // random integers in the closed range [0, screen.length]
    const x = Math.floor(Math.random() * screen.length);
    const y = Math.floor(Math.random() * screen.length);
    // if we generated coordinates that aren't empty, skip this apple
    if (screen[y][x] == "empty") screen[y][x] = "apple";
  }

  // players take turns in order: A -> B -> C -> D -> A -> B -> C -> D -> ...
  snakeA = snakeAction(snakeA, screen);
  snakeB = snakeAction(snakeB, screen);
  snakeC = snakeAction(snakeC, screen);
  snakeD = snakeAction(snakeD, screen);

  // update game screen
  draw(screen);

  // update snake statistics
  updateLost("A", snakeA.lost);
  updateApples("A", snakeA.apples);
  updateLost("B", snakeB.lost);
  updateApples("B", snakeB.apples);
  updateLost("C", snakeC.lost);
  updateApples("C", snakeC.apples);
  updateLost("D", snakeD.lost);
  updateApples("D", snakeD.apples);

  // run again unless everyone has lost
  if (!snakeA.lost || !snakeB.lost || !snakeC.lost || !snakeD.lost)
    scheduleNextUpdate(stepTime, () =>
      step(stepTime, newApplesEachStep, screen, snakeA, snakeB, snakeC, snakeD)
    );
}

// snakeAction generates the turn for the specified player
function snakeAction(snake: SnakeState, screen: GameScreen): SnakeState {
  if (!snake.lost) {
    const currentLocation = locationAfterMotion(
      snake.agent.agentMove(getScreenPart(screen, snake)),
      snake
    );
    if (
      currentLocation.x < 0 ||
      currentLocation.y < 0 ||
      currentLocation.x >= screen.length ||
      currentLocation.y >= screen.length
    )
      // hit the edge of the screen
      snake.lost = true;
    else
      switch (screen[currentLocation.y][currentLocation.x]) {
        case "empty": {
          // make the move
          snake.setPoint(currentLocation);
          screen[currentLocation.y][currentLocation.x] = snake.cell;
          break;
        }
        case "apple": {
          // make the move and eat the apple
          snake.setPoint(currentLocation);
          snake.apples++;
          screen[currentLocation.y][currentLocation.x] = snake.cell;
          break;
        }
        default: {
          // lose
          snake.lost = true;
          break;
        }
      }
  }

  return snake;
}
