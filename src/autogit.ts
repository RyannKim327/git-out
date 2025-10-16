type Point = { x: number; y: number };

type Node = {
  position: Point;
  g: number; // cost from start
  h: number; // heuristic cost to goal
  f: number; // g + h
  parent?: Node;
};

function heuristic(a: Point, b: Point): number {
  // Manhattan distance (good for 4-direction grid movement)
  return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
}

function aStar(
  start: Point,
  goal: Point,
  grid: number[][]
): Point[] | null {
  const openSet: Node[] = [];
  const closedSet: Point[] = [];

  const startNode: Node = {
    position: start,
    g: 0,
    h: heuristic(start, goal),
    f: heuristic(start, goal),
  };

  openSet.push(startNode);

  while (openSet.length > 0) {
    // Get node with lowest f
    openSet.sort((a, b) => a.f - b.f);
    const current = openSet.shift()!;

    // Goal check
    if (current.position.x === goal.x && current.position.y === goal.y) {
      return reconstructPath(current);
    }

    closedSet.push(current.position);

    const neighbors = getNeighbors(current.position, grid);
    for (const neighborPos of neighbors) {
      if (closedSet.find(p => p.x === neighborPos.x && p.y === neighborPos.y)) {
        continue;
      }

      const gScore = current.g + 1; // assuming cost between neighbors is 1
      let neighborNode = openSet.find(
        n => n.position.x === neighborPos.x && n.position.y === neighborPos.y
      );

      if (!neighborNode) {
        neighborNode = {
          position: neighborPos,
          g: gScore,
          h: heuristic(neighborPos, goal),
          f: gScore + heuristic(neighborPos, goal),
          parent: current,
        };
        openSet.push(neighborNode);
      } else if (gScore < neighborNode.g) {
        // Found shorter path to neighbor
        neighborNode.g = gScore;
        neighborNode.f = gScore + neighborNode.h;
        neighborNode.parent = current;
      }
    }
  }

  return null; // No path found
}

function getNeighbors(point: Point, grid: number[][]): Point[] {
  const dirs = [
    { x: 0, y: -1 },
    { x: 1, y: 0 },
    { x: 0, y: 1 },
    { x: -1, y: 0 },
  ];

  return dirs
    .map(d => ({ x: point.x + d.x, y: point.y + d.y }))
    .filter(p =>
      p.x >= 0 &&
      p.y >= 0 &&
      p.x < grid[0].length &&
      p.y < grid.length &&
      grid[p.y][p.x] === 0 // 0 means walkable
    );
}

function reconstructPath(endNode: Node): Point[] {
  const path: Point[] = [];
  let current: Node | undefined = endNode;
  while (current) {
    path.push(current.position);
    current = current.parent;
  }
  return path.reverse();
}
const grid = [
  [0, 0, 0, 0],
  [1, 1, 0, 1],
  [0, 0, 0, 0],
  [0, 1, 0, 0],
];

const start = { x: 0, y: 0 };
const goal = { x: 3, y: 2 };

const path = aStar(start, goal, grid);
console.log(path);
