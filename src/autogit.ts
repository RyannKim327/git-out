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
function sumBinaryTreeRecursive(node: TreeNode<number> | null): number {
    if (node === null) {
        return 0;
    }
    
    return node.value + 
           sumBinaryTreeRecursive(node.left) + 
           sumBinaryTreeRecursive(node.right);
}
function sumBinaryTreeIterativeDFS(root: TreeNode<number> | null): number {
    if (root === null) return 0;
    
    let sum = 0;
    const stack: TreeNode<number>[] = [root];
    
    while (stack.length > 0) {
        const node = stack.pop()!;
        sum += node.value;
        
        if (node.right) stack.push(node.right);
        if (node.left) stack.push(node.left);
    }
    
    return sum;
}
function sumBinaryTreeIterativeBFS(root: TreeNode<number> | null): number {
    if (root === null) return 0;
    
    let sum = 0;
    const queue: TreeNode<number>[] = [root];
    
    while (queue.length > 0) {
        const node = queue.shift()!;
        sum += node.value;
        
        if (node.left) queue.push(node.left);
        if (node.right) queue.push(node.right);
    }
    
    return sum;
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

// All the sum functions from above...

// Create a sample binary tree
const root = new TreeNode(1);
root.left = new TreeNode(2);
root.right = new TreeNode(3);
root.left.left = new TreeNode(4);
root.left.right = new TreeNode(5);
root.right.left = new TreeNode(6);

// Test all methods
console.log("Recursive sum:", sumBinaryTreeRecursive(root)); // 21
console.log("DFS Iterative sum:", sumBinaryTreeIterativeDFS(root)); // 21
console.log("BFS Iterative sum:", sumBinaryTreeIterativeBFS(root)); // 21
function sumBinaryTreeGeneric<T extends number>(node: TreeNode<T> | null): number {
    if (node === null) {
        return 0;
    }
    
    return Number(node.value) + 
           sumBinaryTreeGeneric(node.left) + 
           sumBinaryTreeGeneric(node.right);
}
