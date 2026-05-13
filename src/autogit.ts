// 1️⃣  Interfaces ----------------------------------------------------
interface State {
  // Unique identifier that helps us spot already‑visited nodes.
  id: string | number;

  // Return all children reachable from this state.
  getChildren(): State[];

  // For demo purposes, we also expose a pretty‑print.
  toString?(): string;
}

type GoalFn<T extends State> = (s: T) => boolean;

// 2️⃣  The recursive DLS ----------------------------------------------
function depthLimitedSearch<T extends State>(
  node: T,
  goal: GoalFn<T>,
  limit: number,
  visited = new Set<T | string | number>()
): T | null {
  // Depth exceeded → give up.
  if (limit < 0) return null;

  // Safe‑guard against cycles: if this node already saw, skip it.
  if (visited.has(node.id)) return null;

  // Mark the node as visited for this path.
  visited.add(node.id);

  // Goal found.
  if (goal(node)) return node;

  // Explore children.
  for (const child of node.getChildren()) {
    const result = depthLimitedSearch(child, goal, limit - 1, visited);
    if (result !== null) return result;
  }

  // Nothing found → backtrack.
  return null;
}
class GridCell implements State {
  constructor(
    public x: number,
    public y: number,
    public goal = false
  ) {}

  get id() { return `${this.x},${this.y}`; }

  getChildren(): State[] {
    const dirs = [
      [0, 1],
      [1, 0],
      [0, -1],
      [-1, 0],
    ];
    return dirs
      .map(([dx, dy]) => new GridCell(this.x + dx, this.y + dy))
      .filter(cell => cell.x >= 0 && cell.x < 3 && cell.y >= 0 && cell.y < 3);
  }

  toString() { return `(${this.x},${this.y})${this.goal ? '*' : ''}`; }
}

// Simple goal: bottom‑right corner.
const goalFn = (s: GridCell) => s.x === 2 && s.y === 2;

const start = new GridCell(0, 0);
const result = depthLimitedSearch(start, goalFn, 4);

console.log(result?.toString() ?? 'No solution within depth 4');
function iterativeDeepeningDFS<T extends State>(
  start: T,
  goal: GoalFn<T>,
  maxLimit: number
): T | null {
  for (let l = 0; l <= maxLimit; l++) {
    const res = depthLimitedSearch(start, goal, l);
    if (res !== null) return res;      // Found a goal
  }
  return null;                        // Still no goal within maxLimit
}
