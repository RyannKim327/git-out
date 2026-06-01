// ------------------------------------------------------------------
// 1️⃣  Graph representation (adjacency list)
// ------------------------------------------------------------------
type NodeID = string;  // or number – whatever uniquely identifies a node
interface Graph {
  // `edges[u]` is a list of all nodes directly reachable from `u`
  [key: string]: NodeID[];
}

// ------------------------------------------------------------------
// 2️⃣  Recursive DFS: useful for small‑to‑medium graphs
// ------------------------------------------------------------------
function dfsRecursive(
  graph: Graph,
  start: NodeID,
  target: NodeID,
  visited = new Set<NodeID>(),
  path: NodeID[] = []
): NodeID[] | null {
  visited.add(start);
  path.push(start);

  if (start === target) return [...path];        // found it – return a copy of the path

  for (const neighbor of graph[start] ?? []) {
    if (!visited.has(neighbor)) {
      const result = dfsRecursive(graph, neighbor, target, visited, path);
      if (result) return result;                 // propagate the found path upwards
    }
  }

  path.pop();                                     // backtrack
  return null;                                    // no path from this branch
}

// ------------------------------------------------------------------
// 3️⃣  Iterative DFS: safer for deep graphs or limited stack sizes
// ------------------------------------------------------------------
function dfsIterative(
  graph: Graph,
  start: NodeID,
  target: NodeID
): NodeID[] | null {
  const stack: { node: NodeID; parent: NodeID | null }[] = [{ node: start, parent: null }];
  const parentMap = new Map<NodeID, NodeID | null>();   // to rebuild the path once target is found
  const visited = new Set<NodeID>();

  while (stack.length) {
    const { node, parent } = stack.pop()!; // !! – stack is non‑empty here

    if (visited.has(node)) continue;
    visited.add(node);
    parentMap.set(node, parent);

    if (node === target) {
      // reconstruct path
      const path: NodeID[] = [];
      let current: NodeID | null = target;
      while (current !== null) {
        path.unshift(current);
        current = parentMap.get(current)!;
      }
      return path;
    }

    for (const neighbor of graph[node] ?? []) {
      if (!visited.has(neighbor)) {
        stack.push({ node: neighbor, parent: node });
      }
    }
  }

  return null;          // no path found
}

// ------------------------------------------------------------------
// 4️⃣  Example usage
// ------------------------------------------------------------------
const exampleGraph: Graph = {
  a: ["b", "c"],
  b: ["d", "e"],
  c: ["f"],
  d: [],
  e: ["f"],
  f: []
};

console.log(dfsRecursive(exampleGraph, "a", "f"));   // -> [ 'a', 'b', 'e', 'f' ]
console.log(dfsIterative(exampleGraph, "a", "f"));   // -> same path, may be different order
