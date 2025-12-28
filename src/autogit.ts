// trie.ts
type Node = Map<string, TrieNode>;

class TrieNode {
  children: Node = new Map();
  isEnd = false;
}

export class Trie {
  private root = new TrieNode();

  /* 1. Insert a word */
  insert(word: string): void {
    let curr = this.root;
    for (const ch of word) {
      if (!curr.children.has(ch)) {
        curr.children.set(ch, new TrieNode());
      }
      curr = curr.children.get(ch)!;
    }
    curr.isEnd = true;
  }

  /* 2. Exact search */
  search(word: string): boolean {
    const node = this.#findNode(word);
    return node !== null && node.isEnd;
  }

  /* 3. Prefix check */
  startsWith(prefix: string): boolean {
    return this.#findNode(prefix) !== null;
  }

  /* 4. Delete a word (if it exists) */
  delete(word: string): boolean {
    return this.#deleteRec(this.root, word, 0);
  }

  /* 5. Return all words with the given prefix */
  autoComplete(prefix: string): string[] {
    const node = this.#findNode(prefix);
    const results: string[] = [];
    if (node) this.#dfs(node, prefix, results);
    return results;
  }

  /* ---------- private helpers ---------- */

  #findNode(prefix: string): TrieNode | null {
    let curr = this.root;
    for (const ch of prefix) {
      if (!curr.children.has(ch)) return null;
      curr = curr.children.get(ch)!;
    }
    return curr;
  }

  #dfs(node: TrieNode, path: string, out: string[]): void {
    if (node.isEnd) out.push(path);
    for (const [ch, child] of node.children) {
      this.#dfs(child, path + ch, out);
    }
  }

  #deleteRec(node: TrieNode, word: string, depth: number): boolean {
    if (depth === word.length) {
      if (!node.isEnd) return false;          // word not found
      node.isEnd = false;
      return node.children.size === 0;        // tell parent to delete me
    }
    const ch = word[depth];
    const child = node.children.get(ch);
    if (!child) return false;                 // word not found

    const shouldDeleteChild = this.#deleteRec(child, word, depth + 1);

    if (shouldDeleteChild) node.children.delete(ch);

    // delete current node if it is now useless
    return node.children.size === 0 && !node.isEnd;
  }
}

/* ---------- quick sanity checks ---------- */
if (require.main === module) {
  const trie = new Trie();
  ["bat", "bath", "batman", "batmobile", "barn"].forEach(w => trie.insert(w));

  console.log(trie.search("bat"));        // true
  console.log(trie.search("ba"));       // false
  console.log(trie.startsWith("ba"));     // true
  console.log(trie.autoComplete("bat"));  // [ 'bat', 'bath', 'batman', 'batmobile' ]

  trie.delete("bat");
  console.log(trie.search("bat"));      // false
  console.log(trie.autoComplete("bat"));  // [ 'bath', 'batman', 'batmobile' ]
}
