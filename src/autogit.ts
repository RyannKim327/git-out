interface SuffixTreeNode {
  children: Map<string, SuffixTreeNode>;
  start: number; // Start index in the original string
  end: number | null; // End index (null means it goes to end of string)
  suffixLink?: SuffixTreeNode;
  isLeaf: boolean;
}

interface ActivePoint {
  node: SuffixTreeNode;
  edge: string | null;
  length: number;
}
class SuffixTree {
  private root: SuffixTreeNode;
  private active: ActivePoint;
  private remaining: number;
  private lastNewNode: SuffixTreeNode | null;
  private text: string;
  private position: number;

  constructor(text: string) {
    this.text = text + '$'; // Add terminal character
    this.root = this.createNode(-1, null);
    this.active = { node: this.root, edge: null, length: 0 };
    this.remaining = 0;
    this.lastNewNode = null;
    this.position = -1;
    
    this.build();
  }

  private createNode(start: number, end: number | null): SuffixTreeNode {
    return {
      children: new Map(),
      start,
      end,
      suffixLink: this.root,
      isLeaf: end === null || end === this.text.length - 1
    };
  }

  private getEdgeLength(node: SuffixTreeNode): number {
    if (node.end === null) {
      return this.text.length - node.start;
    }
    return node.end - node.start + 1;
  }

  private walkDown(currentNode: SuffixTreeNode): boolean {
    const edgeLength = this.getEdgeLength(currentNode);
    
    if (this.active.length >= edgeLength) {
      this.active.node = currentNode;
      this.active.length -= edgeLength;
      this.active.edge = this.active.length > 0 ? 
        this.text[this.position - this.active.length] : null;
      return true;
    }
    return false;
  }

  private extend(): void {
    this.position++;
    this.remaining++;
    this.lastNewNode = null;

    while (this.remaining > 0) {
      if (this.active.length === 0) {
        this.active.edge = this.text[this.position];
      }

      const currentChar = this.text[this.position];
      
      if (!this.active.node.children.has(this.active.edge!)) {
        // Rule 2: Create new leaf node
        const leaf = this.createNode(this.position, null);
        this.active.node.children.set(this.active.edge!, leaf);
        
        if (this.lastNewNode !== null) {
          this.lastNewNode.suffixLink = this.active.node;
          this.lastNewNode = null;
        }
      } else {
        const nextNode = this.active.node.children.get(this.active.edge!)!;
        
        if (this.walkDown(nextNode)) {
          continue;
        }

        const activeEdgeIndex = nextNode.start + this.active.length;
        if (this.text[activeEdgeIndex] === currentChar) {
          // Rule 3: Current character is already in tree
          if (this.lastNewNode !== null && this.active.node !== this.root) {
            this.lastNewNode.suffixLink = this.active.node;
            this.lastNewNode = null;
          }
          this.active.length++;
          break;
        }

        // Rule 2: Split existing edge
        const splitEnd = nextNode.start + this.active.length - 1;
        const splitNode = this.createNode(nextNode.start, splitEnd);
        this.active.node.children.set(this.active.edge!, splitNode);

        // Create new leaf for current character
        const leaf = this.createNode(this.position, null);
        splitNode.children.set(currentChar, leaf);

        // Update the existing node
        nextNode.start += this.active.length;
        splitNode.children.set(this.text[nextNode.start], nextNode);

        if (this.lastNewNode !== null) {
          this.lastNewNode.suffixLink = splitNode;
        }

        this.lastNewNode = splitNode;
      }

      this.remaining--;

      if (this.active.node === this.root && this.active.length > 0) {
        this.active.length--;
        this.active.edge = this.text[this.position - this.remaining + 1];
      } else if (this.active.node !== this.root) {
        this.active.node = this.active.node.suffixLink!;
      }
    }
  }

  private build(): void {
    for (let i = 0; i < this.text.length; i++) {
      this.extend();
    }
  }

  // Public methods
  public contains(pattern: string): boolean {
    return this.search(pattern) !== null;
  }

  public search(pattern: string): number[] {
    const result: number[] = [];
    let currentNode = this.root;
    let patternIndex = 0;

    while (patternIndex < pattern.length) {
      const currentChar = pattern[patternIndex];
      
      if (!currentNode.children.has(currentChar)) {
        return result; // Pattern not found
      }

      currentNode = currentNode.children.get(currentChar)!;
      const edgeLength = this.getEdgeLength(currentNode);
      
      for (let i = 0; i < edgeLength && patternIndex < pattern.length; i++) {
        if (this.text[currentNode.start + i] !== pattern[patternIndex]) {
          return result; // Pattern doesn't match
        }
        patternIndex++;
      }
    }

    // Collect all leaf node positions
    this.collectLeafPositions(currentNode, result);
    return result.map(pos => pos - pattern.length + 1);
  }

  private collectLeafPositions(node: SuffixTreeNode, result: number[]): void {
    if (node.isLeaf) {
      result.push(node.start);
      return;
    }

    for (const child of node.children.values()) {
      this.collectLeafPositions(child, result);
    }
  }

  public getAllSuffixes(): string[] {
    const suffixes: string[] = [];
    this.collectSuffixes(this.root, '', suffixes);
    return suffixes.filter(suffix => suffix !== '$' && suffix !== '');
  }

  private collectSuffixes(
    node: SuffixTreeNode, 
    currentString: string, 
    result: string[]
  ): void {
    if (node.isLeaf) {
      result.push(currentString);
      return;
    }

    for (const [char, child] of node.children.entries()) {
      const edge = this.text.substring(
        child.start, 
        child.end === null ? this.text.length : child.end + 1
      );
      this.collectSuffixes(child, currentString + edge, result);
    }
  }

  public longestRepeatedSubstring(): string {
    let longest = '';
    let maxLength = 0;

    const dfs = (node: SuffixTreeNode, depth: number): number => {
      if (node.isLeaf) {
        return 1;
      }

      let leafCount = 0;
      for (const child of node.children.values()) {
        const edgeLength = this.getEdgeLength(child);
        const childLeafCount = dfs(child, depth + edgeLength);
        leafCount += childLeafCount;

        if (childLeafCount > 1 && depth + edgeLength > maxLength) {
          maxLength = depth + edgeLength;
          const start = child.start - depth;
          longest = this.text.substring(start, start + maxLength);
        }
      }

      return leafCount;
    };

    dfs(this.root, 0);
    return longest;
  }
}
// Example usage
const suffixTree = new SuffixTree("banana");

// Check if pattern exists
console.log(suffixTree.contains("ana")); // true
console.log(suffixTree.contains("xyz")); // false

// Find all occurrences
console.log(suffixTree.search("ana")); // [1, 3]
console.log(suffixTree.search("na"));  // [2, 4]

// Get all suffixes
console.log(suffixTree.getAllSuffixes());
// ["a", "na", "ana", "nana", "anana", "banana"]

// Find longest repeated substring
console.log(suffixTree.longestRepeatedSubstring()); // "ana"

// Advanced usage with larger text
const dnaTree = new SuffixTree("ATCGATCGATCG");
console.log(dnaTree.contains("ATCG")); // true
console.log(dnaTree.search("ATCG")); // [0, 4, 8]
