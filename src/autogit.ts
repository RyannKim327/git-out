// ---------- TYPES ----------
type Comparator<T> = (a: T, b: T) => number;

interface Node<T> {
  key: T;
  left: Node<T> | null;
  right: Node<T> | null;
}

// ---------- BST CLASS ----------
class BinarySearchTree<T> {
  // root can stay undefined at construction time
  private root: Node<T> | null = null;

  /**
   * Allows you to plug in any way you want keys compared.
   * If none is supplied, `>`, `<`, and `===` are used for primitive values.
   */
  constructor(private readonly cmp: Comparator<T> = defaultCompare) {}

  /** Insert new key into tree */
  insert(key: T): void {
    const node: Node<T> = { key, left: null, right: null };
    if (!this.root) {
      this.root = node;
      return;
    }

    let curr = this.root;
    while (true) {
      const cmp = this.cmp(key, curr.key);
      if (cmp < 0) {
        if (curr.left) {
          curr = curr.left;
        } else {
          curr.left = node;
          break;
        }
      } else if (cmp > 0) {
        if (curr.right) {
          curr = curr.right;
        } else {
          curr.right = node;
          break;
        }
      } else {
        // key already exists – replace or ignore, here we ignore
        break;
      }
    }
  }

  /** Search for a key. Returns the node if found or null. */
  search(key: T): Node<T> | null {
    let curr = this.root;
    while (curr) {
      const cmp = this.cmp(key, curr.key);
      if (cmp < 0) {
        curr = curr.left;
      } else if (cmp > 0) {
        curr = curr.right;
      } else {
        return curr;
      }
    }
    return null;
  }

  /** In‑order traversal – gives sorted keys. */
  inorder(callback: (key: T) => void): void {
    function walk(node: Node<T> | null) {
      if (!node) return;
      walk(node.left);
      callback(node.key);
      walk(node.right);
    }
    walk(this.root);
  }

  /** Delete a key. Simple implementation that preserves BST shape. */
  delete(key: T): void {
    const deleteRec = (node: Node<T> | null, key: T): Node<T> | null => {
      if (!node) return null;

      const cmp = this.cmp(key, node.key);
      if (cmp < 0) {
        node.left = deleteRec(node.left, key);
      } else if (cmp > 0) {
        node.right = deleteRec(node.right, key);
      } else {
        // node to delete found
        if (!node.left) return node.right;
        if (!node.right) return node.left;

        // two children: find in‑order successor (smallest node on right)
        let succ = node.right;
        while (succ.left) succ = succ.left;
        node.key = succ.key; // copy successor key
        node.right = deleteRec(node.right, succ.key); // delete successor
      }
      return node;
    };

    this.root = deleteRec(this.root, key);
  }
}

// ---------- DEFAULT COMPARATOR ----------
function defaultCompare<T>(a: T, b: T): number {
  if (a < b) return -1;
  if (a > b) return 1;
  return 0;
}

// ---------- USAGE EXAMPLE ----------
const bst = new BinarySearchTree<number>();

[7, 3, 9, 1, 5, 8, 10].forEach(v => bst.insert(v));

console.log('Search 5:', bst.search(5) !== null);   // true
console.log('Search 4:', bst.search(4) !== null);   // false

console.log('In‑order traversal:');
bst.inorder(k => console.log(k));   // 1 3 5 7 8 9 10

bst.delete(7);
console.log('After deleting 7:');
bst.inorder(k => console.log(k));   // 1 3 5 8 9 10
