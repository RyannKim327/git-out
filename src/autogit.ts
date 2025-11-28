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
function countLeafNodes<T>(root: TreeNode<T> | null): number {
    // Base Case 1: If the tree is empty (root is null), there are no leaves.
    if (root === null) {
        return 0;
    }

    // Base Case 2: If the current node is a leaf (no left or right children), count it as 1.
    if (root.left === null && root.right === null) {
        return 1;
    }

    // Recursive Step: If it's not a leaf, sum the leaf counts from its left and right subtrees.
    return countLeafNodes(root.left) + countLeafNodes(root.right);
}
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

function countLeafNodes<T>(root: TreeNode<T> | null): number {
    if (root === null) {
        return 0;
    }

    if (root.left === null && root.right === null) {
        return 1;
    }

    return countLeafNodes(root.left) + countLeafNodes(root.right);
}

// --- Example Usage ---

// 1. Empty tree
const tree1 = null;
console.log("Leaves in empty tree:", countLeafNodes(tree1)); // Expected: 0

// 2. Single node tree (which is a leaf)
const tree2 = new TreeNode(1);
console.log("Leaves in single node tree:", countLeafNodes(tree2)); // Expected: 1

// 3. Simple tree:
//      10
//     /  \
//    5    15
//   / \
//  3   7
const tree3 = new TreeNode(10);
tree3.left = new TreeNode(5);
tree3.right = new TreeNode(15);
tree3.left.left = new TreeNode(3);
tree3.left.right = new TreeNode(7);

console.log("Leaves in tree3:", countLeafNodes(tree3)); // Expected: 3 (nodes 3, 7, 15)


// 4. More complex tree:
//         10
//        /  \
//       5    15
//      / \     \
//     3   7     18
//    /     \
//   2       8
const tree4 = new TreeNode(10);
tree4.left = new TreeNode(5);
tree4.right = new TreeNode(15);
tree4.left.left = new TreeNode(3);
tree4.left.right = new TreeNode(7);
tree4.right.right = new TreeNode(18);
tree4.left.left.left = new TreeNode(2);
tree4.left.right.right = new TreeNode(8);

console.log("Leaves in tree4:", countLeafNodes(tree4)); // Expected: 3 (nodes 2, 8, 18)

