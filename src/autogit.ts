interface Graph<T> {
  getNeighbors(node: T): T[];
}

// Bidirectional search result
interface BidirectionalResult<T> {
  path: T[];
  visitedCount: number;
  found: boolean;
}

// Node with parent reference for path reconstruction
interface NodeWithParent<T> {
  node: T;
  parent: T | null;
}
class BidirectionalSearch<T> {
  constructor(private graph: Graph<T>) {}

  search(start: T, goal: T): BidirectionalResult<T> {
    // Early exit if start equals goal
    if (start === goal) {
      return {
        path: [start],
        visitedCount: 1,
        found: true
      };
    }

    // Frontier queues from both directions
    const forwardQueue: NodeWithParent<T>[] = [{ node: start, parent: null }];
    const backwardQueue: NodeWithParent<T>[] = [{ node: goal, parent: null }];

    // Visited sets with parent information
    const forwardVisited = new Map<T, T | null>();
    const backwardVisited = new Map<T, T | null>();

    forwardVisited.set(start, null);
    backwardVisited.set(goal, null);

    let visitedCount = 2; // start and goal

    while (forwardQueue.length > 0 && backwardQueue.length > 0) {
      // Expand forward search
      const forwardResult = this.expandSearch(
        forwardQueue,
        forwardVisited,
        backwardVisited,
        false // from start
      );
      
      if (forwardResult.found) {
        return {
          path: this.constructPath(forwardResult.meetingPoint!, forwardVisited, backwardVisited),
          visitedCount: visitedCount + forwardResult.visitedCount,
          found: true
        };
      }
      visitedCount += forwardResult.visitedCount;

      // Expand backward search
      const backwardResult = this.expandSearch(
        backwardQueue,
        backwardVisited,
        forwardVisited,
        true // from goal
      );
      
      if (backwardResult.found) {
        return {
          path: this.constructPath(backwardResult.meetingPoint!, forwardVisited, backwardVisited),
          visitedCount: visitedCount + backwardResult.visitedCount,
          found: true
        };
      }
      visitedCount += backwardResult.visitedCount;
    }

    return {
      path: [],
      visitedCount,
      found: false
    };
  }

  private expandSearch(
    queue: NodeWithParent<T>[],
    visitedFromThisSide: Map<T, T | null>,
    visitedFromOtherSide: Map<T, T | null>,
    isBackward: boolean
  ): { found: boolean; meetingPoint?: T; visitedCount: number } {
    if (queue.length === 0) {
      return { found: false, visitedCount: 0 };
    }

    const current = queue.shift()!;
    const neighbors = this.graph.getNeighbors(current.node);

    let visitedThisExpansion = 0;

    for (const neighbor of neighbors) {
      if (!visitedFromThisSide.has(neighbor)) {
        visitedFromThisSide.set(neighbor, current.node);
        queue.push({ node: neighbor, parent: current.node });
        visitedThisExpansion++;

        // Check if this node has been visited from the other side
        if (visitedFromOtherSide.has(neighbor)) {
          return { found: true, meetingPoint: neighbor, visitedCount: visitedThisExpansion };
        }
      }
    }

    return { found: false, visitedCount: visitedThisExpansion };
  }

  private constructPath(
    meetingPoint: T,
    forwardVisited: Map<T, T | null>,
    backwardVisited: Map<T, T | null>
  ): T[] {
    // Build path from start to meeting point
    const forwardPath: T[] = [];
    let current: T | null = meetingPoint;
    
    while (current !== null) {
      forwardPath.unshift(current);
      current = forwardVisited.get(current) || null;
    }

    // Build path from meeting point to goal (excluding meeting point)
    const backwardPath: T[] = [];
    current = backwardVisited.get(meetingPoint) || null;
    
    while (current !== null) {
      backwardPath.push(current);
      current = backwardVisited.get(current) || null;
    }

    return [...forwardPath, ...backwardPath];
  }
}
class GridGraph implements Graph<[number, number]> {
  constructor(private obstacles: Set<string> = new Set()) {}

  getNeighbors([x, y]: [number, number]): [number, number][] {
    const neighbors: [number, number][] = [
      [x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1] // 4-directional
      // For 8-directional: add diagonals
      // [x + 1, y + 1], [x + 1, y - 1], [x - 1, y + 1], [x - 1, y - 1]
    ];

    return neighbors.filter(([nx, ny]) => 
      !this.obstacles.has(`${nx},${ny}`)
    );
  }
}
class WordLadderGraph implements Graph<string> {
  constructor(private wordList: Set<string>) {}

  getNeighbors(word: string): string[] {
    const neighbors: string[] = [];
    
    for (let i = 0; i < word.length; i++) {
      for (let c = 97; c <= 122; c++) { // a-z
        const char = String.fromCharCode(c);
        if (char !== word[i]) {
          const newWord = word.substring(0, i) + char + word.substring(i + 1);
          if (this.wordList.has(newWord)) {
            neighbors.push(newWord);
          }
        }
      }
    }
    
    return neighbors;
  }
}
// Example 1: Grid pathfinding
const gridGraph = new GridGraph(new Set(['1,1', '2,1', '3,1']));
const gridSearch = new BidirectionalSearch(gridGraph);

const result1 = gridSearch.search([0, 0], [4, 0]);
console.log('Grid Path:', result1.path);
console.log('Visited:', result1.visitedCount);
console.log('Found:', result1.found);

// Example 2: Word ladder
const wordList = new Set(['hot', 'dot', 'dog', 'lot', 'log', 'cog']);
const wordGraph = new WordLadderGraph(wordList);
const wordSearch = new BidirectionalSearch(wordGraph);

const result2 = wordSearch.search('hit', 'cog');
console.log('Word Ladder Path:', result2.path);
console.log('Visited:', result2.visitedCount);
console.log('Found:', result2.found);

// Example 3: Simple graph
class SimpleGraph implements Graph<number> {
  private adjacencyList: Map<number, number[]> = new Map([
    [1, [2, 3]],
    [2, [1, 4, 5]],
    [3, [1, 6]],
    [4, [2, 7]],
    [5, [2, 7]],
    [6, [3, 7]],
    [7, [4, 5, 6]]
  ]);

  getNeighbors(node: number): number[] {
    return this.adjacencyList.get(node) || [];
  }
}

const simpleGraph = new SimpleGraph();
const simpleSearch = new BidirectionalSearch(simpleGraph);

const result3 = simpleSearch.search(1, 7);
console.log('Simple Graph Path:', result3.path);
console.log('Visited:', result3.visitedCount);
console.log('Found:', result3.found);
function comparePerformance<T>(
  start: T,
  goal: T,
  graph: Graph<T>
): void {
  const bidirectional = new BidirectionalSearch(graph);
  
  console.time('Bidirectional Search');
  const biResult = bidirectional.search(start, goal);
  console.timeEnd('Bidirectional Search');
  
  console.log('Bidirectional - Path length:', biResult.path.length);
  console.log('Bidirectional - Nodes visited:', biResult.visitedCount);
  console.log('Bidirectional - Found:', biResult.found);
}
