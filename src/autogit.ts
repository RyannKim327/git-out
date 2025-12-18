Trie
 └─ root: TrieNode
TrieNode
 ├─ children: Map<char, TrieNode>
 ├─ isEndOfWord: boolean
 └─ (optional) payload: T   // e.g., a value associated with the word
/**
 * A generic Trie (prefix tree) implementation.
 *
 * @template T  The type of the optional payload stored at each terminal node.
 */
export class Trie<T = unknown> {
  /** The root node never represents a character; it only holds children. */
  private readonly root: TrieNode<T>;

  constructor() {
    this.root = new TrieNode<T>();
  }

  /** Insert a word into the trie. */
  insert(word: string, payload?: T): void {
    if (!this.isValidWord(word)) {
      throw new Error('Trie only accepts non‑empty strings.');
    }

    let node = this.root;
    for (const ch of word) {
      if (!node.children.has(ch)) {
        node.children.set(ch, new TrieNode<T>());
      }
      node = node.children.get(ch)!; // non‑null because we just set it
    }
    node.isEndOfWord = true;
    if (payload !== undefined) node.payload = payload;
  }

  /** Return true if the exact word exists in the trie. */
  contains(word: string): boolean {
    const node = this.traverse(word);
    return node !== null && node.isEndOfWord;
  }

  /** Return true if there is any word that starts with the given prefix. */
  startsWith(prefix: string): boolean {
    return this.traverse(prefix) !== null;
  }

  /** Retrieve the payload stored for a word (or undefined if none). */
  getPayload(word: string): T | undefined {
    const node = this.traverse(word);
    return node?.isEndOfWord ? node.payload : undefined;
  }

  /** Delete a word from the trie. Returns true if the word was removed. */
  delete(word: string): boolean {
    if (!this.isValidWord(word)) return false;
    return this.deleteRec(this.root, word, 0);
  }

  /** Return all words stored in the trie (useful for debugging / testing). */
  *words(): Generator<string> {
    const stack: Array<{ node: TrieNode<T>; prefix: string }> = [
      { node: this.root, prefix: '' },
    ];

    while (stack.length) {
      const { node, prefix } = stack.pop()!;
      if (node.isEndOfWord) yield prefix;
      for (const [ch, child] of node.children) {
        stack.push({ node: child, prefix: prefix + ch });
      }
    }
  }

  // -------------------------------------------------------------------------
  // -------------------------- Private helpers -----------------------------
  // -------------------------------------------------------------------------

  /** Walk the trie following `key`. Returns the final node or null if any step fails. */
  private traverse(key: string): TrieNode<T> | null {
    if (!this.isValidWord(key)) return null;
    let node = this.root;
    for (const ch of key) {
      const next = node.children.get(ch);
      if (!next) return null;
      node = next;
    }
    return node;
  }

  /** Recursive delete helper. Returns true if the caller should delete its child. */
  private deleteRec(node: TrieNode<T>, word: string, index: number): boolean {
    if (index === word.length) {
      // Reached the node that marks the word.
      if (!node.isEndOfWord) return false; // word not present
      node.isEndOfWord = false;
      node.payload = undefined;
      // If node has no children we can prune it.
      return node.children.size === 0;
    }

    const ch = word[index];
    const child = node.children.get(ch);
    if (!child) return false; // word not present

    const shouldDeleteChild = this.deleteRec(child, word, index + 1);
    if (shouldDeleteChild) {
      node.children.delete(ch);
      // Prune this node if it became a leaf and does not terminate another word.
      return node.children.size === 0 && !node.isEndOfWord;
    }
    return false;
  }

  /** Simple validation – you can replace it with a stricter regex if needed. */
  private isValidWord(word: string): boolean {
    return typeof word === 'string' && word.length > 0;
  }
}

/**
 * Internal node class – not exported because callers should interact only via `Trie`.
 */
