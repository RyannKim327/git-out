class TrieNode {
  public children: Map<string, TrieNode>;
  public isEndOfWord: boolean;

  constructor() {
    this.children = new Map();
    this.isEndOfWord = false;
  }
}

class Trie {
  private root: TrieNode;

  constructor() {
    this.root = new TrieNode();
  }

  // Insert a word into the trie
  insert(word: string): void {
    let currentNode = this.root;
    
    for (const char of word) {
      if (!currentNode.children.has(char)) {
        currentNode.children.set(char, new TrieNode());
      }
      currentNode = currentNode.children.get(char)!;
    }
    
    currentNode.isEndOfWord = true;
  }

  // Search for a complete word
  search(word: string): boolean {
    let currentNode = this.root;
    
    for (const char of word) {
      if (!currentNode.children.has(char)) {
        return false;
      }
      currentNode = currentNode.children.get(char)!;
    }
    
    return currentNode.isEndOfWord;
  }

  // Check if any word starts with the given prefix
  startsWith(prefix: string): boolean {
    let currentNode = this.root;
    
    for (const char of prefix) {
      if (!currentNode.children.has(char)) {
        return false;
      }
      currentNode = currentNode.children.get(char)!;
    }
    
    return true;
  }

  // Get all words with the given prefix
  getWordsWithPrefix(prefix: string): string[] {
    let currentNode = this.root;
    
    // Navigate to the prefix node
    for (const char of prefix) {
      if (!currentNode.children.has(char)) {
        return [];
      }
      currentNode = currentNode.children.get(char)!;
    }
    
    return this.collectWords(currentNode, prefix);
  }

  // Helper method to collect all words from a node
  private collectWords(node: TrieNode, prefix: string): string[] {
    const words: string[] = [];
    
    if (node.isEndOfWord) {
      words.push(prefix);
    }
    
    for (const [char, childNode] of node.children) {
      words.push(...this.collectWords(childNode, prefix + char));
    }
    
    return words;
  }

  // Delete a word from the trie
  delete(word: string): boolean {
    return this.deleteRecursive(this.root, word, 0);
  }

  private deleteRecursive(node: TrieNode, word: string, index: number): boolean {
    if (index === word.length) {
      if (!node.isEndOfWord) {
        return false; // Word doesn't exist
      }
      node.isEndOfWord = false;
      return node.children.size === 0; // Return true if node has no children
    }

    const char = word[index];
    const childNode = node.children.get(char);
    
    if (!childNode) {
      return false; // Word doesn't exist
    }

    const shouldDeleteChild = this.deleteRecursive(childNode, word, index + 1);
    
    if (shouldDeleteChild) {
      node.children.delete(char);
      return node.children.size === 0 && !node.isEndOfWord;
    }
    
    return false;
  }

  // Get the total number of words in the trie
  getWordCount(): number {
    return this.countWords(this.root);
  }

  private countWords(node: TrieNode): number {
    let count = node.isEndOfWord ? 1 : 0;
    
    for (const childNode of node.children.values()) {
      count += this.countWords(childNode);
    }
    
    return count;
  }

  // Clear all words from the trie
  clear(): void {
    this.root = new TrieNode();
  }
}
interface TrieOptions {
  caseSensitive?: boolean;
}

class EnhancedTrie {
  private root: TrieNode;
  private caseSensitive: boolean;

  constructor(options: TrieOptions = {}) {
    this.root = new TrieNode();
    this.caseSensitive = options.caseSensitive || false;
  }

  private normalize(text: string): string {
    return this.caseSensitive ? text : text.toLowerCase();
  }

  insert(word: string): void {
    const normalizedWord = this.normalize(word);
    let currentNode = this.root;
    
    for (const char of normalizedWord) {
      if (!currentNode.children.has(char)) {
        currentNode.children.set(char, new TrieNode());
      }
      currentNode = currentNode.children.get(char)!;
    }
    
    currentNode.isEndOfWord = true;
  }

  search(word: string): boolean {
    const normalizedWord = this.normalize(word);
    let currentNode = this.root;
    
    for (const char of normalizedWord) {
      if (!currentNode.children.has(char)) {
        return false;
      }
      currentNode = currentNode.children.get(char)!;
    }
    
    return currentNode.isEndOfWord;
  }

  startsWith(prefix: string): boolean {
    const normalizedPrefix = this.normalize(prefix);
    let currentNode = this.root;
    
    for (const char of normalizedPrefix) {
      if (!currentNode.children.has(char)) {
        return false;
      }
      currentNode = currentNode.children.get(char)!;
    }
    
    return true;
  }

  // Auto-complete suggestions with limit
  autocomplete(prefix: string, limit: number = 10): string[] {
    const normalizedPrefix = this.normalize(prefix);
    return this.getWordsWithPrefix(normalizedPrefix).slice(0, limit);
  }

  getWordsWithPrefix(prefix: string): string[] {
    const normalizedPrefix = this.normalize(prefix);
    let currentNode = this.root;
    
    for (const char of normalizedPrefix) {
      if (!currentNode.children.has(char)) {
        return [];
      }
      currentNode = currentNode.children.get(char)!;
    }
    
    return this.collectWords(currentNode, normalizedPrefix);
  }

  private collectWords(node: TrieNode, prefix: string): string[] {
    const words: string[] = [];
    
    if (node.isEndOfWord) {
      words.push(prefix);
    }
    
    for (const [char, childNode] of node.children) {
      words.push(...this.collectWords(childNode, prefix + char));
    }
    
    return words;
  }
}
// Basic usage
const trie = new Trie();

// Insert words
trie.insert("apple");
trie.insert("app");
trie.insert("application");
trie.insert("banana");
trie.insert("band");

// Search operations
console.log(trie.search("app")); // true
console.log(trie.search("apple")); // true
console.log(trie.search("appl")); // false

// Prefix search
console.log(trie.startsWith("app")); // true
console.log(trie.startsWith("ban")); // true
console.log(trie.startsWith("cat")); // false

// Get words with prefix
console.log(trie.getWordsWithPrefix("app"));
// ["app", "apple", "application"]

console.log(trie.getWordsWithPrefix("ban"));
// ["banana", "band"]

// Delete word
trie.delete("app");
console.log(trie.search("app")); // false
console.log(trie.search("apple")); // true

// Word count
console.log(trie.getWordCount()); // 4

// Enhanced trie with case insensitivity
const enhancedTrie = new EnhancedTrie({ caseSensitive: false });

enhancedTrie.insert("Hello");
enhancedTrie.insert("WORLD");

console.log(enhancedTrie.search("hello")); // true
console.log(enhancedTrie.search("world")); // true

// Auto-complete
enhancedTrie.insert("hello");
enhancedTrie.insert("hell");
enhancedTrie.insert("help");
enhancedTrie.insert("helium");

console.log(enhancedTrie.autocomplete("hel", 3));
// ["hel", "hell", "hello"]
