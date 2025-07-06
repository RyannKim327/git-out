// Define the TrieNode class
class TrieNode {
    public children: Map<string, TrieNode>;
    public isEndOfWord: boolean;

    constructor() {
        this.children = new Map();
        this.isEndOfWord = false;
    }
}

// Define the Trie class
class Trie {
    private root: TrieNode;

    constructor() {
        this.root = new TrieNode();
    }

    // Method to insert a word into the trie
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

    // Method to search for a complete word
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

    // Optional: method to check if any word starts with a prefix
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

// Usage example:
const trie = new Trie();
trie.insert("apple");
trie.insert("app");
console.log(trie.search("app"));      // true
console.log(trie.search("apple"));    // true
console.log(trie.search("apples"));   // false
console.log(trie.startsWith("app"));  // true
