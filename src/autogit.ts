interface BeamSearchNode<T> {
  state: T;
  score: number;
  path: T[];
}

interface BeamSearchOptions<T> {
  getNextStates: (state: T) => T[];
  getScore: (state: T) => number;
  isTerminal?: (state: T) => boolean;
  beamWidth: number;
  maxDepth?: number;
}

function beamSearch<T>(
  initialState: T,
  options: BeamSearchOptions<T>
): BeamSearchNode<T> {
  const {
    getNextStates,
    getScore,
    isTerminal = () => false,
    beamWidth,
    maxDepth = Infinity
  } = options;

  // Initialize beam with starting state
  let beam: BeamSearchNode<T>[] = [
    {
      state: initialState,
      score: getScore(initialState),
      path: [initialState]
    }
  ];

  let depth = 0;

  while (depth < maxDepth && beam.length > 0) {
    const candidates: BeamSearchNode<T>[] = [];

    // Generate next states for all nodes in current beam
    for (const node of beam) {
      if (isTerminal(node.state)) {
        candidates.push(node);
        continue;
      }

      const nextStates = getNextStates(node.state);
      
      for (const nextState of nextStates) {
        const score = getScore(nextState);
        candidates.push({
          state: nextState,
          score: node.score + score, // Accumulated score
          path: [...node.path, nextState]
        });
      }
    }

    // Sort candidates by score and select top beamWidth
    candidates.sort((a, b) => b.score - a.score);
    beam = candidates.slice(0, beamWidth);
    
    depth++;
  }

  // Return the best node found
  return beam[0];
}
interface GridPosition {
  x: number;
  y: number;
}

// Example: Find path from start to goal on a grid
const start: GridPosition = { x: 0, y: 0 };
const goal: GridPosition = { x: 4, y: 4 };

const result = beamSearch<GridPosition>(start, {
  getNextStates: (pos) => {
    // Generate adjacent positions (up, down, left, right)
    return [
      { x: pos.x + 1, y: pos.y },
      { x: pos.x - 1, y: pos.y },
      { x: pos.x, y: pos.y + 1 },
      { x: pos.x, y: pos.y - 1 }
    ].filter(p => p.x >= 0 && p.x < 5 && p.y >= 0 && p.y < 5); // Boundary check
  },
  
  getScore: (pos) => {
    // Heuristic: negative distance to goal (closer = better)
    const distance = Math.abs(pos.x - goal.x) + Math.abs(pos.y - goal.y);
    return -distance;
  },
  
  isTerminal: (pos) => pos.x === goal.x && pos.y === goal.y,
  
  beamWidth: 3,
  maxDepth: 20
});

console.log("Best path:", result.path);
console.log("Final score:", result.score);
interface AdvancedBeamSearchOptions<T> extends BeamSearchOptions<T> {
  compareNodes?: (a: BeamSearchNode<T>, b: BeamSearchNode<T>) => number;
  shouldPrune?: (node: BeamSearchNode<T>, depth: number) => boolean;
}

function advancedBeamSearch<T>(
  initialState: T,
  options: AdvancedBeamSearchOptions<T>
): BeamSearchNode<T> {
  const {
    getNextStates,
    getScore,
    isTerminal = () => false,
    beamWidth,
    maxDepth = Infinity,
    compareNodes = (a, b) => b.score - a.score, // Default: higher score better
    shouldPrune = () => false
  } = options;

  let beam: BeamSearchNode<T>[] = [
    {
      state: initialState,
      score: getScore(initialState),
      path: [initialState]
    }
  ];

  let depth = 0;
  let bestSolution: BeamSearchNode<T> | null = null;

  while (depth < maxDepth && beam.length > 0) {
    const candidates: BeamSearchNode<T>[] = [];

    for (const node of beam) {
      if (shouldPrune(node, depth)) continue;

      if (isTerminal(node.state)) {
        if (!bestSolution || compareNodes(node, bestSolution) > 0) {
          bestSolution = node;
        }
        continue;
      }

      const nextStates = getNextStates(node.state);
      
      for (const nextState of nextStates) {
        const score = getScore(nextState);
        candidates.push({
          state: nextState,
          score: node.score + score,
          path: [...node.path, nextState]
        });
      }
    }

    // Sort and select top candidates
    candidates.sort(compareNodes);
    beam = candidates.slice(0, beamWidth);
    
    depth++;
  }

  return bestSolution || beam[0];
}
// Example with custom comparison and pruning
const result = advancedBeamSearch(start, {
  getNextStates: (pos) => [/* ... */],
  getScore: (pos) => - (Math.abs(pos.x - goal.x) + Math.abs(pos.y - goal.y)),
  compareNodes: (a, b) => b.score - a.score, // Maximize score
  shouldPrune: (node, depth) => depth > 50, // Prevent too deep searches
  beamWidth: 5,
  maxDepth: 100
});
