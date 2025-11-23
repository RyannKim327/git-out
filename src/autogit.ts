interface Graph {
  adjacencyList: number[][];
}

class TarjanSCC {
  private graph: Graph;
  private index: number;
  private stack: number[];
  private indices: number[];
  private lowlinks: number[];
  private onStack: boolean[];
  private sccs: number[][];

  constructor(graph: Graph) {
    this.graph = graph;
    this.index = 0;
    this.stack = [];
    this.indices = Array(graph.adjacencyList.length).fill(-1);
    this.lowlinks = Array(graph.adjacencyList.length).fill(-1);
    this.onStack = Array(graph.adjacencyList.length).fill(false);
    this.sccs = [];
  }

  public findSCCs(): number[][] {
    const n = this.graph.adjacencyList.length;
    
    for (let i = 0; i < n; i++) {
      if (this.indices[i] === -1) {
        this.strongConnect(i);
      }
    }
    
    return this.sccs;
  }

  private strongConnect(v: number): void {
    this.indices[v] = this.index;
    this.lowlinks[v] = this.index;
    this.index++;
    this.stack.push(v);
    this.onStack[v] = true;

    // Consider all neighbors of v
    for (const w of this.graph.adjacencyList[v]) {
      if (this.indices[w] === -1) {
        // Successor w has not yet been visited; recurse on it
        this.strongConnect(w);
        this.lowlinks[v] = Math.min(this.lowlinks[v], this.lowlinks[w]);
      } else if (this.onStack[w]) {
        // Successor w is in stack and hence in the current SCC
        this.lowlinks[v] = Math.min(this.lowlinks[v], this.indices[w]);
      }
    }

    // If v is a root node, pop the stack and generate an SCC
    if (this.lowlinks[v] === this.indices[v]) {
      const component: number[] = [];
      let w: number;
      
      do {
        w = this.stack.pop()!;
        this.onStack[w] = false;
        component.push(w);
      } while (w !== v);
      
      this.sccs.push(component);
    }
  }
}

// Example usage and test
function main() {
  // Create a graph with 8 nodes (0-7)
  const graph: Graph = {
    adjacencyList: [
      [1],           // Node 0 -> 1
      [2, 4, 5],     // Node 1 -> 2, 4, 5
      [3, 6],        // Node 2 -> 3, 6
      [2, 7],        // Node 3 -> 2, 7
      [0, 5],        // Node 4 -> 0, 5
      [6],           // Node 5 -> 6
      [5],           // Node 6 -> 5
      [3, 6]         // Node 7 -> 3, 6
    ]
  };

  const tarjan = new TarjanSCC(graph);
  const sccs = tarjan.findSCCs();
  
  console.log("Strongly Connected Components:");
  sccs.forEach((component, index) => {
    console.log(`Component ${index + 1}: [${component.join(', ')}]`);
  });
}

// Run the example
main();
type Graph = {
  nodes: number;
  edges: number[][];
  adjacencyList: number[][];
};

class TarjanAlgorithm {
  private index: number = 0;
  private stack: number[] = [];
  private indices: number[];
  private lowlinks: number[];
  private onStack: boolean[];
  private sccs: number[][] = [];

  constructor(private graph: Graph) {
    this.indices = Array(graph.nodes).fill(-1);
    this.lowlinks = Array(graph.nodes).fill(-1);
    this.onStack = Array(graph.nodes).fill(false);
  }

  findStronglyConnectedComponents(): number[][] {
    for (let i = 0; i < this.graph.nodes; i++) {
      if (this.indices[i] === -1) {
        this.strongConnect(i);
      }
    }
    return this.sccs;
  }

  private strongConnect(node: number): void {
    this.indices[node] = this.index;
    this.lowlinks[node] = this.index;
    this.index++;
    this.stack.push(node);
    this.onStack[node] = true;

    for (const neighbor of this.graph.adjacencyList[node]) {
      if (this.indices[neighbor] === -1) {
        this.strongConnect(neighbor);
        this.lowlinks[node] = Math.min(
          this.lowlinks[node],
          this.lowlinks[neighbor]
        );
      } else if (this.onStack[neighbor]) {
        this.lowlinks[node] = Math.min(
          this.lowlinks[node],
          this.indices[neighbor]
        );
      }
    }

    if (this.lowlinks[node] === this.indices[node]) {
      const component: number[] = [];
      let topNode: number;

      do {
        topNode = this.stack.pop()!;
        this.onStack[topNode] = false;
        component.push(topNode);
      } while (topNode !== node);

      this.sccs.push(component);
    }
  }
}

// Utility functions
function createGraphFromEdges(nodes: number, edges: number[][]): Graph {
  const adjacencyList: number[][] = Array(nodes)
    .fill(0)
    .map(() => []);

  for (const [from, to] of edges) {
    adjacencyList[from].push(to);
  }

  return {
    nodes,
    edges,
    adjacencyList
  };
}

function createGraphFromAdjacencyList(adjacencyList: number[][]): Graph {
  return {
    nodes: adjacencyList.length,
    edges: [],
    adjacencyList
  };
}

// Example usage
const exampleGraph = createGraphFromAdjacencyList([
  [1],           // 0 -> 1
  [2, 4, 5],     // 1 -> 2, 4, 5
  [3, 6],        // 2 -> 3, 6
  [2, 7],        // 3 -> 2, 7
  [0, 5],        // 4 -> 0, 5
  [6],           // 5 -> 6
  [5],           // 6 -> 5
  [3, 6]         // 7 -> 3, 6
]);

const tarjan = new TarjanAlgorithm(exampleGraph);
const components = tarjan.findStronglyConnectedComponents();

console.log("Strongly Connected Components found:");
components.forEach((component, i) => {
  console.log(`Component ${i + 1}: [${component.join(', ')}]`);
});
Strongly Connected Components found:
Component 1: [5, 6]
Component 2: [7, 3, 2]
Component 3: [4, 1, 0]
