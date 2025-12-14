interface SuffixTreeNode {
  children: Map<string, SuffixTreeNode>;
  start?: number;
  end?: number;
  suffixLink?: SuffixTreeNode;
}

class SuffixTree {
  private root: SuffixTreeNode;
  private text: string;
  private remainingSuffixCount: number = 0;
  private lastNewNode: SuffixTreeNode | null = null;
  private activeNode: SuffixTreeNode;
  private activeEdge: number = -1;
  private activeLength: number = 0;

  constructor(text: string) {
    this.text = text + '$'; // Add terminal character
    this.root = this.createNode();
    this.activeNode = this.root;
    this.build();
  }

  private createNode(start?: number, end?: number): SuffixTreeNode {
    return {
      children: new Map(),
      start,
      end,
      suffixLink: undefined
    };
  }

  private edgeLength(node: SuffixTreeNode): number {
    if (node.end === undefined || node.start === undefined) return 0;
    return Math.min(node.end, this.text.length) - node.start;
  }

  private walkDown(currentNode: SuffixTreeNode): boolean {
    const edgeLen = this.edgeLength(currentNode);
    
    if (this.activeLength >= edgeLen) {
      this.activeEdge += edgeLen;
      this.activeLength -= edgeLen;
      this.activeNode = currentNode;
      return true;
    }
    return false;
  }

  private extend(pos: number): void {
    this.lastNewNode = null;
    this.remainingSuffixCount++;
    
    while (this.remainingSuffixCount > 0) {
      if (this.activeLength === 0) {
        this.activeEdge = pos;
      }
      
      const currentChar = this.text[this.activeEdge];
      let nextNode = this.activeNode.children.get(currentChar);
      
      if (!nextNode) {
        // Create new leaf node
        nextNode = this.createNode(pos, Infinity);
        this.activeNode.children.set(currentChar, nextNode);
        
        if (this.lastNewNode) {
          this.lastNewNode.suffixLink = this.activeNode;
          this.lastNewNode = null;
        }
      } else {
        if (this.walkDown(nextNode)) {
          continue;
        }
        
        const nextChar = this.text[nextNode.start! + this.activeLength];
        if (nextChar === this.text[pos]) {
          if (this.lastNewNode && this.activeNode !== this.root) {
            this.lastNewNode.suffixLink = this.activeNode;
            this.lastNewNode = null;
          }
          this.activeLength++;
          break;
        }
        
        // Split the node
        const splitEnd = nextNode.start! + this.activeLength;
        const splitNode = this.createNode(nextNode.start!, splitEnd);
        this.activeNode.children.set(currentChar, splitNode);
        
        // Create new leaf node
        const leafNode = this.createNode(pos, Infinity);
        splitNode.children.set(this.text[pos], leafNode);
        
        // Update the existing node
        nextNode.start = splitEnd;
        splitNode.children.set(this.text[splitEnd], nextNode);
        
        if (this.lastNewNode) {
          this.lastNewNode.suffixLink = splitNode;
        }
        
        this.lastNewNode = splitNode;
      }
      
      this.remainingSuffixCount--;
      
      if (this.activeNode === this.root && this.activeLength > 0) {
        this.activeLength--;
        this.activeEdge = pos - this.remainingSuffixCount + 1;
      } else if (this.activeNode !== this.root) {
        this.activeNode = this.activeNode.suffixLink || this.root;
      }
    }
  }

  private build(): void {
    for (let i = 0; i < this.text.length; i++) {
      this.extend(i);
    }
  }

  // Search for a pattern in the suffix tree
  search(pattern: string): boolean {
    let currentNode = this.root;
    let patternIndex = 0;
    
    while (patternIndex < pattern.length) {
      const currentChar = pattern[patternIndex];
      const nextNode = currentNode.children.get(currentChar);
      
      if (!nextNode) {
        return false;
      }
      
      // Check the edge label
      const edgeStart = nextNode.start!;
      const edgeEnd = Math.min(nextNode.end!, this.text.length);
      const edgeLength = edgeEnd - edgeStart;
      
      for (let i = 0; i < edgeLength && patternIndex < pattern.length; i++) {
        if (this.text[edgeStart + i] !== pattern[patternIndex]) {
          return false;
        }
        patternIndex++;
      }
      
      currentNode = nextNode;
    }
    
    return true;
  }

  // Get all occurrences of a pattern
  findAllOccurrences(pattern: string): number[] {
    const occurrences: number[] = [];
    this.findAllOccurrencesHelper(this.root, pattern, 0, 0, occurrences);
    return occurrences;
  }

