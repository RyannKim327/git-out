// ---------------------------------------------------------------
// 1️⃣  Types & Helper
// ---------------------------------------------------------------

/**
 * Comparator returns:
 *   < 0  if a < b
 *   = 0  if a === b
 *   > 0  if a > b
 */
export type Comparator<T> = (a: T, b: T) => number;

/**
 * Default comparator works for numbers and strings.
 * For any other type you must pass a custom comparator.
 */
function defaultComparator<T>(a: T, b: T): number {
  if (typeof a === "number" && typeof b === "number") {
    return a - b;
  }
  if (typeof a === "string" && typeof b === "string") {
    return a < b ? -1 : a > b ? 1 : 0;
  }
  throw new Error(
    "Default comparator only works for number or string. " +
      "Provide a custom comparator for other types."
  );
}

// ---------------------------------------------------------------
// 2️⃣  TreeNode
// ---------------------------------------------------------------

export class TreeNode<T> {
  public left: TreeNode<T> | null = null;
  public right: TreeNode<T> | null = null;
  public parent: TreeNode<T> | null = null; // handy for delete & iterators

  constructor(public value: T) {}
}

// ---------------------------------------------------------------
// 3️⃣  BinarySearchTree
// ---------------------------------------------------------------

export class BinarySearchTree<T> implements Iterable<T> {
  private root: TreeNode<T> | null = null;
  private _size = 0;
  private readonly compare: Comparator<T>;

  /** Create a BST. Pass a comparator if T is not a primitive number/string. */
  constructor(compareFn?: Comparator<T>) {
    this.compare = compareFn ?? defaultComparator;
  }

  // -----------------------------------------------------------------
  // Public getters
  // -----------------------------------------------------------------
  get size(): number {
    return this._size;
  }

  /** Height of the tree (empty tree => -1, leaf => 0) */
  get height(): number {
    const heightRec = (node: TreeNode<T> | null): number =>
      node ? 1 + Math.max(heightRec(node.left), heightRec(node.right)) : -1;
    return heightRec(this.root);
  }

  // -----------------------------------------------------------------
  // 1️⃣ Insert
  // -----------------------------------------------------------------
  /** Insert a value. Duplicates are ignored (you can change this policy). */
  insert(value: T): void {
    const newNode = new TreeNode(value);
    if (!this.root) {
      this.root = newNode;
      this._size++;
      return;
    }

    let cur = this.root;
    while (true) {
      const cmp = this.compare(value, cur.value);
      if (cmp === 0) {
        // Duplicate – ignore (or you could count occurrences)
        return;
      }
      if (cmp < 0) {
        // go left
        if (!cur.left) {
          cur.left = newNode;
          newNode.parent = cur;
          this._size++;
          return;
        }
        cur = cur.left;
      } else {
        // go right
        if (!cur.right) {
          cur.right = newNode;
          newNode.parent = cur;
          this._size++;
          return;
        }
        cur = cur.right;
      }
    }
  }

  // -----------------------------------------------------------------
  // 2️⃣ Find
  // -----------------------------------------------------------------
  /** Return the node that holds `value` or `null` if not found. */
  find(value: T): TreeNode<T> | null {
    let cur = this.root;
    while (cur) {
      const cmp = this.compare(value, cur.value);
      if (cmp === 0) return cur;
      cur = cmp < 0 ? cur.left : cur.right;
    }
    return null;
  }

  /** Convenience: just return the stored value (or undefined). */
  get(value: T): T | undefined {
    const node = this.find(value);
    return node?.value;
  }

  // -----------------------------------------------------------------
  // 3️⃣ Remove
  // -----------------------------------------------------------------
  /** Remove a value from the tree. Returns true if something was removed. */
  remove(value: T): boolean {
    const node = this.find(value);
    if (!node) return false;

    // Helper to replace a child of `parent` with `newChild`
    const replaceChild = (
      parent: TreeNode<T> | null,
      oldChild: TreeNode<T>,
      newChild: TreeNode<T> | null
    ) => {
      if (!parent) {
        // oldChild was root
        this.root = newChild;
        if (newChild) newChild.parent = null;
      } else if (parent.left === oldChild) {
        parent.left = newChild;
        if (newChild) newChild.parent = parent;
      } else {
        parent.right = newChild;
        if (newChild) newChild.parent = parent;
      }
    };

    // ---- 3 cases ---------------------------------------------------
    if (!node.left && !node.right) {
      // Leaf
      replaceChild(node.parent, node, null);
    } else if (!node.left) {
      // Only right child
      replaceChild(node.parent, node, node.right);
    } else if (!node.right) {
      // Only left child
      replaceChild(node.parent, node, node.left);
    } else {
      // Two children: find in‑order successor (smallest in right subtree)
      let succ = node.right;
      while (succ.left) succ = succ.left;

      // Copy successor's value into node, then delete successor (which has at most one child)
      node.value = succ.value;
      // succ cannot have a left child (by definition)
      replaceChild(succ.parent, succ, succ.right);
    }

    this._size--;
    return true;
  }

