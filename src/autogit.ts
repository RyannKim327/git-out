export class TarjanSCC {
  private graph: Map<number, number[]>;
  private index: number;
  private stack: number[];
  private indices: Map<number, number>;
  private lowlinks: Map<number, number>;
  private onStack: Map<number, boolean>;
  private sccs: number[][];

  constructor(graph: Map<number, number[]>) {
    this.graph = graph;
    this.index = 0;
    this.stack = [];
    this.indices = new Map();
    this.lowlinks = new Map();
    this.onStack = new Map();
    this.sccs = [];
  }

  /**
   * Find all strongly connected components in the graph
   */
  public findSCCs(): number[][] {
    // Initialize tracking structures
    this.indices.clear();
    this.lowlinks.clear();
    this.onStack.clear();
    this.stack = [];
    this.sccs = [];
    this.index = 0;

    // Process each node that hasn't been visited
    for (const node of this.graph.keys()) {
      if (!this.indices.has(node)) {
        this.strongConnect(node);
      }
    }

    return this.sccs;
  }

  /**
   * Recursive DFS function for Tarjan's algorithm
   */
  private strongConnect(node: number): void {
    // Set the depth index for this node to the smallest unused index
    this.indices.set(node, this.index);
    this.lowlinks.set(node, this.index);
    this.index++;
    this.stack.push(node);
    this.onStack.set(node, true);

    // Consider all neighbors of this node
    const neighbors = this.graph.get(node) || [];
    for (const neighbor of neighbors) {
      if (!this.indices.has(neighbor)) {
        // Neighbor hasn't been visited, recurse on it
        this.strongConnect(neighbor);
        this.lowlinks.set(
          node,
          Math.min(this.lowlinks.get(node)!, this.lowlinks.get(neighbor)!)
        );
      } else if (this.onStack.get(neighbor)) {
        // Neighbor is in the stack and hence in the current SCC
        this.lowlinks.set(
          node,
          Math.min(this.lowlinks.get(node)!, this.indices.get(neighbor)!)
        );
      }
    }

    // If node is a root node, pop the stack and generate an SCC
    if (this.lowlinks.get(node) === this.indices.get(node)) {
      const scc: number[] = [];
      let top: number;

      do {
        top = this.stack.pop()!;
        this.onStack.set(top, false);
        scc.push(top);
      } while (top !== node);

      this.sccs.push(scc);
    }
  }

  /**
   * Get the condensation graph (DAG of SCCs)
   */
  public getCondensationGraph(): Map<number, number[]> {
    const sccs = this.findSCCs();
    const nodeToComponent = new Map<number, number>();
    
    // Map each node to its component index
    sccs.forEach((scc, componentIndex) => {
      scc.forEach(node => {
        nodeToComponent.set(node, componentIndex);
      });
    });

    const condensationGraph = new Map<number, number[]>();
    
    // Initialize components
    for (let i = 0; i < sccs.length; i++) {
      condensationGraph.set(i, []);
    }

    // Add edges between components
    for (const [node, neighbors] of this.graph.entries()) {
      const fromComponent = nodeToComponent.get(node)!;
      
      for (const neighbor of neighbors) {
        const toComponent = nodeToComponent.get(neighbor)!;
        
        if (fromComponent !== toComponent) {
          const edges = condensationGraph.get(fromComponent)!;
          if (!edges.includes(toComponent)) {
            edges.push(toComponent);
          }
        }
      }
    }

    return condensationGraph;
  }
}

// Utility function to create a graph from an adjacency list
export function createGraph(adjacencyList: Record<number, number[]>): Map<number, number[]> {
  const graph = new Map<number, number[]>();
  
  for (const [node, neighbors] of Object.entries(adjacencyList)) {
    graph.set(parseInt(node), neighbors);
  }
  
  return graph;
}

// Example usage and test
function exampleUsage(): void {
  // Example graph: 0->1, 1->2, 2->0, 2->3, 3->4, 4->5, 5->3
  const adjacencyList: Record<number, number[]> = {
    0: [1],
    1: [2],
    2: [0, 3],
    3: [4],
    4: [5],
    5: [3]
  };

  const graph = createGraph(adjacencyList);
  const tarjan = new TarjanSCC(graph);
  
  const sccs = tarjan.findSCCs();
  console.log("Strongly Connected Components:");
  console.log(sccs); // [[0, 1, 2], [3, 4, 5]]
  
  const condensationGraph = tarjan.getCondensationGraph();
  console.log("Condensation Graph:");
  console.log(condensationGraph); // Map { 0 => [1], 1 => [] }
}

// Run the example
exampleUsage();
export interface TarjanResult {
  sccs: number[][];
  condensationGraph: Map<number, number[]>;
}

export function tarjanSCC(graph: Map<number, number[]>): TarjanResult {
  let index = 0;
  const stack: number[] = [];
  const indices = new Map<number, number>();
  const lowlinks = new Map<number, number>();
  const onStack = new Map<number, boolean>();
  const sccs: number[][] = [];

  function strongConnect(node: number): void {
    indices.set(node, index);
    lowlinks.set(node, index);
    index++;
    stack.push(node);
    onStack.set(node, true);

    const neighbors = graph.get(node) || [];
    for (const neighbor of neighbors) {
      if (!indices.has(neighbor)) {
        strongConnect(neighbor);
        lowlinks.set(node, Math.min(lowlinks.get(node)!, lowlinks.get(neighbor)!));
      } else if (onStack.get(neighbor)) {
        lowlinks.set(node, Math.min(lowlinks.get(node)!, indices.get(neighbor)!));
      }
    }

    if (lowlinks.get(node) === indices.get(node)) {
      const component: number[] = [];
      let top: number;

      do {
        top = stack.pop()!;
        onStack.set(top, false);
        component.push(top);
      } while (top !== node);

      sccs.push(component);
    }
  }

  // Find all SCCs
  for (const node of graph.keys()) {
    if (!indices.has(node)) {
      strongConnect(node);
    }
  }

  return { sccs, condensationGraph: buildCondensationGraph(graph, sccs) };
}

function buildCondensationGraph(graph: Map<number, number[]>, sccs: number[][]): Map<number, number[]> {
  const nodeToComponent = new Map<number, number>();
  const condensationGraph = new Map<number, number[]>();

  sccs.forEach((component, index) => {
    component.forEach(node => nodeToComponent.set(node, index));
    condensationGraph.set(index, []);
  });

  for (const [node, neighbors] of graph.entries()) {
    const fromComponent = nodeToComponent.get(node)!;
    
    for (const neighbor of neighbors) {
      const toComponent = nodeToComponent.get(neighbor)!;
      
      if (fromComponent !== toComponent) {
        const edges = condensationGraph.get(fromComponent)!;
        if (!edges.includes(toComponent)) {
          edges.push(toComponent);
        }
      }
    }
  }

  return condensationGraph;
}
