interface TrieNode {
  children: Record<string, TrieNode>;
  isEndOfWord: boolean;
}

class Trie {
  private root: TrieNode;

  constructor() {
    this.root = this.createNode();
  }

  // Create a new Trie node
  private createNode(): TrieNode {
    return {
      children: {},
      isEndOfWord: false
    };
  }

  // Insert a word into the trie
  insert(word: string): void {
    let currentNode = this.root;
    for (const char of word) {
      if (!currentNode.children[char]) {
        currentNode.children[char] = this.createNode();
      }
      currentNode = currentNode.children[char];
    }
    currentNode.isEndOfWord = true;
  }

  // Search for a complete word in the trie
  search(word: string): boolean {
    let currentNode = this.root;
    for (const char of word) {
      if (!currentNode.children[char]) {
        return false;
      }
      currentNode = currentNode.children[char];
    }
    return currentNode.isEndOfWord;
  }

  // Check if any word in the trie starts with the given prefix
  startsWith(prefix: string): boolean {
    let currentNode = this.root;
    for (const char of prefix) {
      if (!currentNode.children[char]) {
        return false;
      }
      currentNode = currentNode.children[char];
    }
    return true;
  }
}
const trie = new Trie();

// Insert words
trie.insert("apple");
trie.insert("app");
trie.insert("banana");

// Search operations
console.log(trie.search("apple"));   // true
console.log(trie.search("app"));     // true
console.log(trie.search("appl"));    // false (not a complete word)
console.log(trie.search("orange"));  // false

// Prefix checks
console.log(trie.startsWith("app"));  // true
console.log(trie.startsWith("ban"));  // true
console.log(trie.startsWith("ora"));  // false
// In insert() and search() methods:
word = word.toLowerCase();
