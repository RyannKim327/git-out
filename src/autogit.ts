interface BeamSearchOptions<T> {
  // Function to generate next possible states from current state
  expand: (state: T) => T[];
  // Function to evaluate how "good" a state is (higher = better)
  heuristic: (state: T) => number;
  // Maximum number of states to keep at each step
  beamWidth: number;
  // Maximum depth to search
  maxDepth?: number;
  // Optional function to check if we've reached a goal state
  isGoal?: (state: T) => boolean;
  // Optional function to compare states for equality
  stateEquals?: (a: T, b: T) => boolean;
}

interface ScoredState<T> {
  state: T;
  score: number;
  path?: T[]; // Optional: keep track of the path taken
}

class BeamSearch<T> {
  private options: Required<BeamSearchOptions<T>>;

  constructor(options: BeamSearchOptions<T>) {
    this.options = {
      maxDepth: options.maxDepth ?? 100,
      isGoal: options.isGoal ?? (() => false),
      stateEquals: options.stateEquals ?? ((a, b) => a === b),
      ...options
    };
  }

  /**
   * Perform beam search starting from initial states
   */
  search(initialStates: T[]): ScoredState<T>[] {
    let beam: ScoredState<T>[] = initialStates.map(state => ({
      state,
      score: this.options.heuristic(state),
      path: [state] // Track the path if needed
    }));

    // Sort initial beam by heuristic score
    beam.sort((a, b) => b.score - a.score);

    for (let depth = 0; depth < this.options.maxDepth; depth++) {
      const candidates: ScoredState<T>[] = [];

      // Generate candidates from current beam
      for (const current of beam) {
        const nextStates = this.options.expand(current.state);
        
        for (const nextState of nextStates) {
          const score = this.options.heuristic(nextState);
          const path = current.path ? [...current.path, nextState] : undefined;
          
          candidates.push({ state: nextState, score, path });
        }
      }

      // If no candidates were generated, we're done
      if (candidates.length === 0) {
        break;
      }

      // Sort candidates by score and take top beamWidth
      candidates.sort((a, b) => b.score - a.score);
      
      // Remove duplicates if stateEquals is provided
      const uniqueCandidates = this.removeDuplicates(
        candidates.slice(0, this.options.beamWidth * 2), // Consider more to account for duplicates
        this.options.stateEquals
      );

      beam = uniqueCandidates.slice(0, this.options.beamWidth);

      // Check if we've reached any goal states
      const goalStates = beam.filter(item => this.options.isGoal(item.state));
      if (goalStates.length > 0) {
        return goalStates;
      }
    }

    return beam;
  }

  /**
   * Remove duplicate states from candidate list
   */
  private removeDuplicates(
    candidates: ScoredState<T>[], 
    stateEquals: (a: T, b: T) => boolean
  ): ScoredState<T>[] {
    const unique: ScoredState<T>[] = [];
    
    for (const candidate of candidates) {
      if (!unique.some(existing => stateEquals(existing.state, candidate.state))) {
        unique.push(candidate);
      }
    }
    
    return unique;
  }
}

// Example usage: Word completion/search
interface WordState {
  current: string;
  isComplete: boolean;
}

// Example 1: Word completion
function createWordCompletionExample(): void {
  const dictionary = ['apple', 'application', 'apply', 'appliance', 'aptitude', 'approach'];
  const prefix = 'app';

  const beamSearch = new BeamSearch<WordState>({
    expand: (state: WordState) => {
      if (state.isComplete) return [];
      
      // Generate possible next characters (simplified example)
      const nextChars = ['l', 'r', 't', 'i', 'o'];
      return nextChars.map(char => ({
        current: state.current + char,
        isComplete: dictionary.some(word => word === state.current + char)
      }));
    },
    
    heuristic: (state: WordState) => {
      // Score based on how many dictionary words match the prefix
      const matches = dictionary.filter(word => 
        word.startsWith(state.current)
      ).length;
      
      // Bonus for complete words
      const completeBonus = state.isComplete ? 10 : 0;
      
      return matches + completeBonus;
    },
    
    beamWidth: 3,
    maxDepth: 10,
    
    isGoal: (state: WordState) => state.isComplete,
    
    stateEquals: (a, b) => a.current === b.current
  });

  const initialStates: WordState[] = [{ current: prefix, isComplete: false }];
  const results = beamSearch.search(initialStates);
  
  console.log('Word completion results:');
  results.forEach((result, i) => {
    console.log(`${i + 1}. "${result.state.current}" - score: ${result.score}`);
  });
}

// Example 2: Path finding in a grid
interface GridState {
  x: number;
  y: number;
  path: {x: number; y: number}[];
}

function createGridPathfindingExample(): void {
  const target = { x: 5, y: 5 };
  const obstacles = [{x: 2, y: 2}, {x: 3, y: 3}, {x: 4, y: 4}];

  const beamSearch = new BeamSearch<GridState>({
    expand: (state: GridState) => {
      const moves = [
        {dx: 1, dy: 0}, {dx: -1, dy: 0}, // right, left
        {dx: 0, dy: 1}, {dx: 0, dy: -1}, // down, up
      ];
      
      return moves
        .map(move => ({
          x: state.x + move.dx,
          y: state.y + move.dy,
          path: [...state.path, {x: state.x + move.dx, y: state.y + move.dy}]
        }))
        .filter(newState => 
          newState.x >= 0 && newState.x <= 10 && 
          newState.y >= 0 && newState.y <= 10 &&
          !obstacles.some(obs => obs.x === newState.x && obs.y === newState.y)
        );
    },
    
    heuristic: (state: GridState) => {
      // Manhattan distance to target (negative because we want to minimize distance)
      const distance = Math.abs(state.x - target.x) + Math.abs(state.y - target.y);
      return -distance; // Higher score = closer to target
    },
    
    beamWidth: 2,
    maxDepth: 20,
    
    isGoal: (state: GridState) => state.x === target.x && state.y === target.y,
    
    stateEquals: (a, b) => a.x === b.x && a.y === b.y
  });

  const initialStates: GridState[] = [{ x: 0, y: 0, path: [{x: 0, y: 0}] }];
  const results = beamSearch.search(initialStates);
  
  console.log('\nGrid pathfinding results:');
  const goal = results.find(result => result.state.x === target.x && result.state.y === target.y);
  if (goal) {
    console.log('Path found! Length:', goal.state.path.length);
    console.log('Path:', goal.state.path);
  } else {
    console.log('No path found. Best effort:', results[0]?.state);
  }
}

// Run examples
createWordCompletionExample();
createGridPathfindingExample();
