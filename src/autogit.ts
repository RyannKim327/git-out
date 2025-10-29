interface Graph {
  [node: string]: string[];
}

class BidirectionalBFS {
  private graph: Graph;

  constructor(graph: Graph) {
    this.graph = graph;
  }

  search(start: string, goal: string): string[] | null {
    if (start === goal) return [start];

    // Initialize forward and backward queues
    const forwardQueue: string[] = [start];
    const backwardQueue: string[] = [goal];
    
    // Track visited nodes and their parents
    const forwardVisited: Map<string, string> = new Map([[start, '']]);
    const backwardVisited: Map<string, string> = new Map([[goal, '']]);
    
    let intersection: string | null = null;

    while (forwardQueue.length > 0 && backwardQueue.length > 0) {
      // Expand forward search
      intersection = this.expandSearch(forwardQueue, forwardVisited, backwardVisited, true);
      if (intersection) {
        return this.constructPath(intersection, forwardVisited, backwardVisited);
      }

      // Expand backward search
      intersection = this.expandSearch(backwardQueue, backwardVisited, forwardVisited, false);
      if (intersection) {
        return this.constructPath(intersection, forwardVisited, backwardVisited);
      }
    }

    return null;
  }

  private expandSearch(
    queue: string[],
    currentVisited: Map<string, string>,
    otherVisited: Map<string, string>,
    isForward: boolean
  ): string | null {
    const currentNode = queue.shift()!;
    
    for (const neighbor of this.graph[currentNode] || []) {
      if (!currentVisited.has(neighbor)) {
        currentVisited.set(neighbor, currentNode);
        queue.push(neighbor);
        
        // Check if this node is visited in the other search
        if (otherVisited.has(neighbor)) {
          return neighbor;
        }
      }
    }
    
    return null;
  }

  private constructPath(
    intersection: string,
    forwardVisited: Map<string, string>,
    backwardVisited: Map<string, string>
  ): string[] {
    // Build path from start to intersection
    const forwardPath: string[] = [];
    let current = intersection;
    
    while (current !== '') {
      forwardPath.unshift(current);
      current = forwardVisited.get(current)!;
    }

    // Build path from intersection to goal
    const backwardPath: string[] = [];
    current = backwardVisited.get(intersection)!;
    
    while (current !== '') {
      backwardPath.push(current);
      current = backwardVisited.get(current)!;
    }

    return [...forwardPath, ...backwardPath];
  }
}
interface WeightedGraph {
  [node: string]: { [neighbor: string]: number };
}

class BidirectionalDijkstra {
  private graph: WeightedGraph;

  constructor(graph: WeightedGraph) {
    this.graph = graph;
  }

  search(start: string, goal: string): { path: string[]; cost: number } | null {
    if (start === goal) return { path: [start], cost: 0 };

    // Priority queues for forward and backward search
    const forwardQueue: Map<string, number> = new Map([[start, 0]]);
    const backwardQueue: Map<string, number> = new Map([[goal, 0]]);
    
    // Track distances and parents
    const forwardDist: Map<string, number> = new Map([[start, 0]]);
    const backwardDist: Map<string, number> = new Map([[goal, 0]]);
    
    const forwardParent: Map<string, string> = new Map();
    const backwardParent: Map<string, string> = new Map();

    let bestCost = Infinity;
    let bestMeetingNode: string | null = null;

    while (forwardQueue.size > 0 && backwardQueue.size > 0) {
      // Expand forward search
      const forwardNode = this.getMinNode(forwardQueue);
      forwardQueue.delete(forwardNode);

      if (backwardDist.has(forwardNode)) {
        const totalCost = forwardDist.get(forwardNode)! + backwardDist.get(forwardNode)!;
        if (totalCost < bestCost) {
          bestCost = totalCost;
          bestMeetingNode = forwardNode;
        }
      }

      this.expandNode(forwardNode, forwardDist, forwardParent, forwardQueue, true);

      // Expand backward search
      const backwardNode = this.getMinNode(backwardQueue);
      backwardQueue.delete(backwardNode);

      if (forwardDist.has(backwardNode)) {
        const totalCost = forwardDist.get(backwardNode)! + backwardDist.get(backwardNode)!;
        if (totalCost < bestCost) {
          bestCost = totalCost;
          bestMeetingNode = backwardNode;
        }
      }

      this.expandNode(backwardNode, backwardDist, backwardParent, backwardQueue, false);
    }

    if (bestMeetingNode) {
      const path = this.constructPath(
        bestMeetingNode,
        forwardParent,
        backwardParent
      );
      return { path, cost: bestCost };
    }

    return null;
  }

  private expandNode(
    node: string,
    distances: Map<string, number>,
    parents: Map<string, string>,
    queue: Map<string, number>,
    isForward: boolean
  ): void {
    const neighbors = this.graph[node] || {};
    
    for (const [neighbor, cost] of Object.entries(neighbors)) {
      const totalCost = distances.get(node)! + cost;
      
      if (!distances.has(neighbor) || totalCost < distances.get(neighbor)!) {
        distances.set(neighbor, totalCost);
        parents.set(neighbor, node);
        queue.set(neighbor, totalCost);
      }
    }
  }

  private getMinNode(queue: Map<string, number>): string {
    let minNode = '';
    let minCost = Infinity;
    
    for (const [node, cost] of queue) {
      if (cost < minCost) {
        minCost = cost;
        minNode = node;
      }
    }
    
    return minNode;
  }

  private constructPath(
    meetingNode: string,
    forwardParent: Map<string, string>,
    backwardParent: Map<string, string>
  ): string[] {
    // Build forward path
    const forwardPath: string[] = [];
    let current = meetingNode;
    
    while (forwardParent.has(current)) {
      forwardPath.unshift(current);
      current = forwardParent.get(current)!;
    }
    forwardPath.unshift(current);

    // Build backward path
    const backwardPath: string[] = [];
    current = backwardParent.get(meetingNode)!;
    
    while (backwardParent.has(current)) {
      backwardPath.push(current);
      current = backwardParent.get(current)!;
    }
    if (backwardPath.length > 0) {
      backwardPath.push(backwardPath[backwardPath.length - 1]);
    }

    return [...forwardPath, ...backwardPath];
  }
}
// Example graph
const graph: Graph = {
  'A': ['B', 'C'],
  'B': ['A', 'D', 'E'],
  'C': ['A', 'F'],
  'D': ['B'],
  'E': ['B', 'F'],
  'F': ['C', 'E']
};

// Create and use the search
const biBFS = new BidirectionalBFS(graph);
const path = biBFS.search('A', 'F');

console.log('Path:', path); // Output: ['A', 'C', 'F'] or ['A', 'B', 'E', 'F']
