// Define a generic interface for nodes in the search space
interface BeamSearchNode<T> {
  state: T;
  path: T[]; // Path from start to current state
  score: number; // Heuristic score (higher is better)
  depth: number;
}

// Generic Beam Search implementation
class BeamSearch<T> {
  private beamWidth: number;
  private maxDepth: number;
  private expandFn: (node: BeamSearchNode<T>) => BeamSearchNode<T>[];
  private scoreFn: (node: BeamSearchNode<T>) => number;

  constructor(
    beamWidth: number,
    maxDepth: number,
    expandFn: (node: BeamSearchNode<T>) => BeamSearchNode<T>[],
    scoreFn: (node: BeamSearchNode<T>) => number
  ) {
    this.beamWidth = beamWidth;
    this.maxDepth = maxDepth;
    this.expandFn = expandFn;
    this.scoreFn = scoreFn;
  }

  /**
   * Perform beam search from the initial state
   */
  search(initialState: T): { bestPath: T[]; bestScore: number } | null {
    // Initialize beam with starting node
    const initialNode: BeamSearchNode<T> = {
      state: initialState,
      path: [initialState],
      score: this.scoreFn({ state: initialState, path: [initialState], depth: 0 }),
      depth: 0
    };

    let currentBeam: BeamSearchNode<T>[] = [initialNode];

    for (let depth = 1; depth <= this.maxDepth; depth++) {
      const nextBeam: BeamSearchNode<T>[] = [];

      // Expand all nodes in current beam
      for (const node of currentBeam) {
        const children = this.expandFn(node);
        
        // Add children to next beam
        nextBeam.push(...children);
      }

      // If no children, no solution found
      if (nextBeam.length === 0) {
        break;
      }

      // Sort by score (descending) and keep only top beamWidth
      nextBeam.sort((a, b) => b.score - a.score);
      currentBeam = nextBeam.slice(0, this.beamWidth);

      // Check if we found a solution (you can modify this condition)
      if (this.isSolution(currentBeam)) {
        const bestNode = currentBeam[0];
        return {
          bestPath: bestNode.path,
          bestScore: bestNode.score
        };
      }
    }

    // Return best path from final beam if no explicit solution found
    if (currentBeam.length > 0) {
      const bestNode = currentBeam[0];
      return {
        bestPath: bestNode.path,
        bestScore: bestNode.score
      };
    }

    return null; // No path found
  }

  /**
   * Check if any node in the beam represents a solution
   * Override this method for your specific problem
   */
  private isSolution(beam: BeamSearchNode<T>[]): boolean {
    // Default: return true if we reached max depth
    return beam.some(node => node.depth >= this.maxDepth);
  }
}

// Example usage: Text generation with beam search
interface WordNode {
  word: string;
  path: string[];
  score: number;
  depth: number;
}

class TextBeamSearch extends BeamSearch<string> {
  private vocabulary: string[];
  private wordScoreFn: (context: string[], candidate: string) => number;

  constructor(
    vocabulary: string[],
    beamWidth: number = 3,
    maxDepth: number = 10,
    wordScoreFn: (context: string[], candidate: string) => number = (context, word) => word.length
  ) {
    super(
      beamWidth,
      maxDepth,
      (node: WordNode) => this.expandTextNode(node),
      (node: WordNode) => node.score
    );
    this.vocabulary = vocabulary;
    this.wordScoreFn = wordScoreFn;
  }

  private expandTextNode(node: WordNode): WordNode[] {
    const children: WordNode[] = [];
    
    // Generate next words (in a real scenario, this would come from a language model)
    for (const word of this.vocabulary) {
      const newPath = [...node.path, word];
      const context = newPath.slice(-3); // Last 3 words as context
      const score = this.wordScoreFn(context, word);
      
      const childNode: WordNode = {
        word,
        path: newPath,
        score: score,
        depth: node.depth + 1
      };
      
      children.push(childNode);
    }
    
    return children;
  }

  /**
   * Override the search method to work with WordNode
   */
  search(startWord: string): { bestPath: string[]; bestScore: number } | null {
    const initialNode: WordNode = {
      word: startWord,
      path: [startWord],
      score: 0,
      depth: 0
    };

    return super.search(startWord);
  }
}

// Example usage: 8-Queens problem with beam search
interface BoardState {
  board: number[][]; // 8x8 board where row i, col board[i][0] has a queen
  path: number[]; // Sequence of queen placements (column positions)
  score: number;
  depth: number;
}

