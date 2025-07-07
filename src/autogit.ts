class SuffixTreeNode {
    children: Map<string, SuffixTreeNode>;
    start: number;
    end: number | null;

    constructor(start: number, end: number | null) {
        this.children = new Map();
        this.start = start;
        this.end = end;
    }
}
class SuffixTree {
    root: SuffixTreeNode;
    text: string;

    constructor(text: string) {
        this.root = new SuffixTreeNode(-1, null);
        this.text = text;
        this.buildSuffixTree();
    }

    private buildSuffixTree() {
        const n = this.text.length;
        for (let i = 0; i < n; i++) {
            this.insertSuffix(i);
        }
    }

    private insertSuffix(start: number) {
        let currentNode = this.root;
        let suffix = this.text.substring(start);

        for (let char of suffix) {
            if (!currentNode.children.has(char)) {
                const newNode = new SuffixTreeNode(start, null);
                currentNode.children.set(char, newNode);
            }
            currentNode = currentNode.children.get(char)!;
            start++;
        }
    }

    public search(pattern: string): boolean {
        let currentNode = this.root;
        let index = 0;

        while (index < pattern.length) {
            const char = pattern[index];
            if (!currentNode.children.has(char)) {
                return false; // Not found
            }
            currentNode = currentNode.children.get(char)!;
            index++;
        }
        return true; // Found
    }
}
const text = "banana";
const suffixTree = new SuffixTree(text);

// Searching for patterns
console.log(suffixTree.search("ana")); // true
console.log(suffixTree.search("nan")); // true
console.log(suffixTree.search("bat")); // false
