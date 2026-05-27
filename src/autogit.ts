/**
 * A node in the trie.
 *
 * - `children` holds the next character → child node mapping.
 * - `isEndOfWord` tells us if a word ends here.
 *
 * The node is deliberately kept lightweight: using `Record` instead of
 * `Map` keeps the code readable and the memory footprint small,
 * while `children` is a plain object keyed by single characters.
 */
class TrieNode {
  public children: Record<string, TrieNode> = {};
  public isEndOfWord = false;
}

/**
 * Trie implementation for strings.
 *
 * Everything is typed, so you’ll get compile–time safety for method
 * arguments and return values.  The interface is intentionally simple.
 */
export class Trie {
  private readonly root = new TrieNode();

  /** Insert a word into the trie */
  insert(word: string): void {
    let node = this.root;
    for (const ch of word) {
      if (!node.children[ch]) {
        node.children[ch] = new TrieNode();
      }
      node = node.children[ch];
    }
    node.isEndOfWord = true;
  }

  /** Return true iff the exact word exists in the trie */
  search(word: string): boolean {
    let node = this.root;
    for (const ch of word) {
      const next = node.children[ch];
      if (!next) return false;
      node = next;
    }
    return node.isEndOfWord;
  }

  /** Return true if any word starts with the given prefix */
  startsWith(prefix: string): boolean {
    let node = this.root;
    for (const ch of prefix) {
      const next = node.children[ch];
      if (!next) return false;
      node = next;
    }
    return true;
  }

  /** (Optional) Retrieve all words that share this prefix */
  getWordsWithPrefix(prefix: string): string[] {
    const words: string[] = [];
    let node = this.root;
    for (const ch of prefix) {
      if (!node.children[ch]) return words; // no match
      node = node.children[ch];
    }
    const collect = (curNode: TrieNode, suffix: string) => {
      if (curNode.isEndOfWord) words.push(prefix + suffix);
      for (const [ch, child] of Object.entries(curNode.children)) {
        collect(child, suffix + ch);
      }
    };
    collect(node, '');
    return words;
  }
}
import { Trie } from './Trie';

const trie = new Trie();

trie.insert('apple');
trie.insert('app');
trie.insert('bat');
trie.insert('batch');

console.log(trie.search('app'));      // true
console.log(trie.search('appl'));     // false
console.log(trie.startsWith('bat'));  // true
console.log(trie.startsWith('baq'));  // false

console.log(trie.getWordsWithPrefix('ba')); // ['bat', 'batch']
class TrieNode<V = undefined> {
  children: Record<string, TrieNode<V>> = {};
  isEndOfWord = false;
  value?: V;
}

export class Trie<V = undefined> {
  private readonly root = new TrieNode<V>();

  insert(word: string, value?: V): void {
    let node = this.root;
    for (const ch of word) {
      if (!node.children[ch]) node.children[ch] = new TrieNode<V>();
      node = node.children[ch];
    }
    node.isEndOfWord = true;
    if (value !== undefined) node.value = value;
  }

  // search and startsWith prefixes unchanged
  // but now search can optionally return the stored value
  search(word: string): V | undefined {
    let node = this.root;
    for (const ch of word) {
      const next = node.children[ch];
      if (!next) return undefined;
      node = next;
    }
    return node.isEndOfWord ? node.value : undefined;
  }
}
const dict = new Trie<number>();
dict.insert('hello', 42);
console.log(dict.search('hello')); // 42
