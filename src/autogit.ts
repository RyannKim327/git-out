// graph.ts
export type Graph = Record<string, string[]>;

/**
 * Depth-first search (iterative version to avoid stack-overflow on deep graphs).
 * Returns the order in which vertices were first discovered.
 * If `start` is omitted, every component is visited.
 */
export function dfs(
  graph: Graph,
  start?: string,
  onVisit?: (v: string) => void
): string[] {
  const visited = new Set<string>();
  const order: string[] = [];

  const visit = (v: string) => {
    if (visited.has(v)) return;
    visited.add(v);
    order.push(v);
    onVisit?.(v);
  };

  const stack: string[] = [];

  const push = (v: string) => {
    if (!visited.has(v)) stack.push(v);
  };

  // Single-component DFS
  if (start !== undefined) {
    push(start);
    while (stack.length) {
      const cur = stack.pop()!;
      if (visited.has(cur)) continue; // skip if already handled via another path
      visit(cur);
      // Push neighbours in reverse so that left-most is popped first
      const neighbours = graph[cur] ?? [];
      for (let i = neighbours.length - 1; i >= 0; i--) push(neighbours[i]);
    }
    return order;
  }

  // Full-graph DFS (all components)
  for (const v of Object.keys(graph)) push(v);
  while (stack.length) {
    const cur = stack.pop()!;
    if (visited.has(cur)) continue;
    visit(cur);
    const neighbours = graph[cur] ?? [];
    for (let i = neighbours.length - 1; i >= 0; i--) push(neighbours[i]);
  }
  return order;
}

/* ---------- Usage example ---------- */
if (import.meta.vitest) {
  const { test, expect } = import.meta.vitest;

  test('dfs', () => {
    const g: Graph = {
      A: ['B', 'C'],
      B: ['D', 'E'],
      C: ['F'],
      D: [],
      E: ['F'],
      F: [],
    };

    expect(dfs(g, 'A')).toEqual(['A', 'B', 'D', 'E', 'F', 'C']);
    expect(dfs(g)).toEqual(['A', 'B', 'D', 'E', 'F', 'C']); // order may differ
  });
}
