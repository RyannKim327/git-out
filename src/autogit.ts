type Node<T> = {
    value: T;
    children: Node<T>[];
};

function depthLimitedSearchIterative<T>(
    start: Node<T>,
    target: T,
    limit: number
): Node<T> | null {
    const stack: { node: Node<T>; depth: number }[] = [];
    stack.push({ node: start, depth: 0 });

    while (stack.length > 0) {
        const { node, depth } = stack.pop()!;

        // Process the node
        if (node.value === target) {
            return node; // Found the target
        }

        // If depth limit not reached, push children
        if (depth < limit) {
            // You can reverse to simulate recursive DFS order
            for (let i = node.children.length - 1; i >= 0; i--) {
                stack.push({ node: node.children[i], depth: depth + 1 });
            }
        }
    }

    // Target not found within depth limit
    return null;
}

// ===== Example usage =====
const tree: Node<string> = {
    value: "A",
    children: [
        { value: "B", children: [] },
        { value: "C", children: [
            { value: "D", children: [] },
            { value: "E", children: [] }
        ]}
    ]
};

const found = depthLimitedSearchIterative(tree, "E", 2);
console.log(found?.value); // "E" if within limit, else null
