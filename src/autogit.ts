/**
 * A minimal red‑black tree implementation
 * -------------------------------------------------
 * • Generic over key (must be comparable with `<` & `>`) and value
 * • Internally balanced by standard RB‑tree rules
 * • O(log n) insert, delete, search
 */

enum Colour {
  RED,
  BLACK,
}

interface RBNode<K, V> {
  key: K;
  value: V;
  colour: Colour;
  left?: RBNode<K, V>;
  right?: RBNode<K, V>;
  parent?: RBNode<K, V>;
}

class RedBlackTree<K, V> {
  private root?: RBNode<K, V>;

  /* ---------- Public API ---------- */

  /** Look up a value by key */
  find(key: K): V | undefined {
    let node = this.root;
    while (node) {
      if (key < node.key) node = node.left;
      else if (key > node.key) node = node.right;
      else return node.value;
    }
    return undefined;
  }

  /** Insert a key/value pair */
  insert(key: K, value: V): void {
    const newNode: RBNode<K, V> = {
      key,
      value,
      colour: Colour.RED, // new nodes are always red
    };
    this.bstInsert(newNode);
    this.fixInsert(newNode);
  }

  /** Delete a node by key (no support for duplicates) */
  delete(key: K): boolean {
    let node = this.root;
    while (node && node.key !== key) {
      node = key < node.key ? node.left : node.right;
    }
    if (!node) return false; // not found

    this.deleteNode(node);
    return true;
  }

  /* ---------- Helper methods ---------- */

  /** Standard BST insertion */
  private bstInsert(z: RBNode<K, V>): void {
    let y: RBNode<K, V> | undefined;
    let x = this.root;
    while (x) {
      y = x;
      x = z.key < x.key ? x.left : x.right;
    }
    z.parent = y;
    if (!y) this.root = z; // tree was empty
    else if (z.key < y.key) y.left = z;
    else y.right = z;
  }

  /** Re‑balance after insertion */
  private fixInsert(z: RBNode<K, V>): void {
    while (
      z.parent &&
      z.parent.colour === Colour.RED
    ) {
      const parent = z.parent;
      const grand = parent.parent;
      if (!grand) break; // should not happen, parent is always red => grand exists

      if (parent === grand.left) {
        const y = grand.right; // uncle
        if (y && y.colour === Colour.RED) {
          // Case 1: uncle is red
          parent.colour = Colour.BLACK;
          y.colour = Colour.BLACK;
          grand.colour = Colour.RED;
          z = grand;
        } else {
          if (z === parent.right) {
            // Case 2: z is right child
            this.rotateLeft(parent);
            z = parent;
          }
          // Case 3: z is left child
          this.rotateRight(grand);
          parent.colour = Colour.BLACK;
          grand.colour = Colour.RED;
          break;
        }
      } else {
        // Mirror image of the above
        const y = grand.left; // uncle
        if (y && y.colour === Colour.RED) {
          parent.colour = Colour.BLACK;
          y.colour = Colour.BLACK;
          grand.colour = Colour.RED;
          z = grand;
        } else {
          if (z === parent.left) {
            this.rotateRight(parent);
            z = parent;
          }
          this.rotateLeft(grand);
          parent.colour = Colour.BLACK;
          grand.colour = Colour.RED;
          break;
        }
      }
    }
    this.root!.colour = Colour.BLACK;
  }

  /* Rotation helpers */
  private rotateLeft(x: RBNode<K, V>): void {
    const y = x.right!;
    x.right = y.left;
    if (y.left) y.left.parent = x;
    y.parent = x.parent;
    if (!x.parent) this.root = y;
    else if (x === x.parent.left) x.parent.left = y;
    else x.parent.right = y;
    y.left = x;
    x.parent = y;
  }

  private rotateRight(x: RBNode<K, V>): void {
    const y = x.left!;
    x.left = y.right;
    if (y.right) y.right.parent = x;
    y.parent = x.parent;
    if (!x.parent) this.root = y;
    else if (x === x.parent.right) x.parent.right = y;
    else x.parent.left = y;
    y.right = x;
    x.parent = y;
  }

  /* ---------- Deletion ---------- */

  /** find minimum node starting at a given node */
  private minimum(node: RBNode<K, V>): RBNode<K, V> {
    while (node.left) node = node.left;
    return node;
  }

  /** transplant subtree u with subtree v */
  private transplant(u: RBNode<K, V>, v?: RBNode<K, V>): void {
    if (!u.parent) this.root = v;
    else if (u === u.parent.left) u.parent.left = v;
    else u.parent.right = v;
    if (v) v.parent = u.parent;
  }

  /** Remove node from the tree and rebalance */
 
