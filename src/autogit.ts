function bfsLimited(start, isGoal, neighbors, maxDepth):
    queue ← [(start, 0)]          // node and its depth
    visited ← new Set()

    while queue not empty:
        (node, depth) ← queue.dequeue()

        if isGoal(node): return node

        if depth == maxDepth:
            continue   // depth limit reached – skip adding successors

        for each n in neighbors(node):
            if n not in visited:
                visited.add(n)
                queue.enqueue((n, depth + 1))

    return null   // no goal within depth limit
type Node<T> = T;

// Parameters:
//   start: the node to begin from
//   isGoal: a predicate to determine if a node is the goal
//   neighbors: a function that returns an array of adjacent nodes
//   maxDepth: the depth cutoff (inclusive)
//   allowRevisit: if true, visited set is ignored – useful for pure trees
export function breadthLimitedSearch<T>(
  start: Node<T>,
  isGoal: (node: T) => boolean,
  neighbors: (node: T) => Iterable<T>,
  maxDepth: number,
  allowRevisit: boolean = false
): T | null {
  // Queue holds tuples: [node, depth]
  const queue: Array<[T, number]> = [[start, 0]];

  // Only keep visited set if we care about cycles
  const visited = new Set<T>();
  if (!allowRevisit) visited.add(start);

  while (queue.length) {
    const [node, depth] = queue.shift() as [T, number];

    if (isGoal(node)) return node;

    if (depth === maxDepth) continue; // Depth limit reached – skip children

    for (const child of neighbors(node)) {
      if (!allowRevisit && visited.has(child)) continue;
      visited.add(child);
      queue.push([child, depth + 1]);
    }
  }

  return null; // No goal found within the depth bound
}
const graph = new Map<number, number[]>([
  [1, [2, 3]],
  [2, [4, 5]],
  [3, [5, 6]],
  [4, [7]],
  [5, [7]],
  [6, []],
  [7, []],
]);

function neighbors(n: number) {
  return graph.get(n) ?? [];
}

const start = 1;
const goal = 7;
const maxDepth = 3; // we only want to explore up to 3 edges away

const result = breadthLimitedSearch(
  start,
  (node) => node === goal,
  neighbors,
  maxDepth
);

console.log(result); // => 7 (found within 3 steps)
