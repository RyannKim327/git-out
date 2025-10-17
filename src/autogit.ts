interface GraphNode {
  id: string;
  neighbors: string[];
}

interface SearchResult {
  path: string[];
  depth: number;
}

class BreadthLimitedSearch {
  private graph: Map<string, GraphNode>;
  
  constructor(graph: GraphNode[]) {
    this.graph = new Map();
    graph.forEach(node => this.graph.set(node.id, node));
  }

  search(
    startId: string, 
    targetId: string, 
    maxDepth: number
  ): SearchResult | null {
    if (!this.graph.has(startId) || !this.graph.has(targetId)) {
      return null;
    }

    const queue: { nodeId: string; path: string[]; depth: number }[] = [];
    const visited = new Set<string>();
    
    queue.push({ nodeId: startId, path: [startId], depth: 0 });
    visited.add(startId);

    while (queue.length > 0) {
      const current = queue.shift()!;
      
      if (current.nodeId === targetId) {
        return {
          path: current.path,
          depth: current.depth
        };
      }

      // Stop if we've reached the maximum depth
      if (current.depth >= maxDepth) {
        continue;
      }

      const currentNode = this.graph.get(current.nodeId)!;
      
      for (const neighborId of currentNode.neighbors) {
        if (!visited.has(neighborId)) {
          visited.add(neighborId);
          queue.push({
            nodeId: neighborId,
            path: [...current.path, neighborId],
            depth: current.depth + 1
          });
        }
      }
    }

    return null;
  }
}
interface AdvancedGraphNode {
  id: string;
  neighbors: { id: string; cost?: number }[];
  heuristic?: number; // For informed search
}

interface AdvancedSearchResult {
  path: string[];
  depth: number;
  cost: number;
  nodesVisited: number;
}

class AdvancedBreadthLimitedSearch {
  private graph: Map<string, AdvancedGraphNode>;
  
  constructor(graph: AdvancedGraphNode[]) {
    this.graph = new Map();
    graph.forEach(node => this.graph.set(node.id, node));
  }

  search(
    startId: string, 
    targetId: string, 
    maxDepth: number,
    useHeuristic: boolean = false
  ): AdvancedSearchResult | null {
    if (!this.graph.has(startId) || !this.graph.has(targetId)) {
      return null;
    }

    const queue: {
      nodeId: string;
      path: string[];
      depth: number;
      cost: number;
      priority?: number;
    }[] = [];
    
    const visited = new Set<string>();
    let nodesVisited = 0;

    // Initialize with start node
    queue.push({
      nodeId: startId,
      path: [startId],
      depth: 0,
      cost: 0,
      priority: useHeuristic ? this.calculatePriority(startId, targetId, 0) : 0
    });

    visited.add(startId);

    while (queue.length > 0) {
      // Sort by priority if using heuristic
      if (useHeuristic) {
        queue.sort((a, b) => (a.priority || 0) - (b.priority || 0));
      }
      
      const current = queue.shift()!;
      nodesVisited++;

      if (current.nodeId === targetId) {
        return {
          path: current.path,
          depth: current.depth,
          cost: current.cost,
          nodesVisited
        };
      }

      if (current.depth >= maxDepth) {
        continue;
      }

      const currentNode = this.graph.get(current.nodeId)!;
      
      for (const neighbor of currentNode.neighbors) {
        if (!visited.has(neighbor.id)) {
          visited.add(neighbor.id);
          
          const newCost = current.cost + (neighbor.cost || 1);
          const newDepth = current.depth + 1;
          
          const newEntry = {
            nodeId: neighbor.id,
            path: [...current.path, neighbor.id],
            depth: newDepth,
            cost: newCost,
            priority: useHeuristic 
              ? this.calculatePriority(neighbor.id, targetId, newCost)
              : undefined
          };

          queue.push(newEntry);
        }
      }
    }

    return null;
  }

  private calculatePriority(
    nodeId: string, 
    targetId: string, 
    currentCost: number
  ): number {
    const node = this.graph.get(nodeId)!;
    const target = this.graph.get(targetId)!;
    
    // Simple heuristic: cost + estimated distance to goal
    const heuristicValue = (target.heuristic || 0) - (node.heuristic || 0);
    return currentCost + Math.max(0, heuristicValue);
  }
}
// Example 1: Basic usage
const simpleGraph: GraphNode[] = [
  { id: 'A', neighbors: ['B', 'C'] },
  { id: 'B', neighbors: ['A', 'D', 'E'] },
  { id: 'C', neighbors: ['A', 'F'] },
  { id: 'D', neighbors: ['B'] },
  { id: 'E', neighbors: ['B', 'F'] },
  { id: 'F', neighbors: ['C', 'E'] }
];

const bls = new BreadthLimitedSearch(simpleGraph);
const result = bls.search('A', 'F', 2);
console.log(result); // Finds path A->C->F

// Example 2: Advanced usage with cost
const advancedGraph: AdvancedGraphNode[] = [
  { id: 'A', neighbors: [{ id: 'B', cost: 2 }, { id: 'C', cost: 1 }], heuristic: 5 },
  { id: 'B', neighbors: [{ id: 'A', cost: 2 }, { id: 'D', cost: 3 }], heuristic: 3 },
  { id: 'C', neighbors: [{ id: 'A', cost: 1 }, { id: 'F', cost: 4 }], heuristic: 4 },
  { id: 'D', neighbors: [{ id: 'B', cost: 3 }], heuristic: 2 },
  { id: 'F', neighbors: [{ id: 'C', cost: 4 }], heuristic: 1 }
];

const advancedBls = new AdvancedBreadthLimitedSearch(advancedGraph);
const advancedResult = advancedBls.search('A', 'F', 3, true);
console.log(advancedResult); // Finds optimal path considering cost and heuristic
class OptimizedBreadthLimitedSearch {
  private graph: Map<string, GraphNode>;
  
  constructor(graph: GraphNode[]) {
    this.graph = new Map();
    graph.forEach(node => this.graph.set(node.id, node));
  }

  optimizedSearch(
    startId: string, 
    targetId: string, 
    maxDepth: number
  ): SearchResult | null {
    // Use a more efficient data structure for large graphs
    const queue: { nodeId: string; path: string[]; depth: number }[] = [];
    const visited = new Map<string, number>(); // Track depth at which nodes were visited
    
    queue.push({ nodeId: startId, path: [startId], depth: 0 });
    visited.set(startId, 0);

    while (queue.length > 0) {
      const current = queue.shift()!;
      
      if (current.nodeId === targetId) {
        return {
          path: current.path,
          depth: current.depth
        };
      }

      if (current.depth >= maxDepth) {
        continue;
      }

      const currentNode = this.graph.get(current.nodeId)!;
      
      for (const neighborId of currentNode.neighbors) {
        const existingDepth = visited.get(neighborId);
        
        // Only visit if not visited or found at a deeper level
        if (existingDepth === undefined || existingDepth > current.depth + 1) {
          visited.set(neighborId, current.depth + 1);
          queue.push({
            nodeId: neighborId,
            path: [...current.path, neighborId],
            depth: current.depth + 1
          });
        }
      }
    }

    return null;
  }
}
