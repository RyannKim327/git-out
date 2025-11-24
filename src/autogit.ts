// 1. Graph representation
type Graph = Record<string, string[]>; // adjacency list: vertex → neighbors

// -------------------------------------------------
// 2. Iterative DFS (stack)
// -------------------------------------------------
function dfsIterative(
  graph: Graph,
  start: string,
  onVisit: (v: string) => void
): void {
  const visited = new Set<string>();
  const stack: string[] = [start];

  while (stack.length) {
    const v = stack.pop()!;
    if (visited.has(v)) continue;

    visited.add(v);
    onVisit(v); // callback lets caller collect path, print, etc.

    // Push neighbors in reverse so that left-most is popped first
    const neighbors = graph[v] ?? [];
    for (let i = neighbors.length - 1; i >= 0; i--) {
      const n = neighbors[i];
      if (!visited.has(n)) stack.push(n);
    }
  }
}

// -------------------------------------------------
// 3. Recursive DFS
// -------------------------------------------------
function dfsRecursive(
  graph: Graph,
  start: string,
  visited = new Set<string>(),
  onVisit: (v: string) => void
): void {
  if (visited.has(start)) return;
  visited.add(start);
  onVisit(start);
  for (const n of graph[start] ?? []) {
    dfsRecursive(graph, n, visited, onVisit);
  }
}

// -------------------------------------------------
// 4. Quick sanity check
// -------------------------------------------------
if (import.meta.vitest === undefined) {
  const g: Graph = {
    A: ["B", "C"],
    B: ["D", "E"],
    C: ["F"],
    D: [],
    E: ["F"],
    F: [],
  };

  const order: string[] = [];
  dfsIterative(g, "A", v => order.push(v));
  console.log("Iterative DFS order:", order.join(" ")); // A B E F C D  (or similar depending on neighbor order)

  order.length = 0;
  dfsRecursive(g, "A", undefined, v => order.push(v));
  console.log("Recursive DFS order:", order.join(" "));
}
