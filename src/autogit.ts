// ------------- types -------------
export type NodeId = string | number;

/** Generic adjacency list. */
export type Graph = Map<NodeId, NodeId[]>;

/** Called when we first discover a node. */
export type EnterFn = (id: NodeId, depth: number) => void;
/** Called when we have finished all its descendants. */
export type ExitFn = (id: NodeId, depth: number) => void;

// ------------- DFS -------------
/**
 * Depth-first search (iterative).
 * @param graph   adjacency list
 * @param start   where to start (may be a single node or many)
 * @param enter   invoked when a node is first popped from stack
 * @param exit    invoked when a node is fully processed (back-track)
 * @param visited optional external Set to keep state across calls
 */
export function dfs(
  graph: Graph,
  start: NodeId | Iterable<NodeId>,
  enter?: EnterFn,
  exit?: ExitFn,
  visited = new Set<NodeId>()
): Set<NodeId> {
  // stack holds tuples: [nodeId, depth, isExiting]
  const stack: [NodeId, number, boolean][] = [];

  const enqueue = (id: NodeId, depth = 0) => {
    if (!visited.has(id)) {
      visited.add(id);
      stack.push([id, depth, false]);
    }
  };

  if (typeof start === "object" && typeof start[Symbol.iterator] === "function") {
    for (const s of start) enqueue(s);
  } else {
    enqueue(start as NodeId);
  }

  while (stack.length) {
    const [id, depth, isExiting] = stack.pop()!;
    if (isExiting) {
      exit?.(id, depth);
      continue;
    }
    enter?.(id, depth);
    // schedule exit callback
    stack.push([id, depth, true]);

    // push children in reverse order so that left-most is processed first
    const neighbors = graph.get(id) ?? [];
    for (let i = neighbors.length - 1; i >= 0; i--) {
      const n = neighbors[i];
      if (!visited.has(n)) enqueue(n, depth + 1);
    }
  }
  return visited;
}

// ------------- usage example -------------
if (import.meta.vitest) {
  const { test, expect } = import.meta.vitest;

  test("dfs on tree", () => {
    /*
        A
       / \
      B   C
     / \
    D   E
    */
    const g: Graph = new Map([
      ["A", ["B", "C"]],
      ["B", ["D", "E"]],
      ["C", []],
      ["D", []],
      ["E", []],
    ]);

    const pre: string[] = [];
    const post: string[] = [];
    dfs(
      g,
      "A",
      (id) => pre.push(id),
      (id) => post.push(id)
    );

    expect(pre).toEqual(["A", "B", "D", "E", "C"]);
    expect(post).toEqual(["D", "E", "B", "C", "A"]);
  });
}
