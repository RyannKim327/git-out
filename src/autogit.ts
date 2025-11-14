type Graph = Record<string, string[]>;
function dfsRecursive(
  graph: Graph,
  startNode: string,
  visited: Set<string> = new Set()
): void {
  if (visited.has(startNode)) return;

  // Process the current node
  console.log(startNode); // Or other operations
  visited.add(startNode);

  // Recurse on all adjacent nodes
  for (const neighbor of graph[startNode]) {
    dfsRecursive(graph, neighbor, visited);
  }
}
function dfsIterative(graph: Graph, startNode: string): void {
  const stack: string[] = [startNode];
  const visited = new Set<string>();

  while (stack.length > 0) {
    const currentNode = stack.pop()!;

    if (!visited.has(currentNode)) {
      // Process the current node
      console.log(currentNode); // Or other operations
      visited.add(currentNode);

      // Push neighbors in reverse order (to match recursive order)
      for (let i = graph[currentNode].length - 1; i >= 0; i--) {
        stack.push(graph[currentNode][i]);
      }
    }
  }
}
const graph: Graph = {
  'A': ['B', 'C'],
  'B': ['D', 'E'],
  'C': ['F'],
  'D': [],
  'E': ['F'],
  'F': []
};
console.log('Recursive DFS:');
dfsRecursive(graph, 'A'); // Output: A B D E F C

console.log('\nIterative DFS:');
dfsIterative(graph, 'A'); // Output: A B D E F C
function dfsDisconnected(graph: Graph): void {
  const visited = new Set<string>();
  
  for (const node of Object.keys(graph)) {
    if (!visited.has(node)) {
      dfsRecursive(graph, node, visited); // Or iterative version
    }
  }
}