function isValidPlacement(board: number[][], row: number, col: number): boolean {
  // Check column
  for (let i = 0; i < row; i++) {
    if (board[i][0] === col) return false;
    
    // Check diagonals
    if (Math.abs(board[i][0] - col) === Math.abs(i - row)) {
      return false;
    }
  }
  return true;
}

function queensHeuristic(state: BoardState): number {
  let conflicts = 0;
  const positions = state.path;
  
  for (let i = 0; i < positions.length; i++) {
    for (let j = i + 1; j < positions.length; j++) {
      // Check if queens attack each other
      if (Math.abs(positions[i] - positions[j]) === Math.abs(i - j)) {
        conflicts++;
      }
    }
  }
  
  // Higher score for fewer conflicts, penalize incomplete boards
  return (positions.length * 10) - (conflicts * 2);
}

class QueensBeamSearch extends BeamSearch<number> {
  constructor(beamWidth: number = 100, maxDepth: number = 8) {
    super(
      beamWidth,
      maxDepth,
      (node: BoardState) => this.expandQueensNode(node),
      queensHeuristic
    );
  }

  private expandQueensNode(node: BoardState): BoardState[] {
    const children: BoardState[] = [];
    const nextRow = node.depth;
    
    if (nextRow >= 8) return children; // Complete board
    
    // Try placing queen in each column of next row
    for (let col = 0; col < 8; col++) {
      const newBoard = [...node.path];
      newBoard[nextRow] = col;
      
      if (isValidPlacement(newBoard.map((c, r) => [c]), nextRow, col)) {
        const childState: BoardState = {
          board: newBoard.map((c) => [c]), // Simplified board representation
          path: [...newBoard],
          score: queensHeuristic({
            board: newBoard.map((c) => [c]),
            path: [...newBoard],
            depth: nextRow + 1,
            score: 0
          }),
          depth: nextRow + 1
        };
        
        children.push(childState);
      }
    }
    
    return children;
  }

  isSolution(beam: BoardState[]): boolean {
    return beam.some(node => node.depth === 8 && this.isValidSolution(node));
  }

  private isValidSolution(node: BoardState): boolean {
    // Check if all queens are placed without conflicts
    for (let i = 0; i < 8; i++) {
      for (let j = i + 1; j < 8; j++) {
        if (Math.abs(node.path[i] - node.path[j]) === Math.abs(i - j)) {
          return false;
        }
      }
    }
    return true;
  }
}

// Usage examples:

// Example 1: Text generation
const vocabulary = ['the', 'quick', 'brown', 'fox', 'jumps', 'over', 'lazy', 'dog', 'and', 'runs'];
const textSearch = new TextBeamSearch(vocabulary, 3, 5, (context, word) => {
  // Simple scoring: prefer longer words and certain patterns
  const baseScore = word.length;
  const bonus = context.includes('the') ? 2 : 0;
  return baseScore + bonus;
});

const textResult = textSearch.search('The');
console.log('Text generation result:', textResult);

// Example 2: 8-Queens problem
const queensSearch = new QueensBeamSearch(200, 8);
const queensResult = queensSearch.search(0); // Start with empty board

if (queensResult) {
  console.log('8-Queens solution found:');
  console.log('Queen positions (row -> column):', queensResult.bestPath);
  console.log('Score:', queensResult.bestScore);
} else {
  console.log('No solution found');
}

// Generic usage example
function exampleGenericUsage() {
  // Define your problem-specific expand and score functions
  const expandFn = (node: BeamSearchNode<number>) => {
    // Generate neighbors (example: increment/decrement)
    return [
      { state: node.state + 1, path: [...node.path, node.state + 1], score: 0, depth: node.depth + 1 },
      { state: node.state - 1, path: [...node.path, node.state - 1], score: 0, depth: node.depth + 1 }
    ];
  };

  const scoreFn = (node: BeamSearchNode<number>) => {
    // Example: score based on proximity to target
    return Math.abs(100 - node.state); // Want to reach 100
  };

  const genericSearch = new BeamSearch<number>(5, 20, expandFn, scoreFn);
  const result = genericSearch.search(0);
  
  if (result) {
    console.log('Generic search result:', {
      path: result.bestPath,
      score: result.bestScore
    });
  }
}

exampleGenericUsage();
