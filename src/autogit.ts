/* --------------------------------------------------------------
 * BTree.ts – a generic B‑Tree implementation in TypeScript
 * ------------------------------------------------------------*/

type Comparator<T> = (a: T, b: T) => number;

/**
 * A single node of a B‑Tree.
 */
class BTreeNode<T> {
  /** Keys stored in this node – always kept sorted */
  keys: T[] = [];

  /** Child pointers – length = keys.length + 1 (if not leaf) */
  children: BTreeNode<T>[] = [];

  /** True if this node has no children */
  leaf: boolean;

  constructor(public t: number, leaf: boolean) {
    this.leaf = leaf;
  }

  /** ---------------------------------------------------------
   *  SEARCH
   * ------------------------------------------------------- */
  /** Returns the node and index where `k` is found, or null */
  search(k: T, cmp: Comparator<T>): { node: BTreeNode<T>; idx: number } | null {
    // Find the first key >= k
    let i = 0;
    while (i < this.keys.length && cmp(k, this.keys[i]) > 0) i++;

    // If the key matches, we are done
    if (i < this.keys.length && cmp(k, this.keys[i]) === 0) {
      return { node: this, idx: i };
    }

    // If leaf, key is not present
    if (this.leaf) return null;

    // Recurse into the appropriate child
    return this.children[i].search(k, cmp);
  }

  /** ---------------------------------------------------------
   *  SPLIT CHILD
   * ------------------------------------------------------- */
  /**
   * Split the full child `y` at index `i` into two nodes.
   * After the split, `this` (the parent) will have an extra key
   * and an extra child.
   */
  splitChild(i: number, y: BTreeNode<T>) {
    const t = this.t;
    // New node that will hold (t‑1) keys of y
    const z = new BTreeNode<T>(t, y.leaf);
    // Copy the last (t‑1) keys of y into z
    z.keys = y.keys.splice(t); // removes from y, returns the removed part
    // If y is not leaf, also move the last t children
    if (!y.leaf) {
      z.children = y.children.splice(t);
    }

    // Insert new child z into this node
    this.children.splice(i + 1, 0, z);
    // Move the middle key of y up to this node
    const middleKey = y.keys.splice(t - 1, 1)[0];
    this.keys.splice(i, 0, middleKey);
  }

  /** ---------------------------------------------------------
   *  INSERT NON‑FULL
   * ------------------------------------------------------- */
  /**
   * Insert `k` into a node that is guaranteed **not** to be full.
   * Called recursively from the root downwards.
   */
  insertNonFull(k: T, cmp: Comparator<T>) {
    let i = this.keys.length - 1;

    if (this.leaf) {
      // Insert the key into the sorted position
      while (i >= 0 && cmp(k, this.keys[i]) < 0) {
        i--;
      }
      this.keys.splice(i + 1, 0, k);
    } else {
      // Find child that should receive the new key
      while (i >= 0 && cmp(k, this.keys[i]) < 0) i--;
      i++; // child index

      // If that child is full, split it first
      if (this.children[i].keys.length === 2 * this.t - 1) {
        this.splitChild(i, this.children[i]);
        // After split, the middle key moves up and we have two children.
        // Decide which of the two will hold the new key.
        if (cmp(k, this.keys[i]) > 0) i++;
      }
      this.children[i].insertNonFull(k, cmp);
    }
  }

  /** ---------------------------------------------------------
   *  DELETE HELPERS
   * ------------------------------------------------------- */
  /** Find the predecessor (largest key in left subtree) */
  getPredecessor(idx: number): T {
    let cur = this.children[idx];
    while (!cur.leaf) cur = cur.children[cur.children.length - 1];
    return cur.keys[cur.keys.length - 1];
  }

  /** Find the successor (smallest key in right subtree) */
  getSuccessor(idx: number): T {
    let cur = this.children[idx + 1];
    while (!cur.leaf) cur = cur.children[0];
    return cur.keys[0];
  }