  // -----------------------------------------------------------------
  // 4️⃣ Traversals (generator based – lazy & memory efficient)
  // -----------------------------------------------------------------
  /** In‑order (left, node, right) – yields values in sorted order. */
  *inOrder(node: TreeNode<T> | null = this.root): IterableIterator<T> {
    if (!node) return;
    yield* this.inOrder(node.left);
    yield node.value;
    yield* this.inOrder(node.right);
  }

  /** Pre‑order (node, left, right) */
  *preOrder(node: TreeNode<T> | null = this.root): IterableIterator<T> {
    if (!node) return;
    yield node.value;
    yield* this.preOrder(node.left);
    yield* this.preOrder(node.right);
  }

  /** Post‑order (left, right, node) */
  *postOrder(node: TreeNode<T> | null = this.root): IterableIterator<T> {
    if (!node) return;
    yield* this.postOrder(node.left);
    yield* this.postOrder(node.right);
    yield node.value;
  }

  // -----------------------------------------------------------------
  // 5️⃣ Iterable interface – defaults to in‑order (sorted) iteration
  // -----------------------------------------------------------------
  [Symbol.iterator](): IterableIterator<T> {
    return this.inOrder();
  }

  // -----------------------------------------------------------------
  // 6️⃣ Utility helpers (optional but handy)
  // -----------------------------------------------------------------
  /** Returns an array with the in‑order values (sorted). */
  toArray(): T[] {
    return Array.from(this);
  }

  /** Returns a pretty‑printed string (useful for debugging). */
  toString(): string {
    const lines: string[] = [];
    const walk = (node: TreeNode<T> | null, prefix = "", isLeft = true) => {
      if (node) {
        lines.push(
          `${prefix}${isLeft ? "├─" : "└─"}${node.value}`
        );
        const childPrefix = prefix + (isLeft ? "│  " : "   ");
        walk(node.left, childPrefix, true);
        walk(node.right, childPrefix, false);
      }
    };
    walk(this.root);
    return lines.join("\n");
  }
}

// ---------------------------------------------------------------
// 7️⃣  Example usage
// ---------------------------------------------------------------

/* ------------- Primitive numbers (default comparator) ------------- */
const numTree = new BinarySearchTree<number>();
[50, 30, 70, 20, 40, 60, 80].forEach(v => numTree.insert(v));

console.log("In‑order (sorted):", [...numTree]); // [20,30,40,50,60,70,80]
console.log("Pre‑order:", [...numTree.preOrder()]);
console.log("Post‑order:", [...numTree.postOrder()]);
console.log("Size:", numTree.size);
console.log("Height:", numTree.height);
console.log("Tree diagram:\n" + numTree.toString());

numTree.remove(70);
console.log("\nAfter removing 70:");
console.log("In‑order:", [...numTree]);
console.log("Size:", numTree.size);

/* ------------- Storing objects – custom comparator ------------- */
interface Person {
  id: number;
  name: string;
}
const personCmp: Comparator<Person> = (a, b) => a.id - b.id;

const peopleTree = new BinarySearchTree<Person>(personCmp);
peopleTree.insert({ id: 3, name: "Alice" });
peopleTree.insert({ id: 1, name: "Bob" });
peopleTree.insert({ id: 2, name: "Carol" });

console.log("\nPeople sorted by id:", peopleTree.toArray().map(p => p.name)); // ["Bob","Carol","Alice"]
class TreeNode<T> {
  left: TreeNode<T> | null = null;
  right: TreeNode<T> | null = null;
  parent: TreeNode<T> | null = null; // optional but simplifies delete
  constructor(public value: T) {}
}
// ----- BST.ts -----
export type Comparator<T> = (a: T, b: T) => number;
export class TreeNode<T> { /* as above */ }
export class BinarySearchTree<T> implements Iterable<T> { /* as above */ }

// ----- usage -----
import { BinarySearchTree } from "./BST";

const bst = new BinarySearchTree<number>();
[5, 2, 8, 1, 3].forEach(v => bst.insert(v));

console.log([...bst]);               // sorted: [1,2,3,5,8]
bst.remove(5);
console.log(bst.toString());        // visual tree
