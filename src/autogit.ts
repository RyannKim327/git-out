interface BeamSearchOptions<T> {
  initialStates: T[];
  generateSuccessors: (state: T) => T[];
  isTerminal: (state: T) => boolean;
  getScore: (state: T) => number;
  beamWidth: number;
  maxDepth?: number;
}

class BeamSearch<T> {
  private options: BeamSearchOptions<T>;

  constructor(options: BeamSearchOptions<T>) {
    this.options = options;
  }

  search(): T[] {
    const { initialStates, beamWidth, maxDepth = Infinity } = this.options;
    let beam: T[] = [...initialStates];
    let depth = 0;

    while (depth < maxDepth && beam.length > 0) {
      const allSuccessors: T[] = [];

      // Generate all successors from current beam
      for (const state of beam) {
        if (this.options.isTerminal(state)) continue;
        
        const successors = this.options.generateSuccessors(state);
        allSuccessors.push(...successors);
      }

      if (allSuccessors.length === 0) break;

      // Score all successors and select top-k
      const scoredSuccessors = allSuccessors.map(state => ({
        state,
        score: this.options.getScore(state)
      }));

      scoredSuccessors.sort((a, b) => b.score - a.score);
      beam = scoredSuccessors.slice(0, beamWidth).map(item => item.state);

      depth++;
    }

    return beam;
  }
}
interface SearchNode<T> {
  state: T;
  score: number;
  path: T[];
  depth: number;
}

interface AdvancedBeamSearchOptions<T> {
  initialStates: T[];
  generateSuccessors: (state: T) => T[];
  isTerminal: (state: T) => boolean;
  getScore: (state: T, path: T[]) => number;
  beamWidth: number;
  maxDepth?: number;
  includePath?: boolean;
}

class AdvancedBeamSearch<T> {
  private options: AdvancedBeamSearchOptions<T>;

  constructor(options: AdvancedBeamSearchOptions<T>) {
    this.options = options;
  }

  search(): SearchNode<T>[] {
    const { initialStates, beamWidth, maxDepth = Infinity, includePath = true } = this.options;
    
    let beam: SearchNode<T>[] = initialStates.map(state => ({
      state,
      score: this.options.getScore(state, [state]),
      path: includePath ? [state] : [],
      depth: 0
    }));

    let depth = 0;

    while (depth < maxDepth && beam.length > 0) {
      const allSuccessors: SearchNode<T>[] = [];

      // Generate all successors from current beam
      for (const node of beam) {
        if (this.options.isTerminal(node.state)) continue;
        
        const successors = this.options.generateSuccessors(node.state);
        
        for (const successor of successors) {
          const newPath = includePath ? [...node.path, successor] : [];
          allSuccessors.push({
            state: successor,
            score: this.options.getScore(successor, newPath),
            path: newPath,
            depth: node.depth + 1
          });
        }
      }

      if (allSuccessors.length === 0) break;

      // Select top-k successors
      allSuccessors.sort((a, b) => b.score - a.score);
      beam = allSuccessors.slice(0, beamWidth);

      depth++;
    }

    return beam;
  }
}
// Example: Generate strings that match a target pattern
interface StringGenerationState {
  currentString: string;
  length: number;
}

const stringBeamSearch = new BeamSearch<StringGenerationState>({
  initialStates: [{ currentString: "", length: 0 }],
  beamWidth: 3,
  maxDepth: 10,

  generateSuccessors: (state) => {
    if (state.length >= 10) return [];
    
    return ['a', 'b', 'c'].map(char => ({
      currentString: state.currentString + char,
      length: state.length + 1
    }));
  },

  isTerminal: (state) => state.length >= 10,

  getScore: (state) => {
    // Score based on similarity to target "abcabcabca"
    const target = "abcabcabca";
    let score = 0;
    for (let i = 0; i < Math.min(state.currentString.length, target.length); i++) {
      if (state.currentString[i] === target[i]) {
        score++;
      }
    }
    return score;
  }
});

// Run the search
const results = stringBeamSearch.search();
console.log("Best results:", results);
interface GridPosition {
  x: number;
  y: number;
}

interface PathState {
  position: GridPosition;
  visited: GridPosition[];
}

const pathFindingBeamSearch = new AdvancedBeamSearch<PathState>({
  initialStates: [{
    position: { x: 0, y: 0 },
    visited: [{ x: 0, y: 0 }]
  }],
  beamWidth: 5,
  maxDepth: 20,
  includePath: true,

  generateSuccessors: (state) => {
    const directions = [
      { x: 1, y: 0 }, { x: -1, y: 0 },
      { x: 0, y: 1 }, { x: 0, y: -1 }
    ];

    return directions
      .map(dir => ({
        x: state.position.x + dir.x,
        y: state.position.y + dir.y
      }))
      .filter(pos => 
        pos.x >= 0 && pos.x < 5 && 
        pos.y >= 0 && pos.y < 5 &&
        !state.visited.some(v => v.x === pos.x && v.y === pos.y)
      )
      .map(position => ({
        position,
        visited: [...state.visited, position]
      }));
  },

  isTerminal: (state) => 
    state.position.x === 4 && state.position.y === 4,

  getScore: (state, path) => {
    const target = { x: 4, y: 4 };
    const distance = Math.abs(state.position.x - target.x) + 
                    Math.abs(state.position.y - target.y);
    
    // Higher score for being closer to target and shorter paths
    return (10 - distance) - (state.visited.length * 0.1);
  }
});

// Find path to target
const paths = pathFindingBeamSearch.search();
const bestPath = paths[0];
console.log("Best path:", bestPath.path);
// Helper function to get top N elements
function getTopN<T>(items: T[], n: number, scoreFn: (item: T) => number): T[] {
  return items
    .map(item => ({ item, score: scoreFn(item) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, n)
    .map(entry => entry.item);
}

// Type-safe beam search with validation
function validateBeamSearchOptions<T>(options: BeamSearchOptions<T>): boolean {
  return (
    Array.isArray(options.initialStates) &&
    typeof options.generateSuccessors === 'function' &&
    typeof options.isTerminal === 'function' &&
    typeof options.getScore === 'function' &&
    Number.isInteger(options.beamWidth) &&
    options.beamWidth > 0
  );
}
// 1. Choose appropriate beam width based on problem complexity
// 2. Implement efficient scoring functions
// 3. Consider memory usage for large state spaces
// 4. Use pruning techniques for better performance

// Example with pruning
const beamSearchWithPruning = new AdvancedBeamSearch({
  // ... options ...
  generateSuccessors: (state) => {
    const successors = /* generate successors */;
    return successors.filter(successor => 
      /* pruning condition */
      this.isPromising(successor)
    );
  }
});
