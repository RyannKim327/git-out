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
      isEndOfWord: false,
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

  // Search for a word in the trie
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
    const words: string[] = [];
    
    // Navigate to the prefix node
    for (const char of prefix) {
      if (!currentNode.children.has(char)) {
        return words; // Prefix doesn't exist
      }
      currentNode = currentNode.children.get(char)!;
    }
    
    // Collect all words starting from this node
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
        return false; // Word doesn't exist
      }
      node.isEndOfWord = false;
      return node.children.size === 0; // Return true if node has no children
    }

    const char = word[index];
    if (!node.children.has(char)) {
      return false; // Word doesn't exist
    }

    const childNode = node.children.get(char)!;
    const shouldDeleteChild = this.deleteRecursive(childNode, word, index + 1);

    if (shouldDeleteChild) {
      node.children.delete(char);
      return node.children.size === 0 && !node.isEndOfWord;
    }

    return false;
  }

  // Get the total number of words in the trie
  get size(): number {
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
}
interface TrieNodeWithValue<T> {
  children: Map<string, TrieNodeWithValue<T>>;
  isEndOfWord: boolean;
  value?: T;
}

class TrieWithValue<T> {
  private root: TrieNodeWithValue<T>;

  constructor() {
    this.root = this.createNode();
  }

  private createNode(): TrieNodeWithValue<T> {
    return {
      children: new Map(),
      isEndOfWord: false,
    };
  }

  // Insert a word with an optional value
  insert(word: string, value?: T): void {
    let currentNode = this.root;
    
    for (const char of word) {
      if (!currentNode.children.has(char)) {
        currentNode.children.set(char, this.createNode());
      }
      currentNode = currentNode.children.get(char)!;
    }
    
    currentNode.isEndOfWord = true;
    if (value !== undefined) {
      currentNode.value = value;
    }
  }

  // Get the value associated with a word
  getValue(word: string): T | undefined {
    let currentNode = this.root;
    
    for (const char of word) {
      if (!currentNode.children.has(char)) {
        return undefined;
      }
      currentNode = currentNode.children.get(char)!;
    }
    
    return currentNode.isEndOfWord ? currentNode.value : undefined;
  }

  // Get all words with their values
  getAllWordsWithValues(): Array<{ word: string; value?: T }> {
    const result: Array<{ word: string; value?: T }> = [];
    this.collectWordsWithValues(this.root, '', result);
    return result;
  }

  private collectWordsWithValues(
    node: TrieNodeWithValue<T>, 
    currentWord: string, 
    result: Array<{ word: string; value?: T }>
  ): void {
    if (node.isEndOfWord) {
      result.push({ word: currentWord, value: node.value });
    }
    
    for (const [char, childNode] of node.children) {
      this.collectWordsWithValues(childNode, currentWord + char, result);
    }
  }
}
// Basic Trie usage
const trie = new Trie();

trie.insert("apple");
trie.insert("app");
trie.insert("application");
trie.insert("banana");

console.log(trie.search("apple")); // true
console.log(trie.search("app")); // true
console.log(trie.search("appl")); // false
console.log(trie.startsWith("app")); // true

console.log(trie.getWordsWithPrefix("app")); // ["app", "apple", "application"]

trie.delete("app");
console.log(trie.search("app")); // false
console.log(trie.search("apple")); // true

// Trie with values
const dictionary = new TrieWithValue<string>();

dictionary.insert("apple", "A fruit");
dictionary.insert("application", "A software program");
dictionary.insert("banana", "Another fruit");

console.log(dictionary.getValue("apple")); // "A fruit"
console.log(dictionary.getAllWordsWithValues());
// [
//   { word: "apple", value: "A fruit" },
//   { word: "application", value: "A software program" },
//   { word: "banana", value: "Another fruit" }
// ]
