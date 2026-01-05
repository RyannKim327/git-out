/**
 * Depth-limited search (node only)
 * @param start      starting node
 * @param getNeighbors  (node) => Iterable<T>
 * @param isGoal     (node) => boolean
 * @param maxDepth   non-negative integer
 * @returns the goal node or null
 */
export function depthLimitedSearch<T>(
  start: T,
  getNeighbors: (node: T) => Iterable<T>,
  isGoal: (node: T) => boolean,
  maxDepth: number
): T | null {
  const stack: { node: T; depth: number }[] = [{ node: start, depth: 0 }];
  const visited = new Set<T>();

  while (stack.length) {
    const { node, depth } = stack.pop()!;

    if (isGoal(node)) return node;
    if (depth >= maxDepth) continue;
    if (visited.has(node)) continue;
    visited.add(node);

    for (const neighbor of getNeighbors(node)) {
      if (!visited.has(neighbor)) {
        stack.push({ node: neighbor, depth: depth + 1 });
      }
    }
  }
  return null;
}
export function depthLimitedSearchPath<T>(
  start: T,
  getNeighbors: (node: T) => Iterable<T>,
  isGoal: (node: T) => boolean,
  maxDepth: number
): T[] | null {
  const stack: { node: T; path: T[] }[] = [{ node: start, path: [start] }];

  while (stack.length) {
    const { node, path } = stack.pop()!;
    const depth = path.length - 1;

    if (isGoal(node)) return path;
    if (depth >= maxDepth) continue;

    for (const neighbor of getNeighbors(node)) {
      if (!path.includes(neighbor)) {          // simple cycle check
        stack.push({ node: neighbor, path: [...path, neighbor] });
      }
    }
  }
  return null;
}
type Board = number[][];          // 3×3 tile puzzle

function getNeighbors(b: Board): Board[] {
  // return all boards reachable by sliding the blank (0) once
  // (implementation omitted for brevity)
}

function isGoal(b: Board): boolean {
  const flat = b.flat();
  for (let i = 0; i < 9; i++) if (flat[i] !== i) return false;
  return true;
}

const start: Board = [
  [1, 2, 3],
  [4, 0, 6],
  [7, 5, 8]
];

const solution = depthLimitedSearchPath(start, getNeighbors, isGoal, 10);
console.log(solution);   // null if not found within 10 moves
