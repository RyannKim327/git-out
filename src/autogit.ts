function dfsRecursive(
  graph: { [key: string]: string[] },
  node: string,
  visited: Set<string> = new Set()
) {
  if (visited.has(node)) return; // Already visited, escape

  visited.add(node);
  console.log(node); // Do something with the node, e.g., print

  for (const neighbor of graph[node]) {
    dfsRecursive(graph, neighbor, visited);
  }
}
const graph = {
  A: ["B", "C"],
  B: ["D", "E"],
  C: ["F"],
  D: [],
  E: ["F"],
  F: []
};

dfsRecursive(graph, "A");
function dfsIterative(graph: { [key: string]: string[] }, start: string) {
  const visited = new Set<string>();
  const stack = [start];

  while (stack.length > 0) {
    const node = stack.pop();
    if (!node || visited.has(node)) continue;

    visited.add(node);
    console.log(node);

    // Add neighbors to stack
    for (const neighbor of graph[node]) {
      if (!visited.has(neighbor)) {
        stack.push(neighbor);
      }
    }
  }
}
dfsIterative(graph, "A");
