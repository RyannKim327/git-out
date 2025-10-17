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

  // Check if the trie is empty
  isEmpty(): boolean {
    return this.root.children.size === 0;
  }

  // Clear all words from the trie
  clear(): void {
    this.root = new TrieNode();
  }
}
interface TrieNodeWithFrequency extends TrieNode {
  frequency?: number;
}

class EnhancedTrie extends Trie {
  private frequencyMap: Map<string, number>;

  constructor() {
    super();
    this.frequencyMap = new Map();
  }

  // Insert with frequency tracking
  insert(word: string, frequency: number = 1): void {
    super.insert(word);
    this.frequencyMap.set(word, frequency);
  }

  // Get autocomplete suggestions sorted by frequency
  getAutocompleteSuggestions(prefix: string, limit: number = 10): string[] {
    const words = this.getWordsWithPrefix(prefix);
    
    return words
      .sort((a, b) => {
        const freqA = this.frequencyMap.get(a) || 0;
        const freqB = this.frequencyMap.get(b) || 0;
        return freqB - freqA; // Descending order by frequency
      })
      .slice(0, limit);
  }

  // Increment frequency when a word is used
  incrementFrequency(word: string): void {
    const current = this.frequencyMap.get(word) || 0;
    this.frequencyMap.set(word, current + 1);
  }

  // Get frequency of a word
  getFrequency(word: string): number {
    return this.frequencyMap.get(word) || 0;
  }
}
// Basic usage
const trie = new Trie();

// Insert words
trie.insert("apple");
trie.insert("app");
trie.insert("application");
trie.insert("banana");
trie.insert("bat");

// Search operations
console.log(trie.search("apple")); // true
console.log(trie.search("app")); // true
console.log(trie.search("appl")); // false

// Prefix search
console.log(trie.startsWith("app")); // true
console.log(trie.startsWith("bat")); // true

// Get all words with prefix
console.log(trie.getWordsWithPrefix("app")); 
// ["app", "apple", "application"]

// Enhanced trie usage
const enhancedTrie = new EnhancedTrie();
enhancedTrie.insert("typescript", 10);
enhancedTrie.insert("types", 5);
enhancedTrie.insert("type", 3);

enhancedTrie.incrementFrequency("typescript");

console.log(enhancedTrie.getAutocompleteSuggestions("type", 5));
// ["typescript", "types", "type"]

// Delete operation
console.log(trie.search("bat")); // true
trie.delete("bat");
console.log(trie.search("bat")); // false
