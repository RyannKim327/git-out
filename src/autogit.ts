// Node interface for the suffix tree
interface SuffixTreeNode {
  children: Map<string, SuffixTreeNode>;
  start?: number;        // Start index of the edge label in the original text
  end?: number;          // End index of the edge label (-1 for leaf nodes)
  suffixLink?: SuffixTreeNode; // Suffix link pointer
  isLeaf: boolean;
}

// Suffix Tree class
class SuffixTree {
  private root: SuffixTreeNode;
  private text: string;
  private remainingSuffixCount: number = 0;
  private lastNewNode: SuffixTreeNode | null = null;
  private activeNode: SuffixTreeNode;
  private activeEdge: number = -1;
  private activeLength: number = 0;
  private size: number = -1; // Length of the input text

  constructor(text: string) {
    this.text = text + '$'; // Add terminal character
    this.size = this.text.length;
    this.root = this.createNode(-1, -1);
    this.root.suffixLink = this.root;
    this.activeNode = this.root;
    
    this.buildSuffixTree();
  }

  // Create a new node
  private createNode(start: number, end: number): SuffixTreeNode {
    const node: SuffixTreeNode = {
      children: new Map(),
      start: start,
      end: end,
      suffixLink: undefined,
      isLeaf: end === -1
    };
    return node;
  }

  // Get the length of an edge
  private edgeLength(node: SuffixTreeNode): number {
    if (node.isLeaf) {
      return this.size - (node.start ?? 0);
    }
    return (node.end ?? 0) - (node.start ?? 0) + 1;
  }

  // Walk down the tree (canonize function)
  private walkDown(currentNode: SuffixTreeNode): boolean {
    const edgeLength = this.edgeLength(currentNode);
    
    if (this.activeLength >= edgeLength) {
      this.activeEdge += edgeLength;
      this.activeLength -= edgeLength;
      this.activeNode = currentNode;
      return true;
    }
    return false;
  }

  // Extend the suffix tree (phase i)
  private extendSuffixTree(pos: number): void {
    this.lastNewNode = null;
    this.remainingSuffixCount++;
    
    while (this.remainingSuffixCount > 0) {
      if (this.activeLength === 0) {
        this.activeEdge = pos;
      }

      const currentChar = this.text[this.activeEdge];
      let nextNode = this.activeNode.children.get(currentChar);

      if (!nextNode) {
        // Rule 2: No outgoing edge starting with activeEdge, create a new leaf
        const leaf = this.createNode(pos, -1);
        this.activeNode.children.set(currentChar, leaf);
        
        if (this.lastNewNode) {
          this.lastNewNode.suffixLink = this.activeNode;
          this.lastNewNode = null;
        }
      } else {
        // Rule 3: The path already exists
        if (this.walkDown(nextNode)) {
          continue;
        }

        const nextChar = this.text[pos];
        const currentEnd = nextNode.isLeaf ? pos : (nextNode.end ?? 0);
        
        if (this.text[(nextNode.start ?? 0) + this.activeLength] === nextChar) {
          // Rule 3: Character already exists
          if (this.lastNewNode && this.activeNode !== this.root) {
            this.lastNewNode.suffixLink = this.activeNode;
            this.lastNewNode = null;
          }
          this.activeLength++;
          break;
        }

        // Rule 2: Split the edge
        const splitEnd = (nextNode.start ?? 0) + this.activeLength - 1;
        const splitNode = this.createNode(nextNode.start ?? 0, splitEnd);
        
        this.activeNode.children.set(currentChar, splitNode);
        
        // Create new leaf for the new suffix
        const leaf = this.createNode(pos, -1);
        splitNode.children.set(nextChar, leaf);
        
        // Update the original node
        nextNode.start = (nextNode.start ?? 0) + this.activeLength;
        splitNode.children.set(this.text[nextNode.start ?? 0], nextNode);
        
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
        this.activeNode = this.activeNode.suffixLink ?? this.root;
      }
    }
  }

  // Build the complete suffix tree using Ukkonen's algorithm
  private buildSuffixTree(): void {
    for (let i = 0; i < this.size; i++) {
      this.extendSuffixTree(i);
    }
  }

  // Public method to check if a pattern exists in the text
  public search(pattern: string): boolean {
    return this.findNode(pattern) !== null;
  }

