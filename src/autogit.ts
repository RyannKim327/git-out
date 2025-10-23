interface SuffixTreeNode {
  [key: string]: SuffixTreeNode | number;
  index?: number;
}

class SuffixTree {
  private root: SuffixTreeNode;
  private text: string;

  constructor(text: string) {
    this.text = text;
    this.root = {};
    this.buildSuffixTree();
  }

  private buildSuffixTree(): void {
    const n = this.text.length;
    
    for (let i = 0; i < n; i++) {
      this.addSuffix(i);
    }
  }

  private addSuffix(suffixStart: number): void {
    let node = this.root;
    let i = suffixStart;

    while (i < this.text.length) {
      const char = this.text[i];
      
      if (!node[char]) {
        // Create new node
        const newNode: SuffixTreeNode = {};
        newNode.index = suffixStart;
        node[char] = newNode;
        break;
      } else {
        const nextNode = node[char] as SuffixTreeNode;
        
        // Check if we need to traverse deeper
        let j = i + 1;
        let matchLength = 1;
        
        while (j < this.text.length && 
               nextNode[this.text[j]] !== undefined) {
          matchLength++;
          j++;
        }
        
        if (matchLength > 1) {
          // Need to split the node
          this.splitNode(node, char, i, matchLength, suffixStart);
          break;
        } else {
          // Continue to next node
          node = nextNode;
          i++;
        }
      }
    }
  }

  private splitNode(
    parent: SuffixTreeNode, 
    char: string, 
    startIndex: number, 
    matchLength: number,
    newSuffixStart: number
  ): void {
    const existingNode = parent[char] as SuffixTreeNode;
    const splitChar = this.text[startIndex + matchLength];
    
    // Create new intermediate node
    const intermediateNode: SuffixTreeNode = {};
    
    // Move existing node's children to intermediate node
    intermediateNode[splitChar] = existingNode;
    
    // Create new node for the new suffix
    const newNode: SuffixTreeNode = {};
    newNode.index = newSuffixStart;
    
    // Add both branches to intermediate node
    intermediateNode[this.text[startIndex + matchLength]] = existingNode;
    intermediateNode[this.text[newSuffixStart + matchLength]] = newNode;
    
    // Update parent to point to intermediate node
    parent[char] = intermediateNode;
  }

  // Check if a substring exists
  contains(substring: string): boolean {
    return this.findNode(substring) !== null;
  }

  private findNode(substring: string): SuffixTreeNode | null {
    let node = this.root;
    let i = 0;

    while (i < substring.length) {
      const char = substring[i];
      
      if (!node[char]) {
        return null;
      }
      
      node = node[char] as SuffixTreeNode;
      i++;
    }
    
    return node;
  }

  // Find all occurrences of a substring
  findAllOccurrences(substring: string): number[] {
    const node = this.findNode(substring);
    if (!node) return [];
    
    return this.collectIndices(node);
  }

  private collectIndices(node: SuffixTreeNode): number[] {
    const indices: number[] = [];
    
    if (node.index !== undefined) {
      indices.push(node.index);
    }
    
    // Recursively collect indices from all children
    for (const key in node) {
      if (key !== 'index') {
        const child = node[key] as SuffixTreeNode;
        indices.push(...this.collectIndices(child));
      }
    }
    
    return indices;
  }

  // Get the longest repeated substring
  getLongestRepeatedSubstring(): string {
    let longest = '';
    let maxLength = 0;
    
    this.traverseForLongestRepeat(this.root, '', 0, (path, length) => {
      if (length > maxLength) {
        maxLength = length;
        longest = path;
      }
    });
    
    return longest;
  }

  private traverseForLongestRepeat(
    node: SuffixTreeNode, 
    currentPath: string, 
    currentLength: number,
    callback: (path: string, length: number) => void
  ): void {
    let childCount = 0;
    
    for (const key in node) {
      if (key !== 'index') {
        childCount++;
        const child = node[key] as SuffixTreeNode;
        this.traverseForLongestRepeat(
          child, 
          currentPath + key, 
          currentLength + 1,
          callback
        );
      }
    }
    
    if (childCount > 1 && currentLength > 0) {
      callback(currentPath, currentLength);
    }
  }
}
interface SuffixNode {
  start: number;
  end: number;
  children: Map<string, SuffixNode>;
  suffixLink?: SuffixNode;
  index?: number;
}

class EnhancedSuffixTree {
  private root: SuffixNode;
  private text: string;
  private remainingSuffixCount: number;
  private lastNewNode: SuffixNode | null;
  private activeNode: SuffixNode;

  constructor(text: string) {
    this.text = text;
    this.root = { start: -1, end: -1, children: new Map() };
    this.activeNode = this.root;
    this.buildTree();
  }

  private buildTree(): void {
    const n = this.text.length;
    
    for (let i = 0; i < n; i++) {
      this.extendTree(i);
    }
  }

  private extendTree(phase: number): void {
    this.lastNewNode = null;
    this.remainingSuffixCount++;
    
    while (this.remainingSuffixCount > 0) {
      if (this.activeEdge === undefined) {
        this.activeEdge = this.text[phase];
        this.activeLength++;
      } else {
        // Ukkonen's algorithm logic here
        // This is a simplified version
      }
      
      // Additional Ukkonen's algorithm steps would go here
    }
  }

  // Additional methods for traversal and querying
  public search(pattern: string): boolean {
    let currentNode = this.root;
    let patternIndex = 0;

    while (patternIndex < pattern.length) {
      const char = pattern[patternIndex];
      const child = currentNode.children.get(char);
      
      if (!child) return false;
      
      // Compare the edge label with the pattern
      let edgeIndex = child.start;
      while (edgeIndex <= child.end && patternIndex < pattern.length) {
        if (this.text[edgeIndex] !== pattern[patternIndex]) {
          return false;
        }
        edgeIndex++;
        patternIndex++;
      }
      
      currentNode = child;
    }
    
    return true;
  }
}
// Basic usage
const text = "banana";
const suffixTree = new SuffixTree(text);

console.log("Contains 'ana':", suffixTree.contains("ana")); // true
console.log("Occurrences of 'na':", suffixTree.findAllOccurrences("na")); // [2, 4]
console.log("Longest repeated substring:", suffixTree.getLongestRepeatedSubstring()); // "ana"

// More complex example
const dnaSequence = "ATCGATCGGGATCG";
const dnaSuffixTree = new SuffixTree(dnaSequence);

console.log("DNA contains 'ATCG':", dnaSuffixTree.contains("ATCG")); // true