  /** Merge child `idx` with child `idx+1` (used when both have t‑1 keys) */
  merge(idx: number) {
    const child = this.children[idx];
    const sibling = this.children[idx + 1];

    // Pull down the separator key from the parent
    child.keys.push(this.keys[idx]);

    // Append sibling's keys and children
    child.keys = child.keys.concat(sibling.keys);
    if (!child.leaf) child.children = child.children.concat(sibling.children);

    // Remove the separator key and sibling pointer from the parent
    this.keys.splice(idx, 1);
    this.children.splice(idx + 1, 1);
  }

  /** Ensure that child `idx` has at least t keys before descending */
  fill(idx: number) {
    const t = this.t;
    // If left sibling has >= t keys, borrow from left
    if (idx !== 0 && this.children[idx - 1].keys.length >= t) {
      this.borrowFromPrev(idx);
    }
    // Else if right sibling has >= t keys, borrow from right
    else if (idx !== this.keys.length && this.children[idx + 1].keys.length >= t) {
      this.borrowFromNext(idx);
    }
    // Otherwise merge with a sibling
    else {
      if (idx !== this.keys.length) this.merge(idx);
      else this.merge(idx - 1);
    }
  }

  /** Borrow a key from the previous sibling */
  borrowFromPrev(idx: number) {
    const child = this.children[idx];
    const sibling = this.children[idx - 1];

    // Move separator key from parent down to child
    child.keys.unshift(this.keys[idx - 1]);

    // If sibling is not leaf, move its rightmost child to child
    if (!sibling.leaf) child.children.unshift(sibling.children.pop()!);

    // Move sibling's last key up to parent
    this.keys[idx - 1] = sibling.keys.pop()!;
  }

  /** Borrow a key from the next sibling */
  borrowFromNext(idx: number) {
    const child = this.children[idx];
    const sibling = this.children[idx + 1];

    // Move separator key from parent down to child
    child.keys.push(this.keys[idx]);

    // If sibling is not leaf, move its leftmost child to child
    if (!sibling.leaf) child.children.push(sibling.children.shift()!);

    // Move sibling's first key up to parent
    this.keys[idx] = sibling.keys.shift()!;
  }

  /** ---------------------------------------------------------
   *  DELETE FROM SUBTREE
   * ------------------------------------------------------- */
  /**
   * Delete key `k` from the subtree rooted at this node.
   * Returns true if the key was found and removed.
   */
  delete(k: T, cmp: Comparator<T>): boolean {
    const t = this.t;
    let idx = 0;
    while (idx < this.keys.length && cmp(k, this.keys[idx]) > 0) idx++;

    // CASE 1 – key is present in this node
    if (idx < this.keys.length && cmp(k, this.keys[idx]) === 0) {
      if (this.leaf) {
        // Simple leaf removal
        this.keys.splice(idx, 1);
        return true;
      } else {
        // Internal node – more work
        const predChild = this.children[idx];
        const succChild = this.children[idx + 1];

        if (predChild.keys.length >= t) {
          // Replace with predecessor
          const pred = this.getPredecessor(idx);
          this.keys[idx] = pred;
          return predChild.delete(pred, cmp);
        } else if (succChild.keys.length >= t) {
          // Replace with successor
          const succ = this.getSuccessor(idx);
          this.keys[idx] = succ;
          return succChild.delete(succ, cmp);
        } else {
          // Both children have t‑1 keys → merge them + key, then recurse
          this.merge(idx);
          // After merge, the key to delete is now in the merged child
          return predChild.delete(k, cmp);
        }
      }
    }

    // CASE 2 – key not present in this node
    if (this.leaf) {
      // Reached leaf → key not found
      return false;
    }

    // Determine the child that must contain the key
    const child = this.children[idx];

    // If child has only t‑1 keys, we must ensure it has at least t before recursing
    if (child.keys.length === t - 1) {
      this.fill(idx);
    }

    // After possible merge, the relevant child might have shifted
    const nextIdx = idx >= this.keys.length ? idx - 1 : idx;
    return this.children[nextIdx].delete(k, cmp);
  }

  /** ---------------------------------------------------------
   *  IN‑ORDER TRAVERSAL (for debugging / printing)
   * ------------------------------------------------------- */
  *inOrder(): Generator<T> {
    for (let i = 0; i < this.keys.length; i++) {
      if (!this.leaf) yield* this.children[i].inOrder();
      yield this.keys[i];
    }
    if (!this.leaf) yield* this.children[this.keys.length].inOrder();
  }
}

