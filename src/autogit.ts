// For generic type safety
type ValueType = any;

interface Node<T extends ValueType> {
    value: T;
    children: Node<T>[];
}
enum SearchStatus {
    FOUND = 'FOUND',
    NOT_FOUND = 'NOT_FOUND',
    CUTOFF = 'CUTOFF', // Goal might exist beyond the depth limit
}

interface SearchResult<T extends ValueType> {
    status: SearchStatus;
    node?: Node<T>;       // The goal node if found
    path?: Node<T>[];     // The path from the start node to the goal node if found
}
function depthLimitedSearch<T extends ValueType>(
    startNode: Node<T>,
    goalValue: T,
    depthLimit: number
): SearchResult<T> {

    // Helper recursive function
    function dlsRecursive(
        currentNode: Node<T>,
        currentDepth: number
    ): SearchResult<T> {
        // 1. Check if the current node is the goal
        if (currentNode.value === goalValue) {
            return {
                status: SearchStatus.FOUND,
                node: currentNode,
                path: [currentNode] // Path starts with this node
            };
        }

        // 2. Check if the depth limit has been reached
        // IMPORTANT: We check for goal *before* cutoff at the current depth.
        // If the current node is the goal, we've found it *at* this depth.
        // If it's not the goal, and we're at the limit, we cannot go deeper.
        if (currentDepth === depthLimit) {
            return { status: SearchStatus.CUTOFF };
        }

        let anyCutoffOccurred = false;

        // 3. Explore children
        for (const child of currentNode.children) {
            const result = dlsRecursive(child, currentDepth + 1);

            if (result.status === SearchStatus.FOUND) {
                // If goal found in child's subtree, prepend current node to the path
                return {
                    status: SearchStatus.FOUND,
                    node: result.node,
                    path: [currentNode, ...(result.path || [])]
                };
            }

            if (result.status === SearchStatus.CUTOFF) {
                // A cutoff occurred in at least one branch
                anyCutoffOccurred = true;
            }
            // If result.status === NOT_FOUND, just continue to the next child
        }

        // 4. After checking all children
        if (anyCutoffOccurred) {
            return { status: SearchStatus.CUTOFF }; // Some path might exist deeper
        } else {
            return { status: SearchStatus.NOT_FOUND }; // No goal found and no cutoff below
        }
    }

    // Start the recursive search from the startNode at depth 0
    return dlsRecursive(startNode, 0);
}
// --- Sample Tree Structure ---
/*
        A (0)
       / \
      B   C (1)
     / \   \
    D   E   F (2)
   /     \
  G       H (3)
*/

// Nodes
const nodeG: Node<string> = { value: 'G', children: [] };
const nodeH: Node<string> = { value: 'H', children: [] };
const nodeD: Node<string> = { value: 'D', children: [nodeG] };
const nodeE: Node<string> = { value: 'E', children: [nodeH] };
const nodeF: Node<string> = { value: 'F', children: [] };
const nodeB: Node<string> = { value: 'B', children: [nodeD, nodeE] };
const nodeC: Node<string> = { value: 'C', children: [nodeF] };
const nodeA: Node<string> = { value: 'A', children: [nodeB, nodeC] };

console.log("--- Depth-Limited Search Examples ---");

// Test Case 1: Goal found within limit (goal 'G', limit 3)
let result1 = depthLimitedSearch(nodeA, 'G', 3);
console.log("\nSearch for 'G' with limit 3:");
console.log(`Status: ${result1.status}`); // Expected: FOUND
console.log(`Node: ${result1.node?.value}`); // Expected: G
console.log(`Path: ${result1.path?.map(n => n.value).join(' -> ')}`); // Expected: A -> B -> D -> G

// Test Case 2: Goal found exactly at the limit (goal 'F', limit 2)
let result2 = depthLimitedSearch(nodeA, 'F', 2);
console.log("\nSearch for 'F' with limit 2:");
console.log(`Status: ${result2.status}`); // Expected: FOUND
console.log(`Node: ${result2.node?.value}`); // Expected: F
console.log(`Path: ${result2.path?.map(n => n.value).join(' -> ')}`); // Expected: A -> C -> F

// Test Case 3: Goal exists, but limit is too low (goal 'H', limit 2)
let result3 = depthLimitedSearch(nodeA, 'H', 2);
console.log("\nSearch for 'H' with limit 2:");
console.log(`Status: ${result3.status}`); // Expected: CUTOFF
console.log(`Node: ${result3.node?.value}`); // Expected: undefined
console.log(`Path: ${result3.path?.map(n => n.value).join(' -> ')}`); // Expected: undefined

// Test Case 4: Goal does not exist in the tree at all (goal 'Z', limit 4)
let result4 = depthLimitedSearch(nodeA, 'Z', 4);
console.log("\nSearch for 'Z' with limit 4:");
console.log(`Status: ${result4.status}`); // Expected: NOT_FOUND
console.log(`Node: ${result4.node?.value}`); // Expected: undefined
console.log(`Path: ${result4.path?.map(n => n.value).join(' -> ')}`); // Expected: undefined

// Test Case 5: Goal is the start node (goal 'A', limit 0)
let result5 = depthLimitedSearch(nodeA, 'A', 0);
console.log("\nSearch for 'A' with limit 0:");
console.log(`Status: ${result5.status}`); // Expected: FOUND
console.log(`Node: ${result5.node?.value}`); // Expected: A
console.log(`Path: ${result5.path?.map(n => n.value).join(' -> ')}`); // Expected: A

// Test Case 6: Goal is not start node, limit 0 (goal 'B', limit 0)
let result6 = depthLimitedSearch(nodeA, 'B', 0);
console.log("\nSearch for 'B' with limit 0:");
console.log(`Status: ${result6.status}`); // Expected: CUTOFF
console.log(`Node: ${result6.node?.value}`); // Expected: undefined
console.log(`Path: ${result6.path?.map(n => n.value).join(' -> ')}`); // Expected: undefined
