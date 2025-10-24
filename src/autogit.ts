interface SuffixTreeNode {
  children: Map<string, SuffixTreeNode>;
  start: number;
  end?: number;
  suffixLink?: SuffixTreeNode;
  leafIndex?: number;
}

class SuffixTree {
  private root: SuffixTreeNode;
  private text: string;
  private remainingSuffixCount: number;
  private activeNode: SuffixTreeNode;
  private activeEdge: number;
  private activeLength: number;
  private lastNewNode: SuffixTreeNode | null;
  private position: number;

  constructor(text: string) {
    this.text = text + '$'; // Add terminal character
    this.initialize();
    this.buildSuffixTree();
  }

  private initialize(): void {
    this.root = this.createNode(-1, -1);
    this.activeNode = this.root;
    this.activeEdge = -1;
    this.activeLength = 0;
    this.remainingSuffixCount = 0;
    this.lastNewNode = null;
    this.position = -1;
  }

  private createNode(start: number, end?: number): SuffixTreeNode {
    return {
      children: new Map(),
      start,
      end,
      suffixLink: undefined,
      leafIndex: undefined
    };
  }

  private getEdgeLength(node: SuffixTreeNode): number {
    return (node.end ?? this.position) - node.start + 1;
  }

  private walkDown(currentNode: SuffixTreeNode): boolean {
    const edgeLength = this.getEdgeLength(currentNode);
    
    if (this.activeLength >= edgeLength) {
      this.activeEdge += edgeLength;
      this.activeLength -= edgeLength;
      this.activeNode = currentNode;
      return true;
    }
    return false;
  }

  private extendSuffixTree(): void {
    this.position++;
    this.lastNewNode = null;
    this.remainingSuffixCount++;

    while (this.remainingSuffixCount > 0) {
      if (this.activeLength === 0) {
        this.activeEdge = this.position;
      }

      const currentChar = this.text[this.activeEdge];
      let nextNode = this.activeNode.children.get(currentChar);

      if (!nextNode) {
        // Rule 2: Create new leaf
        this.activeNode.children.set(
          currentChar, 
          this.createNode(this.position)
        );
        
        if (this.lastNewNode) {
          this.lastNewNode.suffixLink = this.activeNode;
          this.lastNewNode = null;
        }
      } else {
        // Rule 3: Show stopper
        if (this.walkDown(nextNode)) {
          continue;
        }

        const nextChar = this.text[nextNode.start + this.activeLength];
        if (nextChar === this.text[this.position]) {
          if (this.lastNewNode && this.activeNode !== this.root) {
            this.lastNewNode.suffixLink = this.activeNode;
            this.lastNewNode = null;
          }
          this.activeLength++;
          break;
        }

        // Rule 2: Split edge
        const splitEnd = nextNode.start + this.activeLength - 1;
        const splitNode = this.createNode(nextNode.start, splitEnd);
        
        this.activeNode.children.set(currentChar, splitNode);
        
        // New leaf for current character
        splitNode.children.set(
          this.text[this.position],
          this.createNode(this.position)
        );
        
        // Update the existing node
        nextNode.start += this.activeLength;
        splitNode.children.set(this.text[nextNode.start], nextNode);

        if (this.lastNewNode) {
          this.lastNewNode.suffixLink = splitNode;
        }

        this.lastNewNode = splitNode;
      }

      this.remainingSuffixCount--;

      if (this.activeNode === this.root && this.activeLength > 0) {
        this.activeLength--;
        this.activeEdge = this.position - this.remainingSuffixCount + 1;
      } else if (this.activeNode !== this.root) {
        this.activeNode = this.activeNode.suffixLink || this.root;
      }
    }
  }

  private buildSuffixTree(): void {
    for (let i = 0; i < this.text.length; i++) {
      this.extendSuffixTree();
    }
    this.setLeafIndices();
  }

  private setLeafIndices(node: SuffixTreeNode = this.root, labelHeight: number = 0): void {
    let isLeaf = true;

    for (const child of node.children.values()) {
      isLeaf = false;
      this.setLeafIndices(child, labelHeight + this.getEdgeLength(child));
    }

    if (isLeaf) {
      node.leafIndex = this.text.length - labelHeight;
    }
  }
}
class SuffixTree {
  // ... previous code ...

  // Check if string exists in the text
  search(pattern: string): boolean {
    return this.findNode(pattern) !== null;
  }

  // Find all occurrences of a pattern
  findAllOccurrences(pattern: string): number[] {
    const occurrences: number[] = [];
    const node = this.findNode(pattern);
    
    if (node) {
      this.collectLeafIndices(node, occurrences);
    }
    
    return occurrences;
  }

