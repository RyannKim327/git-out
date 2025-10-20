class TreeNode<T> {
    val: T;
    left: TreeNode<T> | null;
    right: TreeNode<T> | null;

    constructor(val: T, left: TreeNode<T> | null = null, right: TreeNode<T> | null = null) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}
function sumBinaryTreeRecursive(root: TreeNode<number> | null): number {
    if (!root) return 0;
    
    return root.val + 
           sumBinaryTreeRecursive(root.left) + 
           sumBinaryTreeRecursive(root.right);
}
function sumBinaryTreeIterative(root: TreeNode<number> | null): number {
    if (!root) return 0;
    
    let sum = 0;
    const queue: TreeNode<number>[] = [root];
    
    while (queue.length > 0) {
        const currentNode = queue.shift()!;
        sum += currentNode.val;
        
        if (currentNode.left) queue.push(currentNode.left);
        if (currentNode.right) queue.push(currentNode.right);
    }
    
    return sum;
}
function sumBinaryTreeDFS(root: TreeNode<number> | null): number {
    if (!root) return 0;
    
    let sum = 0;
    const stack: TreeNode<number>[] = [root];
    
    while (stack.length > 0) {
        const currentNode = stack.pop()!;
        sum += currentNode.val;
        
        if (currentNode.right) stack.push(currentNode.right);
        if (currentNode.left) stack.push(currentNode.left);
    }
    
    return sum;
}
class TreeNode<T> {
    val: T;
    left: TreeNode<T> | null;
    right: TreeNode<T> | null;

    constructor(val: T, left: TreeNode<T> | null = null, right: TreeNode<T> | null = null) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

// Create a sample binary tree
const root = new TreeNode(1);
root.left = new TreeNode(2);
root.right = new TreeNode(3);
root.left.left = new TreeNode(4);
root.left.right = new TreeNode(5);
root.right.left = new TreeNode(6);

// Test the functions
console.log("Recursive sum:", sumBinaryTreeRecursive(root)); // 21
console.log("Iterative BFS sum:", sumBinaryTreeIterative(root)); // 21
console.log("Iterative DFS sum:", sumBinaryTreeDFS(root)); // 21

// Handle empty tree case
console.log("Empty tree sum:", sumBinaryTreeRecursive(null)); // 0
function sumBinaryTreeGeneric<T>(
    root: TreeNode<T> | null,
    selector: (val: T) => number
): number {
    if (!root) return 0;
    
    return selector(root.val) + 
           sumBinaryTreeGeneric(root.left, selector) + 
           sumBinaryTreeGeneric(root.right, selector);
}

// Usage with custom objects
interface CustomNode {
    value: number;
    metadata: string;
}

const customRoot = new TreeNode<CustomNode>(
    { value: 10, metadata: "root" },
    new TreeNode<CustomNode>({ value: 20, metadata: "left" }),
    new TreeNode<CustomNode>({ value: 30, metadata: "right" })
);

const customSum = sumBinaryTreeGeneric(customRoot, node => node.value);
console.log("Custom object sum:", customSum); // 60
