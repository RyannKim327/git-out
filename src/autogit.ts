/** A single node in the BST */
class TreeNode<T> {
  public left: TreeNode<T> | null = null;
  public right: TreeNode<T> | null = null;

  constructor(public value: T) {}
}
/**
 * Binary Search Tree
 *
 * @typeParam T – the type of the stored values.
 *                The tree does **not** know how to compare them,
 *                so a comparator must be supplied.
 */
export class BinarySearchTree<T> {
  private root: TreeNode<T> | null = null;

  /**
   * @param compareFn – returns a negative number if a < b,
   *                    zero if a === b,
   *                    a positive number if a > b.
   */
  constructor(private compareFn: (a: T, b: T) => number) {}

  // -----------------------------------------------------------------
  // INSERT
  // -----------------------------------------------------------------
  /** Insert a value into the tree. Duplicate values are ignored. */
  insert(value: T): void {
    const newNode = new TreeNode(value);
    if (!this.root) {
      this.root = newNode;
      return;
    }

    let current: TreeNode<T> = this.root;
    while (true) {
      const cmp = this.compareFn(value, current.value);
      if (cmp === 0) {
        // duplicate – ignore (or you could count occurrences)
        return;
      } else if (cmp < 0) {
        // go left
        if (!current.left) {
          current.left = newNode;
          return;
        }
        current = current.left;
      } else {
        // go right
        if (!current.right) {
          current.right = newNode;
          return;
        }
        current = current.right;
      }
    }
  }

  // -----------------------------------------------------------------
  // SEARCH / CONTAINS
  // -----------------------------------------------------------------
  /** Returns true if the value exists in the tree. */
  contains(value: T): boolean {
    return this._findNode(value) !== null;
  }

  /** Internal helper – returns the node that holds `value` or null. */
  private _findNode(value: T): TreeNode<T> | null {
    let current = this.root;
    while (current) {
      const cmp = this.compareFn(value, current.value);
      if (cmp === 0) return current;
      current = cmp < 0 ? current.left : current.right;
    }
    return null;
  }

  // -----------------------------------------------------------------
  // DELETE / REMOVE
  // -----------------------------------------------------------------
  /** Remove a value from the tree. Returns true if something was removed. */
  remove(value: T): boolean {
    const { node, parent } = this._findNodeWithParent(value);
    if (!node) return false; // not found

    // ---- CASE 1: node has no children (leaf) ----
    if (!node.left && !node.right) {
      this._replaceChild(parent, node, null);
    }
    // ---- CASE 2: node has exactly one child ----
    else if (!node.left) {
      // only right child
      this._replaceChild(parent, node, node.right);
    } else if (!node.right) {
      // only left child
      this._replaceChild(parent, node, node.left);
    }
    // ---- CASE 3: node has two children ----
    else {
      // Find the *in‑order successor* (smallest node in right subtree)
      const { node: successor, parent: succParent } = this._minNode(node.right);
      // Copy successor's value into the node we want to delete
      node.value = successor!.value;

      // Remove the successor (it can have at most one right child)
      if (succParent!.left === successor) {
        succParent!.left = successor!.right;
      } else {
        // successor is the direct right child of `node`
        succParent!.right = successor!.right;
      }
    }

    return true;
  }

  /** Helper that returns both a node and its parent (parent may be null). */
  private _findNodeWithParent(
    value: T
  ): { node: TreeNode<T> | null; parent: TreeNode<T> | null } {
    let parent: TreeNode<T> | null = null;
    let current = this.root;
    while (current) {
      const cmp = this.compareFn(value, current.value);
      if (cmp === 0) return { node: current, parent };
      parent = current;
      current = cmp < 0 ? current.left : current.right;
    }
    return { node: null, parent: null };
  }

  /** Replace `oldChild` of `parent` with `newChild`. Handles root case. */
  private _replaceChild(
    parent: TreeNode<T> | null,
    oldChild: TreeNode<T>,
    newChild: TreeNode<T> | null
  ): void {
    if (!parent) {
      // oldChild is the root
      this.root = newChild;
    } else if (parent.left === oldChild) {
      parent.left = newChild;
    } else {
      parent.right = newChild;
    }
  }

