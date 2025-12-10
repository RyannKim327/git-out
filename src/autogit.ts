interface Graph {
  [key: string]: string[];
}

interface QueueItem {
  node: string;
  path: string[];
}

interface BidirectionalSearchResult {
  path: string[];
  iterations: number;
  visited: Set<string>;
}

class BidirectionalSearch {
  private graph: Graph;
  
  constructor(graph: Graph) {
    this.graph = graph;
  }

  search(start: string, goal: string): BidirectionalSearchResult | null {
    if (start === goal) {
      return {
        path: [start],
        iterations: 0,
        visited: new Set([start])
      };
    }

    // Forward BFS from start
    const forwardQueue: QueueItem[] = [{ node: start, path: [start] }];
    const forwardVisited = new Map<string, string[]>(); // node -> path
    forwardVisited.set(start, [start]);

    // Backward BFS from goal
    const backwardQueue: QueueItem[] = [{ node: goal, path: [goal] }];
    const backwardVisited = new Map<string, string[]>(); // node -> path
    backwardVisited.set(goal, [goal]);

    const allVisited = new Set<string>([start, goal]);
    let iterations = 0;

    while (forwardQueue.length > 0 && backwardQueue.length > 0) {
      iterations++;

      // Expand forward search
      const forwardSize = forwardQueue.length;
      for (let i = 0; i < forwardSize; i++) {
        const current = forwardQueue.shift()!;
        
        // Check if current node is visited by backward search
        if (backwardVisited.has(current.node)) {
          const forwardPath = current.path;
          const backwardPath = [...backwardVisited.get(current.node)!].reverse();
          
          // Remove duplicate middle node
          backwardPath.shift();
          
          return {
            path: [...forwardPath, ...backwardPath],
            iterations,
            visited: allVisited
          };
        }

        const neighbors = this.graph[current.node] || [];
        for (const neighbor of neighbors) {
          if (!forwardVisited.has(neighbor)) {
            const newPath = [...current.path, neighbor];
            forwardVisited.set(neighbor, newPath);
            forwardQueue.push({ node: neighbor, path: newPath });
            allVisited.add(neighbor);
          }
        }
      }

      // Expand backward search
      const backwardSize = backwardQueue.length;
      for (let i = 0; i < backwardSize; i++) {
        const current = backwardQueue.shift()!;
        
        // Check if current node is visited by forward search
        if (forwardVisited.has(current.node)) {
          const forwardPath = forwardVisited.get(current.node)!;
          const backwardPath = [...current.path].reverse();
          
          // Remove duplicate middle node
          backwardPath.shift();
          
          return {
            path: [...forwardPath, ...backwardPath],
            iterations,
            visited: allVisited
          };
        }

        const neighbors = this.graph[current.node] || [];
        for (const neighbor of neighbors) {
          if (!backwardVisited.has(neighbor)) {
            const newPath = [...current.path, neighbor];
            backwardVisited.set(neighbor, newPath);
            backwardQueue.push({ node: neighbor, path: newPath });
            allVisited.add(neighbor);
          }
        }
      }
    }

    return null; // No path found
  }
}
interface WeightedGraph {
  [key: string]: { [neighbor: string]: number };
}

interface PriorityQueueItem {
  node: string;
  cost: number;
  path: string[];
}

class PriorityBidirectionalSearch {
  private graph: WeightedGraph;
  
  constructor(graph: WeightedGraph) {
    this.graph = graph;
  }

  private heuristic(node: string, goal: string): number {
    // Simple heuristic - can be customized based on your domain
    return 0; // For uniform cost search
  }

