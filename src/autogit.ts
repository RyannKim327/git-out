// 1️⃣ Node – every node knows its children and whether it finishes a word
class TrieNode {
    /** Map <character, child node> */
    children: Map<string, TrieNode>;
    /** True if node represents the end of an inserted word */
    isWord: boolean;

    constructor() {
        this.children = new Map();
        this.isWord = false;
    }
}

// 2️⃣ Trie – wrapper around the root node
class Trie {
    private root: TrieNode;

    constructor() {
        this.root = new TrieNode();
    }

    /** Inserts a word into the trie */
    insert(word: string): void {
        let node = this.root;
        for (const ch of word) {
            if (!node.children.has(ch)) {
                node.children.set(ch, new TrieNode());
            }
            node = node.children.get(ch)!;
        }
        node.isWord = true;
    }

    /** Returns true if the trie contains the exact word */
    search(word: string): boolean {
        const node = this._traverse(word);
        return node?.isWord ?? false;
    }

    /** Returns true if the trie contains any word that starts with the prefix */
    startsWith(prefix: string): boolean {
        const node = this._traverse(prefix);
        return !!node;
    }

    /** Remove a word – returns true if a word was removed */
    remove(word: string): boolean {
        const stack: Array<{ node: TrieNode; char: string }> = [];

        let node = this.root;
        for (const ch of word) {
            const child = node.children.get(ch);
            if (!child) return false; // word not present
            stack.push({ node, char: ch });
            node = child;
        }

        if (!node.isWord) return false; // not a complete word

        node.isWord = false;

        // Clean up nodes that are no longer needed
        while (stack.length && !node.isWord && node.children.size === 0) {
            const { node: parent, char } = stack.pop()!;
            parent.children.delete(char);
            node = parent;
        }

        return true;
    }

    /** Suggest words that start with a prefix (up to maxResults) */
    suggest(prefix: string, maxResults = 10): string[] {
        const results: string[] = [];
        let node = this.root;
        for (const ch of prefix) {
            const child = node.children.get(ch);
            if (!child) return results;
            node = child;
        }
        this._dfs(node, prefix, results, maxResults);
        return results;
    }

    /* ---------- private helpers ---------- */
    // walk through the trie following the key; return node or null
    private _traverse(key: string): TrieNode | null {
        let node: TrieNode | undefined = this.root;
        for (const ch of key) {
            node = node.children.get(ch);
            if (!node) return null;
        }
        return node as TrieNode;
    }

    private _dfs(node: TrieNode, path: string, out: string[], limit: number): void {
        if (out.length >= limit) return;
        if (node.isWord) out.push(path);
        for (const [ch, child] of node.children.entries()) {
            this._dfs(child, path + ch, out, limit);
        }
    }
}
const trie = new Trie();
trie.insert('apple');
trie.insert('app');
trie.insert('banana');

console.log(trie.search('app'));      // true
console.log(trie.search('apricot'));  // false
console.log(trie.startsWith('app'));  // true
console.log(trie.suggest('app'));     // ['app', 'apple']

trie.remove('app');
console.log(trie.search('app'));      // false
