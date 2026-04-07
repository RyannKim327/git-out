// ──────────────────────────────────────────────────────────────
//  TrieNode
// ──────────────────────────────────────────────────────────────
class TrieNode {
  // how many words end exactly here
  frequency = 0;
  // children keyed by single characters
  children = new Map<string, TrieNode>();
}

// ──────────────────────────────────────────────────────────────
//  Trie
// ──────────────────────────────────────────────────────────────
export class Trie {
  private readonly root = new TrieNode();

  //--------------------------------------
  // Insert a word, optionally incrementing frequency
  // -------------------------------------
  insert(word: string, qty = 1): void {
    let node = this.root;
    for (const ch of word) {
      // lazily create missing branch
      if (!node.children.has(ch))
        node.children.set(ch, new TrieNode());
      node = node.children.get(ch)!;
    }
    node.frequency += qty;
  }

  //--------------------------------------
  // Search for exact match – returns how many times the word was inserted
  // -------------------------------------
  search(word: string): number {
    let node = this.root;
    for (const ch of word) {
      node = node.children.get(ch);
      if (!node) return 0; // missing branch
    }
    return node.frequency;
  }

  //--------------------------------------
  // Delete a word (or reduce its count)
  // -------------------------------------
  delete(word: string, qty = 1): boolean {
    const stack: TrieNode[] = []; // keep path for backtracking
    let node = this.root;

    for (const ch of word) {
      const next = node.children.get(ch);
      if (!next) return false; // word never existed
      stack.push(node);
      node = next;
    }

    if (node.frequency === 0) return false; // nothing to delete
    node.frequency -= qty;
    if (node.frequency < 0) node.frequency = 0; // guard

    // prune dead branches
    let idx = stack.length - 1;
    while (idx >= 0 && node.children.size === 0 && node.frequency === 0) {
      const parent = stack[idx];
      const ch = Array.from(parent.children.entries()).find(
        ([, child]) => child === node
      )![0];
      parent.children.delete(ch);
      node = parent;
      idx--;
    }
    return true;
  }

  //--------------------------------------
  // Return all words that start with a prefix
  // -------------------------------------
  startsWith(prefix: string): string[] {
    let node = this.root;

    for (const ch of prefix) {
      node = node.children.get(ch);
      if (!node) return []; // no match
    }

    const results: string[] = [];
    const dfs = (n: TrieNode, cur: string) => {
      if (n.frequency > 0) results.push(cur);

      for (const [ch, child] of n.children) {
        dfs(child, cur + ch);
      }
    };

    dfs(node, prefix);
    return results;
  }

  //--------------------------------------
  // Return the top‑k words by frequency that match a prefix
  // Useful for autocomplete suggestions
  // -------------------------------------
  topK(prefix: string, k = 5): { word: string; freq: number }[] {
    let node = this.root;
    for (const ch of prefix) {
      node = node.children.get(ch);
      if (!node) return [];
    }

    const heap: Array<{ word: string; freq: number }> = [];

    const dfs = (n: TrieNode, cur: string) => {
      if (n.frequency > 0) {
        heap.push({ word: cur, freq: n.frequency });
        // keep only the largest k entries
        heap.sort((a, b) => b.freq - a.freq);
        if (heap.length > k) heap.pop();
      }

      for (const [ch, child] of n.children) {
        dfs(child, cur + ch);
      }
    };

    dfs(node, prefix);
    return heap;
  }
}
import { Trie } from "./trie";

const t = new Trie();

t.insert("apple");
t.insert("app");
t.insert("application", 3); // appears 3 times
t.insert("bat");
t.insert("batch");
t.insert("baton");

console.log(t.search("app"));          // 1
console.log(t.search("application"));  // 3
console.log(t.search("banana"));       // 0

console.log(t.startsWith("app"));      // ["app", "apple", "application"]
console.log(t.topK("app", 2));         // [{word:"application",freq:3},{word:"app",freq:1}]

t.delete("application", 2);            // reduce count, still 1 left
console.log(t.search("application"));  // 1

t.delete("baton");                     // remove completely
console.log(t.startsWith("bat"));      // ["bat", "batch"]
