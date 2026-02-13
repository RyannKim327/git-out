/**
 * Simple representation of a DAG.
 *   vertices – an array of node identifiers (any type, but usually string or number)
 *   edges    – a map from a vertex to a list of outgoing neighbours
 */
interface Graph<V> {
  vertices: V[];
  edges: Map<V, V[]>;
}

/**
 * Kahn’s topological sort.
 * @param graph – a DAG
 * @returns a list of vertices sorted topologically
 * @throws Error if the graph contains a cycle
 */
function topologicalSort<V>(graph: Graph<V>): V[] {
  // Compute indegree of each vertex
  const indegree = new Map<V, number>();
  graph.vertices.forEach(v => indegree.set(v, 0));

  graph.edges.forEach((neighbours, from) => {
    neighbours.forEach(to => {
      indegree.set(to, (indegree.get(to) || 0) + 1);
    });
  });

  // Queue of vertices with indegree 0
  const queue: V[] = [];
  indegree.forEach((deg, v) => {
    if (deg === 0) queue.push(v);
  });

  const order: V[] = [];
  while (queue.length) {
    const v = queue.shift()!;
    order.push(v);

    const neighbours = graph.edges.get(v) ?? [];
    neighbours.forEach(to => {
      indegree.set(to, (indegree.get(to) || 0) - 1);
      if (indegree.get(to) === 0) queue.push(to);
    });
  }

  // If we processed fewer vertices than exist, a cycle is present
  if (order.length !== graph.vertices.length) {
    throw new Error('Graph contains a cycle – topological sort not possible');
  }

  return order;
}
A → C
B → C
C → D
const g: Graph<string> = {
  vertices: ['A', 'B', 'C', 'D'],
  edges: new Map([
    ['A', ['C']],
    ['B', ['C']],
    ['C', ['D']],
    // D has no outgoing edges
  ]),
};

console.log(topologicalSort(g)); // → ['A', 'B', 'C', 'D'] (or ['B', 'A', 'C', 'D'])
function topologicalSortDFS<V>(graph: Graph<V>): V[] {
  const visited = new Set<V>();
  const temp = new Set<V>();          // to detect cycles
  const stack: V[] = [];

  function visit(v: V) {
    if (temp.has(v)) throw new Error('Cycle detected');
    if (visited.has(v)) return;

    temp.add(v);
    (graph.edges.get(v) ?? []).forEach(visit);
    temp.delete(v);
    visited.add(v);
    stack.push(v);                    // push after children – this yields reverse order
  }

  graph.vertices.forEach(visit);
  return stack.reverse();             // reverse to get the correct order
}
