class TreeNode<T> {
    value: T;
    left: TreeNode<T> | null;
    right: TreeNode<T> | null;

    constructor(value: T) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}
function countLeafNodesRecursive<T>(root: TreeNode<T> | null): number {
    // Base Case 1: Empty tree or null subtree
    if (root === null) {
        return 0;
    }

    // Base Case 2: It's a leaf node
    if (root.left === null && root.right === null) {
        return 1;
    }

    // Recursive Step: Sum leaves from left and right subtrees
    return countLeafNodesRecursive(root.left) + countLeafNodesRecursive(root.right);
}
function countLeafNodesIterative<T>(root: TreeNode<T> | null): number {
    if (root === null) {
        return 0;
    }

    let leafCount = 0;
    const queue: TreeNode<T>[] = [root]; // Initialize queue with the root

    while (queue.length > 0) {
        // Dequeue the front node. The `!` is a non-null assertion operator,
        // safe here because we check queue.length > 0
        const currentNode = queue.shift()!; 

        // Check if it's a leaf node
        if (currentNode.left === null && currentNode.right === null) {
            leafCount++;
        } else {
            // If not a leaf, enqueue its children if they exist
            if (currentNode.left !== null) {
                queue.push(currentNode.left);
            }
            if (currentNode.right !== null) {
                queue.push(currentNode.right);
            }
        }
    }

    return leafCount;
}
// --- TreeNode Class (as defined above) ---
class TreeNode<T> {
    value: T;
    left: TreeNode<T> | null;
    right: TreeNode<T> | null;

    constructor(value: T) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

// --- countLeafNodesRecursive Function (as defined above) ---
function countLeafNodesRecursive<T>(root: TreeNode<T> | null): number {
    if (root === null) {
        return 0;
    }
    if (root.left === null && root.right === null) {
        return 1;
    }
    return countLeafNodesRecursive(root.left) + countLeafNodesRecursive(root.right);
}

// --- countLeafNodesIterative Function (as defined above) ---
function countLeafNodesIterative<T>(root: TreeNode<T> | null): number {
    if (root === null) {
        return 0;
    }

    let leafCount = 0;
    const queue: TreeNode<T>[] = [root]; 

    while (queue.length > 0) {
        const currentNode = queue.shift()!; 

        if (currentNode.left === null && currentNode.right === null) {
            leafCount++;
        } else {
            if (currentNode.left !== null) {
                queue.push(currentNode.left);
            }
            if (currentNode.right !== null) {
                queue.push(currentNode.right);
            }
        }
    }

    return leafCount;
}

// --- Building a Sample Tree ---
/*
        1
       / \
      2   3
     / \   \
    4   5   6
       /
      7
*/
const root = new TreeNode(1);
root.left = new TreeNode(2);
root.right = new TreeNode(3);
root.left.left = new TreeNode(4);
root.left.right = new TreeNode(5);
root.right.right = new TreeNode(6);
root.left.right.left = new TreeNode(7);

// Leaf nodes in this tree are: 4, 7, 6. Expected count: 3

console.log("--- Tree 1 ---");
console.log("Number of leaf nodes (Recursive):", countLeafNodesRecursive(root));   // Output: 3
console.log("Number of leaf nodes (Iterative):", countLeafNodesIterative(root)); // Output: 3

// --- Another Tree (Single Node) ---
const singleNodeTree = new TreeNode('A'); // Leaf node: A. Expected count: 1

console.log("\n--- Single Node Tree ---");
console.log("Number of leaf nodes (Recursive):", countLeafNodesRecursive(singleNodeTree)); // Output: 1
console.log("Number of leaf nodes (Iterative):", countLeafNodesIterative(singleNodeTree)); // Output: 1

// --- Empty Tree ---
const emptyTree: TreeNode<number> | null = null; // Expected count: 0

console.log("\n--- Empty Tree ---");
console.log("Number of leaf nodes (Recursive):", countLeafNodesRecursive(emptyTree));   // Output: 0
console.log("Number of leaf nodes (Iterative):", countLeafNodesIterative(emptyTree)); // Output: 0

// --- Tree with only one child per node ---
/*
        10
       /
      20
     /
    30
*/
const skewedTree = new TreeNode(10);
skewedTree.left = new TreeNode(20);
skewedTree.left.left = new TreeNode(30); // Leaf node: 30. Expected count: 1

console.log("\n--- Skewed Tree ---");
console.log("Number of leaf nodes (Recursive):", countLeafNodesRecursive(skewedTree));   // Output: 1
console.log("Number of leaf nodes (Iterative):", countLeafNodesIterative(skewedTree)); // Output: 1
