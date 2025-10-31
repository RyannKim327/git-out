/**
 * Represents the options for configuring the Beam Search algorithm.
 * @template TState The type of the states in the search space.
 */
export interface BeamSearchOptions<TState> {
    /**
     * A function that returns an array of possible next states from a given state.
     * @param state The current state.
     * @returns An array of successor states.
     */
    getSuccessors: (state: TState) => TState[];

    /**
     * A function that calculates a score for a given state.
     * Lower scores indicate more promising states (closer to the goal).
     * @param state The state to score.
     * @returns The numerical score for the state.
     */
    getScore: (state: TState) => number;

    /**
     * A function that determines if a given state is a goal state.
     * @param state The state to check.
     * @returns True if the state is a goal, false otherwise.
     */
    isGoal: (state: TState) => boolean;

    /**
     * The maximum number of states to keep in the "beam" at each iteration.
     * Must be a positive integer.
     */
    beamWidth: number;

    /**
     * Optional: The maximum number of iterations to run the search.
     * Prevents infinite loops in cyclic graphs or very deep trees.
     * Defaults to 1000 if not provided.
     */
    maxIterations?: number;
}

/**
 * Internal interface to keep track of a state along with its score for sorting.
 * @template TState The type of the states.
 */
interface ScoredState<TState> {
    state: TState;
    score: number;
}

/**
 * Implements the Beam Search algorithm.
 *
 * @template TState The type of the states in the search space.
 * @param initialState The starting state for the search.
 * @param options Configuration options for the beam search.
 * @returns The first goal state found, or `null` if no goal state is found within the `maxIterations`.
 */
export function beamSearch<TState>(
    initialState: TState,
    options: BeamSearchOptions<TState>
): TState | null {
    const { getSuccessors, getScore, isGoal, beamWidth } = options;
    const maxIterations = options.maxIterations ?? 1000; // Default max iterations

    if (beamWidth <= 0) {
        throw new Error("beamWidth must be a positive integer.");
    }

    let currentBeam: TState[] = [initialState];
    let iteration = 0;

    // A Set to keep track of visited states to prevent cycles and redundant exploration.
    // This is optional for beam search itself but highly recommended for most practical graph problems.
    // Note: This assumes TState can be directly used as a key in a Set (e.g., primitive types or stringified objects).
    // For complex objects, you might need a custom serialization function for `visitedStates`.
    const visitedStates = new Set<string>(); // Use string representation for complex objects

    while (currentBeam.length > 0 && iteration < maxIterations) {
        // 1. Check if any state in the current beam is a goal state
        for (const state of currentBeam) {
            if (isGoal(state)) {
                return state; // Goal found!
            }
        }

        // 2. Generate all successor states from all states in the current beam
        const nextCandidates: ScoredState<TState>[] = [];
        for (const stateInBeam of currentBeam) {
            // Add current state to visited set
            const stateKey = JSON.stringify(stateInBeam); // Simple stringification for objects
            if (visitedStates.has(stateKey)) {
                continue; // Skip if already processed in this or previous beams
            }
            visitedStates.add(stateKey);

            const successors = getSuccessors(stateInBeam);
            for (const successor of successors) {
                const successorKey = JSON.stringify(successor);
                // Only add to candidates if not visited yet to avoid cycles and redundant work
                if (!visitedStates.has(successorKey)) {
                    nextCandidates.push({
                        state: successor,
                        score: getScore(successor)
                    });
                }
            }
        }

        // If no new candidates, we're stuck or explored everything
        if (nextCandidates.length === 0) {
            break;
        }

        // 3. Sort candidates by score (lowest score is best)
        nextCandidates.sort((a, b) => a.score - b.score);

        // 4. Select the top 'beamWidth' states for the next iteration's beam
        currentBeam = nextCandidates.slice(0, beamWidth).map(scoredState => scoredState.state);

        iteration++;
    }

    // No goal found within the given iterations or no more states to explore
    return null;
}
// Define a type for a point on the grid
interface Point {
    x: number;
    y: number;
}