  // Find the node corresponding to a pattern
  private findNode(pattern: string): SuffixTreeNode | null {
    let currentNode = this.root;
    let patternIndex = 0;

    while (patternIndex < pattern.length) {
      const currentChar = pattern[patternIndex];
      const nextNode = currentNode.children.get(currentChar);
      
      if (!nextNode) {
        return null;
      }

      // Check the edge label
      const edgeStart = nextNode.start ?? 0;
      const edgeEnd = nextNode.isLeaf ? this.size - 1 : (nextNode.end ?? 0);
      const edgeLength = edgeEnd - edgeStart + 1;
      
      for (let i = 0; i < edgeLength && patternIndex < pattern.length; i++) {
        if (this.text[edgeStart + i] !== pattern[patternIndex]) {
          return null;
        }
        patternIndex++;
      }

      currentNode = nextNode;
    }

    return currentNode;
  }

  // Get all occurrences of a pattern
  public findAllOccurrences(pattern: string): number[] {
    const node = this.findNode(pattern);
    if (!node) return [];

    const occurrences: number[] = [];
    this.collectLeafIndices(node, occurrences);
    return occurrences.sort((a, b) => a - b);
  }

  // Collect all leaf indices under a node
  private collectLeafIndices(node: SuffixTreeNode, occurrences: number[]): void {
    if (node.isLeaf) {
      occurrences.push((node.start ?? 0) - (this.text.length - this.size));
      return;
    }

    for (const child of node.children.values()) {
      this.collectLeafIndices(child, occurrences);
    }
  }

  // Print the suffix tree (for debugging)
  public printTree(node: SuffixTreeNode = this.root, depth: number = 0): void {
    const indent = '  '.repeat(depth);
    
    if (node === this.root) {
      console.log(`${indent}ROOT`);
    } else {
      const edgeLabel = this.text.substring(node.start ?? 0, 
        node.isLeaf ? this.size : (node.end ?? 0) + 1);
      console.log(`${indent}"${edgeLabel}" [${node.start}, ${node.isLeaf ? '∞' : node.end}]`);
    }

    for (const [char, child] of node.children) {
      console.log(`${indent} -> "${char}":`);
      this.printTree(child, depth + 1);
    }
  }

  // Get the original text (without terminal character)
  public getText(): string {
    return this.text.slice(0, -1); // Remove the '$'
  }
}
// Example usage
const suffixTree = new SuffixTree("banana");

// Search for patterns
console.log(suffixTree.search("ana")); // true
console.log(suffixTree.search("ban")); // true
console.log(suffixTree.search("apple")); // false

// Find all occurrences
console.log(suffixTree.findAllOccurrences("ana")); // [1, 3]
console.log(suffixTree.findAllOccurrences("na")); // [2, 4]

// Print the tree structure
suffixTree.printTree();

// More complex example
const dnaTree = new SuffixTree("ATCGATCGATCG");
console.log(dnaTree.search("TCG")); // true
console.log(dnaTree.findAllOccurrences("ATCG")); // [0, 4, 8]
class SimpleSuffixTree {
  private root: Map<string, any>;
  private text: string;

  constructor(text: string) {
    this.text = text;
    this.root = new Map();
    this.buildTree();
  }

  private buildTree(): void {
    // Add all suffixes to the tree
    for (let i = 0; i < this.text.length; i++) {
      this.addSuffix(this.text.substring(i), i);
    }
  }

  private addSuffix(suffix: string, index: number): void {
    let currentNode = this.root;
    
    for (const char of suffix) {
      if (!currentNode.has(char)) {
        currentNode.set(char, new Map());
      }
      currentNode = currentNode.get(char);
    }
    
    // Mark the end of suffix with the starting index
    if (!currentNode.has('$')) {
      currentNode.set('$', []);
    }
    currentNode.get('$').push(index);
  }

  public search(pattern: string): boolean {
    let currentNode = this.root;
    
    for (const char of pattern) {
      if (!currentNode.has(char)) {
        return false;
      }
      currentNode = currentNode.get(char);
    }
    
    return true;
  }

  public findAllOccurrences(pattern: string): number[] {
    let currentNode = this.root;
    
    for (const char of pattern) {
      if (!currentNode.has(char)) {
        return [];
      }
      currentNode = currentNode.get(char);
    }
    
    // Collect all indices from leaf nodes
    const indices: number[] = [];
    this.collectIndices(currentNode, indices);
    return indices.sort((a, b) => a - b);
  }

  private collectIndices(node: Map<string, any>, indices: number[]): void {
    if (node.has('$')) {
      indices.push(...node.get('$'));
    }
    
    for (const [key, child] of node) {
      if (key !== '$') {
        this.collectIndices(child, indices);
      }
    }
  }
}
