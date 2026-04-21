/* ---------- Node ---------------------------------------------------------------- */
export interface TrieNode {
  /** true when this node represents the last letter of a stored word */
  isWord: boolean;
  /** arbitrary data that you may associate with a complete word */
  value?: any; // ≡ string | number | …, keep it generic
  /** mapping of next characters → child node */
  children: Map<string, TrieNode>;
}

/* ---------- Builder ---------------------------------------------------------------- */
export class Trie {
  readonly root: TrieNode;

  constructor() {
    this.root = { isWord: false, children: new Map() };
  }

  /* ----- basic helpers ----------------------------------------------------------- */

  /** adds a word to the trie, optionally tagging it with a value */
  insert(word: string, value?: any): void {
    let node = this.root;
    for (const ch of word) {
      let next = node.children.get(ch);
      if (!next) {
        next = { isWord: false, children: new Map() };
        node.children.set(ch, next);
      }
      node = next;
    }
    node.isWord = true;
    node.value = value;
  }

  /** true if the exact word exists */
  search(word: string): boolean {
    return this._findNode(word)?.isWord ?? false;
  }

  /** true if any word starts with this prefix */
  startsWith(prefix: string): boolean {
    return this._findNode(prefix) !== undefined;
  }

  /** returns the node that matches the longest shared prefix; undefined if none match */
  private _findNode(str: string): TrieNode | undefined {
    let node = this.root;
    for (const ch of str) {
      node = node.children.get(ch);
      if (!node) return undefined;
    }
    return node;
  }

  /* ----- advanced helpers ------------------------------------------------------- */

  /** returns the value stored for a word, if any */
  get(word: string): any | undefined {
    return this._findNode(word)?.value;
  }

  /** removes a word, optionally cleaning up orphaned nodes */
  delete(word: string): boolean {
    // stack will hold (node, charFromParent) pairs so we can backtrack
    const stack: Array<[TrieNode, string]> = [];
    let node = this.root;

    for (const ch of word) {
      const next = node.children.get(ch);
      if (!next) return false; // word not found
      stack.push([node, ch]);
      node = next;
    }

    if (!node.isWord) return false; // word not found as a complete entry

    node.isWord = false;
    node.value = undefined;

    /* prune nodes that became useless (no children and not a word) */
    for (let i = stack.length - 1; i >= 0; i--) {
      const [parent, ch] = stack[i];
      const child = parent.children.get(ch)!;
      if (child.isWord || child.children.size) break; // can't prune further
      parent.children.delete(ch);
    }
    return true;
  }

  /** yields all words that start with the given prefix, useful for auto‑complete */
  *wordsWithPrefix(prefix: string = ''): IterableIterator<string> {
    const node = this._findNode(prefix);
    if (!node) return;

    const stack: Array<[TrieNode, string]> = [[node, prefix]];

    while (stack.length) {
      const [cur, acc] = stack.pop()!;
      if (cur.isWord) yield acc;
      for (const [ch, child] of cur.children.entries()) {
        stack.push([child, acc + ch]);
      }
    }
  }
}

/* ---------- Usage example -------------------------------------------------------- */
const trie = new Trie();
trie.insert('apple', 42);
trie.insert('app', 7);
trie.insert('banana');

console.log(trie.search('app')); // true
console.log(trie.startsWith('ba')); // true
console.log(trie.get('apple')); // 42
for (const w of trie.wordsWithPrefix('app')) console.log(w); // app, apple
trie.delete('app');
console.log(trie.search('app')); // false
