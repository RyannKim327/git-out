// trie.ts
export class TrieNode<TValue = boolean> {
  children: Map<string, TrieNode<TValue>> = new Map();
  isEnd: boolean = false;
  value?: TValue;          // optional payload stored at the word
}

export class Trie<TValue = boolean> {
  private root = new TrieNode<TValue>();

  /* 1. Insert *************************************************************/
  insert(word: string, value?: TValue): void {
    let cur = this.root;
    for (const ch of word) {
      if (!cur.children.has(ch)) cur.children.set(ch, new TrieNode());
      cur = cur.children.get(ch)!;
    }
    cur.isEnd = true;
    if (arguments.length > 1) cur.value = value;
  }

  /* 2. Exact search *******************************************************/
  search(word: string): boolean {
    const node = this.#traverse(word);
    return node?.isEnd ?? false;
  }

  /* 3. Prefix check *******************************************************/
  startsWith(prefix: string): boolean {
    return this.#traverse(prefix) !== undefined;
  }

  /* 4. Delete word (returns true if existed) ****************************/
  delete(word: string): boolean {
    return this.#deleteRec(this.root, word, 0);
  }

  /* 5. All words in lexicographic order *********************************/
  getAllWords(): string[] {
    const out: string[] = [];
    this.#dfs(this.root, '', out);
    return out;
  }

  /* 6. Auto-complete ******************************************************/
  autoComplete(prefix: string, limit = 10): string[] {
    const node = this.#traverse(prefix);
    if (!node) return [];
    const out: string[] = [];
    this.#dfs(node, prefix, out, limit);
    return out;
  }

  /* --------------------------------------------------------------------- */
  /* private helpers */
  #traverse(prefix: string): TrieNode<TValue> | undefined {
    let cur = this.root;
    for (const ch of prefix) {
      const next = cur.children.get(ch);
      if (!next) return undefined;
      cur = next;
    }
    return cur;
  }

  #dfs(node: TrieNode<TValue>, path: string, out: string[], limit = Infinity): void {
    if (out.length >= limit) return;
    if (node.isEnd) out.push(path);
    for (const [ch, child] of [...node.children].sort()) { // alphabetical
      this.#dfs(child, path + ch, out, limit);
      if (out.length >= limit) break;
    }
  }

  #deleteRec(node: TrieNode<TValue>, word: string, depth: number): boolean {
    if (depth === word.length) {
      if (!node.isEnd) return false;        // word not found
      node.isEnd = false;
      return node.children.size === 0;        // tell parent to delete me
    }
    const ch = word[depth];
    const child = node.children.get(ch);
    if (!child) return false;               // word not found

    const shouldDeleteChild = this.#deleteRec(child, word, depth + 1);

    if (shouldDeleteChild) node.children.delete(ch);

    // delete current node if it is now useless
    return !node.isEnd && node.children.size === 0;
  }
}

/* ------------------------------------------------------------------ */
/* Quick sanity check */
if (import.meta.vitest) {
  const { describe, it, expect } = import.meta.vitest;
  describe('Trie', () => {
    it('works', () => {
      const t = new Trie();
      t.insert('cat');
      t.insert('car');
      t.insert('dog');
      expect(t.search('cat')).toBe(true);
      expect(t.search('ca')).toBe(false);
      expect(t.startsWith('ca')).toBe(true);
      expect(t.autoComplete('ca')).toEqual(['car', 'cat']);
      t.delete('car');
      expect(t.search('car')).toBe(false);
      expect(t.getAllWords()).toEqual(['cat', 'dog']);
    });
  });
}
import { Trie } from './trie';

const trie = new Trie<number>();
trie.insert('apple', 1);
trie.insert('app', 2);

console.log(trie.search('app'));      // true
console.log(trie.autoComplete('ap'));     // [ 'app', 'apple' ]
