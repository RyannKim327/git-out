// --- 1. Type Definitions ---

// Type for node identifiers. Could be a more complex object if needed.
type NodeId = string | number;

// Interface for the graph structure.
// Assumes you can get neighbors for any given node.
interface Graph {
    getNeighbors(node: NodeId): NodeId[];
}

// Enum to represent the possible outcomes of a DLS
enum DLSResult {
    Found,   // The goal node was found
    Cutoff,  // The search hit the depth limit before finding the goal
    NotFound // The goal node was not found within the depth limit, and no paths were cut off
             // (meaning all paths within the limit were fully explored)
}

// Interface for the return value of the DLS function
interface SearchOutcome {
    result: DLSResult;
    node?: NodeId; // The goal node if found
}
// --- 2. Depth-Limited Search Implementation ---

function depthLimitedSearch(
    graph: Graph,
    startNode: NodeId,
    isGoal: (node: NodeId) => boolean,
    limit: number
): SearchOutcome {
    // This helper function performs the recursive DLS.
    // pathVisited is used to prevent cycles within the current path.
    // If you expect to traverse a tree rather than a general graph, pathVisited can be omitted.
    function dlsRecursive(
        currentNode: NodeId,
        currentDepth: number,
        pathVisited: Set<NodeId>
    ): SearchOutcome {

        // Add current node to the set of visited nodes for the current path
        pathVisited.add(currentNode);

        // 1. Check if current node is the goal
        if (isGoal(currentNode)) {
            // Remove current node from pathVisited before returning (backtracking cleanup)
            pathVisited.delete(currentNode);
            return { result: DLSResult.Found, node: currentNode };
        }

        // 2. Check if the depth limit has been reached
        if (currentDepth === limit) {
            // Remove current node from pathVisited before returning (backtracking cleanup)
            pathVisited.delete(currentNode);
            return { result: DLSResult.Cutoff };
        }

        // 3. Explore neighbors
        let anyCutoffOccurredInSubtree = false; // Flag to track if any child path hit a cutoff

        for (const neighbor of graph.getNeighbors(currentNode)) {
            // Only explore if the neighbor is not already in the current path to prevent cycles
            if (!pathVisited.has(neighbor)) {
                const result = dlsRecursive(
                    neighbor,
                    currentDepth + 1,
                    pathVisited
                );

                if (result.result === DLSResult.Found) {
                    // Propagate success immediately
                    pathVisited.delete(currentNode); // Clean up
                    return result;
                }
                if (result.result === DLSResult.Cutoff) {
                    anyCutoffOccurredInSubtree = true; // Mark that at least one branch was cut
                }
                // If result is NotFound, continue to the next neighbor
            }
        }

        // 4. Backtrack: Remove current node from pathVisited after exploring all its children
        pathVisited.delete(currentNode);

        // 5. Determine overall result for this subtree
        if (anyCutoffOccurredInSubtree) {
            // If any child path was cut off, then this current path is also effectively "cut off"
            // from reaching the goal through that branch.
            return { result: DLSResult.Cutoff };
        } else {
            // All children were explored (or were already visited in current path),
            // and none led to the goal, and none were cut off.
            return { result: DLSResult.NotFound };
        }
    }

    // Start the recursive search from the startNode at depth 0
    // Initialize an empty set for tracking visited nodes in the current path.
    const pathVisited = new Set<NodeId>();
    return dlsRecursive(startNode, 0, pathVisited);
}
// --- 3. Example Usage ---

// A simple adjacency list representation for our graph
const exampleGraphData: Record<NodeId, NodeId[]> = {
    'A': ['B', 'C'],
    'B': ['D', 'E'],
    'C': ['F', 'G'],
    'D': ['H'],
    'E': [],
    'F': [],
    'G': [],
    'H': ['I'],
    'I': [],
    // Introducing a cycle for demonstration of pathVisited
    'X': ['Y'],
    'Y': ['Z'],
    'Z': ['X', 'A'] // Z can lead back to X, or to A
};

// Implement the Graph interface for our example data
class AdjacencyListGraph implements Graph {
    private graphData: Record<NodeId, NodeId[]>;

    constructor(data: Record<NodeId, NodeId[]>) {
        this.graphData = data;
    }

    getNeighbors(node: NodeId): NodeId[] {
        return this.graphData[node] || [];
    }
}

const graph = new AdjacencyListGraph(exampleGraphData);

// Test Cases

