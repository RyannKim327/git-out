// trie.ts
export class TrieNode {
  children: Map<string, TrieNode> = new Map();
  isEnd: boolean = false;
}

export class Trie {
  private root: TrieNode = new TrieNode();

  /* ---------- Public API ---------- */

  insert(word: string): void {
    let cur = this.root;
    for (const ch of word) {
      if (!cur.children.has(ch)) cur.children.set(ch, new TrieNode());
      cur = cur.children.get(ch)!;
    }
    cur.isEnd = true;
  }

  search(word: string): boolean {
    const node = this.#traverse(word);
    return node !== null && node.isEnd;
  }

  startsWith(prefix: string): boolean {
    return this.#traverse(prefix) !== null;
  }

  delete(word: string): boolean {
    return this.#delete(this.root, word, 0);
  }

  getAllWords(): string[] {
    const out: string[] = [];
    this.#dfs(this.root, "", out);
    return out;
  }

  autoComplete(prefix: string): string[] {
    const node = this.#traverse(prefix);
    if (!node) return [];
    const out: string[] = [];
    this.#dfs(node, prefix, out);
    return out;
  }

  /* ---------- Private helpers ---------- */

  #traverse(prefix: string): TrieNode | null {
    let cur = this.root;
    for (const ch of prefix) {
      if (!cur.children.has(ch)) return null;
      cur = cur.children.get(ch)!;
    }
    return cur;
  }

  #dfs(node: TrieNode, path: string, out: string[]): void {
    if (node.isEnd) out.push(path);
    for (const [ch, child] of node.children) {
      this.#dfs(child, path + ch, out);
    }
  }

  #delete(node: TrieNode, word: string, depth: number): boolean {
    if (depth === word.length) {
      if (!node.isEnd) return false;          // word not found
      node.isEnd = false;
      return node.children.size === 0;        // tell parent to delete
    }
    const ch = word[depth];
    const child = node.children.get(ch);
    if (!child) return false;                 // word not found

    const shouldDeleteChild = this.#delete(child, word, depth + 1);

    if (shouldDeleteChild) {
      node.children.delete(ch);
      // delete own node only if it is no longer useful
      return node.children.size === 0 && !node.isEnd;
    }
    return false;
  }
}

/* ---------- Quick sanity check ---------- */
if (import.meta.vitest) {
  const { describe, it, expect } = import.meta.vitest;
  describe("Trie", () => {
    it("works", () => {
      const t = new Trie();
      t.insert("cat");
      t.insert("car");
      t.insert("card");
      expect(t.search("car")).toBe(true);
      expect(t.search("care")).toBe(false);
      expect(t.startsWith("ca")).toBe(true);
      expect(t.autoComplete("ca")).toEqual(["car", "card", "cat"]);
      t.delete("car");
      expect(t.search("car")).toBe(false);
      expect(t.search("card")).toBe(true);
    });
  });
}
import { Trie } from "./trie";

const trie = new Trie();
["hello", "helium", "helicopter", "her"].forEach(w => trie.insert(w));

console.log(trie.autoComplete("he")); // [ 'helicopter', 'helium', 'hello' ]
console.log(trie.getAllWords());      // [ 'helicopter', 'helium', 'hello', 'her' ]
