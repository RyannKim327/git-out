export interface GraphNode {
  id: number;
  neighbors: number[];
}

export class TarjanSCC {
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

  /**
   * Find all strongly connected components in the graph
   */
  public findSCCs(): number[][] {
    this.reset();
    
    // Initialize maps for all nodes
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

    // Consider all neighbors of v
    const node = this.graph.find(n => n.id === v);
    if (!node) return;

    for (const w of node.neighbors) {
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
   * Reset the algorithm state
   */
  private reset(): void {
    this.index = 0;
    this.stack = [];
    this.indices.clear();
    this.lowlinks.clear();
    this.onStack.clear();
    this.sccs = [];
  }

  /**
   * Get the condensation graph (DAG of SCCs)
   */
  public getCondensationGraph(): { nodes: number[][], edges: [number, number][] } {
    const sccs = this.findSCCs();
    const sccMap = new Map<number, number>();
    
    // Map each node to its SCC index
    sccs.forEach((scc, index) => {
      scc.forEach(node => {
        sccMap.set(node, index);
      });
    });

    const edges: [number, number][] = [];
    const addedEdges = new Set<string>();

    // Find edges between different SCCs
    this.graph.forEach(node => {
      const fromScc = sccMap.get(node.id)!;
      
      node.neighbors.forEach(neighbor => {
        const toScc = sccMap.get(neighbor)!;
        
        if (fromScc !== toScc) {
          const edgeKey = `${fromScc}-${toScc}`;
          if (!addedEdges.has(edgeKey)) {
            edges.push([fromScc, toScc]);
            addedEdges.add(edgeKey);
          }
        }
      });
    });

    return { nodes: sccs, edges };
  }
}
// Example usage
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
const sccs = tarjan.findSCCs();
const condensation = tarjan.getCondensationGraph();

console.log('Strongly Connected Components:');
sccs.forEach((scc, index) => {
  console.log(`SCC ${index}: [${scc.join(', ')}]`);
});

console.log('\nCondensation Graph:');
console.log('Nodes:', condensation.nodes);
console.log('Edges:', condensation.edges);
export class TarjanAdjacencyList {
  private graph: Map<number, number[]>;
  private index: number = 0;
  private stack: number[] = [];
  private indices: Map<number, number> = new Map();
  private lowlinks: Map<number, number> = new Map();
  private onStack: Map<number, boolean> = new Map();
  private sccs: number[][] = [];

  constructor(adjacencyList: Map<number, number[]>) {
    this.graph = adjacencyList;
  }

  public findSCCs(): number[][] {
    this.reset();
    
    // Initialize for all nodes
    this.graph.forEach((_, node) => {
      this.indices.set(node, -1);
      this.lowlinks.set(node, -1);
      this.onStack.set(node, false);
    });

    // Perform DFS for each unvisited node
    this.graph.forEach((_, node) => {
      if (this.indices.get(node) === -1) {
        this.strongConnect(node);
      }
    });

    return this.sccs;
  }

  private strongConnect(v: number): void {
    this.indices.set(v, this.index);
    this.lowlinks.set(v, this.index);
    this.index++;
    this.stack.push(v);
    this.onStack.set(v, true);

    const neighbors = this.graph.get(v) || [];
    
    for (const w of neighbors) {
      if (this.indices.get(w) === -1) {
        this.strongConnect(w);
        this.lowlinks.set(v, Math.min(this.lowlinks.get(v)!, this.lowlinks.get(w)!));
      } else if (this.onStack.get(w)) {
        this.lowlinks.set(v, Math.min(this.lowlinks.get(v)!, this.indices.get(w)!));
      }
    }

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

  private reset(): void {
    this.index = 0;
    this.stack = [];
    this.indices.clear();
    this.lowlinks.clear();
    this.onStack.clear();
    this.sccs = [];
  }
}

// Usage with adjacency list
const adjacencyList = new Map<number, number[]>();
adjacencyList.set(0, [1]);
adjacencyList.set(1, [2]);
adjacencyList.set(2, [0, 3]);
adjacencyList.set(3, [4]);
adjacencyList.set(4, [5, 7]);
adjacencyList.set(5, [6]);
adjacencyList.set(6, [4, 7]);
adjacencyList.set(7, []);

const tarjanList = new TarjanAdjacencyList(adjacencyList);
const sccsList = tarjanList.findSCCs();
console.log('SCCs from adjacency list:', sccsList);
