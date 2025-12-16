interface TreeNode {
    value: number;
    left: TreeNode | null;
    right: TreeNode | null;
}
function sumTreeRecursive(root: TreeNode | null): number {
    if (root === null) {
        return 0;
    }
    
    return root.value + sumTreeRecursive(root.left) + sumTreeRecursive(root.right);
}
function sumTreeIterativeBFS(root: TreeNode | null): number {
    if (root === null) return 0;
    
    let sum = 0;
    const queue: TreeNode[] = [root];
    
    while (queue.length > 0) {
        const node = queue.shift()!;
        sum += node.value;
        
        if (node.left !== null) queue.push(node.left);
        if (node.right !== null) queue.push(node.right);
    }
    
    return sum;
}
function sumTreeIterativeDFS(root: TreeNode | null): number {
    if (root === null) return 0;
    
    let sum = 0;
    const stack: TreeNode[] = [root];
    
    while (stack.length > 0) {
        const node = stack.pop()!;
        sum += node.value;
        
        if (node.right !== null) stack.push(node.right);
        if (node.left !== null) stack.push(node.left);
    }
    
    return sum;
}
// Create a sample binary tree
const tree: TreeNode = {
    value: 1,
    left: {
        value: 2,
        left: {
            value: 4,
            left: null,
            right: null
        },
        right: {
            value: 5,
            left: null,
            right: null
        }
    },
    right: {
        value: 3,
        left: {
            value: 6,
            left: null,
            right: null
        },
        right: null
    }
};

// Test the functions
console.log("Recursive sum:", sumTreeRecursive(tree)); // Output: 21 (1+2+3+4+5+6)
console.log("BFS sum:", sumTreeIterativeBFS(tree));    // Output: 21
console.log("DFS sum:", sumTreeIterativeDFS(tree));    // Output: 21
interface TreeNodeGeneric<T> {
    value: T;
    left: TreeNodeGeneric<T> | null;
    right: TreeNodeGeneric<T> | null;
}

function sumTreeGeneric<T>(
    root: TreeNodeGeneric<T> | null,
    getValue: (val: T) => number
): number {
    if (root === null) return 0;
    
    return getValue(root.value) + 
           sumTreeGeneric(root.left, getValue) + 
           sumTreeGeneric(root.right, getValue);
}

// Usage with numbers
console.log(sumTreeGeneric(tree, (val: number) => val));

// Usage with objects that have numeric properties
const objectTree: TreeNodeGeneric<{price: number}> = {
    value: {price: 10},
    left: {value: {price: 5}, left: null, right: null},
    right: {value: {price: 15}, left: null, right: null}
};

console.log(sumTreeGeneric(objectTree, (obj) => obj.price)); // Output: 30
