interface BeamSearchNode<T> {
  state: T;
  score: number;
  path?: any[]; // Optional: track the path taken
}

interface BeamSearchOptions<T> {
  beamWidth: number;
  maxDepth?: number;
  getSuccessors: (state: T) => BeamSearchNode<T>[];
  isTerminal?: (state: T) => boolean;
}

class BeamSearch<T> {
  private options: BeamSearchOptions<T>;

  constructor(options: BeamSearchOptions<T>) {
    this.options = {
      maxDepth: options.maxDepth || 100,
      ...options
    };
  }

  search(initialState: T): BeamSearchNode<T>[] {
    let currentBeam: BeamSearchNode<T>[] = [
      { state: initialState, score: 0, path: [initialState] }
    ];

    for (let depth = 0; depth < this.options.maxDepth!; depth++) {
      const allSuccessors: BeamSearchNode<T>[] = [];

      // Generate all successors from current beam
      for (const node of currentBeam) {
        // Skip terminal nodes
        if (this.options.isTerminal && this.options.isTerminal(node.state)) {
          continue;
        }

        const successors = this.options.getSuccessors(node.state);
        for (const successor of successors) {
          allSuccessors.push({
            state: successor.state,
            score: node.score + successor.score,
            path: [...node.path!, successor.state]
          });
        }
      }

      // If no successors, return current beam
      if (allSuccessors.length === 0) {
        return currentBeam;
      }

      // Sort and select top-k successors
      allSuccessors.sort((a, b) => b.score - a.score);
      currentBeam = allSuccessors.slice(0, this.options.beamWidth);
    }

    return currentBeam;
  }
}
interface GridPosition {
  x: number;
  y: number;
}

// Example: Find best paths on a grid
const gridSearch = new BeamSearch<GridPosition>({
  beamWidth: 3,
  maxDepth: 10,
  getSuccessors: (pos: GridPosition) => {
    const moves = [
      { x: pos.x + 1, y: pos.y }, // right
      { x: pos.x, y: pos.y + 1 }, // down
      { x: pos.x - 1, y: pos.y }, // left
      { x: pos.x, y: pos.y - 1 }  // up
    ];

    return moves.map(newPos => ({
      state: newPos,
      score: -Math.abs(newPos.x - 5) - Math.abs(newPos.y - 5) // Score based on distance to target (5,5)
    }));
  },
  isTerminal: (pos: GridPosition) => pos.x === 5 && pos.y === 5
});

const results = gridSearch.search({ x: 0, y: 0 });
console.log("Best paths found:", results);
// Example: Generate sequences with beam search
interface SequenceState {
  sequence: number[];
  length: number;
}

const sequenceGenerator = new BeamSearch<SequenceState>({
  beamWidth: 2,
  maxDepth: 5,
  getSuccessors: (state: SequenceState) => {
    const successors: BeamSearchNode<SequenceState>[] = [];
    
    // Add numbers 1-3 to the sequence
    for (let i = 1; i <= 3; i++) {
      const newSequence = [...state.sequence, i];
      // Score based on sum (higher is better)
      const score = newSequence.reduce((sum, num) => sum + num, 0);
      
      successors.push({
        state: {
          sequence: newSequence,
          length: state.length + 1
        },
        score: score
      });
    }
    
    return successors;
  }
});

const sequenceResults = sequenceGenerator.search({ 
  sequence: [], 
  length: 0 
});
console.log("Best sequences:", sequenceResults);
interface WordState {
  text: string;
  lastWord: string;
}

// Example: Text generation with language model-like scoring
const textGenerator = new BeamSearch<WordState>({
  beamWidth: 2,
  maxDepth: 4,
  getSuccessors: (state: WordState) => {
    const nextWords = ['the', 'a', 'quick', 'brown', 'fox'];
    const successors: BeamSearchNode<WordState>[] = [];
    
    for (const word of nextWords) {
      // Simple scoring based on word length and position
      let score = word.length;
      if (state.lastWord === 'the') score += 2; // Bonus for following 'the'
      if (word === 'fox') score += 5; // Bonus for 'fox'
      
      successors.push({
        state: {
          text: state.text + ' ' + word,
          lastWord: word
        },
        score: score
      });
    }
    
    return successors;
  }
});

const textResults = textGenerator.search({ 
  text: '', 
  lastWord: '' 
});
console.log("Generated texts:", textResults);
