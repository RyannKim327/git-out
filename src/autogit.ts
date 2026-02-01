/**
 * A single node inside the trie.
 * 
 * - `children` holds the outgoing edges keyed by the character they represent.
 * - `isEnd` marks that a full word ends at this node.
 */
class TrieNode {
  public children: Map<string, TrieNode> = new Map();
  public isEnd: boolean = false;
}

/**
 * The trie itself.
 */
export class Trie {
  private root: TrieNode = new TrieNode();

  /**
   * Add a word to the trie.
   */
  insert(word: string): void {
    let node = this.root;
    for (const ch of word) {
      let child = node.children.get(ch);
      if (!child) {
        child = new TrieNode();
        node.children.set(ch, child);
      }
      node = child;
    }
    node.isEnd = true;
  }

  /**
   * Does the trie contain the exact word?
   */
  search(word: string): boolean {
    const node = this._findNode(word);
    return node ? node.isEnd : false;
  }

  /**
   * Does any stored word start with the given prefix?
   */
  startsWith(prefix: string): boolean {
    return Boolean(this._findNode(prefix));
  }

  /**
   * Optional: remove a word.  The implementation keeps the trie shrunken
   * by pruning leaf nodes that become unused.
   */
  delete(word: string): boolean {
    const stack: Array<{node: TrieNode, ch: string}> = [];
    let node = this.root;

    for (const ch of word) {
      const child = node.children.get(ch);
      if (!child) return false;        // word not present
      stack.push({ node, ch });
      node = child;
    }

    if (!node.isEnd) return false;      // word not present
    node.isEnd = false;

    // prune if the node has no children
    while (stack.length && !node.children.size && !node.isEnd) {
      const { node: parent, ch } = stack.pop()!;
      parent.children.delete(ch);
      node = parent;
    }

    return true;
  }

  /** Helper that walks the trie and returns the last node for a key. */
  private _findNode(key: string): TrieNode | null {
    let node = this.root;
    for (const ch of key) {
      node = node.children.get(ch) ?? null;
      if (!node) return null;
    }
    return node;
  }
}
const t = new Trie();
t.insert("hello");
t.insert("helium");
t.insert("help");

console.log(t.search("help"));    // true
console.log(t.search("heal"));    // false
console.log(t.startsWith("hel")); // true
console.log(t.startsWith("hep")); // false

t.delete("help");
console.log(t.search("help"));    // false
console.log(t.startsWith("hel")); // true (because "hello" and "helium" stay)
