class SuffixTreeNode {
  children: Map<string, SuffixTreeNode>;
  start: number;
  end: number | null; // null represents the end of the string
  suffixLink: SuffixTreeNode | null;
  index: number; // for leaf nodes, stores the starting index of suffix

  constructor(start: number, end: number | null = null, index: number = -1) {
    this.children = new Map();
    this.start = start;
    this.end = end;
    this.suffixLink = null;
    this.index = index;
  }

  get length(): number {
    if (this.end === null) return 0;
    return this.end - this.start + 1;
  }
}

class SuffixTree {
  private root: SuffixTreeNode;
  private text: string;
  private remainingSuffixCount: number;
  private lastNewNode: SuffixTreeNode | null;
  private activeNode: SuffixTreeNode;
  private activeEdge: number;
  private activeLength: number;
  private globalEnd: number;

  constructor(text: string) {
    this.text = text;
    this.root = new SuffixTreeNode(-1, -1);
    this.remainingSuffixCount = 0;
    this.lastNewNode = null;
    this.activeNode = this.root;
    this.activeEdge = -1;
    this.activeLength = 0;
    this.globalEnd = -1;
    this.buildSuffixTree();
  }

  private buildSuffixTree(): void {
    const n = this.text.length;
    this.globalEnd = -1;
    
    // Build tree using Ukkonen's algorithm
    for (let i = 0; i < n; i++) {
      this.extendSuffixTree(i);
    }
  }

  private extendSuffixTree(pos: number): void {
    this.globalEnd = pos;
    this.remainingSuffixCount++;
    this.lastNewNode = null;

    while (this.remainingSuffixCount > 0) {
      if (this.activeLength === 0) {
        this.activeEdge = pos;
      }

      const activeEdgeChar = this.text[this.activeEdge];
      
      if (!this.activeNode.children.has(activeEdgeChar)) {
        // Rule 2: Create new leaf node
        const leafNode = new SuffixTreeNode(pos, this.globalEnd, pos - this.activeLength);
        this.activeNode.children.set(activeEdgeChar, leafNode);
        
        if (this.lastNewNode !== null) {
          this.lastNewNode.suffixLink = this.activeNode;
          this.lastNewNode = null;
        }
      } else {
        const nextNode = this.activeNode.children.get(activeEdgeChar)!;
        
        if (this.walkDown(nextNode)) {
          continue;
        }

        if (this.text[nextNode.start + this.activeLength] === this.text[pos]) {
          // Rule 3: Character already exists
          if (this.lastNewNode !== null && this.activeNode !== this.root) {
            this.lastNewNode.suffixLink = this.activeNode;
            this.lastNewNode = null;
          }
          
          this.activeLength++;
          break;
        }

        // Rule 2: Split the node
        const splitEnd = nextNode.start + this.activeLength - 1;
        const splitNode = new SuffixTreeNode(nextNode.start, splitEnd);
        
        // Update the existing node
        nextNode.start += this.activeLength;
        
        // Add the split node as child of active node
        this.activeNode.children.set(activeEdgeChar, splitNode);
        
        // Add the existing node as child of split node
        const existingNodeChar = this.text[nextNode.start];
        splitNode.children.set(existingNodeChar, nextNode);
        
        // Create new leaf node
        const leafNode = new SuffixTreeNode(pos, this.globalEnd, pos - this.activeLength);
        const newLeafChar = this.text[pos];
        splitNode.children.set(newLeafChar, leafNode);
        
        if (this.lastNewNode !== null) {
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

  private walkDown(node: SuffixTreeNode): boolean {
    if (this.activeLength >= node.length) {
      this.activeEdge += node.length;
      this.activeLength -= node.length;
      this.activeNode = node;
      return true;
    }
    return false;
  }

  // Public methods for querying the suffix tree
  public search(pattern: string): boolean {
    let currentNode = this.root;
    let patternIndex = 0;
    const n = pattern.length;

    while (patternIndex < n) {
      const currentChar = pattern[patternIndex];
      
      if (!currentNode.children.has(currentChar)) {
        return false;
      }

      const nextNode = currentNode.children.get(currentChar)!;
      const edgeLength = nextNode.length;
      
      for (let i = 0; i < edgeLength && patternIndex < n; i++) {
        if (this.text[nextNode.start + i] !== pattern[patternIndex]) {
          return false;
        }
        patternIndex++;
      }
      
      currentNode = nextNode;
    }
    
    return true;
  }

  public getAllSuffixes(): string[] {
    const suffixes: string[] = [];
    this.collectSuffixes(this.root, "", suffixes);
    return suffixes;
  }

  private collectSuffixes(node: SuffixTreeNode, currentString: string, suffixes: string[]): void {
    if (node.children.size === 0 && node.index !== -1) {
      suffixes.push(currentString);
      return;
    }

    for (const [char, child] of node.children) {
      const edgeString = this.text.substring(child.start, child.end !== null ? child.end + 1 : undefined);
      this.collectSuffixes(child, currentString + edgeString, suffixes);
    }
  }

  public printTree(): void {
    console.log("Suffix Tree Structure:");
    this.printNode(this.root, 0);
  }

  private printNode(node: SuffixTreeNode, depth: number): void {
    const indent = "  ".repeat(depth);
    
    if (node.children.size === 0) {
      console.log(`${indent}Leaf (index: ${node.index})`);
      return;
    }

    console.log(`${indent}Node:`);
    for (const [char, child] of node.children) {
      const edgeLabel = this.text.substring(child.start, child.end !== null ? child.end + 1 : undefined);
      console.log(`${indent}  Edge '${char}': "${edgeLabel}"`);
      this.printNode(child, depth + 2);
    }
  }
}

// Example usage
function demonstrateSuffixTree(): void {
  const text = "banana";
  const suffixTree = new SuffixTree(text);
  
  console.log("Text:", text);
  console.log("\nAll suffixes:");
  const suffixes = suffixTree.getAllSuffixes();
  suffixes.forEach((suffix, index) => {
    console.log(`  ${index + 1}. ${suffix}`);
  });
  
  console.log("\nSearch results:");
  const testPatterns = ["ana", "nan", "xyz", "ban"];
  testPatterns.forEach(pattern => {
    const found = suffixTree.search(pattern);
    console.log(`  Pattern "${pattern}": ${found ? "Found" : "Not found"}`);
  });
  
  console.log("\nTree structure:");
  suffixTree.printTree();
}

// Run the demonstration
demonstrateSuffixTree();
// Create a suffix tree
const tree = new SuffixTree("banana");

// Check if a pattern exists
console.log(tree.search("ana")); // true
console.log(tree.search("xyz")); // false

// Get all suffixes
const suffixes = tree.getAllSuffixes();
// ["a", "na", "ana", "nana", "anana", "banana"]

// Visualize the tree structure
tree.printTree();
