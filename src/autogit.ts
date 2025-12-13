class TreeNode {
    value: number;
    left: TreeNode | null;
    right: TreeNode | null;

    constructor(value: number) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}
function sumNodesRecursive(root: TreeNode | null): number {
    if (root === null) {
        return 0;
    }
    return root.value + sumNodesRecursive(root.left) + sumNodesRecursive(root.right);
}
function sumNodesBFS(root: TreeNode | null): number {
    if (root === null) return 0;
    
    let sum = 0;
    const queue: TreeNode[] = [root];
    
    while (queue.length > 0) {
        const currentNode = queue.shift()!;
        sum += currentNode.value;
        
        if (currentNode.left) queue.push(currentNode.left);
        if (currentNode.right) queue.push(currentNode.right);
    }
    
    return sum;
}
function sumNodesDFS(root: TreeNode | null): number {
    if (root === null) return 0;
    
    let sum = 0;
    const stack: TreeNode[] = [root];
    
    while (stack.length > 0) {
        const currentNode = stack.pop()!;
        sum += currentNode.value;
        
        if (currentNode.right) stack.push(currentNode.right);
        if (currentNode.left) stack.push(currentNode.left);
    }
    
    return sum;
}
class TreeNode {
    value: number;
    left: TreeNode | null;
    right: TreeNode | null;

    constructor(value: number) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

// Helper function to create a sample tree
function createSampleTree(): TreeNode {
    const root = new TreeNode(1);
    root.left = new TreeNode(2);
    root.right = new TreeNode(3);
    root.left.left = new TreeNode(4);
    root.left.right = new TreeNode(5);
    root.right.left = new TreeNode(6);
    root.right.right = new TreeNode(7);
    return root;
}

// Recursive sum function
function sumNodesRecursive(root: TreeNode | null): number {
    if (root === null) {
        return 0;
    }
    return root.value + sumNodesRecursive(root.left) + sumNodesRecursive(root.right);
}

// Usage
const tree = createSampleTree();
const totalSum = sumNodesRecursive(tree);
console.log(`Sum of all nodes: ${totalSum}`); // Output: 28 (1+2+3+4+5+6+7)
class TreeNode<T extends number | string> {
    value: T;
    left: TreeNode<T> | null;
    right: TreeNode<T> | null;

    constructor(value: T) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

function sumNodesGeneric<T extends number | string>(
    root: TreeNode<T> | null
): T extends number ? number : string {
    if (root === null) {
        return 0 as T extends number ? number : string;
    }
    
    const leftSum = sumNodesGeneric(root.left) as any;
    const rightSum = sumNodesGeneric(root.right) as any;
    
    if (typeof root.value === 'number') {
        return (root.value + leftSum + rightSum) as T extends number ? number : string;
    } else {
        return (root.value + leftSum + rightSum) as T extends number ? number : string;
    }
}
