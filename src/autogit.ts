interface Graph {
  [node: number]: number[];
}

interface TarjanState {
  index: number;
  lowlink: number;
  onStack: boolean;
}

class TarjanSCC {
  private graph: Graph;
  private index: number;
  private stack: number[];
  private state: Map<number, TarjanState>;
  private sccs: number[][];

  constructor(graph: Graph) {
    this.graph = graph;
    this.index = 0;
    this.stack = [];
    this.state = new Map();
    this.sccs = [];
  }

  /**
   * Find all strongly connected components in the graph
   */
  findSCCs(): number[][] {
    // Initialize state for all nodes
    Object.keys(this.graph).forEach(nodeStr => {
      const node = parseInt(nodeStr);
      this.state.set(node, {
        index: -1,
        lowlink: -1,
        onStack: false
      });
    });

    // Process each unvisited node
    Object.keys(this.graph).forEach(nodeStr => {
      const node = parseInt(nodeStr);
      if (this.state.get(node)!.index === -1) {
        this.strongConnect(node);
      }
    });

    return this.sccs;
  }

  /**
   * Tarjan's strongConnect function - the core of the algorithm
   */
  private strongConnect(node: number): void {
    const nodeState = this.state.get(node)!;
    nodeState.index = this.index;
    nodeState.lowlink = this.index;
    nodeState.onStack = true;
    this.index++;
    this.stack.push(node);

    // Consider successors of node
    const successors = this.graph[node] || [];
    for (const successor of successors) {
      const successorState = this.state.get(successor);
      
      if (!successorState) {
        // Node not in graph, skip
        continue;
      }

      if (successorState.index === -1) {
        // Successor has not yet been visited; recurse on it
        this.strongConnect(successor);
        nodeState.lowlink = Math.min(nodeState.lowlink, this.state.get(successor)!.lowlink);
      } else if (successorState.onStack) {
        // Successor is in stack and hence in the current SCC
        nodeState.lowlink = Math.min(nodeState.lowlink, successorState.index);
      }
    }

    // If node is a root node, pop the stack and generate an SCC
    if (nodeState.lowlink === nodeState.index) {
      const scc: number[] = [];
      let successor: number;

      do {
        successor = this.stack.pop()!;
        this.state.get(successor)!.onStack = false;
        scc.push(successor);
      } while (successor !== node);

      this.sccs.push(scc);
    }
  }
}

// Alternative functional implementation
function tarjanSCC(graph: Graph): number[][] {
  let index = 0;
  const stack: number[] = [];
  const state = new Map<number, { index: number; lowlink: number; onStack: boolean }>();
  const sccs: number[][] = [];

  // Initialize state for all nodes
  Object.keys(graph).forEach(nodeStr => {
    const node = parseInt(nodeStr);
    state.set(node, { index: -1, lowlink: -1, onStack: false });
  });

  function strongConnect(node: number): void {
    const nodeState = state.get(node)!;
    nodeState.index = index;
    nodeState.lowlink = index;
    nodeState.onStack = true;
    index++;
    stack.push(node);

    const successors = graph[node] || [];
    for (const successor of successors) {
      const successorState = state.get(successor);
      
      if (!successorState) continue;

      if (successorState.index === -1) {
        strongConnect(successor);
        nodeState.lowlink = Math.min(nodeState.lowlink, state.get(successor)!.lowlink);
      } else if (successorState.onStack) {
        nodeState.lowlink = Math.min(nodeState.lowlink, successorState.index);
      }
    }

    if (nodeState.lowlink === nodeState.index) {
      const component: number[] = [];
      let successor: number;

      do {
        successor = stack.pop()!;
        state.get(successor)!.onStack = false;
        component.push(successor);
      } while (successor !== node);

      sccs.push(component);
    }
  }

  // Process each unvisited node
  Object.keys(graph).forEach(nodeStr => {
    const node = parseInt(nodeStr);
    if (state.get(node)!.index === -1) {
      strongConnect(node);
    }
  });

  return sccs;
}
// Example 1: Simple cyclic graph
const cyclicGraph: Graph = {
  0: [1],
  1: [2],
  2: [0, 3],
  3: [4],
  4: [3]
};

const tarjan = new TarjanSCC(cyclicGraph);
const sccs1 = tarjan.findSCCs();
console.log('Cyclic graph SCCs:', sccs1);
// Output: [[4, 3], [2, 1, 0]]

// Using functional version
const sccs1Func = tarjanSCC(cyclicGraph);
console.log('Functional version:', sccs1Func);

// Example 2: More complex graph
const complexGraph: Graph = {
  0: [1],
  1: [2, 3],
  2: [0],
  3: [4],
  4: [5],
  5: [3],
  6: [5, 7],
  7: [8],
  8: [9],
  9: [6, 10],
  10: []
};

const tarjan2 = new TarjanSCC(complexGraph);
const sccs2 = tarjan2.findSCCs();
console.log('Complex graph SCCs:', sccs2);
// Output: [[10], [5, 4, 3], [9, 8, 7, 6], [2, 1, 0]]

// Example 3: Empty graph
const emptyGraph: Graph = {};
const sccs3 = tarjanSCC(emptyGraph);
console.log('Empty graph SCCs:', sccs3); // Output: []
type NodeId = number;

interface Graph {
  [node: NodeId]: NodeId[];
}

interface TarjanResult {
  components: NodeId[][];
  condensationGraph?: Graph; // Optional: graph of SCCs
}

// Extended version that returns additional information
class ExtendedTarjanSCC extends TarjanSCC {
  findSCCsWithInfo(): TarjanResult {
    const components = super.findSCCs();
    
    // You could add logic here to build the condensation graph
    // (DAG where nodes are SCCs and edges connect different SCCs)
    
    return {
      components,
      condensationGraph: this.buildCondensationGraph(components)
    };
  }

  private buildCondensationGraph(components: number[][]): Graph {
    const condensation: Graph = {};
    
    // Map each original node to its component index
    const nodeToComponent = new Map<number, number>();
    components.forEach((component, compIndex) => {
      component.forEach(node => {
        nodeToComponent.set(node, compIndex);
      });
    });

    // Build edges between components
    components.forEach((component, compIndex) => {
      const outgoing = new Set<number>();
      component.forEach(node => {
        const neighbors = this.graph[node] || [];
        neighbors.forEach(neighbor => {
          const neighborComp = nodeToComponent.get(neighbor);
          if (neighborComp !== undefined && neighborComp !== compIndex) {
            outgoing.add(neighborComp);
          }
        });
      });
      condensation[compIndex] = Array.from(outgoing);
    });

    return condensation;
  }
}
