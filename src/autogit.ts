class TreeNode {
    value: number;
    left: TreeNode | null;
    right: TreeNode | null;

    constructor(value: number, left: TreeNode | null = null, right: TreeNode | null = null) {
        this.value = value;
        this.left = left;
        this.right = right;
    }
}
function sumOfNodes(root: TreeNode | null): number {
    if (root === null) return 0;
    return root.value + sumOfNodes(root.left) + sumOfNodes(root.right);
}
function sumOfNodesIterative(root: TreeNode | null): number {
    if (!root) return 0;
    let sum = 0;
    const queue: (TreeNode | null)[] = [root];

    while (queue.length > 0) {
        const node = queue.shift();
        if (node) {
            sum += node.value;
            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }
    }
    return sum;
}
const tree =
    new TreeNode(5,
        new TreeNode(3,
            new TreeNode(2),
            new TreeNode(4)
        ),
        new TreeNode(7,
            null,
            new TreeNode(8)
        )
    );

console.log(sumOfNodes(tree)); // 29
console.log(sumOfNodesIterative(tree)); // 29
