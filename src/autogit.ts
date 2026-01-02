/** A single node of a binary tree. */
export class TreeNode<T> {
  /** The stored value */
  public value: T;

  /** Left child (smaller values for a BST) */
  public left: TreeNode<T> | null = null;

  /** Right child (greater values for a BST) */
  public right: TreeNode<T> | null = null;

  constructor(value: T) {
    this.value = value;
  }
}
/**
 * A generic Binary Search Tree (BST).
 *
 * The tree maintains the invariant:
 *   left subtree  < node.value < right subtree
 *
 * You can also use it as a plain binary tree by ignoring the ordering
 * (e.g., by inserting values manually via `node.left = …`).
 */
export class BinarySearchTree<T> {
  /** Root node of the tree (null when empty) */
  private root: TreeNode<T> | null = null;

  /** Comparison function – required because TypeScript cannot compare generic T directly */
  private readonly compare: (a: T, b: T) => number;

  /**
   * @param compare A function that returns:
   *   - a negative number if a < b
   *   - zero if a === b
   *   - a positive number if a > b
   *
   * Example for numbers: (a, b) => a - b
   * Example for strings: (a, b) => a.localeCompare(b)
   */
  constructor(compare: (a: T, b: T) => number) {
    this.compare = compare;
  }

  // -------------------------------------------------------------------------
  //  Public API
  // -------------------------------------------------------------------------

  /** Insert a new value into the tree */
  public insert(value: T): void {
    const newNode = new TreeNode(value);
    if (!this.root) {
      this.root = newNode;
      return;
    }

    let current: TreeNode<T> = this.root;
    while (true) {
      const cmp = this.compare(value, current.value);
      if (cmp < 0) {
        // go left
        if (!current.left) {
          current.left = newNode;
          return;
        }
        current = current.left;
      } else if (cmp > 0) {
        // go right
        if (!current.right) {
          current.right = newNode;
          return;
        }
        current = current.right;
      } else {
        // duplicate – decide policy (ignore, replace, or allow duplicates)
        // Here we simply ignore duplicates.
        return;
      }
    }
  }

  /** Find a node that holds `value`. Returns the node or null if not found. */
  public find(value: T): TreeNode<T> | null {
    let current = this.root;
    while (current) {
      const cmp = this.compare(value, current.value);
      if (cmp === 0) return current;
      current = cmp < 0 ? current.left : current.right;
    }
    return null;
  }

  /** Remove a value from the tree (if it exists). */
  public remove(value: T): void {
    this.root = this._removeRec(this.root, value);
  }

  /** In‑order traversal (left, root, right). Returns an array of values. */
  public inorder(): T[] {
    const result: T[] = [];
    this._traverseInorder(this.root, node => result.push(node.value));
    return result;
  }

  /** Pre‑order traversal (root, left, right). */
  public preorder(): T[] {
    const result: T[] = [];
    this._traversePreorder(this.root, node => result.push(node.value));
    return result;
  }

  /** Post‑order traversal (left, right, root). */
  public postorder(): T[] {
    const result: T[] = [];
    this._traversePostorder(this.root, node => result.push(node.value));
    return result;
  }

  /** Level‑order (breadth‑first) traversal. */
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

  /** Height of the tree (number of edges on the longest path from root to leaf). */
  public height(): number {
    return this._height(this.root);
  }

  /** Returns true if the tree is height‑balanced (difference ≤ 1 for every node). */
  public isBalanced(): boolean {
    return this._checkBalance(this.root).balanced;
  }

  /** Convert the whole tree to a plain array (in‑order by default). */
  public toArray(order: 'inorder' | 'preorder' | 'postorder' | 'level' = 'inorder'): T[] {
    switch (order) {
      case 'inorder':   return this.inorder();
      case 'preorder':  return this.preorder();
      case 'postorder': return this.postorder();
      case 'level':     return this.levelOrder();
    }
  }

  /** Make the tree iterable (defaults to in‑order). */
  public *[Symbol.iterator](): IterableIterator<T> {
    for (const v of this.inorder()) yield v;
  }

  // -------------------------------------------------------------------------
  //  Private helpers
  // -------------------------------------------------------------------------

