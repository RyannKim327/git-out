interface TrieNode {
  children: Record<string, TrieNode>;
  isEnd: boolean;
}

class Trie {
  private root: TrieNode;

  constructor() {
    this.root = this.createNode();
  }

  // Create a new empty node
  private createNode(): TrieNode {
    return {
      children: {},
      isEnd: false
    };
  }

  /**
   * Inserts a word into the trie
   * @param word - The word to insert
   */
  insert(word: string): void {
    let node = this.root;
    for (const char of word) {
      if (!node.children[char]) {
        node.children[char] = this.createNode();
      }
      node = node.children[char];
    }
    node.isEnd = true;
  }

  /**
   * Searches for an exact word in the trie
   * @param word - The word to search
   * @returns True if the word exists in the trie, false otherwise
   */
  search(word: string): boolean {
    let node = this.root;
    for (const char of word) {
      if (!node.children[char]) {
        return false;
      }
      node = node.children[char];
    }
    return node.isEnd;
  }

  /**
   * Checks if any word in the trie starts with the given prefix
   * @param prefix - The prefix to check
   * @returns True if the prefix exists in the trie, false otherwise
   */
  startsWith(prefix: string): boolean {
    let node = this.root;
    for (const char of prefix) {
      if (!node.children[char]) {
        return false;
      }
      node = node.children[char];
    }
    return true;
  }

  /**
   * OPTIONAL: Deletes a word from the trie
   * @param word - The word to delete
   * @returns True if the word was found and deleted, false otherwise
   */
  delete(word: string): boolean {
    if (!this.search(word)) return false;
    
    let node = this.root;
    const stack: { node: TrieNode; char: string }[] = [];
    
    // Find the path to the last character
    for (const char of word) {
      stack.push({ node, char });
      node = node.children[char];
    }
    
    node.isEnd = false;
    
    // Remove unnecessary nodes from bottom up
    while (stack.length > 0) {
      const { node, char } = stack.pop()!;
      const current = node.children[char];
      
      if (current.isEnd || Object.keys(current.children).length > 0) {
        break;
      } else {
        delete node.children[char];
      }
    }
    
    return true;
  }
}
const trie = new Trie();

trie.insert("apple");
console.log(trie.search("apple"));  // true
console.log(trie.search("app"));    // false
console.log(trie.startsWith("app"));// true

trie.insert("app");
console.log(trie.search("app"));    // true

trie.delete("apple");
console.log(trie.search("apple"));  // false
console.log(trie.startsWith("app"));// true (still contains "app")
