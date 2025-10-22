class TreeNode {
    val: number;
    left: TreeNode | null;
    right: TreeNode | null;
    
    constructor(val: number) {
        this.val = val;
        this.left = null;
        this.right = null;
    }
}

function sumBinaryTree(root: TreeNode | null): number {
    if (!root) return 0;
    return root.val + sumBinaryTree(root.left) + sumBinaryTree(root.right);
}

// Usage example:
const root = new TreeNode(1);
root.left = new TreeNode(2);
root.right = new TreeNode(3);
root.left.left = new TreeNode(4);
root.left.right = new TreeNode(5);

console.log(sumBinaryTree(root)); // Output: 15 (1+2+3+4+5)
function sumBinaryTreeIterative(root: TreeNode | null): number {
    if (!root) return 0;
    
    let sum = 0;
    const queue: TreeNode[] = [root];
    
    while (queue.length > 0) {
        const node = queue.shift()!;
        sum += node.val;
        
        if (node.left) queue.push(node.left);
        if (node.right) queue.push(node.right);
    }
    
    return sum;
}

// Usage same as above
console.log(sumBinaryTreeIterative(root)); // Output: 15
interface BinaryTree<T> {
    value: T;
    left?: BinaryTree<T>;
    right?: BinaryTree<T>;
}

function sumBinaryTreeGeneric(root: BinaryTree<number> | undefined): number {
    if (!root) return 0;
    return root.value + 
           sumBinaryTreeGeneric(root.left) + 
           sumBinaryTreeGeneric(root.right);
}

// Usage with interface:
const tree: BinaryTree<number> = {
    value: 1,
    left: {
        value: 2,
        left: { value: 4 },
        right: { value: 5 }
    },
    right: {
        value: 3
    }
};

console.log(sumBinaryTreeGeneric(tree)); // Output: 15
function sumArrayBinaryTree(tree: number[]): number {
    return tree.reduce((sum, val) => sum + val, 0);
}

// Usage with array representation:
const treeArray = [1, 2, 3, 4, 5];
console.log(sumArrayBinaryTree(treeArray)); // Output: 15
