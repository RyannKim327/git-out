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

  // Check if any word starts with the prefix
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

  // Get all words with a given prefix
  getWordsWithPrefix(prefix: string): string[] {
    let currentNode = this.root;
    const results: string[] = [];
    
    // Navigate to the prefix node
    for (const char of prefix) {
      if (!currentNode.children.has(char)) {
        return results; // No words with this prefix
      }
      currentNode = currentNode.children.get(char)!;
    }
    
    // Collect all words from this node
    this.collectWords(currentNode, prefix, results);
    return results;
  }

  private collectWords(node: TrieNode, currentWord: string, results: string[]): void {
    if (node.isEndOfWord) {
      results.push(currentWord);
    }
    
    for (const [char, childNode] of node.children) {
      this.collectWords(childNode, currentWord + char, results);
    }
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
      return node.children.size === 0;
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

  private normalizeWord(word: string): string {
    return this.caseSensitive ? word : word.toLowerCase();
  }

  insert(word: string): void {
    const normalizedWord = this.normalizeWord(word);
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
    const normalizedWord = this.normalizeWord(word);
    let currentNode = this.root;
    
    for (const char of normalizedWord) {
      if (!currentNode.children.has(char)) {
        return false;
      }
      currentNode = currentNode.children.get(char)!;
    }
    
    return currentNode.isEndOfWord;
  }

  // Count total words in the trie
  countWords(): number {
    return this.countWordsRecursive(this.root);
  }

  private countWordsRecursive(node: TrieNode): number {
    let count = node.isEndOfWord ? 1 : 0;
    
    for (const child of node.children.values()) {
      count += this.countWordsRecursive(child);
    }
    
    return count;
  }

  // Get all words in the trie
  getAllWords(): string[] {
    const words: string[] = [];
    this.collectWords(this.root, '', words);
    return words;
  }

  private collectWords(node: TrieNode, currentWord: string, results: string[]): void {
    if (node.isEndOfWord) {
      results.push(currentWord);
    }
    
    for (const [char, childNode] of node.children) {
      this.collectWords(childNode, currentWord + char, results);
    }
  }
}
// Basic usage
const trie = new Trie();

// Insert words
trie.insert("apple");
trie.insert("app");
trie.insert("application");
trie.insert("banana");

// Search for words
console.log(trie.search("apple")); // true
console.log(trie.search("app")); // true
console.log(trie.search("appl")); // false

// Check prefixes
console.log(trie.startsWith("app")); // true
console.log(trie.startsWith("ban")); // true

// Get words with prefix
console.log(trie.getWordsWithPrefix("app")); 
// ["app", "apple", "application"]

// Delete a word
trie.delete("app");
console.log(trie.search("app")); // false
console.log(trie.search("apple")); // true

// Enhanced trie usage
const enhancedTrie = new EnhancedTrie({ caseSensitive: false });
enhancedTrie.insert("TypeScript");
enhancedTrie.insert("typescript");

console.log(enhancedTrie.search("TYPESCRIPT")); // true (case insensitive)
console.log(enhancedTrie.getAllWords()); // ["typescript"]
console.log(enhancedTrie.countWords()); // 1 (duplicates not counted)
class AutocompleteSystem {
  private trie: Trie;

  constructor() {
    this.trie = new Trie();
  }

  addWords(words: string[]): void {
    for (const word of words) {
      this.trie.insert(word);
    }
  }

  suggest(prefix: string): string[] {
    return this.trie.getWordsWithPrefix(prefix);
  }

  // With ranking based on usage frequency
  suggestWithRanking(prefix: string, limit: number = 5): string[] {
    const suggestions = this.trie.getWordsWithPrefix(prefix);
    // In a real implementation, you'd rank by frequency
    return suggestions.slice(0, limit);
  }
}

// Usage
const autocomplete = new AutocompleteSystem();
autocomplete.addWords(["apple", "application", "appetizer", "banana", "band", "bandwidth"]);

console.log(autocomplete.suggest("app"));
// ["apple", "application", "appetizer"]

console.log(autocomplete.suggestWithRanking("ban", 2));
// ["banana", "band"]
