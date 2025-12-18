/**
 * A node of a binary tree.
 * T is the type of the value stored in the node.
 */
export class TreeNode<T> {
  public left: TreeNode<T> | null = null;
  public right: TreeNode<T> | null = null;

  constructor(public value: T) {}
}

/**
 * A binary **search** tree.
 * The tree expects a comparator function so it can work with any type T.
 */
export class BinarySearchTree<T> {
  private root: TreeNode<T> | null = null;

  /**
   * @param compareFn - returns a negative number if a < b,
   *                    zero if a === b,
   *                    a positive number if a > b.
   */
  constructor(private compareFn: (a: T, b: T) => number) {}

  // -----------------------------------------------------------------
  // Public API
  // -----------------------------------------------------------------
  /** Insert a value into the tree */
  public insert(value: T): void {
    this.root = this._insert(this.root, value);
  }

  /** Return true if the value exists in the tree */
  public contains(value: T): boolean {
    return this._find(this.root, value) !== null;
  }

  /** Remove a value from the tree (no‑op if not present) */
  public delete(value: T): void {
    this.root = this._delete(this.root, value);
  }

  /** In‑order traversal (left → node → right) */
  public inorder(callback: (value: T) => void): void {
    this._traverseInOrder(this.root, callback);
  }

  /** Pre‑order traversal (node → left → right) */
  public preorder(callback: (value: T) => void): void {
    this._traversePreOrder(this.root, callback);
  }

  /** Post‑order traversal (left → right → node) */
  public postorder(callback: (value: T) => void): void {
    this._traversePostOrder(this.root, callback);
  }

  /** Return the minimum value stored in the tree (or null if empty) */
  public min(): T | null {
    const node = this._minNode(this.root);
    return node?.value ?? null;
  }

  /** Return the maximum value stored in the tree (or null if empty) */
  public max(): T | null {
    const node = this._maxNode(this.root);
    return node?.value ?? null;
  }

  /** Return the height of the tree (empty tree → -1) */
  public height(): number {
    return this._height(this.root);
  }

  // -----------------------------------------------------------------
  // Private helpers
  // -----------------------------------------------------------------
  private _insert(node: TreeNode<T> | null, value: T): TreeNode<T> {
    if (!node) return new TreeNode(value);

    const cmp = this.compareFn(value, node.value);
    if (cmp < 0) node.left = this._insert(node.left, value);
    else if (cmp > 0) node.right = this._insert(node.right, value);
    // If cmp === 0 we ignore the duplicate (or you could handle it differently)

    return node;
  }

  private _find(node: TreeNode<T> | null, value: T): TreeNode<T> | null {
    if (!node) return null;

    const cmp = this.compareFn(value, node.value);
    if (cmp === 0) return node;
    return cmp < 0 ? this._find(node.left, value) : this._find(node.right, value);
  }

  private _delete(node: TreeNode<T> | null, value: T): TreeNode<T> | null {
    if (!node) return null;

    const cmp = this.compareFn(value, node.value);
    if (cmp < 0) {
      node.left = this._delete(node.left, value);
    } else if (cmp > 0) {
      node.right = this._delete(node.right, value);
    } else {
      // Node to delete found
      if (!node.left && !node.right) {
        // leaf
        return null;
      } else if (!node.left) {
        // only right child
        return node.right;
      } else if (!node.right) {
        // only left child
        return node.left;
      } else {
        // two children → replace with inorder successor (smallest in right subtree)
        const successor = this._minNode(node.right)!;
        node.value = successor.value;
        node.right = this._delete(node.right, successor.value);
      }
    }
    return node;
  }

  private _minNode(node: TreeNode<T> | null): TreeNode<T> | null {
    while (node?.left) node = node.left;
    return node;
  }

  private _maxNode(node: TreeNode<T> | null): TreeNode<T> | null {
    while (node?.right) node = node.right;
    return node;
  }

  private _height(node: TreeNode<T> | null): number {
    if (!node) return -1; // empty tree has height -1, leaf has height 0
    return 1 + Math.max(this._height(node.left), this._height(node.right));
  }

  // Traversal helpers -------------------------------------------------
  private _traverseInOrder(node: TreeNode<T> | null, cb: (v: T) => void): void {
    if (!node) return;
    this._traverseInOrder(node.left, cb);
    cb(node.value);
    this._traverseInOrder(node.right, cb);
  }

  private _traversePreOrder(node: TreeNode<T> | null, cb: (v: T) => void): void {
    if (!node) return;
    cb(node.value);
    this._traversePreOrder(node.left, cb);
    this._traversePreOrder(node.right, cb);
  }

  private _traversePostOrder(node: TreeNode<T> | null, cb: (v: T) => void): void {
    if (!node) return;
    this._traversePostOrder(node.left, cb);
    this._traversePostOrder(node.right, cb);
    cb(node.value);
  }
}
import { BinarySearchTree } from "./BinarySearchTree";

const numberTree = new BinarySearchTree<number>((a, b) => a - b);

numberTree.insert(7);
numberTree.insert(3);
numberTree.insert(9);
numberTree.insert(1);
numberTree.insert(5);

console.log("Contains 5?", numberTree.contains(5)); // true
console.log("Contains 2?", numberTree.contains(2)); // false

console.log("In‑order (sorted):");
numberTree.inorder(v => process.stdout.write(v + " ")); // 1 3 5 7 9
console.log("\nHeight:", numberTree.height()); // 2

numberTree.delete(3);
console.log("After deleting 3 (in‑order):");
numberTree.inorder(v => process.stdout.write(v + " ")); // 1 5 7 9
interface Person {
  id: number;
  name: string;
}

const personTree = new BinarySearchTree<Person>((a, b) => a.id - b.id);

personTree.insert({ id: 42, name: "Alice" });
personTree.insert({ id: 7, name: "Bob" });
personTree.insert({ id: 19, name: "Carol" });

personTree.inorder(p => console.log(`${p.id}: ${p.name}`));
/*
7: Bob
19: Carol
42: Alice
*/
public levelOrder(callback: (value: T) => void): void {
  if (!this.root) return;
  const queue: Array<TreeNode<T>> = [this.root];
  while (queue.length) {
    const node = queue.shift()!;
    callback(node.value);
    if (node.left) queue.push(node.left);
    if (node.right) queue.push(node.right);
  }
}
export { TreeNode, BinarySearchTree };
// file: demo.ts
import { BinarySearchTree } from "./BinarySearchTree";

const tree = new BinarySearchTree<number>((a, b) => a - b);
[15, 6, 23, 4, 7, 71, 5].forEach(v => tree.insert(v));

console.log("In‑order (sorted):");
tree.inorder(v => process.stdout.write(v + " "));
console.log("\nHeight:", tree.height());

tree.delete(6);
console.log("After deleting 6 (in‑order):");
tree.inorder(v => process.stdout.write(v + " "));
npx ts-node demo.ts
In‑order (sorted):
4 5 6 7 15 23 71 
Height: 2
After deleting 6 (in‑order):
4 5 7 15 23 71 
