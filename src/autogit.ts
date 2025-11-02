interface GraphNode<T> {
  value: T;
  neighbors: GraphNode<T>[];
}

interface AdjacencyList<T> {
  [key: string]: T[];
}

type VisitedSet = Set<string | number>;
class Graph<T> {
  private adjacencyList: AdjacencyList<T>;

  constructor() {
    this.adjacencyList = {};
  }

  // Add vertex to graph
  addVertex(vertex: T): void {
    if (!this.adjacencyList[vertex as any]) {
      this.adjacencyList[vertex as any] = [];
    }
  }

  // Add edge between vertices
  addEdge(vertex1: T, vertex2: T): void {
    if (!this.adjacencyList[vertex1 as any]) {
      this.adjacencyList[vertex1 as any] = [];
    }
    if (!this.adjacencyList[vertex2 as any]) {
      this.adjacencyList[vertex2 as any] = [];
    }
    
    this.adjacencyList[vertex1 as any].push(vertex2);
    this.adjacencyList[vertex2 as any].push(vertex1); // For undirected graph
  }

  // Recursive DFS
  dfsRecursive(start: T, visited: VisitedSet = new Set()): T[] {
    const result: T[] = [];
    
    this._dfsRecursiveHelper(start, visited, result);
    return result;
  }

  private _dfsRecursiveHelper(
    vertex: T, 
    visited: VisitedSet, 
    result: T[]
  ): void {
    const vertexKey = vertex as any;
    
    // Mark current vertex as visited
    visited.add(vertexKey);
    result.push(vertex);

    // Visit all neighbors
    const neighbors = this.adjacencyList[vertexKey] || [];
    for (const neighbor of neighbors) {
      const neighborKey = neighbor as any;
      if (!visited.has(neighborKey)) {
        this._dfsRecursiveHelper(neighbor, visited, result);
      }
    }
  }
}
class IterativeGraph<T> {
  private adjacencyList: AdjacencyList<T>;

  constructor() {
    this.adjacencyList = {};
  }

  addVertex(vertex: T): void {
    if (!this.adjacencyList[vertex as any]) {
      this.adjacencyList[vertex as any] = [];
    }
  }

  addEdge(vertex1: T, vertex2: T): void {
    if (!this.adjacencyList[vertex1 as any]) {
      this.adjacencyList[vertex1 as any] = [];
    }
    if (!this.adjacencyList[vertex2 as any]) {
      this.adjacencyList[vertex2 as any] = [];
    }
    
    this.adjacencyList[vertex1 as any].push(vertex2);
    this.adjacencyList[vertex2 as any].push(vertex1); // For undirected graph
  }

  // Iterative DFS using stack
  dfsIterative(start: T): T[] {
    const stack: T[] = [start];
    const visited: VisitedSet = new Set();
    const result: T[] = [];

    while (stack.length > 0) {
      const current = stack.pop()!;
      const currentKey = current as any;

      if (!visited.has(currentKey)) {
        visited.add(currentKey);
        result.push(current);

        // Add unvisited neighbors to stack
        const neighbors = this.adjacencyList[currentKey] || [];
        for (const neighbor of neighbors.reverse()) { // Reverse to maintain DFS order
          const neighborKey = neighbor as any;
          if (!visited.has(neighborKey)) {
            stack.push(neighbor);
          }
        }
      }
    }

    return result;
  }
}
function depthFirstSearch<T>(
  startNode: T,
  getNeighbors: (node: T) => T[],
  visited: VisitedSet = new Set()
): T[] {
  const result: T[] = [];
  
  function dfsHelper(node: T): void {
    const nodeKey = node as any;
    
    if (visited.has(nodeKey)) {
      return;
    }
    
    visited.add(nodeKey);
    result.push(node);
    
    const neighbors = getNeighbors(node);
    for (const neighbor of neighbors) {
      dfsHelper(neighbor);
    }
  }
  
  dfsHelper(startNode);
  return result;
}

// Usage with custom graph structure
interface CustomNode {
  id: string;
  name: string;
  adjacent: string[];
}

function exampleCustomDFS() {
  const nodes: Record<string, CustomNode> = {
    A: { id: 'A', name: 'Node A', adjacent: ['B', 'C'] },
    B: { id: 'B', name: 'Node B', adjacent: ['D', 'E'] },
    C: { id: 'C', name: 'Node C', adjacent: ['F'] },
    D: { id: 'D', name: 'Node D', adjacent: [] },
    E: { id: 'E', name: 'Node E', adjacent: [] },
    F: { id: 'F', name: 'Node F', adjacent: [] }
  };

  const getNeighbors = (nodeId: string): string[] => {
    return nodes[nodeId]?.adjacent || [];
  };

  const visited = new Set<string>();
  const traversalOrder = depthFirstSearch('A', getNeighbors, visited);
  
  console.log('DFS Order:', traversalOrder); // ['A', 'B', 'D', 'E', 'C', 'F']
}
// Example usage
function main() {
  // Using the Graph class
  const graph = new Graph<string>();
  
  // Add vertices
  graph.addVertex('A');
  graph.addVertex('B');
  graph.addVertex('C');
  graph.addVertex('D');
  graph.addVertex('E');
  graph.addVertex('F');
  
  // Add edges (undirected graph)
  graph.addEdge('A', 'B');
  graph.addEdge('A', 'C');
  graph.addEdge('B', 'D');
  graph.addEdge('B', 'E');
  graph.addEdge('C', 'F');
  
  console.log('Recursive DFS from A:', graph.dfsRecursive('A'));
  // Output: ['A', 'B', 'D', 'E', 'C', 'F']
  
  // Using iterative approach
  const iterativeGraph = new IterativeGraph<string>();
  iterativeGraph.addVertex('A');
  iterativeGraph.addVertex('B');
  iterativeGraph.addVertex('C');
  iterativeGraph.addVertex('D');
  iterativeGraph.addVertex('E');
  iterativeGraph.addVertex('F');
  
  iterativeGraph.addEdge('A', 'B');
  iterativeGraph.addEdge('A', 'C');
  iterativeGraph.addEdge('B', 'D');
  iterativeGraph.addEdge('B', 'E');
  iterativeGraph.addEdge('C', 'F');
  
  console.log('Iterative DFS from A:', iterativeGraph.dfsIterative('A'));
  // Output: ['A', 'B', 'D', 'E', 'C', 'F']
}

main();
