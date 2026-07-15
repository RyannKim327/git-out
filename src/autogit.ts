// Graph type: map from vertex id → array of neighbouring vertex ids
type Graph = Record<string | number, Array<string | number>>;
function dfsRecursive(
  graph: Graph,
  start: string | number,
  visited = new Set<string | number>()
): string[] {
  // If the node has already been visited, stop here.
  if (visited.has(start)) return [];

  visited.add(start);           // Mark the node
  const result = [start];        // The order in which we visit

  // Recurse on all neighbours that haven't been visited yet
  for (const neighbour of graph[start] || []) {
    if (!visited.has(neighbour)) {
      result.push(...dfsRecursive(graph, neighbour, visited));
    }
  }

  return result;
}
function dfsIterative(graph: Graph, start: string | number): string[] {
  const visited = new Set<string | number>();
  const stack: (string | number)[] = [start];
  const order: string[] = [];

  while (stack.length) {
    const v = stack.pop()!;           // Grab the vertex on top of the stack
    if (visited.has(v)) continue;     // Skip if we already processed it
    visited.add(v);                    // Mark as visited
    order.push(v);                     // Record visitation order

    // Push neighbours onto the stack (in reverse order if you want a specific order)
    const neighbours = graph[v] || [];
    for (let i = neighbours.length - 1; i >= 0; i--) {
      if (!visited.has(neighbours[i])) {
        stack.push(neighbours[i]);
      }
    }
  }

  return order;
}
const graph: Graph = {
  a: ['b', 'c'],
  b: ['d', 'e'],
  c: ['f'],
  d: [],
  e: [],
  f: []
};

console.log('Recursive:', dfsRecursive(graph, 'a'));   // e.g.: [ 'a', 'b', 'd', 'e', 'c', 'f' ]
console.log('Iterative:', dfsIterative(graph, 'a'));   // e.g.: [ 'a', 'c', 'f', 'b', 'e', 'd' ]
