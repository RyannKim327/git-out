interface GraphNode {
  id: number;
  neighbors: number[];
}

class TarjanSCC {
  private graph: GraphNode[];
  private index: number;
  private stack: number[];
  private indices: Map<number, number>;
  private lowlinks: Map<number, number>;
  private onStack: Map<number, boolean>;
  private sccs: number[][];

  constructor(graph: GraphNode[]) {
    this.graph = graph;
    this.index = 0;
    this.stack = [];
    this.indices = new Map();
    this.lowlinks = new Map();
    this.onStack = new Map();
    this.sccs = [];
  }

  /**
   * Find strongly connected components using Tarjan's algorithm
   */
  public findSCCs(): number[][] {
    // Initialize data structures
    this.graph.forEach(node => {
      this.indices.set(node.id, -1);
      this.lowlinks.set(node.id, -1);
      this.onStack.set(node.id, false);
    });

    // Perform DFS for each unvisited node
    this.graph.forEach(node => {
      if (this.indices.get(node.id) === -1) {
        this.strongConnect(node.id);
      }
    });

    return this.sccs;
  }

  /**
   * Recursive DFS function for Tarjan's algorithm
   */
  private strongConnect(v: number): void {
    // Set the depth index for v to the smallest unused index
    this.indices.set(v, this.index);
    this.lowlinks.set(v, this.index);
    this.index++;
    this.stack.push(v);
    this.onStack.set(v, true);

    // Consider successors of v
    const currentNode = this.graph.find(node => node.id === v);
    if (!currentNode) return;

    for (const neighborId of currentNode.neighbors) {
      const w = neighborId;

      if (this.indices.get(w) === -1) {
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

  /**
   * Get the condensed DAG (Directed Acyclic Graph) of SCCs
   */
  public getCondensedGraph(): { nodes: number[][]; edges: [number, number][] } {
    const sccMap = new Map<number, number>();
    
    // Map each node to its SCC index
    this.sccs.forEach((scc, index) => {
      scc.forEach(node => {
        sccMap.set(node, index);
      });
    });

    const edges: [number, number][] = [];
    const addedEdges = new Set<string>();

    // Find edges between different SCCs
    this.graph.forEach(node => {
      const sourceScc = sccMap.get(node.id);
      
      node.neighbors.forEach(neighbor => {
        const targetScc = sccMap.get(neighbor);
        
        if (sourceScc !== undefined && targetScc !== undefined && 
            sourceScc !== targetScc) {
          const edgeKey = `${sourceScc}-${targetScc}`;
          
          if (!addedEdges.has(edgeKey)) {
            edges.push([sourceScc, targetScc]);
            addedEdges.add(edgeKey);
          }
        }
      });
    });

    return {
      nodes: this.sccs,
      edges
    };
  }
}

// Example usage and test cases
function testTarjanAlgorithm(): void {
  // Example graph from Wikipedia
  const graph: GraphNode[] = [
    { id: 0, neighbors: [1] },
    { id: 1, neighbors: [2, 3] },
    { id: 2, neighbors: [0, 4] },
    { id: 3, neighbors: [4] },
    { id: 4, neighbors: [5] },
    { id: 5, neighbors: [3] },
    { id: 6, neighbors: [5, 7] },
    { id: 7, neighbors: [6] },
    { id: 8, neighbors: [7, 8] }
  ];

  const tarjan = new TarjanSCC(graph);
  const sccs = tarjan.findSCCs();
  
  console.log("Strongly Connected Components:");
  sccs.forEach((scc, index) => {
    console.log(`SCC ${index + 1}: [${scc.join(', ')}]`);
  });

  // Get condensed graph
  const condensed = tarjan.getCondensedGraph();
  console.log("\nCondensed Graph:");
  console.log("Nodes:", condensed.nodes);
  console.log("Edges:", condensed.edges);
}

// Run the test
testTarjanAlgorithm();
class Graph {
  private nodes: Map<number, GraphNode>;
  
  constructor() {
    this.nodes = new Map();
  }
  
  addNode(id: number, neighbors: number[] = []): void {
    this.nodes.set(id, { id, neighbors });
  }
  
  getNode(id: number): GraphNode | undefined {
    return this.nodes.get(id);
  }
  
  getAllNodes(): GraphNode[] {
    return Array.from(this.nodes.values());
  }
}

class TarjanSCCFinder {
  static findSCCs(graph: Graph): number[][] {
    const tarjan = new TarjanSCC(graph.getAllNodes());
    return tarjan.findSCCs();
  }
}

// Usage example
const graph = new Graph();
graph.addNode(0, [1]);
graph.addNode(1, [2, 3]);
graph.addNode(2, [0, 4]);
graph.addNode(3, [4]);
graph.addNode(4, [5]);
graph.addNode(5, [3]);
graph.addNode(6, [5, 7]);
graph.addNode(7, [6]);
graph.addNode(8, [7, 8]);

const sccs = TarjanSCCFinder.findSCCs(graph);
console.log("SCCs:", sccs);
