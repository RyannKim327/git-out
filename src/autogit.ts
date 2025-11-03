class TreeNode<T> {
    value: T;
    left: TreeNode<T> | null = null;
    right: TreeNode<T> | null = null;

    constructor(value: T) {
        this.value = value;
    }
}
class BinaryTree<T> {
    root: TreeNode<T> | null = null;

    // Insert a node as child of specified parent
    insert(value: T, parentValue?: T, side: 'left' | 'right' = 'left'): void {
        const newNode = new TreeNode(value);
        
        if (!this.root) {
            this.root = newNode;
            return;
        }

        if (!parentValue) {
            throw new Error("Parent value must be specified for non-root nodes");
        }

        const parent = this.findBFS(parentValue);
        if (!parent) {
            throw new Error("Parent node not found");
        }

        if (side === 'left') {
            if (parent.left) {
                throw new Error("Left child already exists");
            }
            parent.left = newNode;
        } else {
            if (parent.right) {
                throw new Error("Right child already exists");
            }
            parent.right = newNode;
        }
    }

    // Search/BFS Helper
    private findBFS(value: T): TreeNode<T> | null {
        const queue: TreeNode<T>[] = [];
        if (this.root) queue.push(this.root);

        while (queue.length) {
            const current = queue.shift()!;
            if (current.value === value) return current;

            if (current.left) queue.push(current.left);
            if (current.right) queue.push(current.right);
        }
        return null;
    }

    // Traversal Methods
    inOrderTraversal(node: TreeNode<T> | null = this.root): T[] {
        if (!node) return [];
        return [
            ...this.inOrderTraversal(node.left),
            node.value,
            ...this.inOrderTraversal(node.right)
        ];
    }

    preOrderTraversal(node: TreeNode<T> | null = this.root): T[] {
        if (!node) return [];
        return [
            node.value,
            ...this.preOrderTraversal(node.left),
            ...this.preOrderTraversal(node.right)
        ];
    }

    postOrderTraversal(node: TreeNode<T> | null = this.root): T[] {
        if (!node) return [];
        return [
            ...this.postOrderTraversal(node.left),
            ...this.postOrderTraversal(node.right),
            node.value
        ];
    }
    
    // Breadth-First Search
    breadthFirstSearch(): T[] {
        const result: T[] = [];
        const queue: TreeNode<T>[] = [];
        
        if (this.root) queue.push(this.root);
        
        while (queue.length) {
            const node = queue.shift()!;
            result.push(node.value);
            
            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }
        
        return result;
    }
}
// Create tree
const tree = new BinaryTree<number>();

// Insert nodes
tree.insert(1);                   // Root node
tree.insert(2, 1, 'left');        // Left child of 1
tree.insert(3, 1, 'right');       // Right child of 1
tree.insert(4, 2, 'left');        // Left child of 2
tree.insert(5, 2, 'right');       // Right child of 2
tree.insert(6, 3, 'right');       // Right child of 3

// Output:
console.log("In-order:", tree.inOrderTraversal());     // [4, 2, 5, 1, 3, 6]
console.log("Pre-order:", tree.preOrderTraversal());   // [1, 2, 4, 5, 3, 6]
console.log("Post-order:", tree.postOrderTraversal()); // [4, 5, 2, 6, 3, 1]
console.log("BFS:", tree.breadthFirstSearch());        // [1, 2, 3, 4, 5, 6]
       1
     /   \
    2     3
   / \     \
  4   5     6
