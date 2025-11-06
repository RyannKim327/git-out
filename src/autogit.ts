interface TrieNode {
  children: Map<string, TrieNode>;
  isEndOfWord: boolean;
}

class Trie {
  private root: TrieNode;

  constructor() {
    this.root = this.createNode();
  }

  private createNode(): TrieNode {
    return {
      children: new Map<string, TrieNode>(),
      isEndOfWord: false
    };
  }

  // Insert a word into the trie
  insert(word: string): void {
    let currentNode = this.root;
    
    for (const char of word) {
      if (!currentNode.children.has(char)) {
        currentNode.children.set(char, this.createNode());
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
    
    // Traverse to the prefix node
    for (const char of prefix) {
      if (!currentNode.children.has(char)) {
        return [];
      }
      currentNode = currentNode.children.get(char)!;
    }
    
    return this.collectWords(currentNode, prefix);
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

  // Delete a word from the trie
  delete(word: string): boolean {
    return this.deleteRecursive(this.root, word, 0);
  }

  private deleteRecursive(node: TrieNode, word: string, index: number): boolean {
    if (index === word.length) {
      if (!node.isEndOfWord) return false;
      node.isEndOfWord = false;
      return node.children.size === 0;
    }

    const char = word[index];
    const childNode = node.children.get(char);
    
    if (!childNode) return false;
    
    const shouldDeleteChild = this.deleteRecursive(childNode, word, index + 1);
    
    if (shouldDeleteChild) {
      node.children.delete(char);
      return node.children.size === 0 && !node.isEndOfWord;
    }
    
    return false;
  }
}
// Create and use the trie
const trie = new Trie();

// Insert words
trie.insert("apple");
trie.insert("app");
trie.insert("application");
trie.insert("banana");

// Search for words
console.log(trie.search("apple"));    // true
console.log(trie.search("app"));      // true
console.log(trie.search("appl"));     // false (not a complete word)

// Check prefixes
console.log(trie.startsWith("app"));  // true
console.log(trie.startsWith("ban"));  // true

// Get words with prefix
console.log(trie.getWordsWithPrefix("app")); 
// ["app", "apple", "application"]

// Delete a word
trie.delete("app");
console.log(trie.search("app"));      // false
console.log(trie.search("apple"));    // true (still exists)
interface EnhancedTrieNode extends TrieNode {
  parent?: EnhancedTrieNode;
  char?: string;
  frequency?: number; // For word frequency tracking
}

class EnhancedTrie extends Trie {
  private root: EnhancedTrieNode;

  constructor() {
    super();
    this.root = this.createEnhancedNode();
  }

  private createEnhancedNode(char?: string, parent?: EnhancedTrieNode): EnhancedTrieNode {
    return {
      children: new Map<string, EnhancedTrieNode>(),
      isEndOfWord: false,
      char,
      parent,
      frequency: 0
    };
  }

  insert(word: string, frequency: number = 1): void {
    let currentNode = this.root;
    
    for (const char of word) {
      if (!currentNode.children.has(char)) {
        currentNode.children.set(char, this.createEnhancedNode(char, currentNode));
      }
      currentNode = currentNode.children.get(char)!;
    }
    
    currentNode.isEndOfWord = true;
    currentNode.frequency = (currentNode.frequency || 0) + frequency;
  }

  // Get word frequency
  getFrequency(word: string): number {
    let currentNode = this.root;
    
    for (const char of word) {
      if (!currentNode.children.has(char)) {
        return 0;
      }
      currentNode = currentNode.children.get(char)!;
    }
    
    return currentNode.isEndOfWord ? currentNode.frequency! : 0;
  }

  // Get all words sorted by frequency
  getWordsByFrequency(prefix: string = ""): string[] {
    let currentNode = this.root;
    
    for (const char of prefix) {
      if (!currentNode.children.has(char)) {
        return [];
      }
      currentNode = currentNode.children.get(char)!;
    }
    
    const wordsWithFreq = this.collectWordsWithFrequency(currentNode, prefix);
    return wordsWithFreq
      .sort((a, b) => b.frequency - a.frequency)
      .map(item => item.word);
  }

  private collectWordsWithFrequency(node: EnhancedTrieNode, prefix: string): {word: string, frequency: number}[] {
    const results: {word: string, frequency: number}[] = [];
    
    if (node.isEndOfWord) {
      results.push({ word: prefix, frequency: node.frequency! });
    }
    
    for (const [char, childNode] of node.children) {
      results.push(...this.collectWordsWithFrequency(childNode, prefix + char));
    }
    
    return results;
  }
}
