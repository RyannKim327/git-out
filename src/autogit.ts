// -----------------------------------------------------------------------------
// 1️⃣  Trie node – keeps a map of children and a flag for word ends
// -----------------------------------------------------------------------------
class TrieNode {
  /** Map from a character to the child node that starts with that character */
  children = new Map<string, TrieNode>();
  /** true if the path to this node corresponds to a complete word */
  isEnd = false;
}

// -----------------------------------------------------------------------------
// 2️⃣  Trie implementation
// -----------------------------------------------------------------------------
export class Trie {
  private root: TrieNode;

  constructor() {
    this.root = new TrieNode();
  }

  /** Add a word to the trie */
  insert(word: string): void {
    let node = this.root;
    for (const ch of word) {
      // Get the child for `ch`, or create it if missing
      if (!node.children.has(ch)) {
        node.children.set(ch, new TrieNode());
      }
      node = node.children.get(ch)!;
    }
    node.isEnd = true;
  }

  /** Check if a word exists in the trie */
  search(word: string): boolean {
    const node = this._findNode(word);
    return !!node && node.isEnd;
  }

  /** Check if any word in the trie starts with the given prefix */
  startsWith(prefix: string): boolean {
    return !!this._findNode(prefix);
  }

  /** Internal helper: walk the trie following `key`.  Returns
   *  the terminal node if the path exists, otherwise `undefined`. */
  private _findNode(key: string): TrieNode | undefined {
    let node = this.root;
    for (const ch of key) {
      node = node.children.get(ch);
      if (!node) return undefined;
    }
    return node;
  }

  /** Optional: collect all words in the trie that share a common prefix.
   *  Useful for autocomplete. */
  autocomplete(prefix: string): string[] {
    const node = this._findNode(prefix);
    if (!node) return [];

    const results: string[] = [];
    const dfs = (n: TrieNode, path: string[]) => {
      if (n.isEnd) results.push(prefix + path.join(''));
      for (const [ch, child] of n.children.entries()) {
        dfs(child, [...path, ch]);
      }
    };

    dfs(node, []);
    return results;
  }
}

// -----------------------------------------------------------------------------
// 3️⃣  Demo
// -----------------------------------------------------------------------------
const trie = new Trie();
trie.insert('hello');
trie.insert('helium');
trie.insert('hero');
trie.insert('her');

console.log(trie.search('hello'));   // true
console.log(trie.search('heroic'));  // false
console.log(trie.startsWith('he'));  // true
console.log(trie.autocomplete('he')); // ['llo', 'lium', 'ro', 'r']
