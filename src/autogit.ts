type Graph = Record<string, string[]>;
function dfsRecursive(
  graph: Graph,
  startNode: string,
  callback: (node: string) => void
): void {
  const visited = new Set<string>();

  function dfs(node: string) {
    if (!visited.has(node)) {
      visited.add(node);
      callback(node);
      graph[node]?.forEach(neighbor => dfs(neighbor));
    }
  }

  dfs(startNode);
}
function dfsIterative(
  graph: Graph,
  startNode: string,
  callback: (node: string) => void
): void {
  const stack: string[] = [startNode];
  const visited = new Set<string>();

  while (stack.length > 0) {
    const node = stack.pop()!;
    
    if (!visited.has(node)) {
      visited.add(node);
      callback(node);
      
      // Push neighbors in reverse order to match recursive order
      const neighbors = graph[node] || [];
      for (let i = neighbors.length - 1; i >= 0; i--) {
        if (!visited.has(neighbors[i])) {
          stack.push(neighbors[i]);
        }
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

// Using recursive DFS
dfsRecursive(graph, 'A', (node) => console.log(node));
// Output: A, B, D, E, F, C

// Using iterative DFS
dfsIterative(graph, 'A', (node) => console.log(node));
// Output: A, B, D, E, F, C
