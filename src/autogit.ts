class SuffixTrieNode {
    children: Map<string, SuffixTrieNode>;
    indices: number[]; // optional: store starting indices of suffixes

    constructor() {
        this.children = new Map();
        this.indices = [];
    }
}

class SuffixTrie {
    root: SuffixTrieNode;

    constructor(text: string) {
        this.root = new SuffixTrieNode();
        this.buildSuffixTrie(text);
    }

    private buildSuffixTrie(text: string): void {
        for (let i = 0; i < text.length; i++) {
            this.insertSuffix(text, i);
        }
    }

    private insertSuffix(text: string, start: number): void {
        let currentNode = this.root;
        for (let i = start; i < text.length; i++) {
            const char = text[i];
            if (!currentNode.children.has(char)) {
                currentNode.children.set(char, new SuffixTrieNode());
            }
            currentNode = currentNode.children.get(char)!;
            currentNode.indices.push(start);
        }
    }

    // Search for a substring in the suffix trie
    public contains(substring: string): boolean {
        let currentNode = this.root;
        for (const char of substring) {
            if (!currentNode.children.has(char)) {
                return false;
            }
            currentNode = currentNode.children.get(char)!;
        }
        return true;
    }

    // Optional: get all suffix indices
    public getSuffixIndices(): number[] {
        const result: number[] = [];
        const traverse = (node: SuffixTrieNode) => {
            if (node.indices.length > 0) {
                result.push(...node.indices);
            }
            for (const child of node.children.values()) {
                traverse(child);
            }
        };
        traverse(this.root);
        return result;
    }
}
const text = "banana";
const suffixTrie = new SuffixTrie(text);

console.log(suffixTrie.contains("ana")); // true
console.log(suffixTrie.contains("nana")); // true
console.log(suffixTrie.contains("ban")); // true
console.log(suffixTrie.contains("apple")); // false

console.log(suffixTrie.getSuffixIndices()); // [5, 3, 1, 0, 4, 2]
