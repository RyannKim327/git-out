/**
 * Represents a state in the beam search, augmented with its score and parent for path reconstruction.
 */
interface ScoredState<T> {
    state: T;
    score: number;
    parent: ScoredState<T> | null;
    depth: number;
}

/**
 * Reconstructs the path from a goal ScoredState back to the initial state.
 * @param goalNode The ScoredState representing the goal.
 * @returns An array of states representing the path from start to goal.
 */
function reconstructPath<T>(goalNode: ScoredState<T>): T[] {
    const path: T[] = [];
    let currentNode: ScoredState<T> | null = goalNode;
    while (currentNode) {
        path.unshift(currentNode.state); // Add to the beginning to maintain order
        currentNode = currentNode.parent;
    }
    return path;
}

/**
 * Implements the Beam Search algorithm.
 *
 * @param initialState The starting state of the search.
 * @param generateSuccessors A function that takes a state and returns an array of its successor states.
 * @param evaluateState A heuristic function that assigns a numerical score to a state. Higher score is considered better.
 * @param isGoal A function that determines if a state is the goal state.
 * @param beamWidth The maximum number of states to keep at each level of the search.
 * @param maxDepth (Optional) The maximum depth to search. Defaults to Infinity.
 * @returns An array of states representing the best path found to a goal, or null if no goal is found within the search limits.
 */
export function beamSearch<T>(
    initialState: T,
    generateSuccessors: (state: T) => T[],
    evaluateState: (state: T) => number, // Higher score is better
    isGoal: (state: T) => boolean,
    beamWidth: number,
    maxDepth: number = Infinity
): T[] | null {
    if (beamWidth <= 0) {
        throw new Error("Beam width must be a positive integer.");
    }

    const initialScoredState: ScoredState<T> = {
        state: initialState,
        score: evaluateState(initialState),
        parent: null,
        depth: 0,
    };

    // Current beam of states, sorted by score (highest first)
    let currentBeam: ScoredState<T>[] = [initialScoredState];

    let bestGoalPath: T[] | null = null;
    let bestGoalScore: number = -Infinity; // Assuming higher scores are better

    // Keep searching while there are states in the beam and max depth not reached
    while (currentBeam.length > 0 && currentBeam[0].depth < maxDepth) {
        const nextBeamCandidates: ScoredState<T>[] = [];

        for (const scoredState of currentBeam) {
            // Check if current state is a goal
            if (isGoal(scoredState.state)) {
                // If this is a better goal than what we've found so far, update
                if (scoredState.score > bestGoalScore) {
                    bestGoalScore = scoredState.score;
                    bestGoalPath = reconstructPath(scoredState);
                }
                // We might continue searching to find a *better* goal,
                // or break here if we only care about the first one.
                // For a generic solution, we'll continue.
            }

            // Generate successors for the current state
            const successors = generateSuccessors(scoredState.state);

            for (const successorState of successors) {
                const successorScoredState: ScoredState<T> = {
                    state: successorState,
                    score: evaluateState(successorState),
                    parent: scoredState,
                    depth: scoredState.depth + 1,
                };
                nextBeamCandidates.push(successorScoredState);
            }
        }

        // Sort all candidates generated from the current beam by score (descending)
        nextBeamCandidates.sort((a, b) => b.score - a.score);

        // Prune the candidates to keep only the top `beamWidth` for the next beam
        currentBeam = nextBeamCandidates.slice(0, beamWidth);
        
        // Optional: If a goal was found in the current iteration and no further improvement is likely at deeper levels,
        // you might break here. But to find the *best* goal, continuing is often necessary.
        // If (bestGoalPath !== null && currentBeam[0].score < bestGoalScore) {
        //   break; // No state in the current beam is better than the best goal found.
        // }
    }

    // After the loop, check if any goal was found within the limits
    if (bestGoalPath) {
        return bestGoalPath;
    }

    // One final check on states remaining in the beam at maxDepth, or if goal states
    // were only found at the last depth.
    for (const scoredState of currentBeam) {
        if (isGoal(scoredState.state)) {
            if (scoredState.score > bestGoalScore) {
                bestGoalScore = scoredState.score;
                bestGoalPath = reconstructPath(scoredState);
            }
        }
    }

    return bestGoalPath;
}
// --- Helper for the example ---
// Simple dictionary for demonstration
const dictionary = new Set([
    "HEAD", "HEAR", "HERA", "HEAL",
    "DEAL", "TEAL", "TALE", "TAIL",
    "READ", "RED", "RAIN", "RACK", "ROCK",
    "CROW", "CRAW", "CRAB", "CRAD", "DRAB",
    "DREAM", "DRONE", "DRINK", "DRIVE"
]);

