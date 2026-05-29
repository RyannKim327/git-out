/* ── BinaryTree.ts ────────────────────────────────────────────────────── */

/* 1️⃣  Node definition ---------------------------------------------- */
class TreeNode<T> {
  /** The value stored in this node. */
  value: T;
  /** Left child (values < this.value). */
  left: TreeNode<T> | null = null;
  /** Right child (values > this.value). */
  right: TreeNode<T> | null = null;

  constructor(value: T) {
    this.value = value;
  }
}

/* 2️⃣  The tree itself ---------------------------------------------- */
class BinarySearchTree<T> {
  root: TreeNode<T> | null = null;

  /* ── Helper for comparing values ───────────────────────────────────── */
  private compare(a: T, b: T): number {
    // Because we’ve made `T` generic we need a way to compare.
    // Here we assume that `T` is either a number or a string.
    // If you need something fancier, provide your own comparator.
    if (a < b) return -1;
    if (a > b) return 1;
    return 0;
  }

  /* ── Insert a value ─────────────────────────────────────────────── */
  insert(value: T): void {
    const newNode = new TreeNode(value);

    if (!this.root) {
      this.root = newNode;
      return;
    }

    let curr = this.root;
    while (true) {
      const cmp = this.compare(value, curr.value);
      if (cmp < 0) {            // go left
        if (!curr.left) {
          curr.left = newNode;
          break;
        }
        curr = curr.left;
      } else {                  // go right (duplicates go right)
        if (!curr.right) {
          curr.right = newNode;
          break;
        }
        curr = curr.right;
      }
    }
  }

  /* ── Search for a value ──────────────────────────────────────────── */
  find(value: T): TreeNode<T> | null {
    let curr = this.root;

    while (curr) {
      const cmp = this.compare(value, curr.value);
      if (cmp === 0) return curr;
      curr = cmp < 0 ? curr.left : curr.right;
    }

    return null; // not found
  }

  /* ── In‑order traversal (returns sorted array) --------------------- */
  inOrder(): T[] {
    const out: T[] = [];
    function walk(node: TreeNode<T> | null) {
      if (!node) return;
      walk(node.left);
      out.push(node.value);
      walk(node.right);
    }
    walk(this.root);
    return out;
  }

  /* ── Pre‑order traversal (root, left, right) ---------------------- */
  preOrder(): T[] {
    const out: T[] = [];
    function walk(node: TreeNode<T> | null) {
      if (!node) return;
      out.push(node.value);
      walk(node.left);
      walk(node.right);
    }
    walk(this.root);
    return out;
  }

  /* ── Post‑order traversal (left, right, root) --------------------- */
  postOrder(): T[] {
    const out: T[] = [];
    function walk(node: TreeNode<T> | null) {
      if (!node) return;
      walk(node.left);
      walk(node.right);
      out.push(node.value);
    }
    walk(this.root);
    return out;
  }

  /* ── Pretty‑print for debugging ------------------------------------ */
  private static indent(str: string, level: number): string {
    return '  '.repeat(level) + str;
  }

  /* eslint-disable no-console */
  print(): void {
    function walk(node: TreeNode<any> | null, level: number) {
      if (!node) return;
      console.log(BinarySearchTree.indent(`┗─ ${node.value}`, level));
      walk(node.left, level + 1);
      walk(node.right, level + 1);
    }
    if (!this.root) console.log('<empty tree>');
    else walk(this.root, 0);
  }
}

/* ── Usage example ---------------------------------------------------- */
const bst = new BinarySearchTree<number>();

[7, 3, 9, 1, 5, 8, 10].forEach(num => bst.insert(num));

console.log('In‑order:', bst.inOrder());      // [1,3,5,7,8,9,10]
console.log('Pre‑order:', bst.preOrder());    // [7,3,1,5,9,8,10]
console.log('Post‑order:', bst.postOrder());  // [1,5,3,8,10,9,7]

const node = bst.find(5);
console.log('Found node:', node?.value);      // 5

console.log('\nTree structure:');
bst.print();

/* ── Output ───────────────────────────────────────────────────────────
In-order: [ 1, 3, 5, 7, 8, 9, 10 ]
Pre-order: [ 7, 3, 1, 5, 9, 8, 10 ]
Post-order: [ 1, 5, 3, 8, 10, 9, 7 ]
Found node: 5

Tree structure:
┗─ 7
  ┗─ 3
    ┗─ 1
    ┗─ 5
  ┗─ 9
    ┗─ 8
    ┗─ 10
 *─────────────────────── */