  search(start: string, goal: string): BidirectionalSearchResult | null {
    if (start === goal) {
      return { path: [start], iterations: 0, visited: new Set([start]) };
    }

    // Priority queues (min-heap simulation using arrays)
    const forwardQueue: PriorityQueueItem[] = [
      { node: start, cost: 0, path: [start] }
    ];
    const backwardQueue: PriorityQueueItem[] = [
      { node: goal, cost: 0, path: [goal] }
    ];

    const forwardCosts = new Map<string, number>([[start, 0]]);
    const backwardCosts = new Map<string, number>([[goal, 0]]);
    
    const forwardPaths = new Map<string, string[]>([[start, [start]]]);
    const backwardPaths = new Map<string, string[]>([[goal, [goal]]]);

    const allVisited = new Set<string>([start, goal]);
    let iterations = 0;
    let bestCost = Infinity;
    let meetingNode: string | null = null;

    while (forwardQueue.length > 0 && backwardQueue.length > 0) {
      iterations++;

      // Sort queues by cost (simple priority queue implementation)
      forwardQueue.sort((a, b) => a.cost - b.cost);
      backwardQueue.sort((a, b) => a.cost - b.cost);

      // Expand forward search
      if (forwardQueue.length > 0) {
        const current = forwardQueue.shift()!;
        
        // Check if this node is in backward search
        if (backwardCosts.has(current.node)) {
          const totalCost = current.cost + backwardCosts.get(current.node)!;
          if (totalCost < bestCost) {
            bestCost = totalCost;
            meetingNode = current.node;
          }
        }

        const neighbors = this.graph[current.node] || {};
        for (const [neighbor, cost] of Object.entries(neighbors)) {
          const newCost = current.cost + cost;
          if (!forwardCosts.has(neighbor) || newCost < forwardCosts.get(neighbor)!) {
            forwardCosts.set(neighbor, newCost);
            const newPath = [...current.path, neighbor];
            forwardPaths.set(neighbor, newPath);
            forwardQueue.push({
              node: neighbor,
              cost: newCost,
              path: newPath
            });
            allVisited.add(neighbor);
          }
        }
      }

      // Expand backward search
      if (backwardQueue.length > 0) {
        const current = backwardQueue.shift()!;
        
        // Check if this node is in forward search
        if (forwardCosts.has(current.node)) {
          const totalCost = current.cost + forwardCosts.get(current.node)!;
          if (totalCost < bestCost) {
            bestCost = totalCost;
            meetingNode = current.node;
          }
        }

        const neighbors = this.graph[current.node] || {};
        for (const [neighbor, cost] of Object.entries(neighbors)) {
          const newCost = current.cost + cost;
          if (!backwardCosts.has(neighbor) || newCost < backwardCosts.get(neighbor)!) {
            backwardCosts.set(neighbor, newCost);
            const newPath = [...current.path, neighbor];
            backwardPaths.set(neighbor, newPath);
            backwardQueue.push({
              node: neighbor,
              cost: newCost,
              path: newPath
            });
            allVisited.add(neighbor);
          }
        }
      }

      // If we found a meeting point and no better path is possible
      if (meetingNode && this.shouldTerminate(forwardQueue, backwardQueue, bestCost)) {
        const forwardPath = forwardPaths.get(meetingNode)!;
        const backwardPath = [...backwardPaths.get(meetingNode)!].reverse();
        backwardPath.shift(); // Remove duplicate meeting node
        
        return {
          path: [...forwardPath, ...backwardPath],
          iterations,
          visited: allVisited
        };
      }
    }

    return meetingNode ? {
      path: [
        ...forwardPaths.get(meetingNode)!,
        ...[...backwardPaths.get(meetingNode)!].reverse().slice(1)
      ],
      iterations,
      visited: allVisited
    } : null;
  }

  private shouldTerminate(
    forwardQueue: PriorityQueueItem[], 
    backwardQueue: PriorityQueueItem[], 
    bestCost: number
  ): boolean {
    const minForwardCost = forwardQueue.length > 0 ? forwardQueue[0].cost : Infinity;
    const minBackwardCost = backwardQueue.length > 0 ? backwardQueue[0].cost : Infinity;
    return bestCost <= minForwardCost + minBackwardCost;
  }
}
// Example graph
const graph: Graph = {
  'A': ['B', 'C'],
  'B': ['A', 'D', 'E'],
  'C': ['A', 'F'],
  'D': ['B'],
  'E': ['B', 'F'],
  'F': ['C', 'E', 'G'],
  'G': ['F']
};

const weightedGraph: WeightedGraph = {
  'A': { 'B': 1, 'C': 4 },
  'B': { 'A': 1, 'D': 2, 'E': 5 },
  'C': { 'A': 4, 'F': 3 },
  'D': { 'B': 2 },
  'E': { 'B': 5, 'F': 1 },
  'F': { 'C': 3, 'E': 1, 'G': 2 },
  'G': { 'F': 2 }
};

// Using basic bidirectional search
const search = new BidirectionalSearch(graph);
const result = search.search('A', 'G');

if (result) {
  console.log('Path found:', result.path.join(' → '));
  console.log('Iterations:', result.iterations);
  console.log('Visited nodes:', result.visited.size);
} else {
  console.log('No path found');
}

// Using weighted bidirectional search
const weightedSearch = new PriorityBidirectionalSearch(weightedGraph);
const weightedResult = weightedSearch.search('A', 'G');

if (weightedResult) {
  console.log('Weighted path found:', weightedResult.path.join(' → '));
  console.log('Iterations:', weightedResult.iterations);
}