  private _removeRec(node: TreeNode<T> | null, value: T): TreeNode<T> | null {
    if (!node) return null;

    const cmp = this.compare(value, node.value);
    if (cmp < 0) {
      node.left = this._removeRec(node.left, value);
    } else if (cmp > 0) {
      node.right = this._removeRec(node.right, value);
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
        // Find the smallest node in the right subtree (inorder successor)
        const successor = this._minNode(node.right);
        node.value = successor.value;
        node.right = this._removeRec(node.right, successor.value);
      }
    }
    return node;
  }

  private _minNode(node: TreeNode<T>): TreeNode<T> {
    while (node.left) node = node.left;
    return node;
  }

  private _traverseInorder(node: TreeNode<T> | null, fn: (node: TreeNode<T>) => void): void {
    if (!node) return;
    this._traverseInorder(node.left, fn);
    fn(node);
    this._traverseInorder(node.right, fn);
  }

  private _traversePreorder(node: TreeNode<T> | null, fn: (node: TreeNode<T>) => void): void {
    if (!node) return;
    fn(node);
    this._traversePreorder(node.left, fn);
    this._traversePreorder(node.right, fn);
  }

  private _traversePostorder(node: TreeNode<T> | null, fn: (node: TreeNode<T>) => void): void {
    if (!node) return;
    this._traversePostorder(node.left, fn);
    this._traversePostorder(node.right, fn);
    fn(node);
  }

  private _height(node: TreeNode<T> | null): number {
    if (!node) return -1; // height of empty tree = -1 (so leaf = 0)
    return 1 + Math.max(this._height(node.left), this._height(node.right));
  }

  private _checkBalance(node: TreeNode<T> | null): { balanced: boolean; height: number } {
    if (!node) return { balanced: true, height: -1 };
    const left = this._checkBalance(node.left);
    const right = this._checkBalance(node.right);
    const balanced = left.balanced && right.balanced && Math.abs(left.height - right.height) <= 1;
    const height = 1 + Math.max(left.height, right.height);
    return { balanced, height };
  }
}
// 1️⃣ Import (or copy) the classes
// import { BinarySearchTree } from './BinarySearchTree';

// 2️⃣ Create a BST for numbers
const numberTree = new BinarySearchTree<number>((a, b) => a - b);

// Insert some values
[7, 3, 9, 1, 5, 8, 10].forEach(v => numberTree.insert(v));

// Find a node
const node = numberTree.find(5);
console.log('found node:', node?.value); // → 5

// Traversals
console.log('in‑order (sorted):', numberTree.inorder());   // [1,3,5,7,8,9,10]
console.log('pre‑order:', numberTree.preorder());         // [7,3,1,5,9,8,10]
console.log('post‑order:', numberTree.postorder());       // [1,5,3,8,10,9,7]
console.log('level‑order:', numberTree.levelOrder());     // [7,3,9,1,5,8,10]

// Height & balance
console.log('height:', numberTree.height());              // 2
console.log('is balanced?', numberTree.isBalanced());    // true

// Remove a value
numberTree.remove(9);
console.log('after removing 9 → in‑order:', numberTree.inorder());

// Iterate with for…of (defaults to in‑order)
for (const v of numberTree) {
  console.log('iterated value:', v);
}
interface Person {
  id: number;
  name: string;
}
const personTree = new BinarySearchTree<Person>((a, b) => a.id - b.id);
personTree.insert({ id: 42, name: 'Alice' });
export class BinaryTree<T> {
  public root: TreeNode<T> | null = null;

  constructor(public readonly value?: T) {}

  // You can still reuse the traversal helpers from the BST class
}
class Node<T> {
  constructor(public value: T, public left: Node<T> | null = null, public right: Node<T> | null = null) {}
}

class BST<T> {
  private root: Node<T> | null = null;
  constructor(private cmp: (a: T, b: T) => number) {}

  insert(v: T) {
    const go = (n: Node<T> | null): Node<T> => {
      if (!n) return new Node(v);
      const c = this.cmp(v, n.value);
      if (c < 0) n.left = go(n.left);
      else if (c > 0) n.right = go(n.right);
      return n;
    };
    this.root = go(this.root);
  }

  inorder(): T[] {
    const out: T[] = [];
    const walk = (n: Node<T> | null) => {
      if (!n) return;
      walk(n.left);
      out.push(n.value);
      walk(n.right);
    };
    walk(this.root);
    return out;
  }
}

// Example
const tree = new BST<number>((a, b) => a - b);
[5, 2, 8, 1, 3].forEach(v => tree.insert(v));
console.log(tree.inorder()); // [1,2,3,5,8]
