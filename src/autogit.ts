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

    // Insert a value (level order insertion)
    insert(value: T): void {
        const newNode = new TreeNode(value);
        
        if (!this.root) {
            this.root = newNode;
            return;
        }

        const queue: TreeNode<T>[] = [this.root];
        while (queue.length > 0) {
            const current = queue.shift()!;
            
            if (!current.left) {
                current.left = newNode;
                return;
            } else {
                queue.push(current.left);
            }

            if (!current.right) {
                current.right = newNode;
                return;
            } else {
                queue.push(current.right);
            }
        }
    }

    // In-order traversal: left -> root -> right
    inOrderTraversal(node: TreeNode<T> | null = this.root): T[] {
        if (!node) return [];
        
        return [
            ...this.inOrderTraversal(node.left),
            node.value,
            ...this.inOrderTraversal(node.right)
        ];
    }

    // Pre-order traversal: root -> left -> right
    preOrderTraversal(node: TreeNode<T> | null = this.root): T[] {
        if (!node) return [];
        
        return [
            node.value,
            ...this.preOrderTraversal(node.left),
            ...this.preOrderTraversal(node.right)
        ];
    }

    // Post-order traversal: left -> right -> root
    postOrderTraversal(node: TreeNode<T> | null = this.root): T[] {
        if (!node) return [];
        
        return [
            ...this.postOrderTraversal(node.left),
            ...this.postOrderTraversal(node.right),
            node.value
        ];
    }

    // Level-order traversal (Breadth-first search)
    levelOrderTraversal(): T[] {
        if (!this.root) return [];
        
        const result: T[] = [];
        const queue: TreeNode<T>[] = [this.root];
        
        while (queue.length > 0) {
            const current = queue.shift()!;
            result.push(current.value);
            
            if (current.left) queue.push(current.left);
            if (current.right) queue.push(current.right);
        }
        
        return result;
    }
}
// Create a binary tree of numbers
const tree = new BinaryTree<number>();

// Insert values
[1, 2, 3, 4, 5, 6].forEach(n => tree.insert(n));

// Traversal examples
console.log("In-order:", tree.inOrderTraversal());      // [4, 2, 5, 1, 6, 3]
console.log("Pre-order:", tree.preOrderTraversal());    // [1, 2, 4, 5, 3, 6]
console.log("Post-order:", tree.postOrderTraversal());  // [4, 5, 2, 6, 3, 1]
console.log("Level-order:", tree.levelOrderTraversal()); // [1, 2, 3, 4, 5, 6]
      1
     / \
    2   3
   / \ /
  4 5 6
