function breadthLimitedSearch<T>(
  start: T,
  isGoal: (n: T) => boolean,
  expand: (n: T) => Iterable<T>,
  maxDepth: number
): T | null
type Node<T> = { value: T; depth: number };

export function breadthLimitedSearch<T>(
  start: T,
  isGoal: (n: T) => boolean,
  expand: (n: T) => Iterable<T>,
  maxDepth: number
): T | null {
  if (maxDepth < 0) return null;          // trivial reject
  if (isGoal(start)) return start;     // instant success

  const queue: Node<T>[] = [{ value: start, depth: 0 }];
  const visited = new Set<T>([start]);   // avoids re-expansion

  while (queue.length) {
    const { value: parent, depth } = queue.shift()!;

    if (depth >= maxDepth) continue;   // depth-limited: do not expand

    for (const child of expand(parent)) {
      if (isGoal(child)) return child;  // early exit
      if (!visited.has(child)) {
        visited.add(child);
        queue.push({ value: child, depth: depth + 1 });
      }
    }
  }
  return null;                           // exhausted frontier
}
// a tiny cyclic graph:  1 → 2 → 3 → 4 → 5
//                       ↑_______|
function neighbours(n: number): number[] {
  const edges: Record<number, number[]> = {
    1: [2],
    2: [3],
    3: [4],
    4: [5, 1], // cycle
    5: []
  };
  return edges[n] ?? [];
}

const goal = breadthLimitedSearch(
  1,                       // start
  n => n === 5,            // goal test
  neighbours,
  3                        // limit exploration to depth 3
);

console.log(goal); // null  (path 1→2→3→4 reaches depth 3, but 5 is at depth 4)

console.log(
  breadthLimitedSearch(1, n => n === 5, neighbours, 4)
); // 5  (within depth 4)
