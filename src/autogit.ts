/**
 * A generic B‑Tree implementation in TypeScript.
 *
 * t = minimum degree of the tree.
 *   * All nodes except the root contain at least t‑1 keys
 *   * All nodes contain at most 2t‑1 keys
 *
 * Example usage:
 *   const bt = new BTree<number>(2)          // 2‑4‑tree
 *   bt.insert(10);  bt.insert(20);  bt.insert(5)
 *   console.log(bt.search(20));              // true
 *   console.log(bt.search(7));               // false
 */
export class BTree<K> {
  /** Minimum degree (t), a positive integer.  t === 1 turns the tree into a binary search tree. */
  private readonly t: number;

  /** Root node of the tree.  It may be a leaf or an internal node. */
  private root: Node<K>;

  constructor(t: number) {
    if (t < 2) throw new Error("B‑Tree order t must be >= 2");
    this.t = t;
    this.root = new Node<K>(true);          // start with an empty leaf
  }

  /* -------- public API ---------------------------------------------- */

  /** Simple containment check. */
  contains(key: K): boolean {
    return this.search(key) !== undefined;
  }

  /** Returns the node that contains key, or undefined if absent. */
  search(key: K): Node<K> | undefined {
    return this.searchNode(this.root, key);
  }

  /** Insert a key; duplicates are ignored by default. */
  insert(key: K): void {
    if (this.contains(key)) return; // ignore duplicates

    // If root is full, split before descending.
    if (this.root.keys.length === 2 * this.t - 1) {
      const s = new Node<K>(false);
      s.children = [this.root];        // old root becomes child 0
      this.splitChild(s, 0);           // split at child 0
      this.root = s;
    }
    this.insertNonFull(this.root, key);
  }

  /** (Optional) Pretty‑print the structure to the console. */
  print(): void {
    const sep = " | ";
    const lines: string[] = [];
    const recurse = (node: Node<K>, depth: number) => {
      const indent = "  ".repeat(depth);
      lines.push(`${indent}${node.keys.join(sep)}`);
      if (!node.leaf) {
        for (const child of node.children) recurse(child, depth + 1);
      }
    };
    recurse(this.root, 0);
    console.log(lines.join("\n"));
  }

  /* -------- internal helpers ---------------------------------------- */

  /** Recursively search for a key within a given node. */
  private searchNode(node: Node<K>, key: K): Node<K> | undefined {
    let i = 0;
    while (i < node.keys.length && this.compare(key, node.keys[i]) > 0) i++;

    if (i < node.keys.length && this.compare(key, node.keys[i]) === 0) {
      return node;                                 // found
    }
    if (node.leaf) {
      return undefined;                            // not found
    }
    return this.searchNode(node.children[i], key);
  }

  /** Insert a key into a node that is guaranteed NOT to be full. */
  private insertNonFull(node: Node<K>, key: K): void {
    let i = node.keys.length - 1;

    if (node.leaf) {
      // Insert key into the leaf at the correct position.
      while (i >= 0 && this.compare(key, node.keys[i]) < 0) {
        i--;
      }
      node.keys.splice(i + 1, 0, key);
      return;
    }

    // Node is internal; find child to descend.
    while (i >= 0 && this.compare(key, node.keys[i]) < 0) i--;
    i++; // child index just after the key

    // If the child is full, split it first.
    if (node.children[i].keys.length === 2 * this.t - 1) {
      this.splitChild(node, i);
      if (this.compare(key, node.keys[i]) > 0) i++; // the key moved up
    }
    this.insertNonFull(node.children[i], key);
  }

  /** Split child Y of node X at index idx.  X must have space for a new key. */
  private splitChild(parent: Node<K>, idx: number): void {
    const fullChild = parent.children[idx];
    const left = new Node<K>(fullChild.leaf);
    const right = new Node<K>(fullChild.leaf);

    // left takes the first t-1 keys, right takes the last t-1 keys
    left.keys = fullChild.keys.slice(0, this.t - 1);
    right.keys = fullChild.keys.slice(this.t);

    if (!fullChild.leaf) {
      left.children = fullChild.children.slice(0, this.t);
      right.children = fullChild.children.slice(this.t);
    }

    // Insert new key to parent
    parent.keys.splice(idx, 0, fullChild.keys[this.t - 1]);
    // Replace full child with left & right
    parent.children.splice(idx, 1, left, right);
  }

  /** Simple comparator that works out-of-the-box for numbers & strings
   * but can be overridden if you need special ordering logic. */
  private compare(a: K, b: K): number {
    if (typeof a === "number" && typeof b === "number") return a - b;
    if (typeof a === "string" && typeof b === "string") return a.localeCompare(b);
    // Fallback: use strict equality then default string conversion.
    return a === b ? 0 :



---

**Support Pollinations.AI:**

---

🌸 **Ad** 🌸
Powered by Pollinations.AI free text APIs. [Support our mission](https://pollinations.ai/redirect/kofi) to keep AI accessible for everyone.