  private findNode(pattern: string): SuffixTreeNode | null {
    let currentNode = this.root;
    let patternIndex = 0;

    while (patternIndex < pattern.length) {
      const char = pattern[patternIndex];
      const nextNode = currentNode.children.get(char);

      if (!nextNode) {
        return null;
      }

      const edgeLength = this.getEdgeLength(nextNode);
      
      for (let i = 0; i < edgeLength && patternIndex < pattern.length; i++) {
        if (this.text[nextNode.start + i] !== pattern[patternIndex]) {
          return null;
        }
        patternIndex++;
      }

      currentNode = nextNode;
    }

    return currentNode;
  }

  private collectLeafIndices(node: SuffixTreeNode, occurrences: number[]): void {
    if (node.leafIndex !== undefined) {
      occurrences.push(node.leafIndex);
    }

    for (const child of node.children.values()) {
      this.collectLeafIndices(child, occurrences);
    }
  }

  // Get the longest repeated substring
  getLongestRepeatedSubstring(): string {
    let result = { maxLength: 0, substring: '' };
    this.findLongestRepeatedSubstring(this.root, '', result);
    return result.substring;
  }

  private findLongestRepeatedSubstring(
    node: SuffixTreeNode, 
    currentString: string, 
    result: { maxLength: number; substring: string }
  ): void {
    // Count number of children (leaf nodes reached from this node)
    let leafCount = 0;
    const countLeaves = (n: SuffixTreeNode): number => {
      if (n.leafIndex !== undefined) return 1;
      let count = 0;
      for (const child of n.children.values()) {
        count += countLeaves(child);
      }
      return count;
    };

    for (const [char, child] of node.children.entries()) {
      const childString = currentString + this.text.substring(child.start, (child.end ?? this.position) + 1);
      const leavesBelow = countLeaves(child);

      // If multiple leaves below, this substring appears multiple times
      if (leavesBelow > 1 && childString.length > result.maxLength) {
        result.maxLength = childString.length;
        result.substring = childString;
      }

      this.findLongestRepeatedSubstring(child, childString, result);
    }
  }

  // Visualization helper (for debugging)
  printTree(node: SuffixTreeNode = this.root, depth: number = 0): void {
    const indent = '  '.repeat(depth);
    
    for (const [char, child] of node.children.entries()) {
      const substring = this.text.substring(child.start, (child.end ?? this.position) + 1);
      const leafInfo = child.leafIndex !== undefined ? ` [leaf: ${child.leafIndex}]` : '';
      console.log(`${indent}${char}: "${substring}"${leafInfo}`);
      this.printTree(child, depth + 1);
    }
  }
}
// Example usage
const text = "banana";
const suffixTree = new SuffixTree(text);

// Search for patterns
console.log(suffixTree.search("ana")); // true
console.log(suffixTree.search("ban")); // true
console.log(suffixTree.search("cat")); // false

// Find all occurrences
console.log(suffixTree.findAllOccurrences("ana")); // [1, 3]
console.log(suffixTree.findAllOccurrences("na")); // [2, 4]

// Get longest repeated substring
console.log(suffixTree.getLongestRepeatedSubstring()); // "ana"

// Print tree structure (for debugging)
suffixTree.printTree();
class SimpleSuffixTree {
  private root: SuffixTreeNode;
  private text: string;

  constructor(text: string) {
    this.text = text;
    this.root = this.createNode(-1, -1);
    this.buildNaive();
  }

  private buildNaive(): void {
    for (let i = 0; i < this.text.length; i++) {
      this.addSuffix(i, this.root);
    }
  }

  private addSuffix(suffixStart: number, node: SuffixTreeNode): void {
    let currentNode = node;
    let i = suffixStart;

    while (i < this.text.length) {
      const char = this.text[i];
      let child = currentNode.children.get(char);

      if (!child) {
        child = this.createNode(i);
        currentNode.children.set(char, child);
        break;
      }

      // Traverse the existing edge
      let j = child.start;
      while (j <= (child.end ?? this.text.length - 1) && i < this.text.length) {
        if (this.text[j] !== this.text[i]) {
          // Split needed
          const splitNode = this.createNode(child.start, j - 1);
          child.start = j;
          splitNode.children.set(this.text[j], child);
          currentNode.children.set(this.text[splitNode.start], splitNode);
          currentNode = splitNode;
          break;
        }
        j++;
        i++;
      }
      currentNode = child;
    }
  }

  private createNode(start: number, end?: number): SuffixTreeNode {
    return { children: new Map(), start, end };
  }
}
