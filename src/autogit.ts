interface TreeNode {
    val: number;
    left: TreeNode | null;
    right: TreeNode | null;
}

function diameterOfBinaryTree(root: TreeNode | null): number {
    let maxDiameter = 0;

    function dfs(node: TreeNode | null): number {
        if (!node) return 0;

        const leftHeight = dfs(node.left);
        const rightHeight = dfs(node.right);

        // Update the maximum diameter found
        maxDiameter = Math.max(maxDiameter, leftHeight + rightHeight);

        // Return the height of the current subtree
        return Math.max(leftHeight, rightHeight) + 1;
    }

    dfs(root);
    return maxDiameter;
}
