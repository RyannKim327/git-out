/**
 * A very small, self‑contained topological‑sort utility.
 *
 * Users should supply a directed graph in adjacency‑list form:
 *
 *   const g = new Map<string, Set<string>>();
 *   g.set('A', new Set(['B', 'C']));
 *   g.set('B', new Set(['D']));
 *   g.set('C', new Set(['D']));
 *   g.set('D', new Set());
 *
 * Call `topologicalSort(g)` and receive an array in an order that
 * satisfies all dependencies. If a cycle is detected the function
 * throws an Error describing the nodes that loop.
 */

type Graph<ID> = Map<ID, Set<ID>>;

/**
 * Detects a directed cycle in a graph by trying a Kahn‑style removal.
 */
function topologicalSort<ID>(graph: Graph<ID>): ID[] {
  // 1. Make a copy of indegree counts
  const indegree = new Map<ID, number>();

  // Walk the graph once to count in‑edges
  for (const [node, edges] of graph.entries()) {
    // Ensure every node in the map has an indegree entry
    if (!indegree.has(node)) indegree.set(node, 0);
    for (const neigh of edges) {
      indegree.set(neigh, (indegree.get(neigh) ?? 0) + 1);
      // If neighbour hasn't appeared as a key yet, make sure it has a set entry
      if (!graph.has(neigh) && !indegree.has(neigh)) indegree.set(neigh, 0);
    }
  }

  // 2. Queue of nodes with no incoming edges
  const queue: ID[] = [];
  for (const [node, num] of indegree.entries())
    if (num === 0) queue.push(node);

  const result: ID[] = [];

  // 3. Repeatedly pop a zero‑in‑degree node, append to result
  //    and “remove” its outgoing edges
  while (queue.length) {
    const node = queue.shift()!;
    result.push(node);

    const outgoing = graph.get(node) ?? new Set();
    for (const neigh of outgoing) {
      // decrement indegree; if it goes to 0 push to queue
      const newIndeg = (indegree.get(neigh) ?? 0) - 1;
      indegree.set(neigh, newIndeg);
      if (newIndeg === 0) queue.push(neigh);
    }
  }

  // 4. If we didn't visit all nodes → a cycle exists
  if (result.length !== indegree.size) {
    const cycleNodes = [...indegree.keys()].filter(n => !result.includes(n));
    throw new Error(
      `Graph has a cycle involving ${cycleNodes.map(String).join(', ')}`,
    );
  }

  return result;
}

/* ---------- demo ---------- */
const example = new Map<string, Set<string>>([
  ['A', new Set(['B', 'C'])],
  ['B', new Set(['D'])],
  ['C', new Set(['D'])],
  ['D', new Set()],
]);

console.log(topologicalSort(example)); // → ['A', 'B', 'C', 'D'] or ['A', 'C', 'B', 'D'], etc.
