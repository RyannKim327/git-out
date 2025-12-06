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
        
        // Navigate to the prefix node
        for (const char of prefix) {
            if (!currentNode.children.has(char)) {
                return [];
            }
            currentNode = currentNode.children.get(char)!;
        }
        
        return this.collectWords(currentNode, prefix);
    }

    private collectWords(node: TrieNode, currentWord: string): string[] {
        const words: string[] = [];
        
        if (node.isEndOfWord) {
            words.push(currentWord);
        }
        
        for (const [char, childNode] of node.children) {
            words.push(...this.collectWords(childNode, currentWord + char));
        }
        
        return words;
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
}
interface TrieNode {
    children: Map<string, TrieNode>;
    isEndOfWord: boolean;
    count: number; // Count of words ending at this node
}

class EnhancedTrie {
    private root: TrieNode;
    private size: number; // Total number of words in trie

    constructor() {
        this.root = this.createNode();
        this.size = 0;
    }

    private createNode(): TrieNode {
        return {
            children: new Map(),
            isEndOfWord: false,
            count: 0
        };
    }

    insert(word: string): void {
        let currentNode = this.root;
        
        for (const char of word) {
            if (!currentNode.children.has(char)) {
                currentNode.children.set(char, this.createNode());
            }
            currentNode = currentNode.children.get(char)!;
        }
        
        if (!currentNode.isEndOfWord) {
            this.size++;
        }
        
        currentNode.isEndOfWord = true;
        currentNode.count++;
    }

    search(word: string): boolean {
        const node = this.findNode(word);
        return node ? node.isEndOfWord : false;
    }

    getWordCount(word: string): number {
        const node = this.findNode(word);
        return node?.count || 0;
    }

    private findNode(prefix: string): TrieNode | null {
        let currentNode = this.root;
        
        for (const char of prefix) {
            if (!currentNode.children.has(char)) {
                return null;
            }
            currentNode = currentNode.children.get(char)!;
        }
        
        return currentNode;
    }

    // Get all words in the trie (in alphabetical order)
    getAllWords(): string[] {
        return this.collectWords(this.root, '');
    }

    // Auto-complete suggestions
    autoComplete(prefix: string, limit: number = 10): string[] {
        return this.getWordsWithPrefix(prefix).slice(0, limit);
    }

    // Get the total number of words
    getSize(): number {
        return this.size;
    }

    // Clear the trie
    clear(): void {
        this.root = this.createNode();
        this.size = 0;
    }

    // Additional utility methods from the basic implementation
    startsWith(prefix: string): boolean {
        return this.findNode(prefix) !== null;
    }

    getWordsWithPrefix(prefix: string): string[] {
        const node = this.findNode(prefix);
        return node ? this.collectWords(node, prefix) : [];
    }

    private collectWords(node: TrieNode, currentWord: string): string[] {
        const words: string[] = [];
        
        if (node.isEndOfWord) {
            words.push(currentWord);
        }
        
        // Sort children alphabetically for ordered output
        const sortedChildren = Array.from(node.children.entries())
            .sort(([a], [b]) => a.localeCompare(b));
        
        for (const [char, childNode] of sortedChildren) {
            words.push(...this.collectWords(childNode, currentWord + char));
        }
        
        return words;
    }
}
// Basic usage
const trie = new Trie();

// Insert words
trie.insert("apple");
trie.insert("app");
trie.insert("application");
trie.insert("banana");

// Search for words
console.log(trie.search("apple")); // true
console.log(trie.search("app")); // true
console.log(trie.search("appl")); // false

// Prefix search
console.log(trie.startsWith("app")); // true
console.log(trie.startsWith("ban")); // true

// Get words with prefix
console.log(trie.getWordsWithPrefix("app")); 
// ["app", "apple", "application"]

// Delete a word
trie.delete("app");
console.log(trie.search("app")); // false
console.log(trie.search("apple")); // true

// Enhanced trie usage
const enhancedTrie = new EnhancedTrie();
enhancedTrie.insert("hello");
enhancedTrie.insert("hello"); // Insert again
enhancedTrie.insert("help");
enhancedTrie.insert("world");

console.log(enhancedTrie.getWordCount("hello")); // 2
console.log(enhancedTrie.autoComplete("he")); // ["hello", "help"]
console.log(enhancedTrie.getAllWords()); // ["hello", "help", "world"]
