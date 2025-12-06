interface Node {
  id: string;
  neighbors: string[];
}

interface Path {
  nodes: string[];
  cost: number;
}

class BidirectionalSearch<T extends Node> {
  private graph: Map<string, T>;
  
  constructor(graph: T[]) {
    this.graph = new Map();
    graph.forEach(node => this.graph.set(node.id, node));
  }

  search(startId: string, goalId: string): Path | null {
    if (!this.graph.has(startId) || !this.graph.has(goalId)) {
      return null;
    }

    if (startId === goalId) {
      return { nodes: [startId], cost: 0 };
    }

    // Forward search from start
    const forwardQueue: string[] = [startId];
    const forwardVisited = new Map<string, string>(); // node -> parent
    forwardVisited.set(startId, startId);

    // Backward search from goal
    const backwardQueue: string[] = [goalId];
    const backwardVisited = new Map<string, string>(); // node -> parent
    backwardVisited.set(goalId, goalId);

    while (forwardQueue.length > 0 && backwardQueue.length > 0) {
      // Expand forward search
      const meetingNode = this.expandSearch(
        forwardQueue,
        forwardVisited,
        backwardVisited,
        false
      );
      
      if (meetingNode) {
        return this.constructPath(meetingNode, forwardVisited, backwardVisited);
      }

      // Expand backward search
      const meetingNodeReverse = this.expandSearch(
        backwardQueue,
        backwardVisited,
        forwardVisited,
        true
      );
      
      if (meetingNodeReverse) {
        return this.constructPath(meetingNodeReverse, forwardVisited, backwardVisited);
      }
    }

    return null;
  }

  private expandSearch(
    queue: string[],
    currentVisited: Map<string, string>,
    otherVisited: Map<string, string>,
    isBackward: boolean
  ): string | null {
    if (queue.length === 0) return null;

    const currentNode = queue.shift()!;
    const node = this.graph.get(currentNode)!;

    for (const neighborId of node.neighbors) {
      if (!currentVisited.has(neighborId)) {
        currentVisited.set(neighborId, currentNode);
        
        // Check if this node has been visited by the other search
        if (otherVisited.has(neighborId)) {
          return neighborId; // Meeting point found
        }
        
        queue.push(neighborId);
      }
    }

    return null;
  }

  private constructPath(
    meetingNode: string,
    forwardVisited: Map<string, string>,
    backwardVisited: Map<string, string>
  ): Path {
    // Reconstruct path from start to meeting node
    const forwardPath: string[] = [];
    let current: string | undefined = meetingNode;
    
    while (current && current !== forwardVisited.get(current)) {
      forwardPath.unshift(current);
      current = forwardVisited.get(current);
    }
    forwardPath.unshift(forwardVisited.keys().next().value); // Add start node

    // Reconstruct path from meeting node to goal (in reverse)
    const backwardPath: string[] = [];
    current = meetingNode;
    
    while (current && current !== backwardVisited.get(current)) {
      backwardPath.push(current);
      current = backwardVisited.get(current);
    }

    // Combine paths (remove duplicate meeting node)
    const fullPath = [...forwardPath, ...backwardPath.slice(1)];
    
    return {
      nodes: fullPath,
      cost: fullPath.length - 1 // Assuming each edge has cost 1
    };
  }
}
interface WeightedNode {
  id: string;
  edges: { neighbor: string; weight: number }[];
}

interface SearchState {
  node: string;
  parent: string;
  cost: number;
}

class BidirectionalWeightedSearch {
  private graph: Map<string, WeightedNode>;
  
  constructor(graph: WeightedNode[]) {
    this.graph = new Map();
    graph.forEach(node => this.graph.set(node.id, node));
  }

