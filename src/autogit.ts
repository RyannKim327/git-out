class TrieNode {
  children: Map<string, TrieNode>;
  isEndOfWord: boolean;

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

  // Search for an exact word
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
}
interface TrieNode {
  children: Map<string, TrieNode>;
  isEndOfWord: boolean;
  wordCount: number; // Tracks how many times this word was inserted
}

class EnhancedTrie {
  private root: TrieNode;
  private totalWords: number;

  constructor() {
    this.root = this.createNode();
    this.totalWords = 0;
  }

  private createNode(): TrieNode {
    return {
      children: new Map(),
      isEndOfWord: false,
      wordCount: 0
    };
  }

  insert(word: string): void {
    let currentNode = this.root;
    
    for (const char of word) {
      if (!currentNode.children.has(char)) {
        currentNode.children.set(char, this.createNode());
      }
      currentNode = currentNode.children.get(char)!;
    }
    
    if (!currentNode.isEndOfWord) {
      this.totalWords++;
    }
    
    currentNode.isEndOfWord = true;
    currentNode.wordCount++;
  }

  search(word: string): boolean {
    const node = this.traverse(word);
    return node ? node.isEndOfWord : false;
  }

  startsWith(prefix: string): boolean {
    return this.traverse(prefix) !== null;
  }

  // Get all words with a given prefix
  getWordsWithPrefix(prefix: string): string[] {
    const results: string[] = [];
    const prefixNode = this.traverse(prefix);
    
    if (prefixNode) {
      this.collectWords(prefixNode, prefix, results);
    }
    
    return results;
  }

  // Delete a word from the trie
  delete(word: string): boolean {
    return this.deleteRecursive(this.root, word, 0);
  }

  // Get total number of unique words
  getTotalWords(): number {
    return this.totalWords;
  }

  // Get word frequency
  getWordCount(word: string): number {
    const node = this.traverse(word);
    return node && node.isEndOfWord ? node.wordCount : 0;
  }

  private traverse(word: string): TrieNode | null {
    let currentNode = this.root;
    
    for (const char of word) {
      if (!currentNode.children.has(char)) {
        return null;
      }
      currentNode = currentNode.children.get(char)!;
    }
    
    return currentNode;
  }

  private collectWords(node: TrieNode, currentWord: string, results: string[]): void {
    if (node.isEndOfWord) {
      results.push(currentWord);
    }
    
    for (const [char, childNode] of node.children) {
      this.collectWords(childNode, currentWord + char, results);
    }
  }

  private deleteRecursive(node: TrieNode, word: string, index: number): boolean {
    if (index === word.length) {
      if (!node.isEndOfWord) {
        return false; // Word doesn't exist
      }
      
      node.isEndOfWord = false;
      node.wordCount = 0;
      this.totalWords--;
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
}
// Basic Trie usage
const basicTrie = new Trie();
basicTrie.insert("apple");
basicTrie.insert("app");
basicTrie.insert("banana");

console.log(basicTrie.search("apple")); // true
console.log(basicTrie.search("app"));   // true
console.log(basicTrie.search("ap"));    // false
console.log(basicTrie.startsWith("ap")); // true

// Enhanced Trie usage
const enhancedTrie = new EnhancedTrie();
enhancedTrie.insert("cat");
enhancedTrie.insert("category");
enhancedTrie.insert("caterpillar");
enhancedTrie.insert("cat"); // Insert duplicate

console.log(enhancedTrie.getWordsWithPrefix("cat")); 
// ["cat", "category", "caterpillar"]

console.log(enhancedTrie.getWordCount("cat")); // 2
console.log(enhancedTrie.getTotalWords()); // 3 (unique words)

enhancedTrie.delete("category");
console.log(enhancedTrie.search("category")); // false
class GenericTrie<T> {
  private root: TrieNode<T>;

  constructor() {
    this.root = new TrieNode<T>();
  }

  insert(key: string, value: T): void {
    let currentNode = this.root;
    
    for (const char of key) {
      if (!currentNode.children.has(char)) {
        currentNode.children.set(char, new TrieNode<T>());
      }
      currentNode = currentNode.children.get(char)!;
    }
    
    currentNode.isEndOfWord = true;
    currentNode.values.push(value);
  }

  search(key: string): T[] {
    const node = this.traverse(key);
    return node && node.isEndOfWord ? node.values : [];
  }

  private traverse(key: string): TrieNode<T> | null {
    let currentNode = this.root;
    
    for (const char of key) {
      if (!currentNode.children.has(char)) {
        return null;
      }
      currentNode = currentNode.children.get(char)!;
    }
    
    return currentNode;
  }
}

class TrieNode<T> {
  children: Map<string, TrieNode<T>>;
  isEndOfWord: boolean;
  values: T[];

  constructor() {
    this.children = new Map();
    this.isEndOfWord = false;
    this.values = [];
  }
}
