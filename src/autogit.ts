/**
 * Interface for a generic graph node.
 * For complex objects, you'll likely want an 'id' property
 * to uniquely identify them for the visited set.
 */
interface GraphNode {
    id: string; // A unique identifier for the node
    [key: string]: any; // Allows for other properties
}

/**
 * Implements a Breadth-Limited Search (BLS) algorithm.
 *
 * @template TNode The type of the nodes in the graph. Must extend GraphNode.
 * @param {TNode} startNode The node to start the search from.
 * @param {(node: TNode) => TNode[]} getNeighbors A function that returns an array of
 *                                              neighboring nodes for a given node.
 * @param {(node: TNode) => boolean} isGoal A function that checks if a given node is the goal node.
 * @param {number} depthLimit The maximum depth to search. Nodes at this depth will be processed,
 *                              but their children will not be explored.
 * @returns {TNode | null} The goal node if found within the depth limit, otherwise null.
 */
function breadthLimitedSearch<TNode extends GraphNode>(
    startNode: TNode,
    getNeighbors: (node: TNode) => TNode[],
    isGoal: (node: TNode) => boolean,
    depthLimit: number
): TNode | null {
    // 1. Handle edge cases: If the start node is the goal, or limit is negative.
    if (isGoal(startNode)) {
        return startNode;
    }
    if (depthLimit < 0) {
        return null;
    }

    // 2. Initialize the queue and visited set.
    // The queue stores tuples of [node, currentDepth].
    const queue: [TNode, number][] = [];
    queue.push([startNode, 0]); // Start node is at depth 0

    // The visited set stores unique IDs of nodes to prevent cycles and redundant processing.
    const visited = new Set<string>();
    visited.add(startNode.id);

    // 3. Main search loop
    while (queue.length > 0) {
        // Dequeue the next node and its current depth.
        const [currentNode, currentDepth] = queue.shift()!; // '!' asserts that queue.shift() won't be undefined

        // If the current node is the goal, we've found it.
        if (isGoal(currentNode)) {
            return currentNode;
        }

        // If we've reached the depth limit, do not explore its children.
        // We *process* nodes at depthLimit, but don't add their children.
        if (currentDepth < depthLimit) {
            const neighbors = getNeighbors(currentNode);

            for (const neighbor of neighbors) {
                if (!visited.has(neighbor.id)) {
                    visited.add(neighbor.id);
                    // Enqueue the neighbor with an incremented depth
                    queue.push([neighbor, currentDepth + 1]);
                }
            }
        }
    }

    // If the queue becomes empty and the goal hasn't been found, it means
    // the goal is not reachable within the given depth limit.
    return null;
}

// --- Example Graph Setup ---

// Define a concrete node type for our example
interface MyNode extends GraphNode {
    value: string;
    connections: MyNode[];
}

// Helper function to create nodes
function createMyNode(id: string, value: string): MyNode {
    return { id, value, connections: [] };
}

// Create nodes
const A = createMyNode('A', 'Start Node');
const B = createMyNode('B', 'Node B (Depth 1)');
const C = createMyNode('C', 'Node C (Depth 1)');
const D = createMyNode('D', 'Node D (Depth 2 - Goal)');
const E = createMyNode('E', 'Node E (Depth 2)');
const F = createMyNode('F', 'Node F (Depth 2 - Another Goal)');
const G = createMyNode('G', 'Node G (Depth 3 - Deep)');
const H = createMyNode('H', 'Node H (Depth 4 - Very Deep)');

// Establish connections
A.connections = [B, C];
B.connections = [D, E];
C.connections = [F];
D.connections = [G];
E.connections = [];
F.connections = [];
G.connections = [H];
H.connections = [];

