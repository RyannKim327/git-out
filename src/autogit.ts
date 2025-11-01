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

  // Delete a word from the trie (optional)
  delete(word: string): boolean {
    return this.deleteRecursive(this.root, word, 0);
  }

  private deleteRecursive(node: TrieNode, word: string, index: number): boolean {
    if (index === word.length) {
      if (!node.isEndOfWord) {
        return false;
      }
      node.isEndOfWord = false;
      return node.children.size === 0;
    }

    const char = word[index];
    const childNode = node.children.get(char);
    
    if (!childNode) {
      return false;
    }

    const shouldDeleteChild = this.deleteRecursive(childNode, word, index + 1);

    if (shouldDeleteChild) {
      node.children.delete(char);
      return node.children.size === 0 && !node.isEndOfWord;
    }

    return false;
  }

  // Get all words in the trie (optional)
  getAllWords(): string[] {
    const words: string[] = [];
    this.collectWords(this.root, "", words);
    return words;
  }

  private collectWords(node: TrieNode, prefix: string, words: string[]): void {
    if (node.isEndOfWord) {
      words.push(prefix);
    }

    for (const [char, childNode] of node.children) {
      this.collectWords(childNode, prefix + char, words);
    }
  }

  // Get words with a given prefix (optional)
  getWordsWithPrefix(prefix: string): string[] {
    let currentNode = this.root;
    const words: string[] = [];
    
    // Traverse to the prefix node
    for (const char of prefix) {
      if (!currentNode.children.has(char)) {
        return words; // No words with this prefix
      }
      currentNode = currentNode.children.get(char)!;
    }
    
    // Collect all words from this node
    this.collectWords(currentNode, prefix, words);
    return words;
  }
}
// Create a new trie
const trie = new Trie();

// Insert words
trie.insert("apple");
trie.insert("app");
trie.insert("application");
trie.insert("banana");

// Search for words
console.log(trie.search("apple"));  // true
console.log(trie.search("app"));    // true
console.log(trie.search("appl"));   // false (not a complete word)

// Check prefixes
console.log(trie.startsWith("app")); // true
console.log(trie.startsWith("ban")); // true

// Get all words
console.log(trie.getAllWords()); 
// ["app", "apple", "application", "banana"]

// Get words with prefix
console.log(trie.getWordsWithPrefix("app"));
// ["app", "apple", "application"]

// Delete a word
trie.delete("app");
console.log(trie.search("app")); // false
console.log(trie.search("apple")); // true
interface TrieNode {
  children: Map<string, TrieNode>;
  isEndOfWord: boolean;
  frequency?: number;
}

class EnhancedTrie {
  private root: TrieNode;

  constructor() {
    this.root = { children: new Map(), isEndOfWord: false };
  }

  insert(word: string, frequency: number = 1): void {
    let currentNode = this.root;
    
    for (const char of word) {
      if (!currentNode.children.has(char)) {
        currentNode.children.set(char, { children: new Map(), isEndOfWord: false });
      }
      currentNode = currentNode.children.get(char)!;
    }
    
    currentNode.isEndOfWord = true;
    currentNode.frequency = (currentNode.frequency || 0) + frequency;
  }

  // Autocomplete with suggestions sorted by frequency
  autocomplete(prefix: string, limit: number = 5): string[] {
    let currentNode = this.root;
    
    // Navigate to the prefix node
    for (const char of prefix) {
      if (!currentNode.children.has(char)) {
        return [];
      }
      currentNode = currentNode.children.get(char)!;
    }
    
    // Collect words with their frequencies
    const suggestions: { word: string; frequency: number }[] = [];
    this.collectSuggestions(currentNode, prefix, suggestions);
    
    // Sort by frequency and return top results
    return suggestions
      .sort((a, b) => b.frequency - a.frequency)
      .slice(0, limit)
      .map(item => item.word);
  }

  private collectSuggestions(
    node: TrieNode, 
    currentWord: string, 
    suggestions: { word: string; frequency: number }[]
  ): void {
    if (node.isEndOfWord && node.frequency) {
      suggestions.push({ word: currentWord, frequency: node.frequency });
    }
    
    for (const [char, childNode] of node.children) {
      this.collectSuggestions(childNode, currentWord + char, suggestions);
    }
  }
}
