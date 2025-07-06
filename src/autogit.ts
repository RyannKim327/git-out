class TreeNode<T> {
    value: T;
    children: TreeNode<T>[];

    constructor(value: T) {
        this.value = value;
        this.children = [];
    }

    addChild(child: TreeNode<T>) {
        this.children.push(child);
    }
}
function breadthLimitedSearch<T>(root: TreeNode<T>, target: T, maxDepth: number): TreeNode<T> | null {
    if (maxDepth < 0) {
        return null; // If maxDepth is negative, return null
    }

    const queue: { node: TreeNode<T>; depth: number }[] = [{ node: root, depth: 0 }];
    
    while (queue.length > 0) {
        const { node, depth } = queue.shift()!; // Get the first element in the queue

        // Check if the current node is the target
        if (node.value === target) {
            return node; // Return the found node
        }

        // If we haven't reached the maximum depth, add children to the queue
        if (depth < maxDepth) {
            for (const child of node.children) {
                queue.push({ node: child, depth: depth + 1 });
            }
        }
    }

    return null; // Return null if the target is not found within the max depth
}
// Create a sample tree
const root = new TreeNode<number>(1);
const child1 = new TreeNode<number>(2);
const child2 = new TreeNode<number>(3);
const child3 = new TreeNode<number>(4);
const child4 = new TreeNode<number>(5);

root.addChild(child1);
root.addChild(child2);
child1.addChild(child3);
child1.addChild(child4);

// Perform a breadth-limited search
const targetValue = 4;
const maxDepth = 2;
const result = breadthLimitedSearch(root, targetValue, maxDepth);

if (result) {
    console.log(`Found node with value: ${result.value}`);
} else {
    console.log(`Node with value ${targetValue} not found within depth ${maxDepth}.`);
}