  /** Return the smallest node in the given subtree and its parent. */
  private _minNode(
    subtreeRoot: TreeNode<T>
  ): { node: TreeNode<T> | null; parent: TreeNode<T> | null } {
    let parent: TreeNode<T> | null = null;
    let current: TreeNode<T> | null = subtreeRoot;
    while (current && current.left) {
      parent = current;
      current = current.left;
    }
    return { node: current, parent };
  }

  // -----------------------------------------------------------------
  // TRAVERSALS (recursive helpers)
  // -----------------------------------------------------------------
  /** In‑order traversal – returns values sorted according to the comparator. */
  inOrder(): T[] {
    const result: T[] = [];
    this._inOrderRec(this.root, result);
    return result;
  }
  private _inOrderRec(node: TreeNode<T> | null, out: T[]): void {
    if (!node) return;
    this._inOrderRec(node.left, out);
    out.push(node.value);
    this._inOrderRec(node.right, out);
  }

  /** Pre‑order traversal – root, left, right */
  preOrder(): T[] {
    const result: T[] = [];
    this._preOrderRec(this.root, result);
    return result;
  }
  private _preOrderRec(node: TreeNode<T> | null, out: T[]): void {
    if (!node) return;
    out.push(node.value);
    this._preOrderRec(node.left, out);
    this._preOrderRec(node.right, out);
  }

  /** Post‑order traversal – left, right, root */
  postOrder(): T[] {
    const result: T[] = [];
    this._postOrderRec(this.root, result);
    return result;
  }
  private _postOrderRec(node: TreeNode<T> | null, out: T[]): void {
    if (!node) return;
    this._postOrderRec(node.left, out);
    this._postOrderRec(node.right, out);
    out.push(node.value);
  }

  // -----------------------------------------------------------------
  // OPTIONAL: Iterable interface (so you can `for…of` the tree)
  // -----------------------------------------------------------------
  /** Makes the BST iterable using in‑order traversal. */
  *[Symbol.iterator](): IterableIterator<T> {
    yield* this._inOrderGenerator(this.root);
  }
  private *_inOrderGenerator(node: TreeNode<T> | null): IterableIterator<T> {
    if (!node) return;
    yield* this._inOrderGenerator(node.left);
    yield node.value;
    yield* this._inOrderGenerator(node.right);
  }

  // -----------------------------------------------------------------
  // DEBUG / Visualisation helpers
  // -----------------------------------------------------------------
  /** Returns a string representation (rotated 90°) useful for debugging. */
  toString(): string {
    const lines: string[] = [];
    this._buildString(this.root, "", true, lines);
    return lines.join("\n");
  }

  private _buildString(
    node: TreeNode<T> | null,
    prefix: string,
    isTail: boolean,
    out: string[]
  ): void {
    if (node) {
      out.push(
        `${prefix}${isTail ? "└── " : "├── "}${node.value.toString()}`
      );
      const children = [node.left, node.right].filter(Boolean) as TreeNode<T>[];
      for (let i = 0; i < children.length; i++) {
        const child = children[i];
        const isLast = i === children.length - 1;
        this._buildString(
          child,
          `${prefix}${isTail ? "    " : "│   "}`,
          isLast,
          out
        );
      }
    }
  }
}
import { BinarySearchTree } from "./BinarySearchTree";

// Comparator for numbers
const numCmp = (a: number, b: number) => a - b;

const bst = new BinarySearchTree<number>(numCmp);

[7, 3, 9, 1, 5, 8, 10].forEach(v => bst.insert(v));

console.log("Contains 5 ?", bst.contains(5));   // true
console.log("Contains 2 ?", bst.contains(2));   // false

console.log("In‑order (sorted):", bst.inOrder());   // [1,3,5,7,8,9,10]

bst.remove(7);               // remove root (has two children)
console.log("After removing 7:", bst.inOrder());

console.log("\nTree visualisation:\n" + bst.toString());
Contains 5 ? true
Contains 2 ? false
In‑order (sorted): [ 1, 3, 5, 7, 8, 9, 10 ]
After removing 7: [ 1, 3, 5, 8, 9, 10 ]

Tree visualisation:
└── 8
    ├── 3
    │   ├── 1
    │   └── 5
    └── 9
        └── 10
const strCmp = (a: string, b: string) => a.localeCompare(b);
const wordTree = new BinarySearchTree<string>(strCmp);

["delta", "alpha", "epsilon", "beta", "gamma"].forEach(w => wordTree.insert(w));

