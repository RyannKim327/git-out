// A node inside the trie
class TrieNode {
  // Map from a character to the next node in the path
  children: Map<string, TrieNode> = new Map();

  // Marks the end of a word
  isEndOfWord: boolean = false;

  constructor(public readonly char: string | null = null) {}
}

// The trie itself
export class Trie {
  private root = new TrieNode();

  /** Inserts a word into the trie. */
  insert(word: string): void {
    if (!word) return;               // ignore empty strings
    let node = this.root;

    for (const ch of word) {
      // Grab the child if it already exists; otherwise create a new node
      let next = node.children.get(ch);
      if (!next) {
        next = new TrieNode(ch);
        node.children.set(ch, next);
      }
      node = next;
    }

    // Mark that a complete word ends here
    node.isEndOfWord = true;
  }

  /** Returns true if the word is in the trie. */
  search(word: string): boolean {
    if (!word) return false;
    let node = this.root;

    for (const ch of word) {
      const next = node.children.get(ch);
      if (!next) return false;      // path breaks → word absent
      node = next;
    }

    return node.isEndOfWord;
  }

  /** Checks if any word in the trie starts with the given prefix. */
  startsWith(prefix: string): boolean {
    if (!prefix) return false;
    let node = this.root;

    for (const ch of prefix) {
      const next = node.children.get(ch);
      if (!next) return false;
      node = next;
    }

    return true;
  }

  /** (Optional) Returns the list of all words in the trie that start with a given prefix. */
  autocomplete(prefix: string): string[] {
    const results: string[] = [];
    let node = this.root;

    // Walk to the node representing the prefix
    for (const ch of prefix) {
      const next = node.children.get(ch);
      if (!next) return results;   // empty list if prefix not present
      node = next;
    }

    // Depth‑first walk from that node, collecting words
    const dfs = (n: TrieNode, acc: string) => {
      if (n.isEndOfWord) results.push(acc);
      for (const [ch, child] of n.children.entries()) {
        dfs(child, acc + ch);
      }
    };

    dfs(node, prefix);
    return results;
  }
}
const trie = new Trie();

trie.insert('cat');
trie.insert('car');
trie.insert('cart');
trie.insert('dog');

console.log(trie.search('cat'));      // true
console.log(trie.search('cab'));      // false

console.log(trie.startsWith('ca'));   // true
console.log(trie.startsWith('do'));   // true
console.log(trie.startsWith('droll'));// false

console.log(trie.autocomplete('ca')); // ['cat', 'car', 'cart']
