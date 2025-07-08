class TrieNode {
    public children: Map<string, TrieNode>;
    public isEndOfWord: boolean;

    constructor() {
        this.children = new Map<string, TrieNode>();
        this.isEndOfWord = false;
    }
}
class Trie {
    private root: TrieNode;

    constructor() {
        this.root = new TrieNode();
    }

    // Insert a word into the trie
    public insert(word: string): void {
        let currentNode = this.root;

        for (const char of word) {
            if (!currentNode.children.has(char)) {
                currentNode.children.set(char, new TrieNode());
            }
            currentNode = currentNode.children.get(char)!; // Use non-null assertion since we just checked
        }
        currentNode.isEndOfWord = true; // mark the end of the word
    }

    // Search for a word in the trie
    public search(word: string): boolean {
        const node = this.findNode(word);
        return node !== null && node.isEndOfWord;
    }

    // Search for a prefix in the trie
    public startsWith(prefix: string): boolean {
        return this.findNode(prefix) !== null;
    }

    // Helper method to find a node for a given word or prefix
    private findNode(word: string): TrieNode | null {
        let currentNode = this.root;

        for (const char of word) {
            if (!currentNode.children.has(char)) {
                return null; // Not found
            }
            currentNode = currentNode.children.get(char)!; // Use non-null assertion since we just checked
        }
        return currentNode; // Return the node where the word ends
    }
}
const trie = new Trie();
trie.insert("apple");
trie.insert("app");
console.log(trie.search("apple")); // true
console.log(trie.search("app"));   // true
console.log(trie.search("appl"));  // false
console.log(trie.startsWith("ap")); // true
console.log(trie.startsWith("a"));  // true
console.log(trie.startsWith("b"));  // false
class TrieNode {
    public children: Map<string, TrieNode>;
    public isEndOfWord: boolean;

    constructor() {
        this.children = new Map<string, TrieNode>();
        this.isEndOfWord = false;
    }
}

class Trie {
    private root: TrieNode;

    constructor() {
        this.root = new TrieNode();
    }

    public insert(word: string): void {
        let currentNode = this.root;

        for (const char of word) {
            if (!currentNode.children.has(char)) {
                currentNode.children.set(char, new TrieNode());
            }
            currentNode = currentNode.children.get(char)!;
        }
        currentNode.isEndOfWord = true;
    }

    public search(word: string): boolean {
        const node = this.findNode(word);
        return node !== null && node.isEndOfWord;
    }

    public startsWith(prefix: string): boolean {
        return this.findNode(prefix) !== null;
    }

    private findNode(word: string): TrieNode | null {
        let currentNode = this.root;

        for (const char of word) {
            if (!currentNode.children.has(char)) {
                return null;
            }
            currentNode = currentNode.children.get(char)!;
        }
        return currentNode;
    }
}

// Example usage
const trie = new Trie();
trie.insert("apple");
trie.insert("app");
console.log(trie.search("apple")); // true
console.log(trie.search("app"));   // true
console.log(trie.search("appl"));  // false
console.log(trie.startsWith("ap")); // true
console.log(trie.startsWith("a"));  // true
console.log(trie.startsWith("b"));  // false
