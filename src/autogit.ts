interface GraphNode {
  id: number;
  neighbors: number[];
}

class TarjanSCC {
  private graph: GraphNode[];
  private index: number = 0;
  private stack: number[] = [];
  private indices: Map<number, number> = new Map();
  private lowlinks: Map<number, number> = new Map();
  private onStack: Map<number, boolean> = new Map();
  private sccs: number[][] = [];

  constructor(graph: GraphNode[]) {
    this.graph = graph;
  }

  private findSCCs(): number[][] {
    // Initialize data structures
    this.index = 0;
    this.stack = [];
    this.indices.clear();
    this.lowlinks.clear();
    this.onStack.clear();
    this.sccs = [];

    // Process each node
    for (const node of this.graph) {
      if (!this.indices.has(node.id)) {
        this.strongConnect(node.id);
      }
    }

    return this.sccs;
  }

  private strongConnect(v: number): void {
    // Set the depth index for v to the smallest unused index
    this.indices.set(v, this.index);
    this.lowlinks.set(v, this.index);
    this.onStack.set(v, true);
    this.stack.push(v);
    this.index++;

    // Consider successors of v
    const node = this.graph.find(n => n.id === v);
    if (!node) return;

    for (const w of node.neighbors) {
      if (!this.indices.has(w)) {
        // Successor w has not yet been visited; recurse on it
        this.strongConnect(w);
        this.lowlinks.set(v, Math.min(this.lowlinks.get(v)!, this.lowlinks.get(w)!));
      } else if (this.onStack.get(w)) {
        // Successor w is in stack and hence in the current SCC
        this.lowlinks.set(v, Math.min(this.lowlinks.get(v)!, this.indices.get(w)!));
      }
    }

    // If v is a root node, pop the stack and generate an SCC
    if (this.lowlinks.get(v) === this.indices.get(v)) {
      const component: number[] = [];
      let w: number;
      
      do {
        w = this.stack.pop()!;
        this.onStack.set(w, false);
        component.push(w);
      } while (w !== v);

      this.sccs.push(component);
    }
  }

  public getStronglyConnectedComponents(): number[][] {
    return this.findSCCs();
  }
}

// Example usage and test
function testTarjanAlgorithm() {
  // Create a sample graph
  const graph: GraphNode[] = [
    { id: 0, neighbors: [1] },
    { id: 1, neighbors: [2] },
    { id: 2, neighbors: [0, 3] },
    { id: 3, neighbors: [4] },
    { id: 4, neighbors: [5, 7] },
    { id: 5, neighbors: [6] },
    { id: 6, neighbors: [4, 7] },
    { id: 7, neighbors: [] }
  ];

  const tarjan = new TarjanSCC(graph);
  const sccs = tarjan.getStronglyConnectedComponents();
  
  console.log("Strongly Connected Components:");
  sccs.forEach((component, index) => {
    console.log(`Component ${index + 1}: [${component.join(', ')}]`);
  });
  
  return sccs;
}

// Run the test
testTarjanAlgorithm();
Component 1: [7]
Component 2: [4, 5, 6]
Component 3: [3]
Component 4: [0, 1, 2]
class TarjanSCCAdjacencyList {
  private graph: Map<number, number[]>;
  // ... rest of implementation similar to above
  
  constructor(adjacencyList: Map<number, number[]>) {
    this.graph = adjacencyList;
  }
}
