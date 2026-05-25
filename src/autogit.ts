// ---------- 1️⃣  Node definition ----------
class Node<T> {
  /** The stored value. */
  value: T;
  /** Left child – < value */
  left: Node<T> | null = null;
  /** Right child – > value */
  right: Node<T> | null = null;

  constructor(value: T) {
    this.value = value;
  }
}

// ---------- 2️⃣  BinaryTree wrapper ----------
class BinaryTree<T> {
  /** Root of the tree (can be null if the tree is empty). */
  root: Node<T> | null = null;

  // Plug in the comparison logic so the tree can work with any type.
  // By default it uses the built‑in < and > operators.
  constructor(private compare: (a: T, b: T) => number = (a, b) => {
    if (a === b) return 0;
    return a < b ? -1 : 1;       // <=> -1, =0, >=>1
  }) {}

  // ---------- 3️⃣  Insert ----------
  insert(value: T): void {
    const newNode = new Node(value);
    if (!this.root) {
      this.root = newNode;
      return;
    }
    let cur = this.root;
    while (true) {
      if (this.compare(value, cur.value) < 0) {
        if (!cur.left) {
          cur.left = newNode;
          return;
        }
        cur = cur.left;
      } else {
        if (!cur.right) {
          cur.right = newNode;
          return;
        }
        cur = cur.right;
      }
    }
  }

  // ---------- 4️⃣  Search ----------
  find(value: T): Node<T> | null {
    let cur = this.root;
    while (cur) {
      const cmp = this.compare(value, cur.value);
      if (cmp === 0) return cur;
      cur = cmp < 0 ? cur.left : cur.right;
    }
    return null;   // not found
  }

  // ---------- 5️⃣  Traversals ----------
  // In‑order: left → node → right (sorted order for a BST)
  inorder(): T[] {
    const result: T[] = [];
    function walk(n: Node<T> | null) {
      if (!n) return;
      walk(n.left);
      result.push(n.value);
      walk(n.right);
    }
    walk(this.root);
    return result;
  }

  // Pre‑order: node → left → right
  preorder(): T[] {
    const result: T[] = [];
    function walk(n: Node<T> | null) {
      if (!n) return;
      result.push(n.value);
      walk(n.left);
      walk(n.right);
    }
    walk(this.root);
    return result;
  }

  // Post‑order: left → right → node
  postorder(): T[] {
    const result: T[] = [];
    function walk(n: Node<T> | null) {
      if (!n) return;
      walk(n.left);
      walk(n.right);
      result.push(n.value);
    }
    walk(this.root);
    return result;
  }
}
const nums = new BinaryTree<number>();
[7, 3, 9, 1, 5, 8, 10].forEach(n => nums.insert(n));

console.log('In‑order (sorted):', nums.inorder());    // [1,3,5,7,8,9,10]
console.log('Pre‑order:', nums.preorder());           // [7,3,1,5,9,8,10]
console.log('Post‑order:', nums.postorder());         // [1,5,3,8,10,9,7]

const node = nums.find(5);
console.log('Found node:', node?.value);               // 5
console.log('Does 6 exist?', !!nums.find(6));          // false