console.log(wordTree.inOrder()); // [ 'alpha', 'beta', 'delta', 'epsilon', 'gamma' ]
interface Person {
  id: number;
  name: string;
}

// Compare by `id`
const personCmp = (a: Person, b: Person) => a.id - b.id;

const peopleTree = new BinarySearchTree<Person>(personCmp);

peopleTree.insert({ id: 42, name: "Alice" });
peopleTree.insert({ id: 7, name: "Bob" });
peopleTree.insert({ id: 19, name: "Carol" });

console.log(peopleTree.contains({ id: 7, name: "Bob" })); // true (value equality is based on id)

console.log(
  peopleTree.inOrder().map(p => `${p.id}:${p.name}`)
);
// [ '7:Bob', '19:Carol', '42:Alice' ]
export class NumberBST extends BinarySearchTree<number> {
  constructor() {
    super((a, b) => a - b);
  }
}
// BinarySearchTree.ts ---------------------------------------------------------

class TreeNode<T> {
  public left: TreeNode<T> | null = null;
  public right: TreeNode<T> | null = null;
  constructor(public value: T) {}
}

export class BinarySearchTree<T> {
  private root: TreeNode<T> | null = null;
  constructor(private compareFn: (a: T, b: T) => number) {}

  insert(value: T): void {
    const newNode = new TreeNode(value);
    if (!this.root) {
      this.root = newNode;
      return;
    }
    let current: TreeNode<T> = this.root;
    while (true) {
      const cmp = this.compareFn(value, current.value);
      if (cmp === 0) return; // duplicate – ignore
      if (cmp < 0) {
        if (!current.left) {
          current.left = newNode;
          return;
        }
        current = current.left;
      } else {
        if (!current.right) {
          current.right = newNode;
          return;
        }
        current = current.right;
      }
    }
  }

  contains(value: T): boolean {
    return this._findNode(value) !== null;
  }

  private _findNode(value: T): TreeNode<T> | null {
    let current = this.root;
    while (current) {
      const cmp = this.compareFn(value, current.value);
      if (cmp === 0) return current;
      current = cmp < 0 ? current.left : current.right;
    }
    return null;
  }

  remove(value: T): boolean {
    const { node, parent } = this._findNodeWithParent(value);
    if (!node) return false;

    if (!node.left && !node.right) {
      this._replaceChild(parent, node, null);
    } else if (!node.left) {
      this._replaceChild(parent, node, node.right);
    } else if (!node.right) {
      this._replaceChild(parent, node, node.left);
    } else {
      const { node: succ, parent: succParent } = this._minNode(node.right);
      node.value = succ!.value;
      if (succParent!.left === succ) {
        succParent!.left = succ!.right;
      } else {
        succParent!.right = succ!.right;
      }
    }
    return true;
  }

  private _findNodeWithParent(
    value: T
  ): { node: TreeNode<T> | null; parent: TreeNode<T> | null } {
    let parent: TreeNode<T> | null = null;
    let current = this.root;
    while (current) {
      const cmp = this.compareFn(value, current.value);
      if (cmp === 0) return { node: current, parent };
      parent = current;
      current = cmp < 0 ? current.left : current.right;
    }
    return { node: null, parent: null };
  }

  private _replaceChild(
    parent: TreeNode<T> | null,
    oldChild: TreeNode<T>,
    newChild: TreeNode<T> | null
  ): void {
    if (!parent) {
      this.root = newChild;
    } else if (parent.left === oldChild) {
      parent.left = newChild;
    } else {
      parent.right = newChild;
    }
  }

  private _minNode(
    subtreeRoot: TreeNode<T>
  ): { node: TreeNode<T> | null; parent: TreeNode<T> | null } {
    let parent: TreeNode<T> | null = null;
    let current: TreeNode<T> | null = subtreeRoot;
    while (current && current.left) {
      parent = current;
      current = current.left;
    }
    return { node: current, parent };
  }

  // ---------- Traversals ----------
  inOrder(): T[] {
    const out: T[] = [];
    this._inOrderRec(this.root, out);
    return out;
  }
  private _inOrderRec(node: TreeNode<T> | null, out: T[]): void {
    if (!node) return;
    this._inOrderRec(node.left, out);
    out.push(node.value);
    this._inOrderRec(node.right, out);
  }

  preOrder(): T[] {
    const
