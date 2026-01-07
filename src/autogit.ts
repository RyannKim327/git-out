class BTreeNode<T> { … }
class BTree<T> { … }
class BTree<T> {
    insert(key: T): void
    delete(key: T): void
    search(key: T): T | null
    // optional helpers:
    traverse(callback: (key: T) => void): void
}
/**
 * B‑Tree node.
 *
 * @template T  The type of the stored keys.
 */
class BTreeNode<T> {
    /** Keys stored in this node (always sorted). */
    keys: T[] = [];

    /** Child pointers – length = keys.length + 1 (or 0 for leaf). */
    children: BTreeNode<T>[] = [];

    /** True if this node has no children. */
    leaf: boolean;

    /** Minimum degree of the whole tree (passed from the BTree). */
    readonly t: number;

    constructor(t: number, leaf: boolean) {
        this.t = t;
        this.leaf = leaf;
    }

    /**
     * Find the first index i such that keys[i] >= key.
     * Returns i in range [0, keys.length].
     */
    findKey(key: T, compare: (a: T, b: T) => number): number {
        let idx = 0;
        while (idx < this.keys.length && compare(this.keys[idx], key) < 0) {
            ++idx;
        }
        return idx;
    }

    /** --------------------------------------------------------------
     *  SEARCH
     * -------------------------------------------------------------- */
    /**
     * Search for a key in the subtree rooted at this node.
     * Returns the key if found, otherwise null.
     */
    search(key: T, compare: (a: T, b: T) => number): T | null {
        const i = this.findKey(key, compare);

        // If the key is present in this node, we are done.
        if (i < this.keys.length && compare(this.keys[i], key) === 0) {
            return this.keys[i];
        }

        // If this node is a leaf, the key does not exist.
        if (this.leaf) {
            return null;
        }

        // Recurse into the appropriate child.
        return this.children[i].search(key, compare);
    }

    /** --------------------------------------------------------------
     *  INSERT – SPLIT CHILD IF NEEDED
     * -------------------------------------------------------------- */
    /**
     * Insert a new key into the subtree rooted at this node.
     * Assumes that this node is **not full** when called.
     */
    insertNonFull(key: T, compare: (a: T, b: T) => number): void {
        let i = this.keys.length - 1;

        if (this.leaf) {
            // Insert the key into the sorted array of keys.
            this.keys.splice(this.findKey(key, compare), 0, key);
        } else {
            // Find the child that will receive the new key.
            while (i >= 0 && compare(key, this.keys[i]) < 0) {
                i--;
            }
            i++; // child index

            // If the child is full, split it first.
            if (this.children[i].keys.length === 2 * this.t - 1) {
                this.splitChild(i, this.children[i]);

                // After split, the middle key moves up and we have two children.
                // Decide which of the two children is now the correct one.
                if (compare(key, this.keys[i]) > 0) {
                    i++;
                }
            }
            this.children[i].insertNonFull(key, compare);
        }
    }

    /**
     * Split the child `y` of this node at index `i`.
     * `y` must be full (2t‑1 keys). After the split:
     *   - `y` keeps the first t‑1 keys,
     *   - a new node `z` gets the last t‑1 keys,
     *   - the middle key moves up into `this.keys[i]`.
     */
    splitChild(i: number, y: BTreeNode<T>): void {
        const z = new BTreeNode<T>(this.t, y.leaf);
        // z gets the last (t‑1) keys of y
        z.keys = y.keys.splice(this.t); // removes from y, returns the tail
        // If y is not leaf, move the last t children to z
        if (!y.leaf) {
            z.children = y.children.splice(this.t);
        }

        // Insert the middle key of y into this node
        const middleKey = y.keys.pop()!; // the (t‑1)th key (0‑based)
        this.keys.splice(i, 0, middleKey);
        // Insert the new child z right after y
        this.children.splice(i + 1, 0, z);
    }

    /** --------------------------------------------------------------
     *  DELETE – HIGH‑LEVEL OVERVIEW
     * -------------------------------------------------------------- */
    /**
     * Remove a key from the subtree rooted at this node.
     * The algorithm follows the classic CLRS textbook steps.
     */
    remove(key: T, compare: (a: T, b: T) => number): void {
        const idx = this.findKey(key, compare);

        // CASE 1 – key is present in this node
        if (idx < this.keys.length && compare(this.keys[idx], key) === 0) {
            if (this.leaf) {
                // Simple case: leaf node – just delete the key.
                this.keys.splice(idx, 1);
            } else {
                // Internal node – more work.
                this.removeFromNonLeaf(idx, compare);
            }
            return;
        }

        // If we reach here, the key is not present in this node.
        if (this.leaf) {
            // Key does not exist in the tree.
            return;
        }

        // Determine if the child where the key should exist has at least t keys.
        const child = this.children[idx];
        if (child.keys.length < this.t) {
            this.fill(idx);
        }

        // After possible rebalancing, the appropriate child might have shifted.
        const nextIdx = (idx >= this.keys.length && compare(key, this.keys[this.keys.length - 1]) > 0) ? idx : idx;
        this.children[nextIdx].remove(key, compare);
    }

