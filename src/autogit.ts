// --- 1. Node Definition ---
interface Node<T> {
    value: T;
    children: Node<T>[];
}

// --- 2. Stack Item Definition ---
// For iterative DLS, we need to store both the node and its current depth
interface StackItem<T> {
    node: Node<T>;
    depth: number;
}
function depthLimitedSearchIterative<T>(
    startNode: Node<T>,
    goalValue: T,
    limit: number
): Node<T> | null {
    // Initialize the stack with the start node and its depth (0)
    const stack: StackItem<T>[] = [{ node: startNode, depth: 0 }];

    // A Set to keep track of visited nodes to avoid cycles in graphs.
    // For trees, this isn't strictly necessary but is good practice for general graph traversal.
    const visited = new Set<Node<T>>();

    while (stack.length > 0) {
        // Pop the top item from the stack
        const { node: currentNode, depth: currentDepth } = stack.pop()!; // '!' asserts that pop() will not return undefined

        // If the node has been visited in the current path, skip it
        // This simple 'visited' check works well for many graphs, but for DLS
        // sometimes revisiting a node at a *different* depth limit might be valid
        // if the path matters. For a basic "find the goal" it's fine.
        if (visited.has(currentNode)) {
            continue;
        }
        visited.add(currentNode);

        // Check if the current node is the goal
        if (currentNode.value === goalValue) {
            console.log(`Goal found at depth ${currentDepth}!`);
            return currentNode; // Goal found
        }

        // Check if we have reached the depth limit
        if (currentDepth < limit) {
            // If not, explore children
            // Push children onto the stack in reverse order to maintain
            // a 'left-to-right' (or whatever order children are listed) DFS exploration
            // because stack.pop() will process the last pushed item first.
            for (let i = currentNode.children.length - 1; i >= 0; i--) {
                const child = currentNode.children[i];
                // Only push if not already visited in the current path (optional, see note above)
                // or if it's not a cycle back to an ancestor within the current path.
                // For this simple DLS, we'll just push children and let the outer 'visited' set handle general cycles.
                if (!visited.has(child)) {
                    stack.push({ node: child, depth: currentDepth + 1 });
                }
            }
        } else {
            // console.log(`Pruning path at node ${currentNode.value} (depth ${currentDepth}) - limit reached.`);
        }
    }

    // If the stack becomes empty and the goal was not found within the limit
    console.log(`Goal "${goalValue}" not found within depth limit ${limit}.`);
    return null;
}
// --- 4. Example Graph/Tree Construction ---
const nodeA: Node<string> = { value: "A", children: [] };
const nodeB: Node<string> = { value: "B", children: [] };
const nodeC: Node<string> = { value: "C", children: [] };
const nodeD: Node<string> = { value: "D", children: [] };
const nodeE: Node<string> = { value: "E", children: [] };
const nodeF: Node<string> = { value: "F", children: [] };
const nodeG: Node<string> = { value: "G", children: [] };
const nodeH: Node<string> = { value: "H", children: [] };
const nodeI: Node<string> = { value: "I", children: [] };

nodeA.children = [nodeB, nodeC];
nodeB.children = [nodeD, nodeE];
nodeC.children = [nodeF, nodeG];
nodeD.children = [nodeH];
nodeE.children = [];
nodeF.children = [nodeI];
nodeG.children = [];
nodeH.children = [];
nodeI.children = [];

/*
Visualization:

       A (d=0)
      / \
     B   C (d=1)
    /|   |\
   D E   F G (d=2)
  /      |
 H       I (d=3)
*/

console.log("--- Testing DLS ---");

// Test Case 1: Goal at depth 1, limit allows
let result1 = depthLimitedSearchIterative(nodeA, "C", 1);
console.log("Result 1 (C, limit 1):", result1 ? result1.value : "Not Found"); // Expected: C

// Test Case 2: Goal at depth 2, limit allows
let result2 = depthLimitedSearchIterative(nodeA, "F", 2);
console.log("Result 2 (F, limit 2):", result2 ? result2.value : "Not Found"); // Expected: F

// Test Case 3: Goal at depth 2, limit is too small
let result3 = depthLimitedSearchIterative(nodeA, "F", 1);
console.log("Result 3 (F, limit 1):", result3 ? result3.value : "Not Found"); // Expected: Not Found

// Test Case 4: Goal at depth 3, limit allows
let result4 = depthLimitedSearchIterative(nodeA, "H", 3);
console.log("Result 4 (H, limit 3):", result4 ? result4.value : "Not Found"); // Expected: H

// Test Case 5: Goal not present
let result5 = depthLimitedSearchIterative(nodeA, "X", 5);
console.log("Result 5 (X, limit 5):", result5 ? result5.value : "Not Found"); // Expected: Not Found

// Test Case 6: Goal is start node, limit 0
let result6 = depthLimitedSearchIterative(nodeA, "A", 0);
console.log("Result 6 (A, limit 0):", result6 ? result6.value : "Not Found"); // Expected: A

// Test Case 7: Goal is start node, limit -1 (should not find anything unless limit includes negative)
// Note: typically limit >= 0. A negative limit will effectively prune all paths immediately.
let result7 = depthLimitedSearchIterative(nodeA, "A", -1);
console.log("Result 7 (A, limit -1):", result7 ? result7.value : "Not Found"); // Expected: Not Found
