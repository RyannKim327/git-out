// beamSearch.ts

export type Candidate<T> = { token: T; logProb: number };

export type Beam<T> = {
  seq: T[];
  score: number;      // accumulated log-probability
  completed: boolean; // if this beam has reached an end token
};

export type BeamSearchOptions<T> = {
  // How many beams to keep after each expansion
  beamWidth: number;

  // How many steps to grow (max sequence length)
  maxLen: number;

  // Given a partial sequence, return candidate next tokens with log-probs
  // Can be async (e.g., calling a neural model)
  getNext: (seq: T[]) => Promise<Candidate<T>[]> | Candidate<T>[];

  // Optional: starting prefix (default empty)
  start?: T[];

  // Optional: predicate to decide if a sequence is finished
  // If not provided, you may provide an EOS token as a normal token and rely on isEnd to detect it.
  isEnd?: (seq: T[]) => boolean;

  // Optional: limit how many next-tokens we consider per beam
  perBeam?: number;
};

/**
 * Beam search over a sequence model.
 * Returns the best completed sequence if available, otherwise the best overall sequence.
 */
export async function beamSearch<T>(opts: BeamSearchOptions<T>): Promise<T[]> {
  const {
    beamWidth,
    maxLen,
    getNext,
    start = [],
    isEnd = (seq: T[]) => false,
    perBeam = 5,
  } = opts;

  // Initialize with the start prefix
  let beams: Beam<T>[] = [{ seq: start, score: 0, completed: isEnd(start) }];

  for (let step = 0; step < maxLen; step++) {
    // If all beams are completed, we can stop early
    if (beams.every(b => b.completed)) break;

    const candidates: Beam<T>[] = [];

    for (const b of beams) {
      if (b.completed) {
        // Carry completed beams forward unchanged
        candidates.push(b);
        continue;
      }

      // Get next-token candidates for this prefix
      const nextsRaw = await Promise.resolve(opts.getNext(b.seq)) as Candidate<T>[];

      // If there are no candidates, we cannot extend this beam
      if (!nextsRaw || nextsRaw.length === 0) {
        candidates.push({ seq: b.seq, score: b.score, completed: true });
        continue;
      }

      // Take the top perBeam candidates for this beam (helps performance)
      const nexts = nextsRaw
        .slice() // copy
        .sort((a, c) => c.logProb - a.logProb)
        .slice(0, perBeam);

      for (const n of nexts) {
        const newSeq = [...b.seq, n.token];
        const newScore = b.score + n.logProb;
        const newCompleted = isEnd(newSeq);
        candidates.push({ seq: newSeq, score: newScore, completed: newCompleted });
      }
    }

    // Pick the top beamWidth beams to carry forward
    candidates.sort((a, b) => b.score - a.score);
    beams = candidates.slice(0, beamWidth);
  }

  // Best completed sequence, if any; otherwise best overall
  const completedBeams = beams.filter(b => b.completed);
  if (completedBeams.length > 0) {
    completedBeams.sort((a, b) => b.score - a.score);
    return completedBeams[0].seq;
  }

  // No completed beams found; return the best current beam
  if (beams.length > 0) {
    beams.sort((a, b) => b.score - a.score);
    return beams[0].seq;
  }

  // No beams at all
  return [];
}
// example.ts
import { beamSearch } from './beamSearch';

async function main() {
  // Toy vocabulary
  const vocab = ['A', 'B', 'C', '</s>'];

  // A simple mock model: given a prefix, return some made-up log-probs
  const mockGetNext = async (seq: string[]) => {
    // Simple rule: you can always append any token; give arbitrary log-probs
    const probs = [
      { token: 'A', logProb: -0.1 },
      { token: 'B', logProb: -0.5 },
      { token: 'C', logProb: -1.0 },
      { token: '</s>', logProb: -2.0 },
    ];
    // In a real model, adjust based on seq
    return probs;
  };

  const endPredicate = (seq: string[]) => {
    // End when we emit the end token
    return seq.length > 0 && seq[seq.length - 1] === '</s>';
  };

  const result = await beamSearch<string>({
    beamWidth: 3,
    maxLen: 6,
    getNext: mockGetNext,
    start: [],            // start empty
    isEnd: endPredicate,
    perBeam: 4,           // consider top 4 per beam
  });

  console.log('Generated sequence:', result.join(' '));
}

main().catch(console.error);
