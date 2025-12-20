class TrieNode {
  /** Map from a character to the child node */
  children: Map<string, TrieNode> = new Map();

  /** Marks the end of a complete word */
  isEndOfWord: boolean = false;
}
export class Trie {
  private readonly root: TrieNode = new TrieNode();

  /** Insert a word into the trie */
  insert(word: string): void { … }

  /** Return true if the exact word exists */
  search(word: string): boolean { … }

  /** Return true if any stored word starts with the given prefix */
  startsWith(prefix: string): boolean { … }

  /** Remove a word from the trie (no‑op if the word is absent) */
  delete(word: string): boolean { … }

  /** Optional helper: collect all words with a given prefix */
  getWordsWithPrefix(prefix: string, limit?: number): string[] { … }
}
// trie.ts
export class TrieNode {
  /** Children keyed by a single character */
  children: Map<string, TrieNode> = new Map();

  /** True if a word ends at this node */
  isEndOfWord: boolean = false;
}

/**
 * Trie (prefix tree) implementation.
 *
 * Time complexity for insert/search/startsWith/delete: O(L) where L = length of the word/prefix.
 * Space complexity: O(N * L) in the worst case (N = number of distinct words, L = average length).
 */
export class Trie {
  private readonly root: TrieNode = new TrieNode();

  /** Insert a word into the trie */
  insert(word: string): void {
    if (word.length === 0) return; // ignore empty strings

    let node = this.root;
    for (const ch of word) {
      if (!node.children.has(ch)) {
        node.children.set(ch, new TrieNode());
      }
      node = node.children.get(ch)!; // non‑null because we just set it
    }
    node.isEndOfWord = true;
  }

  /** Return true if the exact word exists in the trie */
  search(word: string): boolean {
    const node = this._traverse(word);
    return node !== null && node.isEndOfWord;
  }

  /** Return true if any stored word starts with the given prefix */
  startsWith(prefix: string): boolean {
    return this._traverse(prefix) !== null;
  }

  /**
   * Delete a word from the trie.
   *
   * Returns true if the word was present and removed, false otherwise.
   */
  delete(word: string): boolean {
    if (word.length === 0) return false;

    // Helper returns whether the current node should be pruned.
    const deleteRec = (node: TrieNode, depth: number): boolean => {
      if (depth === word.length) {
        // We've reached the node representing the last character.
        if (!node.isEndOfWord) return false; // word not present
        node.isEndOfWord = false;

        // If node has no children, it can be removed.
        return node.children.size === 0;
      }

      const ch = word[depth];
      const child = node.children.get(ch);
      if (!child) return false; // word not present

      const shouldDeleteChild = deleteRec(child, depth + 1);

      if (shouldDeleteChild) {
        node.children.delete(ch);
        // Return true if current node is not end of another word and has no other children.
        return !node.isEndOfWord && node.children.size === 0;
      }

      return false; // No pruning needed higher up
    };

    return deleteRec(this.root, 0);
  }

  /**
   * Return all words that start with `prefix`.
   *
   * @param limit Optional maximum number of results (useful for autocomplete).
   */
  getWordsWithPrefix(prefix: string, limit?: number): string[] {
    const results: string[] = [];
    const startNode = this._traverse(prefix);
    if (!startNode) return results; // no such prefix

    const dfs = (node: TrieNode, path: string[]) => {
      if (limit !== undefined && results.length >= limit) return;

      if (node.isEndOfWord) {
        results.push(prefix + path.join(''));
      }

      for (const [ch, child] of node.children) {
        path.push(ch);
        dfs(child, path);
        path.pop();
      }
    };

    dfs(startNode, []);
    return results;
  }

  /** --------------------------------------------------------------
   *  Private helper: walk the trie following `str`. Returns the node
   *  reached after the last character, or null if the path breaks.
   *  -------------------------------------------------------------- */
  private _traverse(str: string): TrieNode | null {
    let node: TrieNode | undefined = this.root;
    for (const ch of str) {
      node = node?.children.get(ch);
      if (!node) return null;
    }
    return node ?? null;
  }
}
// demo.ts
import { Trie } from './trie';

const trie = new Trie();

// Insert some words
trie.insert('apple');
trie.insert('app');
trie.insert('application');
trie.insert('apt');
trie.insert('banana');
trie.insert('band');
trie.insert('bandana');
trie.insert('🦄'); // Unicode works out‑of‑the‑box

// Exact search
console.log(trie.search('app'));          // true
console.log(trie.search('apples'));       // false
console.log(trie.search('🦄'));           // true

// Prefix search
console.log(trie.startsWith('ap'));       // true
console.log(trie.startsWith('ban'));      // true
console.log(trie.startsWith('cat'));      // false

// Autocomplete (first 5 results)
console.log(trie.getWordsWithPrefix('ap', 5));
// → [ 'app', 'apple', 'application', 'apt' ]

// Delete a word
console.log(trie.delete('app'));          // true  (removed)
console.log(trie.search('app'));          // false
console.log(trie.search('apple'));        // true   (still there)

// Delete a non‑existent word
console.log(trie.delete('nonexistent')); // false

// After deletion, prefix still works
console.log(trie.startsWith('app'));      // true (because "apple" remains)
ts-node demo.ts
tsc trie.ts demo.ts && node demo.js
class TrieNode<T = any> {
  children = new Map<string, TrieNode<T>>();
  value?: T;               // undefined means "not a terminal node"
}
insert(word.toLowerCase());
search(word.toLowerCase());
startsWith(word.toLowerCase());
class TrieNode {
  children = new Map<string, TrieNode>();
  isEndOfWord = false;
}

export class Trie {
  private root = new TrieNode();

  insert(word: string): void {
    let node = this.root;
    for (const ch of word) {
      if (!node.children.has(ch)) node.children.set(ch, new TrieNode());
      node = node.children.get(ch)!;
    }
    node.isEndOfWord = true;
  }

  search(word: string): boolean {
    const node = this._walk(word);
    return !!node?.isEndOfWord;
  }

  startsWith(prefix: string): boolean {
    return this._walk(prefix) !== null;
  }

  delete(word: string): boolean {
    const recurse = (node: TrieNode, depth: number): boolean => {
      if (depth === word.length) {
        if (!node.isEndOfWord) return false;
        node.isEndOfWord = false;
        return node.children.size === 0;
      }
      const ch = word[depth];
      const child = node.children.get(ch);
      if (!child) return false;
      const shouldDelete = recurse(child, depth + 1);
      if (shouldDelete) node.children.delete(ch);
      return !node.isEndOfWord && node.children.size === 0;
    };
    return recurse(this.root, 0);
  }

  private _walk(str: string): TrieNode | null {
    let node: TrieNode | undefined = this.root;
    for (const ch of str) {
      node = node?.children.get(ch);
      if (!node) return null;
    }
    return node ?? null;
  }
}
