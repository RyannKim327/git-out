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

    // Search for a complete word in the trie
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

    // Check if any word in the trie starts with the given prefix
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

// Example usage
const trie = new Trie();

trie.insert("apple");
console.log(trie.search("apple"));     // true
console.log(trie.search("app"));       // false
console.log(trie.startsWith("app"));   // true

trie.insert("app");
console.log(trie.search("app"));       // true