  search(startId: string, goalId: string): Path | null {
    if (!this.graph.has(startId) || !this.graph.has(goalId)) {
      return null;
    }

    if (startId === goalId) {
      return { nodes: [startId], cost: 0 };
    }

    // Priority queues for both directions (using arrays for simplicity)
    const forwardQueue: SearchState[] = [{ node: startId, parent: startId, cost: 0 }];
    const forwardVisited = new Map<string, SearchState>();
    forwardVisited.set(startId, { node: startId, parent: startId, cost: 0 });

    const backwardQueue: SearchState[] = [{ node: goalId, parent: goalId, cost: 0 }];
    const backwardVisited = new Map<string, SearchState>();
    backwardVisited.set(goalId, { node: goalId, parent: goalId, cost: 0 });

    while (forwardQueue.length > 0 && backwardQueue.length > 0) {
      // Process forward search
      this.processQueue(forwardQueue, forwardVisited, backwardVisited, false);
      
      // Check for intersection
      const intersection = this.findIntersection(forwardVisited, backwardVisited);
      if (intersection) {
        return this.constructWeightedPath(intersection, forwardVisited, backwardVisited);
      }

      // Process backward search
      this.processQueue(backwardQueue, backwardVisited, forwardVisited, true);
      
      // Check for intersection again
      const intersectionReverse = this.findIntersection(forwardVisited, backwardVisited);
      if (intersectionReverse) {
        return this.constructWeightedPath(intersectionReverse, forwardVisited, backwardVisited);
      }
    }

    return null;
  }

  private processQueue(
    queue: SearchState[],
    currentVisited: Map<string, SearchState>,
    otherVisited: Map<string, SearchState>,
    isBackward: boolean
  ) {
    if (queue.length === 0) return;

    // Sort by cost (simple priority queue)
    queue.sort((a, b) => a.cost - b.cost);
    const current = queue.shift()!;

    const node = this.graph.get(current.node)!;
    
    for (const edge of node.edges) {
      const totalCost = current.cost + edge.weight;
      
      if (!currentVisited.has(edge.neighbor) || totalCost < currentVisited.get(edge.neighbor)!.cost) {
        const newState: SearchState = {
          node: edge.neighbor,
          parent: current.node,
          cost: totalCost
        };
        
        currentVisited.set(edge.neighbor, newState);
        queue.push(newState);
      }
    }
  }

  private findIntersection(
    forwardVisited: Map<string, SearchState>,
    backwardVisited: Map<string, SearchState>
  ): string | null {
    for (const [nodeId] of forwardVisited) {
      if (backwardVisited.has(nodeId)) {
        return nodeId;
      }
    }
    return null;
  }

  private constructWeightedPath(
    meetingNode: string,
    forwardVisited: Map<string, SearchState>,
    backwardVisited: Map<string, SearchState>
  ): Path {
    const forwardState = forwardVisited.get(meetingNode)!;
    const backwardState = backwardVisited.get(meetingNode)!;

    // Reconstruct forward path
    const forwardPath: string[] = [];
    let current: SearchState | undefined = forwardState;
    
    while (current && current.node !== current.parent) {
      forwardPath.unshift(current.node);
      current = forwardVisited.get(current.parent);
    }
    forwardPath.unshift(forwardState.parent);

    // Reconstruct backward path
    const backwardPath: string[] = [];
    current = backwardState;
    
    while (current && current.node !== current.parent) {
      backwardPath.push(current.node);
      current = backwardVisited.get(current.parent);
    }

    // Combine paths and calculate total cost
    const fullPath = [...forwardPath, ...backwardPath.slice(1)];
    const totalCost = forwardState.cost + backwardState.cost;

    return {
      nodes: fullPath,
      cost: totalCost
    };
  }
}
// Example graph
const nodes: Node[] = [
  { id: 'A', neighbors: ['B', 'C'] },
  { id: 'B', neighbors: ['A', 'D', 'E'] },
  { id: 'C', neighbors: ['A', 'F'] },
  { id: 'D', neighbors: ['B'] },
  { id: 'E', neighbors: ['B', 'F'] },
  { id: 'F', neighbors: ['C', 'E', 'G'] },
  { id: 'G', neighbors: ['F'] }
];

// Create and use the search
const search = new BidirectionalSearch(nodes);
const path = search.search('A', 'G');

if (path) {
  console.log('Path found:', path.nodes.join(' -> '));
  console.log('Total cost:', path.cost);
} else {
  console.log('No path found');
}
