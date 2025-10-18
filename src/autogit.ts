class TrieNode {
    public children: Map<string, TrieNode>;
    public isEndOfWord: boolean;

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
        const results: string[] = [];
        let currentNode = this.root;
        
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
        return this.deleteHelper(this.root, word, 0);
    }

    private deleteHelper(node: TrieNode, word: string, index: number): boolean {
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

        const shouldDeleteChild = this.deleteHelper(childNode, word, index + 1);

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

    // Clear all words from the trie
    clear(): void {
        this.root = new TrieNode();
    }
}
class ValueTrieNode<T> {
    public children: Map<string, ValueTrieNode<T>>;
    public value: T | null;
    public isEndOfWord: boolean;

    constructor() {
        this.children = new Map();
        this.value = null;
        this.isEndOfWord = false;
    }
}

class ValueTrie<T> {
    private root: ValueTrieNode<T>;

    constructor() {
        this.root = new ValueTrieNode<T>();
    }

    // Insert with value
    insert(word: string, value: T): void {
        let currentNode = this.root;
        
        for (const char of word) {
            if (!currentNode.children.has(char)) {
                currentNode.children.set(char, new ValueTrieNode<T>());
            }
            currentNode = currentNode.children.get(char)!;
        }
        
        currentNode.isEndOfWord = true;
        currentNode.value = value;
    }

    // Get value for a word
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

    // Search (same as basic trie)
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

    // Get all key-value pairs with given prefix
    getEntriesWithPrefix(prefix: string): Array<{key: string, value: T}> {
        const results: Array<{key: string, value: T}> = [];
        let currentNode = this.root;
        
        for (const char of prefix) {
            if (!currentNode.children.has(char)) {
                return results;
            }
            currentNode = currentNode.children.get(char)!;
        }
        
        this.collectEntries(currentNode, prefix, results);
        return results;
    }

    private collectEntries(node: ValueTrieNode<T>, currentKey: string, results: Array<{key: string, value: T}>): void {
        if (node.isEndOfWord && node.value !== null) {
            results.push({ key: currentKey, value: node.value });
        }
        
        for (const [char, childNode] of node.children) {
            this.collectEntries(childNode, currentKey + char, results);
        }
    }
}
class ArrayTrieNode {
    public children: (ArrayTrieNode | null)[];
    public isEndOfWord: boolean;

    constructor() {
        this.children = new Array(26).fill(null);
        this.isEndOfWord = false;
    }
}

class ArrayTrie {
    private root: ArrayTrieNode;
    private readonly baseChar = 'a'.charCodeAt(0);

    constructor() {
        this.root = new ArrayTrieNode();
    }

    private charToIndex(char: string): number {
        return char.charCodeAt(0) - this.baseChar;
    }

    insert(word: string): void {
        let currentNode = this.root;
        
        for (const char of word.toLowerCase()) {
            const index = this.charToIndex(char);
            if (currentNode.children[index] === null) {
                currentNode.children[index] = new ArrayTrieNode();
            }
            currentNode = currentNode.children[index]!;
        }
        
        currentNode.isEndOfWord = true;
    }

    search(word: string): boolean {
        let currentNode = this.root;
        
        for (const char of word.toLowerCase()) {
            const index = this.charToIndex(char);
            if (currentNode.children[index] === null) {
                return false;
            }
            currentNode = currentNode.children[index]!;
        }
        
        return currentNode.isEndOfWord;
    }

    startsWith(prefix: string): boolean {
        let currentNode = this.root;
        
        for (const char of prefix.toLowerCase()) {
            const index = this.charToIndex(char);
            if (currentNode.children[index] === null) {
                return false;
            }
            currentNode = currentNode.children[index]!;
        }
        
        return true;
    }
}
// Basic Trie Usage
const trie = new Trie();

// Insert words
trie.insert("apple");
trie.insert("app");
trie.insert("application");
trie.insert("banana");

// Search
console.log(trie.search("apple")); // true
console.log(trie.search("app"));   // true
console.log(trie.search("appl"));  // false

// Prefix search
console.log(trie.startsWith("app")); // true
console.log(trie.getWordsWithPrefix("app")); // ["app", "apple", "application"]

// Delete
trie.delete("app");
console.log(trie.search("app")); // false
console.log(trie.search("apple")); // true

// Value Trie Usage
const valueTrie = new ValueTrie<number>();
valueTrie.insert("temperature", 25);
valueTrie.insert("humidity", 60);

console.log(valueTrie.getValue("temperature")); // 25
console.log(valueTrie.getEntriesWithPrefix("t")); // [{key: "temperature", value: 25}]
