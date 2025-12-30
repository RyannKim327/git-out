// trie.ts
type TrieNode = {
  char: string;
  isWord: boolean;
  children: Map<string, TrieNode>;
};

export class Trie {
  private root: TrieNode;

  constructor() {
    this.root = this.createNode('');
  }

  /* ---------- Public API ---------- */

  insert(word: string): void {
    let cur = this.root;
    for (const ch of word) {
      let child = cur.children.get(ch);
      if (!child) {
        child = this.createNode(ch);
        cur.children.set(ch, child);
      }
      cur = child;
    }
    cur.isWord = true;
  }

  search(word: string): boolean {
    const node = this.traverse(word);
    return node !== null && node.isWord;
  }

  startsWith(prefix: string): boolean {
    return this.traverse(prefix) !== null;
  }

  delete(word: string): boolean {
    return this.deleteRec(this.root, word, 0);
  }

  /* ---------- Helpers ---------- */

  private createNode(char: string): TrieNode {
    return { char, isWord: false, children: new Map() };
  }

  private traverse(prefix: string): TrieNode | null {
    let cur: TrieNode | null = this.root;
    for (const ch of prefix) {
      cur = cur.children.get(ch) ?? null;
      if (!cur) return null;
    }
    return cur;
  }

  /**
   * Recursively remove the word. Returns true when the caller
   * should delete the child reference (i.e. the subtree is empty).
   */
  private deleteRec(node: TrieNode, word: string, depth: number): boolean {
    if (depth === word.length) {
      if (!node.isWord) return false;         // word not found
      node.isWord = false;
      return node.children.size === 0;        // tell parent to prune
    }
    const ch = word[depth];
    const child = node.children.get(ch);
    if (!child) return false;                 // word not found

    const shouldDeleteChild = this.deleteRec(child, word, depth + 1);

    if (shouldDeleteChild) node.children.delete(ch);

    // propagate upward: delete myself if I am useless
    return !node.isWord && node.children.size === 0;
  }

  /* ---------- Optional utilities ---------- */

  get size(): number {
    let cnt = 0;
    const dfs = (n: TrieNode) => {
      if (n.isWord) ++cnt;
      n.children.forEach(dfs);
    };
    dfs(this.root);
    return cnt;
  }

  words(prefix = ''): string[] {
    const out: string[] = [];
    const node = prefix ? this.traverse(prefix) : this.root;
    if (!node) return out;

    const dfs = (n: TrieNode, path: string) => {
      if (n.isWord) out.push(path);
      n.children.forEach((c, ch) => dfs(c, path + ch));
    };
    dfs(node, prefix);
    return out;
  }
}

/* ---------- Quick sanity check ---------- */
if (require.main === module) {
  const trie = new Trie();
  ['cat', 'car', 'card', 'care', 'careful'].forEach(w => trie.insert(w));
  console.log(trie.search('car'));        // true
  console.log(trie.search('care'));     // true
  console.log(trie.search('careless'));   // false
  console.log(trie.startsWith('ca'));     // true
  trie.delete('car');
  console.log(trie.search('car'));      // false
  console.log(trie.search('card'));     // true  (branch kept)
  console.log(trie.words());              // [ 'card', 'care', 'careful', 'cat' ]
}
npm i -D ts-node typescript
npx ts-node trie.ts
