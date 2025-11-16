type Node<T> = {
    value: T;
    children: Node<T>[];
};

/**
 * Iterative Depth-Limited Search (DLS)
 *
 * @param root - The starting node of the search
 * @param isGoal - Predicate function to check if node is the goal
 * @param depthLimit - Maximum depth to search (>= 0)
 * @returns The goal node if found within depth limit, otherwise null
 */
function depthLimitedSearch<T>(
    root: Node<T>,
    isGoal: (node: Node<T>) => boolean,
    depthLimit: number
): Node<T> | null {
    // Initialize stack with root node at depth 0
    const stack: { node: Node<T>; depth: number }[] = [{ node: root, depth: 0 }];

    while (stack.length > 0) {
        const { node, depth } = stack.pop()!; // Pop the top node from stack

        // If goal found, return the node
        if (isGoal(node)) {
            return node;
        }

        // Push children to stack only if depth is within limit
        if (depth < depthLimit) {
            // Reverse children to maintain DFS order (right-to-left push leads to left-to-right processing)
            for (let i = node.children.length - 1; i >= 0; i--) {
                stack.push({ node: node.children[i], depth: depth + 1 });
            }
        }
    }

    return null; // Goal node not found within depth limit
}
// Create a sample tree:
//        A
//      /   \
//     B     C
//    /     / \
//   D     E   F
const tree: Node<string> = {
    value: 'A',
    children: [
        {
            value: 'B',
            children: [
                { value: 'D', children: [] }
            ]
        },
        {
            value: 'C',
            children: [
                { value: 'E', children: [] },
                { value: 'F', children: [] }
            ]
        }
    ]
};

// Search for node with value 'E' with depth limit 2
const result = depthLimitedSearch(
    tree,
    (node) => node.value === 'E',
    2
);

console.log(result ? `Found: ${result.value}` : "Not found");
