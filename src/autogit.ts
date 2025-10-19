interface Node {
  id: string;
  score: number;
  path: string[];
  // Add any other relevant properties for your use case
}

type ExpandFunction = (node: Node) => Node[];

class BeamSearch {
  private beamWidth: number;
  private expandFn: ExpandFunction;

  constructor(beamWidth: number, expandFn: ExpandFunction) {
    this.beamWidth = beamWidth;
    this.expandFn = expandFn;
  }

  /**
   * Perform beam search starting from initial nodes
   */
  search(initialNodes: Node[], maxDepth: number = 100): Node[] {
    let currentLevel: Node[] = initialNodes;
    
    for (let depth = 0; depth < maxDepth; depth++) {
      // Expand all nodes in current level
      const candidates: Node[] = [];
      
      for (const node of currentLevel) {
        const expandedNodes = this.expandFn(node);
        candidates.push(...expandedNodes);
      }
      
      // If no candidates found, break early
      if (candidates.length === 0) {
        break;
      }
      
      // Sort candidates by score and select top beamWidth
      candidates.sort((a, b) => b.score - a.score);
      currentLevel = candidates.slice(0, this.beamWidth);
    }
    
    return currentLevel;
  }

  /**
   * Search with early termination if goal is reached
   */
  searchWithGoal(
    initialNodes: Node[], 
    isGoal: (node: Node) => boolean,
    maxDepth: number = 100
  ): Node | null {
    let currentLevel: Node[] = initialNodes;
    
    for (let depth = 0; depth < maxDepth; depth++) {
      // Check if any node in current level is the goal
      const goalNode = currentLevel.find(isGoal);
      if (goalNode) {
        return goalNode;
      }
      
      // Expand nodes
      const candidates: Node[] = [];
      
      for (const node of currentLevel) {
        const expandedNodes = this.expandFn(node);
        candidates.push(...expandedNodes);
      }
      
      if (candidates.length === 0) {
        break;
      }
      
      // Select top candidates
      candidates.sort((a, b) => b.score - a.score);
      currentLevel = candidates.slice(0, this.beamWidth);
    }
    
    return null;
  }
}
// Example: Path finding with beam search
interface CityNode extends Node {
  city: string;
  distance: number;
}

// Create expand function for city path finding
const cityExpandFn: ExpandFunction = (node: CityNode) => {
  // This would typically come from your graph data
  const connections: Record<string, {city: string, distance: number}[]> = {
    'A': [{city: 'B', distance: 5}, {city: 'C', distance: 3}],
    'B': [{city: 'D', distance: 2}, {city: 'E', distance: 4}],
    'C': [{city: 'E', distance: 6}, {city: 'F', distance: 1}],
    'D': [{city: 'G', distance: 3}],
    'E': [{city: 'G', distance: 2}],
    'F': [{city: 'G', distance: 4}],
    'G': [] // Destination
  };

  const currentCity = node.city;
  const nextCities = connections[currentCity];
  
  return nextCities.map(connection => ({
    id: `${node.id}-${connection.city}`,
    score: node.score - connection.distance, // Higher score = better (less distance)
    path: [...node.path, connection.city],
    city: connection.city,
    distance: node.distance + connection.distance
  }));
};

// Example usage
const beamSearch = new BeamSearch(2, cityExpandFn);

const startNode: CityNode = {
  id: 'A',
  score: 0,
  path: ['A'],
  city: 'A',
  distance: 0
};

// Find best paths
const bestPaths = beamSearch.search([startNode], 10);
console.log('Best paths:', bestPaths);

// Find path to specific goal
const goalNode = beamSearch.searchWithGoal(
  [startNode],
  (node: CityNode) => node.city === 'G',
  10
);

if (goalNode) {
  console.log('Found path to G:', goalNode.path, 'Distance:', goalNode.distance);
} else {
  console.log('Path to G not found');
}
// Simple priority queue implementation
class PriorityQueue<T> {
  private elements: T[];
  private compareFn: (a: T, b: T) => number;

  constructor(compareFn: (a: T, b: T) => number) {
    this.elements = [];
    this.compareFn = compareFn;
  }

  enqueue(element: T): void {
    this.elements.push(element);
    this.elements.sort(this.compareFn);
  }

  dequeue(): T | undefined {
    return this.elements.shift();
  }

  size(): number {
    return this.elements.length;
  }

  peek(): T | undefined {
    return this.elements[0];
  }

  toArray(): T[] {
    return [...this.elements];
  }
}

class AdvancedBeamSearch extends BeamSearch {
  search(initialNodes: Node[], maxDepth: number = 100): Node[] {
    let currentLevel: Node[] = initialNodes;
    
    for (let depth = 0; depth < maxDepth; depth++) {
      const queue = new PriorityQueue<Node>((a, b) => b.score - a.score);
      
      for (const node of currentLevel) {
        const expandedNodes = this.expandFn(node);
        expandedNodes.forEach(n => queue.enqueue(n));
      }
      
      if (queue.size() === 0) {
        break;
      }
      
      // Get top beamWidth nodes
      currentLevel = [];
      for (let i = 0; i < this.beamWidth && queue.size() > 0; i++) {
        currentLevel.push(queue.dequeue()!);
      }
    }
    
    return currentLevel;
  }
}
