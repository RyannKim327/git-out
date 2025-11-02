// 1. Define the TrieNode
class TrieNode {
    // A map to store children nodes, where keys are characters and values are TrieNodes.
    children: Map<string, TrieNode>;
    // A boolean to mark if this node signifies the end of a valid word.
    isEndOfWord: boolean;

    constructor() {
        this.children = new Map<string, TrieNode>();
        this.isEndOfWord = false;
    }
}

// 2. Define the Trie data structure
class Trie {
    private root: TrieNode;

    constructor() {
        // Initialize the trie with an empty root node.
        this.root = new TrieNode();
    }

    /**
     * Inserts a word into the trie.
     * @param word The word to insert.
     */
    insert(word: string): void {
        let currentNode = this.root;
        for (const char of word) {
            // If the character is not a child of the current node, create a new node.
            if (!currentNode.children.has(char)) {
                currentNode.children.set(char, new TrieNode());
            }
            // Move to the child node corresponding to the character.
            currentNode = currentNode.children.get(char)!; // '!' asserts non-null
        }
        // Mark the last node as the end of a word.
        currentNode.isEndOfWord = true;
    }

    /**
     * Searches for a word in the trie.
     * @param word The word to search for.
     * @returns true if the word is found, false otherwise.
     */
    search(word: string): boolean {
        let currentNode = this.root;
        for (const char of word) {
            // If the character is not a child, the word does not exist.
            if (!currentNode.children.has(char)) {
                return false;
            }
            // Move to the child node.
            currentNode = currentNode.children.get(char)!;
        }
        // Return true only if the node marks the end of a word.
        // This distinguishes between "app" (a word) and "appl" (just a prefix for "apple").
        return currentNode.isEndOfWord;
    }

    /**
     * Checks if there is any word in the trie that starts with the given prefix.
     * @param prefix The prefix to search for.
     * @returns true if any word starts with the prefix, false otherwise.
     */
    startsWith(prefix: string): boolean {
        const node = this._traverse(prefix);
        // If the traversal results in a node (meaning the prefix path exists), return true.
        return node !== null;
    }

    /**
     * Helper method to traverse the trie to the end of a given prefix/word.
     * @param text The word or prefix to traverse.
     * @returns The TrieNode at the end of the text, or null if the path does not exist.
     */
    private _traverse(text: string): TrieNode | null {
        let currentNode = this.root;
        for (const char of text) {
            if (!currentNode.children.has(char)) {
                return null; // Path does not exist
            }
            currentNode = currentNode.children.get(char)!;
        }
        return currentNode; // Return the node at the end of the text
    }

    /**
     * Deletes a word from the trie.
     * This implementation uses a recursive helper for cleaner logic.
     * @param word The word to delete.
     * @returns true if the word was successfully deleted, false if it wasn't found.
     */
    delete(word: string): boolean {
        // Recursive helper function
        const deleteHelper = (
            currentNode: TrieNode,
            word: string,
            index: number
        ): boolean => {
            // Base case: end of the word
            if (index === word.length) {
                // If the current node is not marked as end of a word,
                // then the word doesn't exist in the trie.
                if (!currentNode.isEndOfWord) {
                    return false; // Word not found to delete
                }
                // Unmark it as end of a word.
                currentNode.isEndOfWord = false;
                // Return true if this node has no children (meaning it can be removed).
                return currentNode.children.size === 0;
            }

            const char = word[index];
            const childNode = currentNode.children.get(char);

            // If no child exists for this character, the word is not in the trie.
            if (!childNode) {
                return false;
            }

            // Recursively call for the next character.
            const shouldDeleteChild = deleteHelper(childNode, word, index + 1);

            // If the child node should be deleted (it has no more utility), remove it from children map.
            if (shouldDeleteChild) {
                currentNode.children.delete(char);
                // Return true if the current node also has no children AND is not the end of another word.
                return currentNode.children.size === 0 && !currentNode.isEndOfWord;
            }

            return false; // Child wasn't deleted, so this node also won't be
        };

        // Start the recursive deletion from the root.
        return deleteHelper(this.root, word, 0);
    }

    /**
     * Retrieves all words in the trie that start with a given prefix.
     * @param prefix The prefix to search for.
     * @returns An array of words that start with the prefix.
     */
    getWordsWithPrefix(prefix: string): string[] {
        const results: string[] = [];
        const prefixNode = this._traverse(prefix);

        if (!prefixNode) {
            return []; // No words found for this prefix
        }

        // Helper for Depth First Search (DFS) from a given node
        const collectWords = (node: TrieNode, currentPath: string) => {
            if (node.isEndOfWord) {
                results.push(currentPath);
            }

            for (const [char, childNode] of node.children.entries()) {
                collectWords(childNode, currentPath + char);
            }
        };

        // Start collecting words from the node where the prefix ends.
        collectWords(prefixNode, prefix);
        return results;
    }
}

const trie = new Trie();

// --- Insert words ---
console.log("--- Inserting words ---");
trie.insert("apple");
trie.insert("app");
trie.insert("apricot");
trie.insert("banana");
trie.insert("band");
trie.insert("cat");
trie.insert("canada");

// --- Search words ---
console.log("\n--- Searching for words ---");
console.log("Search 'apple':", trie.search("apple"));    // true
console.log("Search 'app':", trie.search("app"));      // true
console.log("Search 'ap':", trie.search("ap"));       // false (prefix, not a full word)
console.log("Search 'apricot':", trie.search("apricot")); // true
console.log("Search 'grape':", trie.search("grape"));   // false

// --- Check for prefixes ---
console.log("\n--- Checking for prefixes ---");
console.log("Starts with 'app':", trie.startsWith("app"));   // true
console.log("Starts with 'ban':", trie.startsWith("ban"));   // true
console.log("Starts with 'ca':", trie.startsWith("ca"));    // true
console.log("Starts with 'gra':", trie.startsWith("gra"));   // false

// --- Get words with prefix ---
console.log("\n--- Getting words with prefixes ---");
console.log("Words with prefix 'ap':", trie.getWordsWithPrefix("ap")); // ['apple', 'app', 'apricot']
console.log("Words with prefix 'ban':", trie.getWordsWithPrefix("ban")); // ['banana', 'band']
console.log("Words with prefix 'c':", trie.getWordsWithPrefix("c"));   // ['cat', 'canada']
console.log("Words with prefix 'g':", trie.getWordsWithPrefix("g"));   // []

// --- Deleting words ---
console.log("\n--- Deleting words ---");
console.log("Delete 'app':", trie.delete("app"));      // true
console.log("Search 'app' after delete:", trie.search("app")); // false
console.log("Search 'apple' after deleting 'app':", trie.search("apple")); // true (apple still exists)
console.log("Words with prefix 'ap' after deleting 'app':", trie.getWordsWithPrefix("ap")); // ['apple', 'apricot']

console.log("Delete 'grape' (non-existent):", trie.delete("grape")); // false

console.log("Delete 'apple':", trie.delete("apple"));  // true
console.log("Search 'apple' after delete:", trie.search("apple")); // false
console.log("Words with prefix 'ap' after deleting 'apple':", trie.getWordsWithPrefix("ap")); // ['apricot']

console.log("Delete 'apricot':", trie.delete("apricot")); // true
console.log("Words with prefix 'ap' after deleting 'apricot':", trie.getWordsWithPrefix("ap")); // []
