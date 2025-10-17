class TreeNode {
    val: number;
    left: TreeNode | null;
    right: TreeNode | null;

    constructor(val: number, left: TreeNode | null = null, right: TreeNode | null = null) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

function sumOfNodes(root: TreeNode | null): number {
    if (root === null) {
        return 0;
    }
    return root.val + sumOfNodes(root.left) + sumOfNodes(root.right);
}
class BinaryTreeNode<T extends number> {
    value: T;
    left: BinaryTreeNode<T> | null;
    right: BinaryTreeNode<T> | null;

    constructor(value: T, left: BinaryTreeNode<T> | null = null, right: BinaryTreeNode<T> | null = null) {
        this.value = value;
        this.left = left;
        this.right = right;
    }
}

function sumBinaryTree<T extends number>(root: BinaryTreeNode<T> | null): number {
    if (root === null) {
        return 0;
    }
    return Number(root.value) + sumBinaryTree(root.left) + sumBinaryTree(root.right);
}
function sumOfNodesIterative(root: TreeNode | null): number {
    if (root === null) return 0;
    
    let sum = 0;
    const queue: TreeNode[] = [root];
    
    while (queue.length > 0) {
        const node = queue.shift()!;
        sum += node.val;
        
        if (node.left !== null) {
            queue.push(node.left);
        }
        if (node.right !== null) {
            queue.push(node.right);
        }
    }
    
    return sum;
}
function sumOfNodesDFS(root: TreeNode | null): number {
    if (root === null) return 0;
    
    let sum = 0;
    const stack: TreeNode[] = [root];
    
    while (stack.length > 0) {
        const node = stack.pop()!;
        sum += node.val;
        
        if (node.right !== null) {
            stack.push(node.right);
        }
        if (node.left !== null) {
            stack.push(node.left);
        }
    }
    
    return sum;
}
class TreeNode {
    constructor(
        public val: number,
        public left: TreeNode | null = null,
        public right: TreeNode | null = null
    ) {}
}

// Recursive solution
function sumOfAllNodes(root: TreeNode | null): number {
    if (root === null) return 0;
    return root.val + sumOfAllNodes(root.left) + sumOfAllNodes(root.right);
}

// Example usage:
function createSampleTree(): TreeNode {
    /*
        Tree structure:
              1
            /   \
           2     3
          / \   /
         4   5 6
    */
    const root = new TreeNode(1);
    root.left = new TreeNode(2);
    root.right = new TreeNode(3);
    root.left.left = new TreeNode(4);
    root.left.right = new TreeNode(5);
    root.right.left = new TreeNode(6);
    return root;
}

// Test the implementation
const tree = createSampleTree();
console.log("Sum of all nodes:", sumOfAllNodes(tree)); // Output: 21 (1+2+3+4+5+6)
