/**
 * A node of a binary search tree.
 * @template T The type of the stored value. Must be comparable via the supplied comparator.
 */
export class TreeNode<T> {
  public left: TreeNode<T> | null = null;
  public right: TreeNode<T> | null = null;

  constructor(public value: T) {}
}
/**
 * Binary Search Tree (BST) with generic payload.
 *
 * The tree relies on a **comparator** function to order values.
 * If you store numbers or strings you can omit the comparator – the default
 * works for those primitive types.
 *
 * Example:
 *   const bst = new BinarySearchTree<number>();
 *   const bst = new BinarySearchTree<Person>((a, b) => a.id - b.id);
 */
export class BinarySearchTree<T> {
  private root: TreeNode<T> | null = null;

  /**
   * @param comparator A function that returns:
   *   - a negative number if a < b
   *   - zero if a === b
   *   - a positive number if a > b
   *
   * If omitted, a default comparator for numbers & strings is used.
   */
  constructor(private comparator?: (a: T, b: T) => number) {
    if (!this.comparator) {
      // Default comparator works for numbers and strings.
      this.comparator = (a: any, b: any) => {
        if (a < b) return -1;
        if (a > b) return 1;
        return 0;
      };
    }
  }

  /* ------------------------------------------------------------------ *
   *  PUBLIC API
   * ------------------------------------------------------------------ */

  /** Insert a value into the tree. Duplicates are ignored (you can change this). */
  public insert(value: T): void {
    this.root = this._insert(this.root, value);
  }

  /** Returns true if the tree contains the given value. */
  public contains(value: T): boolean {
    return this._search(this.root, value) !== null;
  }

  /** Remove a value from the tree. Returns true if something was removed. */
  public remove(value: T): boolean {
    const originalSize = this.size();
    this.root = this._remove(this.root, value);
    return this.size() < originalSize;
  }

  /** Number of nodes in the tree. O(n) – you can keep a counter if you need O(1). */
  public size(): number {
    return this._size(this.root);
  }

  /** Height of the tree (max depth). Empty tree => -1. */
  public height(): number {
    return this._height(this.root);
  }

  /** In‑order traversal (sorted order for BST). Returns an array of values. */
  public inOrder(): T[] {
    const result: T[] = [];
    this._inOrder(this.root, result);
    return result;
  }

  /** Pre‑order traversal (root → left → right). */
  public preOrder(): T[] {
    const result: T[] = [];
    this._preOrder(this.root, result);
    return result;
  }

  /** Post‑order traversal (left → right → root). */
  public postOrder(): T[] {
    const result: T[] = [];
    this._postOrder(this.root, result);
    return result;
  }

