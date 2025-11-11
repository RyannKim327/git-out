interface BeamSearchNode<T> {
  state: T;
  score: number;
  path: T[]; // Optional: track the path to this state
}

interface BeamSearchOptions<T> {
  initialState: T;
  expand: (state: T) => BeamSearchNode<T>[];
  isTerminal: (state: T) => boolean;
  beamWidth: number;
  maxDepth?: number;
  scoreFn?: (state: T) => number; // Alternative scoring approach
}

function beamSearch<T>(options: BeamSearchOptions<T>): BeamSearchNode<T> {
  const {
    initialState,
    expand,
    isTerminal,
    beamWidth,
    maxDepth = Infinity,
    scoreFn
  } = options;

  // Initialize beam with starting node
  let beam: BeamSearchNode<T>[] = [
    {
      state: initialState,
      score: 0,
      path: [initialState]
    }
  ];

  let depth = 0;

  while (depth < maxDepth && beam.length > 0) {
    const candidates: BeamSearchNode<T>[] = [];

    // Expand all nodes in current beam
    for (const node of beam) {
      if (isTerminal(node.state)) {
        // Return early if terminal state found
        return node;
      }

      const expandedNodes = expand(node.state);
      
      for (const newNode of expandedNodes) {
        // Calculate cumulative score
        const totalScore = node.score + newNode.score;
        const path = [...node.path, newNode.state];
        
        candidates.push({
          state: newNode.state,
          score: totalScore,
          path
        });
      }
    }

    // Sort candidates by score and select top beamWidth
    candidates.sort((a, b) => b.score - a.score); // Descending order
    beam = candidates.slice(0, beamWidth);
    
    depth++;
  }

  // Return the best found node
  beam.sort((a, b) => b.score - a.score);
  return beam[0];
}
interface WordNode {
  word: string;
  score: number;
}

// Simple scoring function (favor longer words with common letters)
function scoreWord(word: string): number {
  const commonLetters = ['e', 't', 'a', 'o', 'i', 'n'];
  let score = word.length * 10; // Base score for length
  
  for (const letter of word) {
    if (commonLetters.includes(letter)) {
      score += 5;
    }
  }
  
  return score;
}

// Expand function for word generation
function expandWord(currentWord: string): WordNode[] {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz';
  const expansions: WordNode[] = [];
  
  for (const letter of alphabet) {
    const newWord = currentWord + letter;
    expansions.push({
      word: newWord,
      score: scoreWord(newWord)
    });
  }
  
  return expansions;
}

// Terminal condition - stop at 5-letter words
function isTerminalWord(word: string): boolean {
  return word.length >= 5;
}

// Run the beam search
const result = beamSearch({
  initialState: "",
  expand: expandWord,
  isTerminal: isTerminalWord,
  beamWidth: 3,
  maxDepth: 10
});

console.log("Best word:", result.state);
console.log("Score:", result.score);
console.log("Path:", result.path);
interface AdvancedBeamSearchOptions<T> {
  initialState: T;
  expand: (state: T) => BeamSearchNode<T>[];
  isTerminal: (state: T) => boolean;
  beamWidth: number;
  maxDepth?: number;
  compareFn?: (a: BeamSearchNode<T>, b: BeamSearchNode<T>) => number;
  pruneFn?: (node: BeamSearchNode<T>) => boolean;
}

function advancedBeamSearch<T>(options: AdvancedBeamSearchOptions<T>): BeamSearchNode<T> {
  const {
    initialState,
    expand,
    isTerminal,
    beamWidth,
    maxDepth = Infinity,
    compareFn = (a, b) => b.score - a.score, // Default: higher score is better
    pruneFn = () => false // Default: no pruning
  } = options;

  let beam: BeamSearchNode<T>[] = [
    {
      state: initialState,
      score: 0,
      path: [initialState]
    }
  ];

  let depth = 0;
  let bestSolution: BeamSearchNode<T> | null = null;

  while (depth < maxDepth && beam.length > 0) {
    const candidates: BeamSearchNode<T>[] = [];

    for (const node of beam) {
      if (pruneFn(node)) continue;

      if (isTerminal(node.state)) {
        // Track best solution found so far
        if (!bestSolution || compareFn(node, bestSolution) > 0) {
          bestSolution = node;
        }
        continue;
      }

      const expandedNodes = expand(node.state);
      
      for (const newNode of expandedNodes) {
        const totalScore = node.score + newNode.score;
        const path = [...node.path, newNode.state];
        
        candidates.push({
          state: newNode.state,
          score: totalScore,
          path
        });
      }
    }

    // Sort and select top candidates
    candidates.sort(compareFn);
    beam = candidates.slice(0, beamWidth);
    
    depth++;
  }

  return bestSolution || beam.sort(compareFn)[0];
}
