/**
 * A single node in a binary search tree.
 */
class TreeNode<T> {
  value: T;
  left: TreeNode<T> | null = null;
  right: TreeNode<T> | null = null;

  constructor(value: T) {
    this.value = value;
  }
}

/**
 * Binary search tree that keeps values ordered by a comparator.
 * If you don’t pass a comparator it defaults to numeric or string <=> >.
 */
class BinarySearchTree<T> {
  root: TreeNode<T> | null = null;
  private cmp: (a: T, b: T) => number;

  constructor(comparator?: (a: T, b: T) => number) {
    this.cmp = comparator ?? ((a, b) => (a < b ? -1 : a > b ? 1 : 0));
  }

  /* ------------------------------------------------------------------
   * Insert
   * ------------------------------------------------------------------ */
  insert(value: T): void {
    const newNode = new TreeNode(value);
    if (!this.root) {
      this.root = newNode;
      return;
    }

    let current = this.root;
    while (true) {
      const comp = this.cmp(value, current.value);
      if (comp < 0) {
        if (!current.left) {
          current.left = newNode;
          break;
        }
        current = current.left;
      } else {
        // treat equal values as “go right” – change if you want otherwise
        if (!current.right) {
          current.right = newNode;
          break;
        }
        current = current.right;
      }
    }
  }

  /* ------------------------------------------------------------------
   * Find
   * ------------------------------------------------------------------ */
  find(value: T): TreeNode<T> | null {
    let current = this.root;
    while (current) {
      const comp = this.cmp(value, current.value);
      if (comp === 0) return current;
      current = comp < 0 ? current.left : current.right;
    }
    return null;
  }

  /* ------------------------------------------------------------------
   * Traversals – each visitor receives the node value
   * ------------------------------------------------------------------ */
  inOrder(visitor: (value: T) => void) {
    function walk(node: TreeNode<T> | null) {
      if (!node) return;
      walk(node.left);
      visitor(node.value);
      walk(node.right);
    }
    walk(this.root);
  }

  preOrder(visitor: (value: T) => void) {
    function walk(node: TreeNode<T> | null) {
      if (!node) return;
      visitor(node.value);
      walk(node.left);
      walk(node.right);
    }
    walk(this.root);
  }

  postOrder(visitor: (value: T) => void) {
    function walk(node: TreeNode<T> | null) {
      if (!node) return;
      walk(node.left);
      walk(node.right);
      visitor(node.value);
    }
    walk(this.root);
  }
}

/* ------------------------------------------------------------------
 * Quick demo
 * ------------------------------------------------------------------ */
const bst = new BinarySearchTree<number>();

[50, 30, 70, 20, 40, 60, 80].forEach(bst.insert);

console.log('In‑order traversal (sorted):');
bst.inOrder(v => console.log(v));

console.log('\nFind 60:', bst.find(60)?.value);
console.log('Find 25:', bst.find(25)?.value); // null
