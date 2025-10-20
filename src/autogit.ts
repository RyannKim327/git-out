// Trie.ts
type TrieNode = {
  children: Map<string, TrieNode>;
  isEnd: boolean;
};

export class Trie {
  private root: TrieNode;

  constructor() {
    this.root = { children: new Map(), isEnd: false };
  }

  /* 1. Insert ----------------------------------------------------------------*/
  insert(word: string): void {
    let cur = this.root;
    for (const ch of word) {
      if (!cur.children.has(ch)) {
        cur.children.set(ch, { children: new Map(), isEnd: false });
      }
      cur = cur.children.get(ch)!;
    }
    cur.isEnd = true;
  }

  /* 2. Exact search ----------------------------------------------------------*/
  search(word: string): boolean {
    const node = this._findNode(word);
    return node !== null && node.isEnd;
  }

  /* 3. Prefix check ----------------------------------------------------------*/
  startsWith(prefix: string): boolean {
    return this._findNode(prefix) !== null;
  }

  /* 4. Delete ----------------------------------------------------------------*/
  delete(word: string): boolean {
    return this._delete(this.root, word, 0);
  }

  /* 5. All words in trie -----------------------------------------------------*/
  getAllWords(): string[] {
    const out: string[] = [];
    this._dfs(this.root, '', out);
    return out;
  }

  /* 6. Auto-complete ---------------------------------------------------------*/
  autocomplete(prefix: string): string[] {
    const node = this._findNode(prefix);
    if (!node) return [];
    const out: string[] = [];
    this._dfs(node, prefix, out);
    return out;
  }

  /* ---------------------------------------------------------------------------
   * Helper: traverse as far as possible; return last node or null
   *--------------------------------------------------------------------------*/
  private _findNode(prefix: string): TrieNode | null {
    let cur = this.root;
    for (const ch of prefix) {
      if (!cur.children.has(ch)) return null;
      cur = cur.children.get(ch)!;
    }
    return cur;
  }

  /* ---------------------------------------------------------------------------
   * Helper: recursive delete. Returns true if caller should delete the link
   * to this node (i.e. subtree became empty and not end of another word).
   *--------------------------------------------------------------------------*/
  private _delete(node: TrieNode, word: string, depth: number): boolean {
    if (depth === word.length) {
      // Turn off end-of-word flag
      if (!node.isEnd) return false; // word not found
      node.isEnd = false;
      // If node has no children, it can be pruned
      return node.children.size === 0;
    }
    const ch = word[depth];
    const next = node.children.get(ch);
    if (!next) return false; // word not found

    const shouldDeleteChild = this._delete(next, word, depth + 1);

    if (shouldDeleteChild) {
      node.children.delete(ch);
      // Current node can be deleted only if it is non-terminal and has no other children
      return !node.isEnd && node.children.size === 0;
    }
    return false;
  }

  /* ---------------------------------------------------------------------------
   * Helper: DFS collect words
   *--------------------------------------------------------------------------*/
  private _dfs(node: TrieNode, path: string, out: string[]): void {
    if (node.isEnd) out.push(path);
    for (const [ch, child] of node.children) {
      this._dfs(child, path + ch, out);
    }
  }
}
import { Trie } from './Trie';

const trie = new Trie();
['bat', 'batman', 'bath', 'bathrobe', 'bat', 'bad'].forEach(w => trie.insert(w));

console.log(trie.search('bat'));        // true
console.log(trie.search('batman'));     // true
console.log(trie.search('ba'));         // false
console.log(trie.startsWith('ba'));    // true
console.log(trie.autocomplete('ba')); // [ 'bad', 'bat', 'batman', 'bath', 'bathrobe' ]

trie.delete('bat');
console.log(trie.search('bat'));        // false
console.log(trie.search('batman'));     // true (still exists)
