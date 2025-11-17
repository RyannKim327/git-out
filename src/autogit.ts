interface Graph {
  [node: string]: string[];
}

function depthLimitedSearch(
  graph: Graph,
  start: string,
  target: string,
  depthLimit: number
): boolean {
  return dlsRecursive(graph, start, target, depthLimit, new Set<string>());
}

function dlsRecursive(
  graph: Graph,
  current: string,
  target: string,
  remainingDepth: number,
  visited: Set<string>
): boolean {
  // Base case: found the target
  if (current === target) {
    return true;
  }

  // Base case: depth limit reached
  if (remainingDepth === 0) {
    return false;
  }

  visited.add(current);

  // Explore neighbors
  for (const neighbor of graph[current] || []) {
    if (!visited.has(neighbor)) {
      const found = dlsRecursive(
        graph,
        neighbor,
        target,
        remainingDepth - 1,
        visited
      );
      if (found) {
        return true;
      }
    }
  }

  visited.delete(current);
  return false;
}
interface SearchResult {
  found: boolean;
  path: string[];
}

function depthLimitedSearchWithPath(
  graph: Graph,
  start: string,
  target: string,
  depthLimit: number
): SearchResult {
  const visited = new Set<string>();
  const path: string[] = [start];
  
  const result = dlsRecursiveWithPath(
    graph,
    start,
    target,
    depthLimit,
    visited,
    path
  );
  
  return {
    found: result,
    path: result ? path : []
  };
}

function dlsRecursiveWithPath(
  graph: Graph,
  current: string,
  target: string,
  remainingDepth: number,
  visited: Set<string>,
  path: string[]
): boolean {
  if (current === target) {
    return true;
  }

  if (remainingDepth === 0) {
    return false;
  }

  visited.add(current);

  for (const neighbor of graph[current] || []) {
    if (!visited.has(neighbor)) {
      path.push(neighbor);
      
      const found = dlsRecursiveWithPath(
        graph,
        neighbor,
        target,
        remainingDepth - 1,
        visited,
        path
      );
      
      if (found) {
        return true;
      }
      
      path.pop();
    }
  }

  visited.delete(current);
  return false;
}
// Example graph
const graph: Graph = {
  'A': ['B', 'C'],
  'B': ['D', 'E'],
  'C': ['F'],
  'D': ['G'],
  'E': ['H'],
  'F': ['I'],
  'G': [],
  'H': [],
  'I': []
};

// Example usage
const result1 = depthLimitedSearch(graph, 'A', 'G', 3);
console.log('Found with depth limit 3:', result1); // true

const result2 = depthLimitedSearch(graph, 'A', 'G', 2);
console.log('Found with depth limit 2:', result2); // false

const result3 = depthLimitedSearchWithPath(graph, 'A', 'G', 3);
console.log('Path found:', result3); // { found: true, path: ['A', 'B', 'D', 'G'] }
function iterativeDepthLimitedSearch(
  graph: Graph,
  start: string,
  target: string,
  depthLimit: number
): boolean {
  const stack: { node: string; depth: number }[] = [{ node: start, depth: 0 }];
  const visited = new Set<string>();

  while (stack.length > 0) {
    const { node, depth } = stack.pop()!;

    if (node === target) {
      return true;
    }

    if (depth >= depthLimit) {
      continue;
    }

    if (!visited.has(node)) {
      visited.add(node);
      
      for (const neighbor of graph[node] || []) {
        stack.push({ node: neighbor, depth: depth + 1 });
      }
    }
  }

  return false;
}
// Check if a path exists within depth limit
function isReachableWithinDepth(
  graph: Graph,
  start: string,
  target: string,
  depthLimit: number
): boolean {
  return depthLimitedSearch(graph, start, target, depthLimit);
}

// Find all nodes reachable within depth limit
function findReachableNodes(
  graph: Graph,
  start: string,
  depthLimit: number
): string[] {
  const reachable: string[] = [];
  const visited = new Set<string>();
  
  function dfs(current: string, depth: number) {
    if (depth > depthLimit) return;
    
    reachable.push(current);
    visited.add(current);
    
    for (const neighbor of graph[current] || []) {
      if (!visited.has(neighbor)) {
        dfs(neighbor, depth + 1);
      }
    }
  }
  
  dfs(start, 0);
  return reachable;
}
