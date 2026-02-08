interface Node<T> {
  /** opaque identifier used for duplicate detection – e.g. a stringified board state */
  id: string;
  /** whatever data you want to keep (state, metadata, …) */
  data: T;
  /** produces the succ­esor nodes */
  getChildren(): Iterable<Node<T>>;
}
function dls<T>(
  node: Node<T>,
  goalTest: (n: Node<T>) => boolean,
  limit: number,
  visited = new Set<string>()
): Node<T> | null {
  if (goalTest(node)) return node;
  if (limit <= 0) return null;          // terminal depth reached
  visited.add(node.id);                 // prevent revisiting

  for (const child of node.getChildren()) {
    if (!visited.has(child.id)) {
      const result = dls(child, goalTest, limit - 1, visited);
      if (result !== null) return result;
    }
  }
  return null; // no goal found within limit
}
function dlsIter<T>(
  start: Node<T>,
  goalTest: (n: Node<T>) => boolean,
  limit: number
): Node<T> | null {
  const stack: Array<{ node: Node<T>; depth: number }> = [{ node: start, depth: 0 }];
  const visited = new Set<string>();

  while (stack.length) {
    const { node, depth } = stack.pop()!;
    if (goalTest(node)) return node;
    if (depth === limit) continue;      // hit the limit – skip children

    visited.add(node.id);
    for (const child of node.getChildren()) {
      if (!visited.has(child.id)) {
        stack.push({ node: child, depth: depth + 1 });
      }
    }
  }
  return null;
}
class Coord {
  constructor(public x: number, public y: number) {}
}

class MazeCell implements Node<Coord> {
  constructor(
    public id: string,
    public data: Coord,
    private neighbors: readonly Coord[]
  ) {}

  getChildren(): Iterable<Node<Coord>> {
    return this.neighbors.map(
      n => new MazeCell(String(n.x) + ',' + n.y, n, [] /* placeholder */)
    );
  }
}

// Setup: build maze, decide start & goal
const start = new MazeCell('0,0', new Coord(0, 0), [new Coord(1, 0), new Coord(0, 1)]);
const isGoal = (n: Node<Coord>) => n.data.x === 5 && n.data.y === 5;

// Run:
const found = dls(start, isGoal, 10);
if (found) console.log('Found solution:', found.data);
else console.log('no path within depth 10');
