interface Graph<T> {
  [key: string]: T[];
}

function bfs<T>(graph: Graph<T>, startNode: T): T[] {
  const visited: Set<T> = new Set();
  const result: T[] = [];
  const queue: T[] = [startNode];
  
  visited.add(startNode);

  while (queue.length > 0) {
    const currentNode = queue.shift()!;
    result.push(currentNode);

    const neighbors = graph[currentNode as unknown as string] || [];
    
    for (const neighbor of neighbors) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
      }
    }
  }

  return result;
}
interface GraphNode<T> {
  value: T;
  neighbors: GraphNode<T>[];
}

class Graph<T> {
  private nodes: Map<T, GraphNode<T>> = new Map();

  addNode(value: T): GraphNode<T> {
    const node: GraphNode<T> = { value, neighbors: [] };
    this.nodes.set(value, node);
    return node;
  }

  addEdge(source: T, destination: T): void {
    const sourceNode = this.nodes.get(source);
    const destNode = this.nodes.get(destination);
    
    if (sourceNode && destNode) {
      sourceNode.neighbors.push(destNode);
    }
  }

  bfs(startValue: T): T[] {
    const startNode = this.nodes.get(startValue);
    if (!startNode) return [];

    const visited: Set<T> = new Set();
    const result: T[] = [];
    const queue: GraphNode<T>[] = [startNode];
    
    visited.add(startValue);

    while (queue.length > 0) {
      const currentNode = queue.shift()!;
      result.push(currentNode.value);

      for (const neighbor of currentNode.neighbors) {
        if (!visited.has(neighbor.value)) {
          visited.add(neighbor.value);
          queue.push(neighbor);
        }
      }
    }

    return result;
  }
}
interface BFSResult<T> {
  traversal: T[];
  distances: Map<T, number>;
  predecessors: Map<T, T | null>;
}

function bfsWithPath<T>(
  graph: Map<T, T[]>, 
  startNode: T
): BFSResult<T> {
  const visited: Set<T> = new Set();
  const traversal: T[] = [];
  const distances: Map<T, number> = new Map();
  const predecessors: Map<T, T | null> = new Map();
  const queue: T[] = [startNode];

  visited.add(startNode);
  distances.set(startNode, 0);
  predecessors.set(startNode, null);

  while (queue.length > 0) {
    const currentNode = queue.shift()!;
    traversal.push(currentNode);

    const neighbors = graph.get(currentNode) || [];
    
    for (const neighbor of neighbors) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        distances.set(neighbor, distances.get(currentNode)! + 1);
        predecessors.set(neighbor, currentNode);
        queue.push(neighbor);
      }
    }
  }

  return { traversal, distances, predecessors };
}

function getShortestPath<T>(
  predecessors: Map<T, T | null>, 
  target: T
): T[] {
  const path: T[] = [];
  let current: T | null = target;
  
  while (current !== null) {
    path.unshift(current);
    current = predecessors.get(current) ?? null;
  }
  
  return path;
}
// Example usage
const graph = new Map<string, string[]>([
  ['A', ['B', 'C']],
  ['B', ['D', 'E']],
  ['C', ['F']],
  ['D', []],
  ['E', ['F']],
  ['F', []]
]);

// Basic BFS
const traversal = bfs(graph, 'A');
console.log('BFS Traversal:', traversal); // ['A', 'B', 'C', 'D', 'E', 'F']

// BFS with path tracking
const result = bfsWithPath(graph, 'A');
console.log('Traversal:', result.traversal);
console.log('Distances:', result.distances);
console.log('Shortest path to F:', getShortestPath(result.predecessors, 'F'));

// Using the Graph class
const typedGraph = new Graph<string>();
typedGraph.addNode('A');
typedGraph.addNode('B');
typedGraph.addNode('C');
typedGraph.addNode('D');
typedGraph.addNode('E');
typedGraph.addNode('F');

typedGraph.addEdge('A', 'B');
typedGraph.addEdge('A', 'C');
typedGraph.addEdge('B', 'D');
typedGraph.addEdge('B', 'E');
typedGraph.addEdge('C', 'F');
typedGraph.addEdge('E', 'F');

const typedTraversal = typedGraph.bfs('A');
console.log('Typed Graph BFS:', typedTraversal);
