// trie.ts
export class TrieNode {
  readonly children = new Map<string, TrieNode>();
  isEnd = false;
  /** Number of words that have this node on their path (used for fast delete). */
  pass = 0;
  /** Number of words that terminate at this node. */
  end = 0;
}

export class Trie {
  private readonly root = new TrieNode();
  private _size = 0;

  get size(): number {
    return this._size;
  }

  /** Insert a word in O(L) time. */
  insert(word: string): void {
    if (word.length === 0) return;
    let cur = this.root;
    cur.pass++;
    for (const ch of word) {
      let next = cur.children.get(ch);
      if (!next) {
        next = new TrieNode();
        cur.children.set(ch, next);
      }
      next.pass++;
      cur = next;
    }
    if (cur.end === 0) this._size++;
    cur.end++;
    cur.isEnd = true;
  }

  /** Exact search – O(L). */
  search(word: string): boolean {
    const node = this.#traverse(word);
    return node !== null && node.isEnd;
  }

  /** Prefix search – O(L). */
  startsWith(prefix: string): boolean {
    return this.#traverse(prefix) !== null;
  }

  /** Delete one occurrence of word. O(L). */
  delete(word: string): boolean {
    if (!this.search(word)) return false;
    let cur: TrieNode | undefined = this.root;
    cur.pass--;
    for (const ch of word) {
      const next = cur.children.get(ch)!;
      next.pass--;
      if (next.pass === 0) {
        // Prune dead branch
        cur.children.delete(ch);
        this._size--;
        return true;
      }
      cur = next;
    }
    cur.end--;
    if (cur.end === 0) cur.isEnd = false;
    this._size--;
    return true;
  }

  /** Return all words in lexicographic order. */
  getAllWords(): string[] {
    const out: string[] = [];
    const dfs = (n: TrieNode, path: string) => {
      if (n.isEnd) out.push(path);
      for (const [ch, child] of [...n.children].sort(([a], [b]) => a.localeCompare(b))) {
        dfs(child, path + ch);
      }
    };
    dfs(this.root, '');
    return out;
  }

  /* ------------- private ------------- */
  #traverse(prefix: string): TrieNode | null {
    let cur: TrieNode | undefined = this.root;
    for (const ch of prefix) {
      cur = cur.children.get(ch);
      if (!cur) return null;
    }
    return cur;
  }
}

/* ------------ quick sanity check ------------ */
if (require.main === module) {
  const trie = new Trie();
  ['cat', 'car', 'care', 'careful', 'egg'].forEach(w => trie.insert(w));
  console.log('All words:', trie.getAllWords());
  console.log('search(car):', trie.search('car'));      // true
  console.log('search(care):', trie.search('care'));    // true
  console.log('delete(car):', trie.delete('car'));      // true
  console.log('search(car):', trie.search('car'));      // false
  console.log('startsWith(ca):', trie.startsWith('ca')); // true
  console.log('size:', trie.size);                      // 4
}
$ npm install -g ts-node
$ ts-node trie.ts