/**
 * Public B‑Tree class.
 */
export class BTree<T> {
  private root: BTreeNode<T> | null = null;
  private readonly t: number; // minimum degree
  private readonly cmp: Comparator<T>;

  /**
   * @param t Minimum degree (t ≥ 2). Larger `t` → wider, shallower tree.
   * @param cmp Comparator function (like Array.prototype.sort).
   */
  constructor(t: number, cmp: Comparator<T>) {
    if (t < 2) throw new Error('B‑Tree minimum degree must be at least 2');
    this.t = t;
    this.cmp = cmp;
  }

  /** ---------------------------------------------------------
   *  SEARCH
   * ------------------------------------------------------- */
  /** Returns true if `k` exists in the tree */
  search(k: T): boolean {
    if (!this.root) return false;
    return this.root.search(k, this.cmp) !== null;
  }

  /** ---------------------------------------------------------
   *  INSERT
   * ------------------------------------------------------- */
  insert(k: T) {
    // If tree is empty, create root
    if (!this.root) {
      this.root = new BTreeNode<T>(this.t, true);
      this.root.keys.push(k);
      return;
    }

    // If root is full, split it and grow the tree height
    if (this.root.keys.length === 2 * this.t - 1) {
      const s = new BTreeNode<T>(this.t, false);
      s.children.push(this.root);
      s.splitChild(0, this.root);
      // Choose which of the two children will receive the new key
      const i = this.cmp(k, s.keys[0]) > 0 ? 1 : 0;
      s.children[i].insertNonFull(k, this.cmp);
      this.root = s;
    } else {
      this.root.insertNonFull(k, this.cmp);
    }
  }

  /** ---------------------------------------------------------
   *  DELETE
   * ------------------------------------------------------- */
  delete(k: T): boolean {
    if (!this.root) return false;

    const result = this.root.delete(k, this.cmp);

    // If the root became empty and has a child, make that child the new root
    if (this.root.keys.length === 0) {
      if (!this.root.leaf) {
        this.root = this.root.children[0];
      } else {
        this.root = null; // tree is now empty
      }
    }

    return result;
  }

  /** ---------------------------------------------------------
   *  TRAVERSAL
   * ------------------------------------------------------- */
  /** Returns an array of all keys in sorted order */
  toArray(): T[] {
    if (!this.root) return [];
    return Array.from(this.root.inOrder());
  }

  /** Pretty‑print the tree (useful for debugging) */
  print(): void {
    const recurse = (node: BTreeNode<T>, depth: number) => {
      const indent = '  '.repeat(depth);
      console.log(`${indent}[${node.keys.map(k => JSON.stringify(k)).join(', ')}]`);
      if (!node.leaf) {
        node.children.forEach(child => recurse(child, depth + 1));
      }
    };
    if (this.root) recurse(this.root, 0);
    else console.log('[empty]');
  }
}

/* --------------------------------------------------------------
 * QUICK DEMO (run with `node BTree.js` after `tsc BTree.ts`)
 * ------------------------------------------------------------*/

if (require.main === module) {
  // Example with numbers
  const tree = new BTree<number>(3, (a, b) => a - b); // t = 3 → max 5 keys per node

  const data = [20, 5, 15, 30, 25, 40, 10, 35, 45, 50, 1, 2, 3, 4];
  console.log('Inserting:', data);
  data.forEach(v => tree.insert(v));

  console.log('\nTree after inserts:');
  tree.print();

  console.log('\nSorted output:', tree.toArray());

  // Search demo
  const toFind = 25;
  console.log(`\nSearch ${toFind}:`, tree.search(toFind) ? 'found' : 'not found');

  // Delete demo
  const toDelete = [15, 30, 5, 1, 45];
  console.log('\nDeleting:', toDelete);
  toDelete.forEach(v => {
    const ok = tree.delete(v);
    console.log(`  delete ${v}: ${ok ? 'ok' : 'not present'}`);
  });

  console.log('\nTree after deletions:');
  tree.print();

  console.log('\nSorted output after deletions:', tree.toArray());
}
