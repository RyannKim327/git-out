interface TreeNode {
    val: number;
    left: TreeNode | null;
    right: TreeNode | null;
}
function maxDepth(root: TreeNode | null): number {
    if (root === null) {
        return 0; // Base case: an empty subtree has depth 0
    }
    // Recursively compute the depth of left and right subtrees
    const leftDepth = maxDepth(root.left);
    const rightDepth = maxDepth(root.right);
    // The depth of the current node is the max of subtrees + 1
    return Math.max(leftDepth, rightDepth) + 1;
}
function maxDepth(root: TreeNode | null): number {
    if (!root) return 0;
    
    const queue: TreeNode[] = [root];
    let depth = 0;
    
    while (queue.length > 0) {
        depth++; // Increment depth at each new level
        const levelSize = queue.length;
        
        // Process all nodes at the current level
        for (let i = 0; i < levelSize; i++) {
            const node = queue.shift()!; // Dequeue the front node
            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }
    }
    return depth;
}
// Example tree construction:
//       3
//      / \
//     9   20
//        /  \
//       15   7
const root: TreeNode = {
    val: 3,
    left: { val: 9, left: null, right: null },
    right: {
        val: 20,
        left: { val: 15, left: null, right: null },
        right: { val: 7, left: null, right: null }
    }
};

console.log(maxDepth(root)); // Output: 3
