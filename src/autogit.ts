interface TreeNode {
    value: number;
    left: TreeNode | null;
    right: TreeNode | null;
}

function countLeafNodes(root: TreeNode | null): number {
    if (root === null) {
        return 0;
    }
    
    // If both left and right are null, it's a leaf node
    if (root.left === null && root.right === null) {
        return 1;
    }
    
    // Recursively count leaf nodes in left and right subtrees
    return countLeafNodes(root.left) + countLeafNodes(root.right);
}
function countLeafNodesIterative(root: TreeNode | null): number {
    if (root === null) return 0;
    
    let count = 0;
    const queue: TreeNode[] = [root];
    
    while (queue.length > 0) {
        const currentNode = queue.shift()!;
        
        if (currentNode.left === null && currentNode.right === null) {
            count++;
        }
        
        if (currentNode.left !== null) {
            queue.push(currentNode.left);
        }
        
        if (currentNode.right !== null) {
            queue.push(currentNode.right);
        }
    }
    
    return count;
}
function countLeafNodesDFS(root: TreeNode | null): number {
    if (root === null) return 0;
    
    let count = 0;
    const stack: TreeNode[] = [root];
    
    while (stack.length > 0) {
        const currentNode = stack.pop()!;
        
        if (currentNode.left === null && currentNode.right === null) {
            count++;
        }
        
        if (currentNode.right !== null) {
            stack.push(currentNode.right);
        }
        
        if (currentNode.left !== null) {
            stack.push(currentNode.left);
        }
    }
    
    return count;
}
interface TreeNode {
    value: number;
    left: TreeNode | null;
    right: TreeNode | null;
}

class BinaryTree {
    root: TreeNode | null = null;

    // Create a sample tree
    createSampleTree(): void {
        this.root = {
            value: 1,
            left: {
                value: 2,
                left: { value: 4, left: null, right: null },
                right: { value: 5, left: null, right: null }
            },
            right: {
                value: 3,
                left: { value: 6, left: null, right: null },
                right: null
            }
        };
    }

    countLeafNodes(): number {
        return this.countLeafNodesRecursive(this.root);
    }

    private countLeafNodesRecursive(node: TreeNode | null): number {
        if (node === null) return 0;
        
        if (node.left === null && node.right === null) {
            return 1;
        }
        
        return this.countLeafNodesRecursive(node.left) + 
               this.countLeafNodesRecursive(node.right);
    }
}

// Usage
const tree = new BinaryTree();
tree.createSampleTree();
console.log("Number of leaf nodes:", tree.countLeafNodes()); // Output: 3