// --- Define helper functions for BLS ---
const getMyNodeNeighbors = (node: MyNode) => node.connections;
const isGoalNodeD = (node: MyNode) => node.id === 'D';
const isGoalNodeF = (node: MyNode) => node.id === 'F';
const isGoalNodeG = (node: MyNode) => node.id === 'G';
const isGoalNodeH = (node: MyNode) => node.id === 'H';
const isGoalNodeZ = (node: MyNode) => node.id === 'Z'; // Non-existent goal

// --- Test Cases ---

console.log("--- Breadth-Limited Search Examples ---");

// Test 1: Goal D with depth limit 1 (D is at depth 2)
console.log("\nSearching for D with depthLimit = 1:");
let result = breadthLimitedSearch(A, getMyNodeNeighbors, isGoalNodeD, 1);
console.log(result ? `Found goal: ${result.id}` : "Goal not found within limit.");
// Expected: Goal not found (D is at depth 2, limit 1 means only A, B, C are processed)

// Test 2: Goal D with depth limit 2 (D is at depth 2)
console.log("\nSearching for D with depthLimit = 2:");
result = breadthLimitedSearch(A, getMyNodeNeighbors, isGoalNodeD, 2);
console.log(result ? `Found goal: ${result.id}` : "Goal not found within limit.");
// Expected: Found goal: D (A at 0, B/C at 1, D/E/F at 2. D is processed at depth 2)

// Test 3: Goal F with depth limit 2 (F is at depth 2)
console.log("\nSearching for F with depthLimit = 2:");
result = breadthLimitedSearch(A, getMyNodeNeighbors, isGoalNodeF, 2);
console.log(result ? `Found goal: ${result.id}` : "Goal not found within limit.");
// Expected: Found goal: F

// Test 4: Goal G with depth limit 2 (G is at depth 3)
console.log("\nSearching for G with depthLimit = 2:");
result = breadthLimitedSearch(A, getMyNodeNeighbors, isGoalNodeG, 2);
console.log(result ? `Found goal: ${result.id}` : "Goal not found within limit.");
// Expected: Goal not found

// Test 5: Goal G with depth limit 3 (G is at depth 3)
console.log("\nSearching for G with depthLimit = 3:");
result = breadthLimitedSearch(A, getMyNodeNeighbors, isGoalNodeG, 3);
console.log(result ? `Found goal: ${result.id}` : "Goal not found within limit.");
// Expected: Found goal: G

// Test 6: Goal H with depth limit 3 (H is at depth 4)
console.log("\nSearching for H with depthLimit = 3:");
result = breadthLimitedSearch(A, getMyNodeNeighbors, isGoalNodeH, 3);
console.log(result ? `Found goal: ${result.id}` : "Goal not found within limit.");
// Expected: Goal not found

// Test 7: Goal H with depth limit 4 (H is at depth 4)
console.log("\nSearching for H with depthLimit = 4:");
result = breadthLimitedSearch(A, getMyNodeNeighbors, isGoalNodeH, 4);
console.log(result ? `Found goal: ${result.id}` : "Goal not found within limit.");
// Expected: Found goal: H

// Test 8: Non-existent goal Z
console.log("\nSearching for Z with depthLimit = 10:");
result = breadthLimitedSearch(A, getMyNodeNeighbors, isGoalNodeZ, 10);
console.log(result ? `Found goal: ${result.id}` : "Goal not found within limit.");
// Expected: Goal not found

// Test 9: Start node is the goal
console.log("\nSearching for A with depthLimit = 0:");
result = breadthLimitedSearch(A, getMyNodeNeighbors, (node) => node.id === 'A', 0);
console.log(result ? `Found goal: ${result.id}` : "Goal not found within limit.");
// Expected: Found goal: A

// Test 10: Start node is the goal, with higher limit
console.log("\nSearching for A with depthLimit = 2:");
result = breadthLimitedSearch(A, getMyNodeNeighbors, (node) => node.id === 'A', 2);
console.log(result ? `Found goal: ${result.id}` : "Goal not found within limit.");
// Expected: Found goal: A
