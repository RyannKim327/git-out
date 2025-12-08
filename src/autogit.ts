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

    // Get all words that start with a prefix
    getWordsWithPrefix(prefix: string): string[] {
        let currentNode = this.root;
        const words: string[] = [];
        
        // Navigate to the prefix node
        for (const char of prefix) {
            if (!currentNode.children.has(char)) {
                return words; // No words found
            }
            currentNode = currentNode.children.get(char)!;
        }
        
        // Collect all words from this node
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
console.log(trie.search("apple"));    // true
console.log(trie.search("app"));      // true
console.log(trie.search("appl"));     // false (not a complete word)

// Check prefixes
console.log(trie.startsWith("app"));  // true
console.log(trie.startsWith("ba"));   // true
console.log(trie.startsWith("cat"));  // false

// Get words with prefix
console.log(trie.getWordsWithPrefix("app")); 
// ["app", "apple", "application"]

console.log(trie.getWordsWithPrefix("b"));
// ["banana", "bat"]

// Delete words
trie.delete("app");
console.log(trie.search("app"));      // false
console.log(trie.search("apple"));    // true (still exists)

// Get word count
console.log(trie.getWordCount());     // 4
interface TrieOptions {
    caseSensitive?: boolean;
}

class AdvancedTrie extends Trie {
    private caseSensitive: boolean;

    constructor(options: TrieOptions = {}) {
        super();
        this.caseSensitive = options.caseSensitive || false;
    }

    private normalizeWord(word: string): string {
        return this.caseSensitive ? word : word.toLowerCase();
    }

    insert(word: string): void {
        super.insert(this.normalizeWord(word));
    }

    search(word: string): boolean {
        return super.search(this.normalizeWord(word));
    }

    startsWith(prefix: string): boolean {
        return super.startsWith(this.normalizeWord(prefix));
    }

    // Find the longest common prefix
    findLongestCommonPrefix(): string {
        let currentNode = this.root;
        let prefix = "";
        
        while (currentNode.children.size === 1 && !currentNode.isEndOfWord) {
            const [char, nextNode] = Array.from(currentNode.children)[0];
            prefix += char;
            currentNode = nextNode;
        }
        
        return prefix;
    }
}

// Usage of AdvancedTrie
const advancedTrie = new AdvancedTrie({ caseSensitive: false });
advancedTrie.insert("Hello");
advancedTrie.insert("Help");
advancedTrie.insert("Helicopter");

console.log(advancedTrie.findLongestCommonPrefix()); // "hel"