    /** Helper for CASE 1 when the key is in an internal node */
    private removeFromNonLeaf(idx: number, compare: (a: T, b: T) => number): void {
        const predChild = this.children[idx];
        const succChild = this.children[idx + 1];

        if (predChild.keys.length >= this.t) {
            // CASE 2a – predecessor key exists and its subtree has enough keys.
            const predKey = predChild.getPredecessor();
            this.keys[idx] = predKey;
            predChild.remove(predKey, compare);
        } else if (succChild.keys.length >= this.t) {
            // CASE 2b – successor key exists and its subtree has enough keys.
            const succKey = succChild.getSuccessor();
            this.keys[idx] = succKey;
            succChild.remove(succKey, compare);
        } else {
            // CASE 2c – both children have t‑1 keys → merge them.
            this.merge(idx);
            predChild.remove(this.keys[idx], compare); // now predChild contains the merged node
        }
    }

    /** Return the largest key in the subtree (predecessor) */
    private getPredecessor(): T {
        let cur: BTreeNode<T> = this;
        while (!cur.leaf) {
            cur = cur.children[cur.children.length - 1];
        }
        return cur.keys[cur.keys.length - 1];
    }

    /** Return the smallest key in the subtree (successor) */
    private getSuccessor(): T {
        let cur: BTreeNode<T> = this;
        while (!cur.leaf) {
            cur = cur.children[0];
        }
        return cur.keys[0];
    }

    /** --------------------------------------------------------------
     *  DELETE – ENSURING CHILD HAS AT LEAST t KEYS (fill)
     * -------------------------------------------------------------- */
    /**
     * Ensure that child `children[idx]` has at least `t` keys.
     * If it has only `t‑1`, we either borrow from a sibling or merge.
     */
    private fill(idx: number): void {
        if (idx !== 0 && this.children[idx - 1].keys.length >= this.t) {
            this.borrowFromPrev(idx);
        } else if (idx !== this.keys.length && this.children[idx + 1].keys.length >= this.t) {
            this.borrowFromNext(idx);
        } else {
            // Merge with a sibling
            if (idx !== this.keys.length) {
                this.merge(idx);
            } else {
                this.merge(idx - 1);
            }
        }
    }

    /** Borrow a key from the previous sibling */
    private borrowFromPrev(idx: number): void {
        const child = this.children[idx];
        const sibling = this.children[idx - 1];

        // Move the separator key from parent down to child
        child.keys.unshift(this.keys[idx - 1]);

        // If sibling is not leaf, move its rightmost child to child
        if (!sibling.leaf) {
            child.children.unshift(sibling.children.pop()!);
        }

        // Move sibling's last key up to parent
        this.keys[idx - 1] = sibling.keys.pop()!;
    }

    /** Borrow a key from the next sibling */
    private borrowFromNext(idx: number): void {
        const child = this.children[idx];
        const sibling = this.children[idx + 1];

        // Move the separator key from parent down to child
        child.keys.push(this.keys[idx]);

        // If sibling is not leaf, move its leftmost child to child
        if (!sibling.leaf) {
            child.children.push(sibling.children.shift()!);
        }

        // Move sibling's first key up to parent
        this.keys[idx] = sibling.keys.shift()!;
    }

    /** Merge child `children[idx]` with its sibling `children[idx+1]` */
    private merge(idx: number): void {
        const child = this.children[idx];
        const sibling = this.children[idx + 1];

        // Pull down the separator key from the current node
        child.keys.push(this.keys[idx]);

        // Append sibling's keys and children to child
        child.keys = child.keys.concat(sibling.keys);
        if (!child.leaf) {
            child.children = child.children.concat(sibling.children);
        }

        // Remove the separator key and sibling from this node
        this.keys.splice(idx, 1);
        this.children.splice(idx + 1, 1);
    }

    /** --------------------------------------------------------------
     *  TRAVERSAL (optional helper)
     * -------------------------------------------------------------- */
    /**
     * In‑order traversal of the subtree.
     */
    traverse(callback: (key: T) => void): void {
        for (let i = 0; i < this.keys.length; i++) {
            if (!this.leaf) {
                this.children[i].traverse(callback);
            }
            callback(this.keys[i]);
        }
        if (!this.leaf) {
            this.children[this.keys.length].traverse(callback);
        }
    }
}