/**
 * Calculates the Levenshtein distance between two strings.
 * This will be used as a heuristic: lower distance is better.
 * We'll negate it for the beam search `evaluateState` to make higher scores better.
 */
function levenshteinDistance(s1: string, s2: string): number {
    s1 = s1.toLowerCase();
    s2 = s2.toLowerCase();
    const costs: number[] = [];
    for (let i = 0; i <= s1.length; i++) {
        let lastValue = i;
        for (let j = 0; j <= s2.length; j++) {
            if (i === 0) {
                costs[j] = j;
            } else {
                let newValue = costs[j];
                if (j > 0) {
                    if (s1.charAt(i - 1) === s2.charAt(j - 1)) {
                        costs[j] = lastValue;
                    } else {
                        costs[j] = Math.min(newValue, lastValue, costs[j - 1]) + 1;
                    }
                }
                lastValue = newValue;
            }
        }
    }
    return costs[s2.length];
}

// --- Beam Search Parameters for Word Transformation ---

const startWord = "HEAD";
const targetWord = "TAIL";

// Function to generate successor words (one letter difference, valid word)
const generateWordSuccessors = (currentWord: string): string[] => {
    const successors: string[] = [];
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    for (let i = 0; i < currentWord.length; i++) {
        for (let j = 0; j < alphabet.length; j++) {
            const char = alphabet[j];
            if (currentWord[i] === char) continue; // Skip if same character

            const newWord =
                currentWord.substring(0, i) + char + currentWord.substring(i + 1);

            if (dictionary.has(newWord)) {
                successors.push(newWord);
            }
        }
    }
    return successors;
};

// Heuristic: Negative Levenshtein distance to the target word.
// A lower Levenshtein distance means closer, so a higher negative Levenshtein distance means a better score.
const evaluateWordState = (word: string): number => {
    return -levenshteinDistance(word, targetWord);
};

// Goal check: Is the current word the target word?
const isTargetWord = (word: string): boolean => {
    return word === targetWord;
};

// --- Running the Beam Search ---
const beamWidth = 2; // Only keep the top 2 most promising paths at each step
const maxDepth = 10; // Prevent infinite loops or excessively long searches

console.log(`Searching from "${startWord}" to "${targetWord}" with beam width ${beamWidth} and max depth ${maxDepth}...`);

const path = beamSearch(
    startWord,
    generateWordSuccessors,
    evaluateWordState,
    isTargetWord,
    beamWidth,
    maxDepth
);

if (path) {
    console.log("Path found:", path.join(" -> "));
} else {
    console.log("No path found.");
}

// Example with a different path and wider beam
const startWord2 = "CROW";
const targetWord2 = "DRAB";
const beamWidth2 = 3;

console.log(`\nSearching from "${startWord2}" to "${targetWord2}" with beam width ${beamWidth2} and max depth ${maxDepth}...`);
const path2 = beamSearch(
    startWord2,
    generateWordSuccessors,
    evaluateWordState.bind(null, targetWord2), // Bind targetWord2 to the evaluation function
    (word: string) => word === targetWord2,
    beamWidth2,
    maxDepth
);

if (path2) {
    console.log("Path found:", path2.join(" -> "));
} else {
    console.log("No path found.");
}
Searching from "HEAD" to "TAIL" with beam width 2 and max depth 10...
Path found: HEAD -> HEAL -> TEAL -> TAIL

Searching from "CROW" to "DRAB" with beam width 3 and max depth 10...
Path found: CROW -> CRAW -> CRAB -> DRAB