  /** Breadth‑first (level order) traversal. */
  public levelOrder(): T[] {
    const result: T[] = [];
    if (!this.root) return result;

    const queue: (TreeNode<T> | null)[] = [this.root];
    while (queue.length) {
      const node = queue.shift()!;
      result.push(node.value);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    return result;
  }

  /** Returns the smallest value in the tree (or null if empty). */
  public min(): T | null {
    const node = this._minNode(this.root);
    return node?.value ?? null;
  }

  /** Returns the largest value in the tree (or null if empty). */
  public max(): T | null {
    const node = this._maxNode(this.root);
    return node?.value ?? null;
  }

  /** Checks if the tree is height‑balanced (difference ≤ 1 for every node). */
  public isBalanced(): boolean {
    return this._checkBalance(this.root) !== -1;
  }

  /** Clears the whole tree. */
  public clear(): void {
    this.root = null;
  }

  /* ------------------------------------------------------------------ *
   *  PRIVATE RECURSIVE HELPERS
   * ------------------------------------------------------------------ */

  private _insert(node: TreeNode<T> | null, value: T): TreeNode<T> {
    if (!node) return new TreeNode(value);

    const cmp = this.comparator!(value, node.value);
    if (cmp < 0) {
      node.left = this._insert(node.left, value);
    } else if (cmp > 0) {
      node.right = this._insert(node.right, value);
    } // else: duplicate – ignore (or handle as you wish)

    return node;
  }

  private _search(node: TreeNode<T> | null, value: T): TreeNode<T> | null {
    if (!node) return null;

    const cmp = this.comparator!(value, node.value);
    if (cmp === 0) return node;
    return cmp < 0 ? this._search(node.left, value) : this._search(node.right, value);
  }

  private _remove(node: TreeNode<T> | null, value: T): TreeNode<T> | null {
    if (!node) return null;

    const cmp = this.comparator!(value, node.value);
    if (cmp < 0) {
      node.left = this._remove(node.left, value);
    } else if (cmp > 0) {
      node.right = this._remove(node.right, value);
    } else {
      // Node found – three cases:
      // 1️⃣ No child
      // 2️⃣ One child
      // 3️⃣ Two children (replace with inorder successor)
      if (!node.left && !node.right) {
        return null;
      } else if (!node.left) {
        return node.right;
      } else if (!node.right) {
        return node.left;
      } else {
        // Find the smallest node in the right subtree (in‑order successor)
        const successor = this._minNode(node.right)!;
        node.value = successor.value;
        node.right = this._remove(node.right, successor.value);
      }
    }
    return node;
  }

  private _size(node: TreeNode<T> | null): number {
    if (!node) return 0;
    return 1 + this._size(node.left) + this._size(node.right);
  }

  private _height(node: TreeNode<T> | null): number {
    if (!node) return -1; // empty tree => height -1, leaf => 0
    return 1 + Math.max(this._height(node.left), this._height(node.right));
  }

  private _inOrder(node: TreeNode<T> | null, out: T[]): void {
    if (!node) return;
    this._inOrder(node.left, out);
    out.push(node.value);
    this._inOrder(node.right, out);
  }

  private _preOrder(node: TreeNode<T> | null, out: T[]): void {
    if (!node) return;
    out.push(node.value);
    this._preOrder(node.left, out);
    this._preOrder(node.right, out);
  }

  private _postOrder(node: TreeNode<T> | null, out: T[]): void {
    if (!node) return;
    this._postOrder(node.left, out);
    this._postOrder(node.right, out);
    out.push(node.value);
  }

  private _minNode(node: TreeNode<T> | null): TreeNode<T> | null {
    while (node?.left) node = node.left;
    return node;
  }

  private _maxNode(node: TreeNode<T> | null): TreeNode<T> | null {
    while (node?.right) node = node.right;
    return node;
  }

  /** Returns height of subtree if balanced, otherwise -1. */
  private _checkBalance(node: TreeNode<T> | null): number {
    if (!node) return 0;
    const left = this._checkBalance(node.left);
    if (left === -1) return -1;
    const right = this._checkBalance(node.right);
    if (right === -1) return -1;
    if (Math.abs(left - right) > 1) return -1;
    return Math.max(left, right) + 1;
  }
}
// 1️⃣ Simple number tree (default comparator works)
import { BinarySearchTree } from "./BinarySearchTree";

const numTree = new BinarySearchTree<number>();
numTree.insert(7);
numTree.insert(3);
numTree.insert(9);
numTree.insert(1);
numTree.insert(5);

console.log("Contains 5?", numTree.contains(5)); // true
console.log("In‑order (sorted):", numTree.inOrder()); // [1,3,5,7,9]
console.log("Height:", numTree.height()); // 2
console.log("Is balanced?", numTree.isBalanced()); // true

numTree.remove(3);
console.log("After removing 3 → in‑order:", numTree.inOrder()); // [1,5,7,9]

// 2️⃣ Tree of custom objects – supply a comparator
type Person = { id: number; name: string };

const personTree = new BinarySearchTree<Person>((a, b) => a.id - b.id);
personTree.insert({ id: 42, name: "Alice" });
personTree.insert({ id: 7, name: "Bob" });
personTree.insert({ id: 19, name: "Carol" });

console.log(personTree.inOrder().map(p => p.name)); // ["Bob","Carol","Alice"]
console.log(personTree.contains({ id: 19, name: "" })); // true (only id matters)
// test.ts
import { BinarySearchTree } from "./BinarySearchTree";

function test() {
  const bst = new BinarySearchTree<number>();
  const values = [50, 30, 70, 20, 40, 60, 80];
  values.forEach(v => bst.insert(v));

  console.log("In‑order:", bst.inOrder()); // 20 30 40 50 60 70 80
  console.log("Pre‑order:", bst.preOrder()); // 50 30 20 40 70 60 80
  console.log("Post‑order:", bst.postOrder()); // 20 40 30 60 80 70 50
  console.log("Level‑order:", bst.levelOrder()); // 50 30 70 20 40 60 80

  console.log("Contains 60?", bst.contains(60)); // true
  console.log("Contains 99?", bst.contains(99)); // false

  console.log("Min:", bst.min(), "Max:", bst.max()); // 20, 80
  console.log("Height:", bst.height()); // 2
  console.log("Balanced?", bst.isBalanced()); // true

  bst.remove(30);
  console.log("After removing 30 → in‑order:", bst.inOrder()); // 20 40 50 60 70 80
}
test();
npx ts-node test.ts
