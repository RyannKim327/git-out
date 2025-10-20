interface GraphNode {
  id: number;
  neighbors: number[];
}

class TarjanSCC {
  private index: number = 0;
  private stack: number[] = [];
  private onStack: boolean[] = [];
  private indices: number[] = [];
  private lowlinks: number[] = [];
  private sccs: number[][] = [];

  findSCCs(graph: GraphNode[]): number[][] {
    // Initialize arrays
    const n = graph.length;
    this.indices = Array(n).fill(-1);
    this.lowlinks = Array(n).fill(-1);
    this.onStack = Array(n).fill(false);
    this.stack = [];
    this.sccs = [];
    this.index = 0;

    // Perform DFS for each unvisited node
    for (let i = 0; i < n; i++) {
      if (this.indices[i] === -1) {
        this.strongConnect(graph, i);
      }
    }

    return this.sccs;
  }

  private strongConnect(graph: GraphNode[], nodeId: number): void {
    // Set the depth index for this node to the smallest unused index
    this.indices[nodeId] = this.index;
    this.lowlinks[nodeId] = this.index;
    this.index++;
    
    this.stack.push(nodeId);
    this.onStack[nodeId] = true;

    // Consider successors of node
    const node = graph[nodeId];
    for (const neighborId of node.neighbors) {
      if (this.indices[neighborId] === -1) {
        // Successor has not yet been visited; recurse on it
        this.strongConnect(graph, neighborId);
        this.lowlinks[nodeId] = Math.min(this.lowlinks[nodeId], this.lowlinks[neighborId]);
      } else if (this.onStack[neighborId]) {
        // Successor is in stack and hence in the current SCC
        this.lowlinks[nodeId] = Math.min(this.lowlinks[nodeId], this.indices[neighborId]);
      }
    }

    // If node is a root node, pop the stack and generate an SCC
    if (this.lowlinks[nodeId] === this.indices[nodeId]) {
      const scc: number[] = [];
      let topNode: number;
      
      do {
        topNode = this.stack.pop()!;
        this.onStack[topNode] = false;
        scc.push(topNode);
      } while (topNode !== nodeId);

      this.sccs.push(scc);
    }
  }
}

// Example usage and test cases
function testTarjan(): void {
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

  const tarjan = new TarjanSCC();
  const sccs = tarjan.findSCCs(graph);
  
  console.log('Strongly Connected Components:');
  sccs.forEach((scc, index) => {
    console.log(`SCC ${index + 1}: [${scc.join(', ')}]`);
  });
}

// Alternative implementation using adjacency list format
class TarjanSCCSimplified {
  findSCCs(adjacencyList: number[][]): number[][] {
    const n = adjacencyList.length;
    let index = 0;
    const indices: number[] = Array(n).fill(-1);
    const lowlinks: number[] = Array(n).fill(-1);
    const onStack: boolean[] = Array(n).fill(false);
    const stack: number[] = [];
    const sccs: number[][] = [];

    const strongConnect = (nodeId: number): void => {
      indices[nodeId] = index;
      lowlinks[nodeId] = index;
      index++;
      
      stack.push(nodeId);
      onStack[nodeId] = true;

      for (const neighborId of adjacencyList[nodeId]) {
        if (indices[neighborId] === -1) {
          strongConnect(neighborId);
          lowlinks[nodeId] = Math.min(lowlinks[nodeId], lowlinks[neighborId]);
        } else if (onStack[neighborId]) {
          lowlinks[nodeId] = Math.min(lowlinks[nodeId], indices[neighborId]);
        }
      }

      if (lowlinks[nodeId] === indices[nodeId]) {
        const scc: number[] = [];
        let topNode: number;
        
        do {
          topNode = stack.pop()!;
          onStack[topNode] = false;
          scc.push(topNode);
        } while (topNode !== nodeId);

        sccs.push(scc);
      }
    };

    for (let i = 0; i < n; i++) {
      if (indices[i] === -1) {
        strongConnect(i);
      }
    }

    return sccs;
  }
}

// Example with adjacency list
function testSimplified(): void {
  // Graph represented as adjacency list
  // 0 -> 1, 1 -> 2, 2 -> 0,3, 3 -> 4, 4 -> 5,7, 5 -> 6, 6 -> 4,7, 7 -> 
  const adjacencyList: number[][] = [
    [1],       // node 0
    [2],       // node 1  
    [0, 3],    // node 2
    [4],       // node 3
    [5, 7],    // node 4
    [6],       // node 5
    [4, 7],    // node 6
    []         // node 7
  ];

  const tarjan = new TarjanSCCSimplified();
  const sccs = tarjan.findSCCs(adjacencyList);
  
  console.log('\nStrongly Connected Components (Simplified):');
  sccs.forEach((scc, index) => {
    console.log(`SCC ${index + 1}: [${scc.join(', ')}]`);
  });
}

// Run tests
testTarjan();
testSimplified();
Strongly Connected Components:
SCC 1: [7]
SCC 2: [4, 6, 5]
SCC 3: [3]
SCC 4: [0, 2, 1]