  private findAllOccurrencesHelper(
    node: SuffixTreeNode, 
    pattern: string, 
    patternIndex: number, 
    lengthSoFar: number,
    occurrences: number[]
  ): void {
    if (patternIndex === pattern.length) {
      // Found the pattern, now collect all leaf nodes
      this.collectLeafIndices(node, lengthSoFar, occurrences);
      return;
    }
    
    const currentChar = pattern[patternIndex];
    const nextNode = node.children.get(currentChar);
    
    if (!nextNode) return;
    
    const edgeStart = nextNode.start!;
    const edgeEnd = Math.min(nextNode.end!, this.text.length);
    const edgeLength = edgeEnd - edgeStart;
    
    for (let i = 0; i < edgeLength && patternIndex < pattern.length; i++) {
      if (this.text[edgeStart + i] !== pattern[patternIndex]) {
        return;
      }
      patternIndex++;
      lengthSoFar++;
    }
    
    this.findAllOccurrencesHelper(nextNode, pattern, patternIndex, lengthSoFar, occurrences);
  }

  private collectLeafIndices(node: SuffixTreeNode, length: number, occurrences: number[]): void {
    if (node.children.size === 0) {
      // Leaf node
      occurrences.push(this.text.length - length);
    }
    
    for (const child of node.children.values()) {
      const edgeLength = Math.min(child.end!, this.text.length) - child.start!;
      this.collectLeafIndices(child, length + edgeLength, occurrences);
    }
  }

  // Visualize the suffix tree (for debugging)
  visualize(): string {
    return this.visualizeHelper(this.root, 0);
  }

  private visualizeHelper(node: SuffixTreeNode, depth: number): string {
    let result = '';
    const indent = '  '.repeat(depth);
    
    for (const [char, child] of node.children) {
      const edgeLabel = this.text.substring(child.start!, Math.min(child.end!, this.text.length));
      result += `${indent}${char}: "${edgeLabel}"\n`;
      result += this.visualizeHelper(child, depth + 1);
    }
    
    return result;
  }
}
// Example usage
const text = "banana";
const suffixTree = new SuffixTree(text);

console.log("Suffix Tree Visualization:");
console.log(suffixTree.visualize());

console.log("\nSearch Results:");
console.log("Contains 'ana':", suffixTree.search("ana")); // true
console.log("Contains 'nan':", suffixTree.search("nan")); // true
console.log("Contains 'apple':", suffixTree.search("apple")); // false

console.log("\nAll occurrences of 'na':", suffixTree.findAllOccurrences("na"));
// Output: [4, 2] (positions where 'na' occurs)
interface EnhancedSuffixTreeNode extends SuffixTreeNode {
  index?: number; // For leaf nodes, stores the starting index
}

class EnhancedSuffixTree extends SuffixTree {
  private leafCount: number = 0;

  private createEnhancedNode(start?: number, end?: number): EnhancedSuffixTreeNode {
    return {
      ...this.createNode(start, end),
      index: undefined
    };
  }

  // Override extend to handle leaf indexing
  private enhancedExtend(pos: number): void {
    // Similar to extend but with leaf indexing
    // Implementation would track leaf nodes with their starting indices
  }

  // Find longest repeated substring
  findLongestRepeatedSubstring(): string {
    let longest = '';
    let maxLength = 0;
    
    const traverse = (node: SuffixTreeNode, currentString: string) => {
      if (node.children.size > 1 && currentString.length > maxLength) {
        longest = currentString;
        maxLength = currentString.length;
      }
      
      for (const [char, child] of node.children) {
        const edgeLabel = this.text.substring(child.start!, Math.min(child.end!, this.text.length));
        traverse(child, currentString + edgeLabel);
      }
    };
    
    traverse(this.root, '');
    return longest;
  }

  // Find longest common substring between two strings
  static findLongestCommonSubstring(str1: string, str2: string): string {
    const combined = str1 + '#' + str2 + '$';
    const tree = new EnhancedSuffixTree(combined);
    return tree.findLongestRepeatedSubstring();
  }
}

// Additional utility functions
class SuffixTreeUtils {
  // Build suffix array from suffix tree
  static buildSuffixArray(tree: SuffixTree): number[] {
    const suffixes: number[] = [];
    const traverse = (node: SuffixTreeNode, length: number) => {
      if (node.children.size === 0) {
        suffixes.push(tree.text.length - length);
      }
      
      for (const child of node.children.values()) {
        const edgeLength = Math.min(child.end!, tree.text.length) - child.start!;
        traverse(child, length + edgeLength);
      }
    };
    
    traverse(tree.root, 0);
    return suffixes.sort((a, b) => a - b);
  }
}
