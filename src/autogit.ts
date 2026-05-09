/**
 * A directed graph represented by an adjacency list.
 * Each node is identified by a string (you can swap to number / symbol if you want).
 */
type Graph = Record<string, string[]>;

/**
 * Returns an array of nodes in a topological order.
 *
 * Throws if the graph contains a cycle (i.e. cannot be sorted).
 */
export function topologicalSort(graph: Graph): string[] {
  // 1. Compute indegree for every node.
  const indegree: Record<string, number> = {};
  const nodes: string[] = Object.keys(graph);

  nodes.forEach(node => (indegree[node] = 0));

  nodes.forEach(node =>
    graph[node].forEach(neighbor => {
      if (indegree[neighbor] === undefined) {
        indegree[neighbor] = 0; // in case a node has no outgoing edges but appears as a target
      }
      indegree[neighbor] += 1;
    })
  );

  // 2. Start with all nodes that have indegree 0.
  const queue: string[] = nodes.filter(node => indegree[node] === 0);
  const order: string[] = [];

  // 3. Repeatedly take a node out of the queue,
  //    append it to order, and subtract 1 from
  //    the indegree of each of its neighbours.
  while (queue.length > 0) {
    const current = queue.shift() as string; // safe because we know queue isn't empty
    order.push(current);

    graph[current].forEach(next => {
      indegree[next] -= 1;
      if (indegree[next] === 0) {
        queue.push(next);
      }
    });
  }

  // 4. If we were able to visit every node, the graph is a DAG.
  if (order.length !== Object.keys(indegree).length) {
    throw new Error('Graph has at least one cycle – topological sort impossible');
  }

  return order;
}
const sampleGraph: Graph = {
  a: ['b', 'c'],
  b: ['d'],
  c: ['d'],
  d: [],          // d has no outgoing edges
  e: ['a', 'f'],  // e is another root
  f: []
};

console.log(topologicalSort(sampleGraph));
// → [ 'e', 'a', 'b', 'c', 'd', 'f' ]  (one valid topological ordering)