console.log("--- Test Case 1: Goal Found within limit ---");
let goalNode1 = 'F';
let limit1 = 2; // Path A -> C -> F is depth 2
let result1 = depthLimitedSearch(graph, 'A', node => node === goalNode1, limit1);
console.log(`Searching for '${goalNode1}' from 'A' with limit ${limit1}:`);
console.log(`Result: ${DLSResult[result1.result]}${result1.node ? `, Node: ${result1.node}` : ''}`);
// Expected: Found, Node: F

console.log("\n--- Test Case 2: Goal Found at limit ---");
let goalNode2 = 'H';
let limit2 = 3; // Path A -> B -> D -> H is depth 3
let result2 = depthLimitedSearch(graph, 'A', node => node === goalNode2, limit2);
console.log(`Searching for '${goalNode2}' from 'A' with limit ${limit2}:`);
console.log(`Result: ${DLSResult[result2.result]}${result2.node ? `, Node: ${result2.node}` : ''}`);
// Expected: Found, Node: H

console.log("\n--- Test Case 3: Cutoff (Goal exists deeper) ---");
let goalNode3 = 'I';
let limit3 = 3; // Path A -> B -> D -> H -> I. 'I' is at depth 4. Limit is 3.
let result3 = depthLimitedSearch(graph, 'A', node => node === goalNode3, limit3);
console.log(`Searching for '${goalNode3}' from 'A' with limit ${limit3}:`);
console.log(`Result: ${DLSResult[result3.result]}${result3.node ? `, Node: ${result3.node}` : ''}`);
// Expected: Cutoff

console.log("\n--- Test Case 4: Not Found (Goal doesn't exist within limit, no cutoff) ---");
let goalNode4 = 'Z'; // Z is not reachable from A in this graph
let limit4 = 3;
let result4 = depthLimitedSearch(graph, 'A', node => node === goalNode4, limit4);
console.log(`Searching for '${goalNode4}' from 'A' with limit ${limit4}:`);
console.log(`Result: ${DLSResult[result4.result]}${result4.node ? `, Node: ${result4.node}` : ''}`);
// Expected: NotFound (assuming A is disconnected from Z, and all paths from A are explored)

console.log("\n--- Test Case 5: Start node is the goal (limit 0) ---");
let goalNode5 = 'A';
let limit5 = 0;
let result5 = depthLimitedSearch(graph, 'A', node => node === goalNode5, limit5);
console.log(`Searching for '${goalNode5}' from 'A' with limit ${limit5}:`);
console.log(`Result: ${DLSResult[result5.result]}${result5.node ? `, Node: ${result5.node}` : ''}`);
// Expected: Found, Node: A

console.log("\n--- Test Case 6: Start node is NOT the goal (limit 0) ---");
let goalNode6 = 'B';
let limit6 = 0;
let result6 = depthLimitedSearch(graph, 'A', node => node === goalNode6, limit6);
console.log(`Searching for '${goalNode6}' from 'A' with limit ${limit6}:`);
console.log(`Result: ${DLSResult[result6.result]}${result6.node ? `, Node: ${result6.node}` : ''}`);
// Expected: Cutoff (A is not B, and depth 0 limit means no children can be checked)

console.log("\n--- Test Case 7: Cycle detection (Goal in cycle, within limit) ---");
let goalNode7 = 'Z';
let limit7 = 3; // Path X -> Y -> Z is depth 2
let result7 = depthLimitedSearch(graph, 'X', node => node === goalNode7, limit7);
console.log(`Searching for '${goalNode7}' from 'X' with limit ${limit7}:`);
console.log(`Result: ${DLSResult[result7.result]}${result7.node ? `, Node: ${result7.node}` : ''}`);
// Expected: Found, Node: Z (path X->Y->Z found before X->Y->Z->X cycle is explored)

console.log("\n--- Test Case 8: Cycle detection (Goal not found, prevent infinite loop) ---");
let goalNode8 = 'M'; // Non-existent node
let limit8 = 5;
let result8 = depthLimitedSearch(graph, 'X', node => node === goalNode8, limit8);
console.log(`Searching for '${goalNode8}' from 'X' with limit ${limit8}:`);
console.log(`Result: ${DLSResult[result8.result]}${result8.node ? `, Node: ${result8.node}` : ''}`);
// Expected: NotFound (or Cutoff if limit is hit on Z->A path. With pathVisited, it prevents X->Y->Z->X->Y...)
