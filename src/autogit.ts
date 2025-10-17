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
function sumNodesRecursive<T extends number>(root: TreeNode<T> | null): number {
    if (root === null) {
        return 0;
    }
    
    return root.value + 
           sumNodesRecursive(root.left) + 
           sumNodesRecursive(root.right);
}
function sumNodesIterativeBFS<T extends number>(root: TreeNode<T> | null): number {
    if (root === null) return 0;
    
    let sum = 0;
    const queue: TreeNode<T>[] = [root];
    
    while (queue.length > 0) {
        const current = queue.shift()!;
        sum += current.value;
        
        if (current.left) queue.push(current.left);
        if (current.right) queue.push(current.right);
    }
    
    return sum;
}
function sumNodesIterativeDFS<T extends number>(root: TreeNode<T> | null): number {
    if (root === null) return 0;
    
    let sum = 0;
    const stack: TreeNode<T>[] = [root];
    
    while (stack.length > 0) {
        const current = stack.pop()!;
        sum += current.value;
        
        if (current.right) stack.push(current.right);
        if (current.left) stack.push(current.left);
    }
    
    return sum;
}
class BinaryTree<T> {
    root: TreeNode<T> | null;

    constructor() {
        this.root = null;
    }

    sumAllNodes(): number {
        return this.sumNodesRecursive(this.root);
    }

    private sumNodesRecursive(node: TreeNode<T> | null): number {
        if (node === null) {
            return 0;
        }
        
        // Type guard to ensure we're working with numbers
        if (typeof node.value !== 'number') {
            throw new Error('Tree values must be numbers to calculate sum');
        }
        
        return node.value + 
               this.sumNodesRecursive(node.left) + 
               this.sumNodesRecursive(node.right);
    }
}

// Example usage and testing
function testBinaryTreeSum(): void {
    // Create a binary tree
    const tree = new BinaryTree<number>();
    
    // Build tree structure
    tree.root = new TreeNode(1);
    tree.root.left = new TreeNode(2);
    tree.root.right = new TreeNode(3);
    tree.root.left.left = new TreeNode(4);
    tree.root.left.right = new TreeNode(5);
    tree.root.right.left = new TreeNode(6);
    tree.root.right.right = new TreeNode(7);
    
    /*
    Tree structure:
           1
         /   \
        2     3
       / \   / \
      4   5 6   7
    */
    
    console.log("Recursive sum:", sumNodesRecursive(tree.root)); // Output: 28
    console.log("BFS sum:", sumNodesIterativeBFS(tree.root));    // Output: 28
    console.log("DFS sum:", sumNodesIterativeDFS(tree.root));    // Output: 28
    console.log("Class method sum:", tree.sumAllNodes());        // Output: 28
    
    // Test with empty tree
    console.log("Empty tree sum:", sumNodesRecursive(null));     // Output: 0
}

testBinaryTreeSum();
class GenericTreeNode<T extends number | bigint> {
    value: T;
    left: GenericTreeNode<T> | null;
    right: GenericTreeNode<T> | null;

    constructor(value: T) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

function sumNodesGeneric<T extends number | bigint>(
    root: GenericTreeNode<T> | null
): T {
    if (root === null) {
        return typeof root === 'bigint' ? BigInt(0) as T : 0 as T;
    }
    
    // Type-specific addition
    if (typeof root.value === 'bigint') {
        return (BigInt(root.value) + 
                BigInt(sumNodesGeneric(root.left)) + 
                BigInt(sumNodesGeneric(root.right))) as T;
    } else {
        return (root.value + 
                sumNodesGeneric(root.left) + 
                sumNodesGeneric(root.right)) as T;
    }
}
