// dfs.ts
type Vertex = string | number;
type Graph = Map<Vertex, Vertex[]>;

/* ---------- helpers ---------- */
function initVisited(g: Graph): Map<Vertex, boolean> {
  const visited = new Map<Vertex, boolean>();
  g.forEach((_, v) => visited.set(v, false));
  return visited;
}

/* ---------- recursive DFS ---------- */
function dfsRecursive(
  g: Graph,
  start: Vertex,
  visited = initVisited(g),
  onVisit: (v: Vertex) => void = () => {}
): void {
  visited.set(start, true);
  onVisit(start);

  const neighbors = g.get(start) ?? [];
  for (const n of neighbors) {
    if (!visited.get(n)) dfsRecursive(g, n, visited, onVisit);
  }
}

/* ---------- iterative DFS (explicit stack) ---------- */
function dfsIterative(
  g: Graph,
  start: Vertex,
  onVisit: (v: Vertex) => void = () => {}
): void {
  const visited = initVisited(g);
  const stack: Vertex[] = [start];

  while (stack.length) {
    const v = stack.pop()!;
    if (visited.get(v)) continue;

    visited.set(v, true);
    onVisit(v);

    // push neighbours so that the *first* neighbour is processed last
    // (gives the same order as the recursive version).
    const neighbors = g.get(v) ?? [];
    for (let i = neighbors.length - 1; i >= 0; --i) {
      const n = neighbors[i];
      if (!visited.get(n)) stack.push(n);
    }
  }
}

/* ---------- demo ---------- */
if (require.main === module) {
  const g: Graph = new Map([
    ['A', ['B', 'C']],
    ['B', ['D', 'E']],
    ['C', ['F']],
    ['D', []],
    ['E', ['F']],
    ['F', []],
  ]);

  console.log('Recursive DFS order:');
  dfsRecursive(g, 'A', v => process.stdout.write(`${v} `));
  console.log('\nIterative DFS order:');
  dfsIterative(g, 'A', v => process.stdout.write(`${v} `));
}
npm i -g ts-node typescript
ts-node dfs.ts
Recursive DFS order:
A B D E F C 
Iterative DFS order:
A B D E F C 
