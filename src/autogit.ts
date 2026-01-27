type Node = string | number;              // whichever you prefer for vertex IDs
type Graph = Record<Node, Node[]>;          // e.g., { 1: [2,3], 2: [4], … }

const graph: Graph = {
  a: ['b', 'c'],
  b: ['d', 'e'],
  c: ['f'],
  d: [],
  e: ['c'],
  f: [],
};
function dfsRecursive(
  graph: Graph,
  start: Node,
  visited = new Set<Node>(),
  order: Node[] = []
): Node[] {
  visited.add(start);        // 1️⃣ mark as visited
  order.push(start);         // 2️⃣ record the visit order

  for (const neighbor of graph[start] ?? []) {
    if (!visited.has(neighbor)) {
      dfsRecursive(graph, neighbor, visited, order); // 3️⃣ recurse
    }
  }
  return order;
}

// usage
const visitOrder = dfsRecursive(graph, 'a');
console.log(visitOrder); // ['a', 'b', 'd', 'e', 'c', 'f']
function dfsIterative(graph: Graph, start: Node): Node[] {
  const stack: Node[] = [start];
  const visited = new Set<Node>();
  const order: Node[] = [];

  while (stack.length) {
    const node = stack.pop()!; // pop the top
    if (visited.has(node)) continue; // skip if we've already seen it

    visited.add(node);   // 1️⃣ mark
    order.push(node);    // 2️⃣ record

    // push neighbors in reverse order so that the first neighbor
    // is processed first (mimics recursive order)
    const neighbors = graph[node] ?? [];
    for (let i = neighbors.length - 1; i >= 0; i--) {
      const neighbor = neighbors[i];
      if (!visited.has(neighbor)) stack.push(neighbor);
    }
  }
  return order;
}

// usage
const orderIter = dfsIterative(graph, 'a');
console.log(orderIter); // ['a', 'b', 'd', 'e', 'c', 'f']
// inside the while loop
const prev = stack[stack.length - 1]; // last node that will lead to `node`
order.push([prev, node] as [Node, Node]);
