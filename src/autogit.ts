class TrieNode<T> {
  children: Map<string, TrieNode<T>>;
  isEndOfWord: boolean;
  value: T | null;

  constructor() {
    this.children = new Map();
    this.isEndOfWord = false;
    this.value = null;
  }
}

class Trie<T = any> {
  private root: TrieNode<T>;

  constructor() {
    this.root = new TrieNode<T>();
  }

  // Insert a word into the trie
  insert(word: string, value?: T): void {
    let current = this.root;
    
    for (const char of word.toLowerCase()) {
      if (!current.children.has(char)) {
        current.children.set(char, new TrieNode<T>());
      }
      current = current.children.get(char)!;
    }
    
    current.isEndOfWord = true;
    if (value !== undefined) {
      current.value = value;
    }
  }

  // Search for a word in the trie
  search(word: string): boolean {
    const node = this.traverse(word);
    return node !== null && node.isEndOfWord;
  }

  // Get the value associated with a word
  getValue(word: string): T | null {
    const node = this.traverse(word);
    return node?.value || null;
  }

  // Check if any word starts with the given prefix
  startsWith(prefix: string): boolean {
    return this.traverse(prefix) !== null;
  }

  // Get all words with the given prefix
  getWordsWithPrefix(prefix: string): string[] {
    const results: string[] = [];
    const node = this.traverse(prefix.toLowerCase());
    
    if (node) {
      this.collectWords(node, prefix, results);
    }
    
    return results;
  }

  // Delete a word from the trie
  delete(word: string): boolean {
    return this.deleteRecursive(this.root, word.toLowerCase(), 0);
  }

  // Get all words in the trie
  getAllWords(): string[] {
    const results: string[][];
    this.collectWords(this.root, "", results);
    return results;
  }

  // Private helper methods
  private traverse(word: string): TrieNode<T> | null {
    let current = this.root;
    
    for (const char of word.toLowerCase()) {
      if (!current.children.has(char)) {
        return null;
      }
      current = current.children.get(char)!;
    }
    
    return current;
  }

  private collectWords(node: TrieNode<T>, currentWord: string, results: string[]): void {
    if (node.isEndOfWord) {
      results.push(currentWord);
    }
    
    for (const [char, childNode] of node.children) {
      this.collectWords(childNode, currentWord + char, results);
    }
  }

  private deleteRecursive(node: TrieNode<T>, word: string, index: number): boolean {
    if (index === word.length) {
      if (!node.isEndOfWord) {
        return false; // Word doesn't exist
      }
      
      node.isEndOfWord = false;
      node.value = null;
      return node.children.size === 0; // Return true if no children
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
interface SearchResult<T> {
  word: string;
  value: T | null;
}

class EnhancedTrie<T = any> extends Trie<T> {
  // Get autocomplete suggestions with values
  autocomplete(prefix: string, limit: number = 10): SearchResult<T>[] {
    const results: SearchResult<T>[] = [];
    const node = this.traverse(prefix.toLowerCase());
    
    if (node) {
      this.collectWordsWithValues(node, prefix, results, limit);
    }
    
    return results;
  }

  // Find words by pattern (supports wildcard)
  searchByPattern(pattern: string): string[] {
    const results: string[] = [];
    this.patternSearch(this.root, "", pattern.toLowerCase(), 0, results);
    return results;
  }

  // Get the longest common prefix
  getLongestCommonPrefix(): string {
    let current = this.root;
    let prefix = "";
    
    while (current.children.size === 1 && !current.isEndOfWord) {
      const [char, childNode] = Array.from(current.children.entries())[0];
      prefix += char;
      current = childNode;
    }
    
    return prefix;
  }

  // Get word count
  getWordCount(): number {
    return this.countWords(this.root);
  }

  // Private helper methods
  private collectWordsWithValues(
    node: TrieNode<T>, 
    currentWord: string, 
    results: SearchResult<T>[], 
    limit: number
  ): void {
    if (results.length >= limit) return;
    
    if (node.isEndOfWord) {
      results.push({
        word: currentWord,
        value: node.value
      });
    }
    
    for (const [char, childNode] of node.children) {
      if (results.length < limit) {
        this.collectWordsWithValues(childNode, currentWord + char, results, limit);
      }
    }
  }

  private patternSearch(
    node: TrieNode<T>, 
    currentWord: string, 
    pattern: string, 
    index: number, 
    results: string[]
  ): void {
    if (index === pattern.length) {
      if (node.isEndOfWord) {
        results.push(currentWord);
      }
      return;
    }
    
    const char = pattern[index];
    
    if (char === '?') { // Wildcard character
      for (const [childChar, childNode] of node.children) {
        this.patternSearch(childNode, currentWord + childChar, pattern, index + 1, results);
      }
    } else {
      const childNode = node.children.get(char);
      if (childNode) {
        this.patternSearch(childNode, currentWord + char, pattern, index + 1, results);
      }
    }
  }

  private countWords(node: TrieNode<T>): number {
    let count = node.isEndOfWord ? 1 : 0;
    
    for (const childNode of node.children.values()) {
      count += this.countWords(childNode);
    }
    
    return count;
  }
}
// Basic usage
const trie = new Trie<string>();

// Insert words
trie.insert("apple", "fruit");
trie.insert("app", "application");
trie.insert("banana", "fruit");
trie.insert("band", "music");

// Search operations
console.log(trie.search("apple")); // true
console.log(trie.search("app")); // true
console.log(trie.search("appl")); // false

// Prefix search
console.log(trie.startsWith("app")); // true
console.log(trie.getWordsWithPrefix("app")); // ["app", "apple"]

// Get values
console.log(trie.getValue("apple")); // "fruit"

// Enhanced trie usage
const enhancedTrie = new EnhancedTrie<number>();
enhancedTrie.insert("programming", 1);
enhancedTrie.insert("programmer", 2);
enhancedTrie.insert("progress", 3);
enhancedTrie.insert("project", 4);

console.log(enhancedTrie.autocomplete("prog", 3)); 
// [{ word: "programming", value: 1 }, { word: "programmer", value: 2 }, { word: "progress", value: 3 }]

console.log(enhancedTrie.searchByPattern("pro?ress")); // ["progress"]
console.log(enhancedTrie.getWordCount()); // 4
