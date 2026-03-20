// ------------------------------------------------------------
// 1. Node
// ------------------------------------------------------------
class TreeNode<T> {
  value: T;
  left: TreeNode<T> | null = null;
  right: TreeNode<T> | null = null;

  constructor(value: T) {
    this.value = value;
  }
}

// ------------------------------------------------------------
// 2. BinarySearchTree
// ------------------------------------------------------------
class BinarySearchTree<T> {
  private root: TreeNode<T> | null = null;

  // -------------------------------------------
  // Insert a value into the BST
  // -------------------------------------------
  insert(value: T, comparator?: (a: T, b: T) => number): void {
    const compare = comparator ?? ((a, b) => (a < b ? -1 : a > b ? 1 : 0));

    const insertRec = (node: TreeNode<T> | null, val: T): TreeNode<T> => {
      if (!node) return new TreeNode(val);

      if (compare(val, node.value) < 0) {
        node.left = insertRec(node.left, val);
      } else {
        node.right = insertRec(node.right, val);
      }
      return node;
    };

    this.root = insertRec(this.root, value);
  }

  // -------------------------------------------
  // Search for a value – returns the node or null
  // -------------------------------------------
  search(value: T, comparator?: (a: T, b: T) => number): TreeNode<T> | null {
    const compare = comparator ?? ((a, b) => (a < b ? -1 : a > b ? 1 : 0));
    let curr = this.root;

    while (curr) {
      if (compare(value, curr.value) < 0) {
        curr = curr.left;
      } else if (compare(value, curr.value) > 0) {
        curr = curr.right;
      } else {
        return curr; // found
      }
    }
    return null; // not found
  }

  // -------------------------------------------
  // In‑order traversal – returns an array of values
  // -------------------------------------------
  inorder(): T[] {
    const res: T[] = [];
    const walk = (node: TreeNode<T> | null) => {
      if (!node) return;
      walk(node.left);
      res.push(node.value);
      walk(node.right);
    };
    walk(this.root);
    return res;
  }

  // -------------------------------------------
  // Convenience: return value of inorder traversal
  // -------------------------------------------
  toArray(): T[] {
    return this.inorder();
  }
}

// ------------------------------------------------------------
// 3. Demo
// ------------------------------------------------------------
const bst = new BinarySearchTree<number>();

// Inserting some numbers
[42, 23, 57, 12, 34, 73, 8].forEach(n => bst.insert(n));

console.log('In‑order traversal:', bst.inorder()); // sorted ascending

const foundNode = bst.search(34);
if (foundNode) {
  console.log(`Found node with value ${foundNode.value}`);
} else {
  console.log('Value not found');
}
