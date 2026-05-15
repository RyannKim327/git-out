/* ----------  TrieNode  ---------- */

class TrieNode<T = any> {
  /** Holds the full value for a key that ends here. */
  public value: T | null = null;

  /** Child pointers keyed by the next character. */
  readonly children: Map<string, TrieNode<T>> = new Map();

  /** Convenience flag – true if this node marks the end of a key. */
  get hasValue(): boolean {
    return this.value !== null;
  }
}

/* ----------  Trie  ---------- */

class Trie<T = any> {
  private root = new TrieNode<T>();

  /**
   * Insert a key/value pair.  Keys can be any string.
   */
  insert(key: string, value: T): void {
    let node = this.root;
    for (const ch of key) {
      if (!node.children.has(ch)) {
        node.children.set(ch, new TrieNode<T>());
      }
      node = node.children.get(ch)!;
    }
    node.value = value;
  }

  /**
   * Returns the value stored under *key*, or `undefined` if the key
   * isn't present.
   */
  get(key: string): T | undefined {
    const node = this._findNode(key);
    return node?.value ?? undefined;
  }

  /**
   * Checks whether *key* exists in the trie.
   */
  has(key: string): boolean {
    const node = this._findNode(key);
    return !!node?.hasValue;
  }

  /**
   * Delete a key.  If the key isn't present, nothing happens.
   * The method ends up trimming unused nodes on the way back.
   */
  delete(key: string): void {
    const path: TrieNode[] = [];
    let node = this.root;

    for (const ch of key) {
      const child = node.children.get(ch);
      if (!child) return;          // key not found
      path.push(node);
      node = child;
    }

    if (!node.hasValue) return;    // no value to delete

    node.value = null;

    // Walk backward, removing nodes that became unnecessary.
    for (let i = key.length - 1; i >= 0; i--) {
      const parent = path[i];
      const ch = key[i];

      const child = parent.children.get(ch)!;
      if (child.children.size > 0 || child.hasValue) break;
      parent.children.delete(ch);
    }
  }

  /**
   * Returns all keys that start with *prefix*.
   */
  startsWith(prefix: string): string[] {
    const node = this._findNode(prefix);
    if (!node) return [];

    const results: string[] = [];
    this._collect(node, prefix, results);
    return results;
  }

  /* ---------  Helpers  --------- */

  private _findNode(key: string): TrieNode | null {
    let node: TrieNode | undefined = this.root;
    for (const ch of key) {
      node = node?.children.get(ch);
      if (!node) return null;
    }
    return node;
  }

  private _collect(node: TrieNode, prefix: string, out: string[]): void {
    if (node.hasValue) out.push(prefix);

    for (const [ch, child] of node.children) {
      this._collect(child, prefix + ch, out);
    }
  }
}

/* ----------  Usage Demo  ---------- */

const trie = new Trie<number>();

trie.insert('cat', 1);
trie.insert('car', 2);
trie.insert('cart', 3);
trie.insert('dog', 4);

console.log(trie.get('cat'));         // 1
console.log(trie.get('cart'));        // 3
console.log(trie.has('carpent'));     // false

console.log(trie.startsWith('ca'));   // ['cat', 'car', 'cart']
console.log(trie.startsWith('do'));   // ['dog']

trie.delete('cart');
console.log(trie.startsWith('ca'));   // ['cat', 'car']
