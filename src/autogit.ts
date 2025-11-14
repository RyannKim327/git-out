interface BeamSearchState<T> {
    sequence: T[];       // Current sequence of elements
    score: number;       // Cumulative score (log probability)
    isTerminal?: boolean; // Whether this state is a terminal/end state
}

type NextStatesFn<T> = (currentState: BeamSearchState<T>) => BeamSearchState<T>[];
type ScoreComparator<T> = (a: BeamSearchState<T>, b: BeamSearchState<T>) => number;

/**
 * Beam Search Algorithm Implementation
 * 
 * @param initialStates Initial states to start the search from
 * @param beamWidth Number of candidates to keep at each step
 * @param maxSteps Maximum steps to execute (sequence length limit)
 * @param getNextStates Function to generate next possible states
 * @param compareScores Function to compare states for ordering (higher scores first)
 * @returns Best found state (highest scoring complete sequence)
 */
function beamSearch<T>(
    initialStates: BeamSearchState<T>[],
    beamWidth: number,
    maxSteps: number,
    getNextStates: NextStatesFn<T>,
    compareScores: ScoreComparator<T> = (a, b) => b.score - a.score
): BeamSearchState<T> {
    let beam: BeamSearchState<T>[] = [...initialStates];

    for (let step = 0; step < maxSteps; step++) {
        // Generate all possible next states from current beam
        const allCandidates: BeamSearchState<T>[] = [];
        
        for (const state of beam) {
            // Skip expansion if we're in a terminal state
            if (state.isTerminal) {
                allCandidates.push(state);
                continue;
            }

            // Generate and add next states
            const nextStates = getNextStates(state);
            allCandidates.push(...nextStates);
        }

        // Filter out any invalid states
        const validCandidates = allCandidates.filter(s => s !== undefined);

        // Sort candidates by score and select top-k (beamWidth)
        validCandidates.sort(compareScores);
        beam = validCandidates.slice(0, beamWidth);

        // Early exit if all states are terminal
        if (beam.every(state => state.isTerminal)) {
            break;
        }
    }

    // Return the best state from the final beam
    return beam.sort(compareScores)[0];
}

// Example Usage: Sequence generation with word fragments
interface WordState extends BeamSearchState<string> {
    // Additional properties could be added here
}

// Create initial state
const initialState: WordState = {
    sequence: [],
    score: 0,
    isTerminal: false
};

// Define how to generate next states
const getNextWordFragments: NextStatesFn<string> = (currentState) => {
    // In a real implementation, this would generate plausible next tokens
    // Here's a simplified example with probabilities
    const candidates = [
        {token: "The", score: currentState.score + Math.log(0.6)},
        {token: "A", score: currentState.score + Math.log(0.3)},
        {token: "This", score: currentState.score + Math.log(0.1)},
    ];

    return candidates.map(c => ({
        sequence: [...currentState.sequence, c.token],
        score: c.score,
        // End when we have 3 words
        isTerminal: currentState.sequence.length >= 2
    }));
};

// Run beam search
const bestState = beamSearch<string>(
    [initialState],
    3,  // Beam width
    3,  // Max length
    getNextWordFragments
);

console.log("Best sequence:", bestState.sequence.join(" "));
console.log("Score:", bestState.score);
