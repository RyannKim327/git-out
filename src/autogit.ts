// trie.ts
export class TrieNode<T = void> {
  children: Map<string, TrieNode<T>> = new Map();
  isEnd = false;
  value?: T;          // optional payload stored at the word
}

export interface TrieOpts {
  caseSensitive?: boolean;
}

export class Trie<T = void> {
  private root = new TrieNode<T>();
  private opts: Required<TrieOpts>;

  constructor(opts: TrieOpts = {}) {
    this.opts = { caseSensitive: opts.caseSensitive ?? false };
  }

  /* ---------- public API ---------- */

  insert(word: string, value?: T): void {
    const node = this.traverse(this.normalize(word), true);
    node.isEnd = true;
    if (arguments.length > 1) node.value = value;
  }

  search(word: string): T | undefined {
    const node = this.traverse(this.normalize(word), false);
    return node?.isEnd ? node.value : undefined;
  }

  containsPrefix(prefix: string): boolean {
    return this.traverse(this.normalize(prefix), false) !== undefined;
  }

  /** Remove word; returns true if something was actually deleted */
  delete(word: string): boolean {
    const path: Array<[TrieNode<T>, string]> = [];
    let curr: TrieNode<T> | undefined = this.root;
    const w = this.normalize(word);

    // build path to last char
    for (const ch of w) {
      if (!curr) return false;
      path.push([curr, ch]);
      curr = curr.children.get(ch);
    }
    if (!curr || !curr.isEnd) return false;

    curr.isEnd = false;          // unmark
    if (curr.children.size === 0) {
      // prune dead branches
      while (path.length) {
        const [parent, char] = path.pop()!;
        parent.children.delete(char);
        if (parent.children.size || parent.isEnd) break;
      }
    }
    return true;
  }

  /** All words with given prefix (prefix included if it is a word itself) */
  autoComplete(prefix: string, limit = Infinity): string[] {
    const node = this.traverse(this.normalize(prefix), false);
    const out: string[] = [];
    if (!node) return out;

    const dfs = (n: TrieNode<T>, buf: string[]) => {
      if (out.length >= limit) return;
      if (n.isEnd) out.push(prefix + buf.join(''));
      for (const [ch, child] of n.children) {
        buf.push(ch);
        dfs(child, buf);
        buf.pop();
      }
    };
    dfs(node, []);
    return out;
  }

  /* ---------- helpers ---------- */

  private normalize(str: string): string {
    return this.opts.caseSensitive ? str : str.toLowerCase();
  }

  /** Returns node at end of path; undefined if path breaks and create=false */
  private traverse(word: string, create: false): TrieNode<T> | undefined;
  private traverse(word: string, create: true): TrieNode<T>;
  private traverse(word: string, create: boolean): TrieNode<T> | undefined {
    let curr = this.root;
    for (const ch of word) {
      let next = curr.children.get(ch);
      if (!next && !create) return undefined;
      if (!next) {
        next = new TrieNode<T>();
        curr.children.set(ch, next);
      }
      curr = next;
    }
    return curr;
  }
}
import { Trie } from './trie';

const trie = new Trie<number>();      // value will be number
trie.insert('cat', 42);
trie.insert('car');
trie.insert('dog');
trie.insert('dodge');

console.log(trie.search('car'));      // undefined (no value stored)
console.log(trie.search('cat'));      // 42
console.log(trie.containsPrefix('do')); // true
console.log(trie.autoComplete('ca'));  // [ 'car', 'cat' ]
trie.delete('car');
console.log(trie.autoComplete('ca')); // [ 'cat' ]