/**
 * B‑Tree wrapper exposing a clean public API.
 *
 * @template T  The type of the stored keys.
 */
export class BTree<T> {
    private root: BTreeNode<T> | null = null;
    private readonly t: number; // minimum degree

    /**
     * @param t Minimum degree (t ≥ 2). Larger `t` → shallower tree, more keys per node.
     * @param compare Optional comparator. If omitted, the default `<`/`>` operators are used (works for numbers & strings).
     */
    constructor(t: number = 2, private compare: (a: T, b: T) => number = BTree.defaultCompare) {
        if (t < 2) {
            throw new Error('Minimum degree t must be at least 2.');
        }
        this.t = t;
    }

    /** Default comparator works for numbers and strings. */
    private static defaultCompare<U>(a: U, b: U): number {
        if (a < b) return -1;
        if (a > b) return 1;
        return 0;
    }

    /** --------------------------------------------------------------
     *  PUBLIC SEARCH
     * -------------------------------------------------------------- */
    /**
     * Search for a key. Returns the stored key (useful when you store objects) or `null`.
     */
    search(key: T): T | null {
        return this.root ? this.root.search(key, this.compare) : null;
    }

    /** --------------------------------------------------------------
     *  PUBLIC INSERT
     * -------------------------------------------------------------- */
    insert(key: T): void {
        if (this.root === null) {
            // Tree is empty – create a new leaf root.
            this.root = new BTreeNode<T>(this.t, true);
            this.root.keys.push(key);
            return;
        }

        // If root is full, we need to grow the tree height.
        if (this.root.keys.length === 2 * this.t - 1) {
            const s = new BTreeNode<T>(this.t, false);
            s.children.push(this.root);
            s.splitChild(0, this.root);
            // Choose which of the two children will receive the new key.
            const i = this.compare(key, s.keys[0]) < 0 ? 0 : 1;
            s.children[i].insertNonFull(key, this.compare);
            this.root = s;
        } else {
            this.root.insertNonFull(key, this.compare);
        }
    }

    /** --------------------------------------------------------------
     *  PUBLIC DELETE
     * -------------------------------------------------------------- */
    delete(key: T): void {
        if (!this.root) {
            return; // empty tree
        }

        this.root.remove(key, this.compare);

        // If the root became empty and has a child, make that child the new root.
        if (this.root.keys.length === 0) {
            if (!this.root.leaf) {
                this.root = this.root.children[0];
            } else {
                // Tree is now empty.
                this.root = null;
            }
        }
    }

    /** --------------------------------------------------------------
     *  PUBLIC TRAVERSAL (optional)
     * -------------------------------------------------------------- */
    /**
     * In‑order traversal. Calls `callback` for each key in sorted order.
     */
    traverse(callback: (key: T) => void): void {
        if (this.root) {
            this.root.traverse(callback);
        }
    }

    /** --------------------------------------------------------------
     *  DEBUG / INSPECTION HELPERS
     * -------------------------------------------------------------- */
    /** Returns the height of the tree (root = level 1). */
    height(): number {
        let h = 0;
        let node = this.root;
        while (node) {
            h++;
            node = node.leaf ? null : node.children[0];
        }
        return h;
    }

    /** Returns a plain‑object representation useful for console.log or debugging. */
    toObject(): any {
        const recurse = (node: BTreeNode<T> | null): any => {
            if (!node) return null;
            return {
                keys: node.keys.slice(),
                leaf: node.leaf,
                children: node.children.map(recurse)
            };
        };
        return recurse(this.root);
    }
}
import { BTree } from "./BTree";

// Example 1 – numbers (default comparator)
const tree = new BTree<number>(3); // t = 3 → each node holds 2..5 keys

[10, 20, 5, 6, 12, 30, 7, 17].forEach(k => tree.insert(k));

console.log("Search 6:", tree.search(6));   // → 6
console.log("Search 15:", tree.search(15)); // → null

console.log("Height:", tree.height()); // usually 2 for this small set

// In‑order traversal (sorted output)
tree.traverse(k => process.stdout.write(k + " "));
// → 5 6 7 10 12 17 20 30

// Delete a few keys
tree.delete(6);
tree.delete(20);
console.log("\nAfter deletions:");
tree.traverse(k => process.stdout.write(k + " "));
// → 5 7 10 12 17 30

// Example 2 – custom objects
type Person = {
