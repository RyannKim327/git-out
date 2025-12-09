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

    // Get all words with a given prefix
    getWordsWithPrefix(prefix: string): string[] {
        let currentNode = this.root;
        const results: string[] = [];
        
        // Navigate to the prefix node
        for (const char of prefix) {
            if (!currentNode.children.has(char)) {
                return results; // Empty array if prefix doesn't exist
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
        return this.deleteRecursive(this.root, word, 0);
    }

    private deleteRecursive(node: TrieNode, word: string, index: number): boolean {
        if (index === word.length) {
            if (!node.isEndOfWord) {
                return false; // Word doesn't exist
            }
            node.isEndOfWord = false;
            return node.children.size === 0;
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
console.log(trie.search("apple")); // true
console.log(trie.search("app"));   // true
console.log(trie.search("appl"));  // false (not a complete word)

// Check prefixes
console.log(trie.startsWith("app")); // true
console.log(trie.startsWith("ba"));  // true

// Get words with prefix
console.log(trie.getWordsWithPrefix("app")); 
// ["app", "apple", "application"]

// Delete a word
trie.delete("app");
console.log(trie.search("app"));     // false
console.log(trie.search("apple"));   // true (still exists)

// Get word count
console.log(trie.getWordCount()); // 4
class EnhancedTrie extends Trie {
    // Get the longest common prefix
    longestCommonPrefix(): string {
        let currentNode = this.root;
        let prefix = "";
        
        while (currentNode.children.size === 1 && !currentNode.isEndOfWord) {
            const [char, childNode] = Array.from(currentNode.children)[0];
            prefix += char;
            currentNode = childNode;
        }
        
        return prefix;
    }

    // Check if the trie is empty
    isEmpty(): boolean {
        return this.root.children.size === 0;
    }

    // Get all words in the trie
    getAllWords(): string[] {
        return this.getWordsWithPrefix("");
    }

    // Auto-complete with a maximum number of results
    autocomplete(prefix: string, maxResults: number = 10): string[] {
        return this.getWordsWithPrefix(prefix).slice(0, maxResults);
    }
}

// Usage of enhanced trie
const enhancedTrie = new EnhancedTrie();
enhancedTrie.insert("cat");
enhancedTrie.insert("car");
enhancedTrie.insert("card");
enhancedTrie.insert("care");

console.log(enhancedTrie.longestCommonPrefix()); // "ca"
console.log(enhancedTrie.autocomplete("car", 2)); // ["car", "card"]
console.log(enhancedTrie.getAllWords()); // ["cat", "car", "card", "care"]
