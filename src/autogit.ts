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
      children: new Map(),
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
    
    // Collect all words from this node
    const words: string[] = [];
    this.collectWords(currentNode, prefix, words);
    
    return words;
  }

  private collectWords(node: TrieNode, currentWord: string, words: string[]): void {
    if (node.isEndOfWord) {
      words.push(currentWord);
    }
    
    for (const [char, childNode] of node.children) {
      this.collectWords(childNode, currentWord + char, words);
    }
  }

  // Delete a word from the trie
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

  // Clear the entire trie
  clear(): void {
    this.root = this.createNode();
  }
}
// Create a new trie
const trie = new Trie();

// Insert words
trie.insert("apple");
trie.insert("app");
trie.insert("application");
trie.insert("banana");
trie.insert("bat");

// Search for words
console.log(trie.search("apple")); // true
console.log(trie.search("app"));   // true
console.log(trie.search("appl"));  // false

// Check prefixes
console.log(trie.startsWith("app")); // true
console.log(trie.startsWith("ba"));  // true

// Get words with prefix
console.log(trie.getWordsWithPrefix("app")); 
// ["app", "apple", "application"]

// Delete a word
trie.delete("app");
console.log(trie.search("app"));     // false
console.log(trie.search("apple"));   // true

// Get word count
console.log(trie.getWordCount()); // 4
interface ValueTrieNode<T> {
  children: Map<string, ValueTrieNode<T>>;
  value: T | null;
  isEndOfWord: boolean;
}

class ValueTrie<T> {
  private root: ValueTrieNode<T>;

  constructor() {
    this.root = this.createNode();
  }

  private createNode(): ValueTrieNode<T> {
    return {
      children: new Map(),
      value: null,
      isEndOfWord: false
    };
  }

  insert(word: string, value: T): void {
    let currentNode = this.root;
    
    for (const char of word) {
      if (!currentNode.children.has(char)) {
        currentNode.children.set(char, this.createNode());
      }
      currentNode = currentNode.children.get(char)!;
    }
    
    currentNode.isEndOfWord = true;
    currentNode.value = value;
  }

  getValue(word: string): T | null {
    let currentNode = this.root;
    
    for (const char of word) {
      if (!currentNode.children.has(char)) {
        return null;
      }
      currentNode = currentNode.children.get(char)!;
    }
    
    return currentNode.isEndOfWord ? currentNode.value : null;
  }

  // Other methods similar to basic Trie...
}
