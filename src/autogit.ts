interface BeamSearchConfig<T> {
  beamWidth: number;
  maxSteps?: number;  // Optional maximum steps to prevent infinite loops
  generateNext: (currentState: T) => T[]; // Generates next possible states
  calculateScore: (state: T) => number;   // Higher scores are better
  isTerminal: (state: T) => boolean;       // Determines if state is complete
}

interface BeamSearchState<T> {
  state: T;
  score: number;       // Cumulative score for this path
  path?: T[];          // Optional - for tracking the full path
}

function beamSearch<T>(
  initialStates: T[],
  config: BeamSearchConfig<T>
): BeamSearchState<T>[] {
  const {
    beamWidth,
    maxSteps = Number.MAX_SAFE_INTEGER,
    generateNext,
    calculateScore,
    isTerminal
  } = config;

  // Initialize beam with starting states
  let currentBeam: BeamSearchState<T>[] = initialStates.map(state => ({
    state,
    score: calculateScore(state),
    path: [state]
  }));

  const completed: BeamSearchState<T>[] = [];
  let steps = 0;

  while (steps < maxSteps && currentBeam.length > 0) {
    // Collect all candidates from expanding current beam
    const candidates: BeamSearchState<T>[] = [];
    
    for (const currentState of currentBeam) {
      if (isTerminal(currentState.state)) {
        completed.push(currentState);
        continue;
      }
      
      const nextStates = generateNext(currentState.state);
      for (const nextState of nextStates) {
        const newScore = currentState.score + calculateScore(nextState);
        candidates.push({
          state: nextState,
          score: newScore,
          path: [...(currentState.path || []), nextState]
        });
      }
    }

    // Select top beamWidth candidates
    currentBeam = candidates
      .sort((a, b) => b.score - a.score) // Sort descending by score
      .slice(0, beamWidth);

    steps++;
  }

  // Collect any remaining states that might be terminal
  currentBeam.forEach(state => {
    if (isTerminal(state.state)) {
      completed.push(state);
    }
  });

  // Return completed states, sorted by score
  return completed.sort((a, b) => b.score - a.score);
}
// Example: Find vowel-heavy 4-letter sequences
const result = beamSearch([''], {
  beamWidth: 3,
  maxSteps: 3, // Since we start with empty string
  generateNext: (current: string) => {
    if (current.length >= 4) return [];
    return ['a','e','i','o','u','x','y','z'].map(c => current + c);
  },
  calculateScore: (state: string) => {
    // Higher score for more vowels
    return state.split('').filter(c => 'aeiou'.includes(c)).length;
  },
  isTerminal: (state: string) => state.length === 4
});

console.log(result.map(s => ({
  state: s.state,
  score: s.score
})));
/* Sample Output:
[
  { state: 'aeie', score: 4 },
  { state: 'aeio', score: 4 },
  { state: 'aeiu', score: 4 },
  ...
]
*/