class TrieNode<T> {
  /** Children keyed by the next character. */
  readonly children: Map<string, TrieNode<T>> = new Map();

  /** Marks that a word ends at this node. */
  isEndOfWord: boolean = false;

  /** Optional payload stored only when `isEndOfWord` is true. */
  payload?: T;
}
import { Trie } from './Trie';

// 1️⃣  Create a trie that stores a number (e.g., word frequency) as payload.
const dict = new Trie<number>();

// 2️⃣  Insert words.
dict.insert('apple', 5);
dict.insert('app', 12);
dict.insert('application', 3);
dict.insert('banana');

// 3️⃣  Query.
console.log(dict.contains('app'));          // true
console.log(dict.contains('apples'));       // false
console.log(dict.startsWith('appl'));       // true
console.log(dict.getPayload('apple'));      // 5
console.log(dict.getPayload('banana'));     // undefined (no payload supplied)

// 4️⃣  Delete.
dict.delete('app');
console.log(dict.contains('app'));          // false
console.log(dict.startsWith('app'));        // true (because "apple" still exists)

// 5️⃣  List all stored words.
for (const w of dict.words()) {
  console.log(w);
}
// → apple
// → application
// → banana
if (node.isEndOfWord) node.count++;
else {
  node.isEndOfWord = true;
  node.count = 1;
}
getCount(word: string): number {
  const node = this.traverse(word);
  return node?.isEndOfWord ? node.count! : 0;
}
searchPattern(pattern: string): string[] {
  const results: string[] = [];
  const dfs = (node: TrieNode<T>, i: number, prefix: string) => {
    if (i === pattern.length) {
      if (node.isEndOfWord) results.push(prefix);
      return;
    }
    const ch = pattern[i];
    if (ch === '.') {
      for (const [c, child] of node.children) dfs(child, i + 1, prefix + c);
    } else {
      const child = node.children.get(ch);
      if (child) dfs(child, i + 1, prefix + ch);
    }
  };
  dfs(this.root, 0, '');
  return results;
}
private normalize(s: string): string {
  return s.toLowerCase(); // or use Intl.Collator for locale‑aware folding
}
import { Trie } from './Trie';

describe('Trie', () => {
  let trie: Trie<number>;

  beforeEach(() => {
    trie = new Trie<number>();
    trie.insert('cat', 1);
    trie.insert('car', 2);
    trie.insert('cart', 3);
    trie.insert('dog');
  });

  test('contains', () => {
    expect(trie.contains('cat')).toBe(true);
    expect(trie.contains('c')).toBe(false);
  });

  test('startsWith', () => {
    expect(trie.startsWith('ca')).toBe(true);
    expect(trie.startsWith('do')).toBe(true);
    expect(trie.startsWith('z')).toBe(false);
  });

  test('payload', () => {
    expect(trie.getPayload('car')).toBe(2);
    expect(trie.getPayload('dog')).toBeUndefined();
  });

  test('delete', () => {
    expect(trie.delete('car')).toBe(true);
    expect(trie.contains('car')).toBe(false);
    // 'cart' should still exist
    expect(trie.contains('cart')).toBe(true);
  });

  test('words iterator', () => {
    const all = Array.from(trie.words()).sort();
    expect(all).toEqual(['car', 'cart', 'cat', 'dog']);
  });
});
class SimpleTrie {
  private root = new Map<string, any>();

  insert(word: string) {
    let node = this.root;
    for (const ch of word) {
      if (!node.has(ch)) node.set(ch, new Map());
      node = node.get(ch);
    }
    node.set('', true); // terminal marker
  }

  contains(word: string): boolean {
    let node = this.root;
    for (const ch of word) {
      node = node.get(ch);
      if (!node) return false;
    }
    return node.has('');
  }

  startsWith(prefix: string): boolean {
    let node = this.root;
    for (const ch of prefix) {
      node = node.get(ch);
      if (!node) return false;
    }
    return true;
  }
}
