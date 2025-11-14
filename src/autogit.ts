class TrieNode {
    // A Map to store children nodes, where the key is the character
    // and the value is the TrieNode for that character.
    children: Map<string, TrieNode>;
    
    // A boolean flag to indicate if a word ends at this node.
    isEndOfWord: boolean;

    constructor() {
        this.children = new Map<string, TrieNode>();
        this.isEndOfWord = false;
    }
}
class Trie {
    private root: TrieNode;

    constructor() {
        // The root node doesn't represent any character, it's just the starting point.
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
            // Move to the next node (the child corresponding to the current character).
            currentNode = currentNode.children.get(char)!; // '!' asserts non-null
        }
        // Mark the last node as the end of a word.
        currentNode.isEndOfWord = true;
    }

    /**
     * Searches for a word in the trie.
     * @param word The word to search for.
     * @returns True if the word is found, false otherwise.
     */
    search(word: string): boolean {
        let currentNode = this.root;
        for (const char of word) {
            // If the character path doesn't exist, the word is not in the trie.
            if (!currentNode.children.has(char)) {
                return false;
            }
            // Move to the next node.
            currentNode = currentNode.children.get(char)!;
        }
        // A word is found only if the last node is marked as an end-of-word.
        return currentNode.isEndOfWord;
    }

    /**
     * Checks if there is any word in the trie that starts with the given prefix.
     * @param prefix The prefix to check.
     * @returns True if any word starts with the prefix, false otherwise.
     */
    startsWith(prefix: string): boolean {
        let currentNode = this.root;
        for (const char of prefix) {
            // If the character path doesn't exist, no word starts with this prefix.
            if (!currentNode.children.has(char)) {
                return false;
            }
            // Move to the next node.
            currentNode = currentNode.children.get(char)!;
        }
        // If we successfully traversed all characters of the prefix,
        // it means at least one word starts with this prefix.
        return true;
    }

    /**
     * Deletes a word from the trie.
     * This implementation uses a recursive approach to safely remove nodes
     * that are no longer part of any other words or prefixes.
     * @param word The word to delete.
     * @returns True if the word was successfully deleted, false if it wasn't found.
     */
    delete(word: string): boolean {
        return this.deleteRecursive(this.root, word, 0);
    }

    private deleteRecursive(currentNode: TrieNode, word: string, index: number): boolean {
        // Base case: If we've reached the end of the word.
        if (index === word.length) {
            // If this node isn't marked as the end of a word, the word wasn't truly in the trie.
            if (!currentNode.isEndOfWord) {
                return false;
            }
            // Unmark this node as the end of a word.
            currentNode.isEndOfWord = false;
            // Return true if this node has no other children, meaning it can be safely removed.
            return currentNode.children.size === 0;
        }

        const char = word[index];
        const childNode = currentNode.children.get(char);

        // If the child doesn't exist, the word is not in the trie.
        if (!childNode) {
            return false;
        }

        // Recursively call delete on the child node.
        const shouldDeleteChild = this.deleteRecursive(childNode, word, index + 1);

        // If the recursive call indicates that the child node should be deleted...
        if (shouldDeleteChild) {
            currentNode.children.delete(char); // Remove the child from the current node's children.
            // Return true if the current node can also be deleted
            // (i.e., it now has no children AND it's not the end of another word).
            return currentNode.children.size === 0 && !currentNode.isEndOfWord;
        }

        return false; // Child couldn't be deleted, or current node has other children/is end of word.
    }

    /**
     * Collects all words in the trie that start with a given prefix.
     * @param prefix The prefix to search for. Defaults to an empty string to get all words.
     * @returns An array of words.
     */
    getWordsWithPrefix(prefix: string = ""): string[] {
        let currentNode = this.root;
        // Traverse to the node representing the end of the prefix
        for (const char of prefix) {
            if (!currentNode.children.has(char)) {
                return []; // Prefix not found, no words start with it
            }
            currentNode = currentNode.children.get(char)!;
        }

        const words: string[] = [];
        // Start collecting words from the node where the prefix ends
        this.collectWords(currentNode, prefix, words);
        return words;
    }

    // Helper function for getWordsWithPrefix to recursively collect words
    private collectWords(node: TrieNode, currentPrefix: string, words: string[]): void {
        // If this node marks the end of a word, add the currentPrefix to the list
        if (node.isEndOfWord) {
            words.push(currentPrefix);
        }

        // Recursively call for all children
        for (const [char, childNode] of node.children.entries()) {
            this.collectWords(childNode, currentPrefix + char, words);
        }
    }
}
// Create a new Trie
const trie = new Trie();

// Insert some words
trie.insert("apple");
trie.insert("app");
trie.insert("apricot");
trie.insert("apply");
trie.insert("banana");
trie.insert("band");

console.log("--- Search ---");
console.log("Search 'apple':", trie.search("apple"));    // true
console.log("Search 'app':", trie.search("app"));        // true
console.log("Search 'apl':", trie.search("apl"));        // false (prefix exists, but not a full word)
console.log("Search 'orange':", trie.search("orange"));  // false

console.log("\n--- Starts With ---");
console.log("Starts with 'ap':", trie.startsWith("ap"));    // true
console.log("Starts with 'app':", trie.startsWith("app"));  // true
console.log("Starts with 'ban':", trie.startsWith("ban"));  // true
console.log("Starts with 'ora':", trie.startsWith("ora"));  // false

console.log("\n--- Get Words with Prefix ---");
console.log("Words with prefix 'ap':", trie.getWordsWithPrefix("ap"));     // ["apple", "app", "apricot", "apply"]
console.log("Words with prefix 'ban':", trie.getWordsWithPrefix("ban"));   // ["banana", "band"]
console.log("Words with prefix 'a':", trie.getWordsWithPrefix("a"));       // ["apple", "app", "apricot", "apply"]
console.log("Words with prefix '':", trie.getWordsWithPrefix(""));         // ["apple", "app", "apricot", "apply", "banana", "band"]
console.log("Words with prefix 'xyz':", trie.getWordsWithPrefix("xyz"));   // []

console.log("\n--- Delete ---");
console.log("Delete 'app':", trie.delete("app"));      // true
console.log("Search 'app' after delete:", trie.search("app")); // false
console.log("Search 'apple' after delete 'app':", trie.search("apple")); // true (apple still exists)
console.log("Words with prefix 'ap' after deleting 'app':", trie.getWordsWithPrefix("ap")); // ["apple", "apricot", "apply"]

console.log("Delete 'orange':", trie.delete("orange")); // false (was never inserted)
console.log("Delete 'apple':", trie.delete("apple"));   // true
console.log("Search 'apple' after delete:", trie.search("apple")); // false
console.log("Starts with 'app' after deleting 'apple' and 'app':", trie.startsWith("app")); // true (because 'apricot', 'apply' still use 'ap' prefix)
console.log("Words with prefix 'ap' after deleting 'apple':", trie.getWordsWithPrefix("ap")); // ["apricot", "apply"]