// Define the state for our grid pathfinding problem
interface GridState {
    position: Point;
    path: Point[]; // To reconstruct the path taken
    cost: number; // The actual cost to reach this state
}

// --- Configuration for our grid ---
const GRID_WIDTH = 5;
const GRID_HEIGHT = 5;
const START: Point = { x: 0, y: 0 };
const GOAL: Point = { x: 4, y: 4 };
const OBSTACLES: Point[] = [
    { x: 1, y: 1 },
    { x: 1, y: 2 },
    { x: 2, y: 1 },
    { x: 2, y: 2 }
    // { x: 3, y: 3 } // Uncomment to make it impossible or harder
];

// Helper to check if a point is an obstacle
function isObstacle(p: Point): boolean {
    return OBSTACLES.some(o => o.x === p.x && o.y === p.y);
}

// Helper to check if a point is within grid boundaries
function isValidPosition(p: Point): boolean {
    return p.x >= 0 && p.x < GRID_WIDTH && p.y >= 0 && p.y < GRID_HEIGHT;
}

// --- Implement BeamSearchOptions for Grid Pathfinding ---

const gridSearchOptions: BeamSearchOptions<GridState> = {
    getSuccessors: (state: GridState): GridState[] => {
        const possibleMoves = [
            { dx: 0, dy: 1 },  // Down
            { dx: 0, dy: -1 }, // Up
            { dx: 1, dy: 0 },  // Right
            { dx: -1, dy: 0 }  // Left
        ];

        const successors: GridState[] = [];
        for (const move of possibleMoves) {
            const newPosition: Point = {
                x: state.position.x + move.dx,
                y: state.position.y + move.dy
            };

            if (isValidPosition(newPosition) && !isObstacle(newPosition)) {
                successors.push({
                    position: newPosition,
                    path: [...state.path, newPosition], // Add to path
                    cost: state.cost + 1 // Increment cost for each step
                });
            }
        }
        return successors;
    },

    // Heuristic function: Manhattan distance to the goal
    // Lower score means closer to goal
    getScore: (state: GridState): number => {
        const manhattanDistance = Math.abs(state.position.x - GOAL.x) + Math.abs(state.position.y - GOAL.y);
        // We can add the actual cost so far to make it more like A* heuristic,
        // which helps in finding better (though not necessarily optimal) paths.
        // If we only use manhattanDistance, it's a greedy best-first search.
        return state.cost + manhattanDistance; // f(n) = g(n) + h(n)
    },

    isGoal: (state: GridState): boolean => {
        return state.position.x === GOAL.x && state.position.y === GOAL.y;
    },

    beamWidth: 2, // Example beam width
    maxIterations: 100 // Prevent excessively long searches
};

// --- Run the Beam Search ---

const initialGridState: GridState = {
    position: START,
    path: [START], // Start with the initial position in the path
    cost: 0
};

console.log(`Starting Beam Search for grid pathfinding (Beam Width: ${gridSearchOptions.beamWidth})...`);
const foundGoalState = beamSearch(initialGridState, gridSearchOptions);

if (foundGoalState) {
    console.log("\nGoal state found!");
    console.log("Path:", foundGoalState.path.map(p => `(${p.x},${p.y})`).join(" -> "));
    console.log("Total Cost:", foundGoalState.cost);

    // Optional: Visualize the path on the grid
    console.log("\nGrid Visualization:");
    for (let y = 0; y < GRID_HEIGHT; y++) {
        let row = "";
        for (let x = 0; x < GRID_WIDTH; x++) {
            const point: Point = { x, y };
            if (point.x === START.x && point.y === START.y) {
                row += " S ";
            } else if (point.x === GOAL.x && point.y === GOAL.y) {
                row += " G ";
            } else if (isObstacle(point)) {
                row += " # ";
            } else if (foundGoalState.path.some(p => p.x === x && p.y === y)) {
                row += " * ";
            } else {
                row += " . ";
            }
        }
        console.log(row);
    }

} else {
    console.log("\nNo goal state found within the given iterations or constraints.");
}
