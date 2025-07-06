// Define types for clarity
type Token = string;
type Sequence = Token[];
interface Candidate {
  sequence: Sequence;
  score: number; // Log probability
}

/**
 * Mock model function that, given a sequence, returns next token probabilities.
 * Replace this with your actual model inference.
 */
function predictNextTokens(sequence: Sequence): Array<{ token: Token; logProb: number }> {
  // Example mock implementation (replace with your model)
  // For illustration: always returns the same options
  return [
    { token: 'a', logProb: Math.log(0.5) },
    { token: 'b', logProb: Math.log(0.3) },
    { token: 'c', logProb: Math.log(0.2) }
  ];
}

/**
 * Beam search algorithm
 * @param beamWidth Number of sequences to keep at each step
 * @param maxLength Maximum length of sequences
 * @param startToken The starting token or sequence
 * @param endToken Optional token that indicates sequence completion
 */
function beamSearch(
  beamWidth: number,
  maxLength: number,
  startToken: Token,
  endToken?: Token
): Sequence[] {
  // Initialize the beam with the start token sequence
  let candidates: Candidate[] = [
    { sequence: [startToken], score: 0 } // log probability of 1 = 0
  ];

  for (let step = 0; step < maxLength; step++) {
    const allCandidates: Candidate[] = [];

    for (const candidate of candidates) {
      // If candidate already ended with endToken, keep it as is
      if (endToken && candidate.sequence[candidate.sequence.length - 1] === endToken) {
        allCandidates.push(candidate);
        continue;
      }

      // Get model predictions for the current sequence
      const nextTokens = predictNextTokens(candidate.sequence);

      // Expand each candidate
      for (const next of nextTokens) {
        const newSequence = [...candidate.sequence, next.token];
        const newScore = candidate.score + next.logProb;
        allCandidates.push({ sequence: newSequence, score: newScore });
      }
    }

    // Sort all candidates by score in descending order (highest probability)
    allCandidates.sort((a, b) => b.score - a.score);

    // Keep top beamWidth candidates
    candidates = allCandidates.slice(0, beamWidth);
  }

  // Return the sequences without scores
  return candidates.map(c => c.sequence);
}

// Usage example
const sequences = beamSearch(3, 10, '<start>', '<end>');
console.log('Generated sequences:', sequences);
