interface SuffixTreeNode {
  children: Map<string, SuffixTreeNode>;
  start?: number;
  end?: number;
  suffixLink?: SuffixTreeNode;
}

class SuffixTree {
  private root: SuffixTreeNode;
  private text: string;
  
  constructor(text: string) {
    this.text = text + '$'; // Add terminal character
    this.root = { children: new Map() };
    this.buildSuffixTree();
  }

  // Active point representation for Ukkonen's algorithm
  private activeNode: SuffixTreeNode = this.root;
  private activeEdge: string = '';
  private activeLength: number = 0;
  private remainingSuffixes: number = 0;
  private lastNewNode: SuffixTreeNode | null = null;

  private buildSuffixTree(): void {
    let position = 0;
    
    for (let i = 0; i < this.text.length; i++) {
      this.extendSuffixTree(i);
    }
  }

  private extendSuffixTree(position: number): void {
    this.lastNewNode = null;
    this.remainingSuffixes++;
    
    while (this.remainingSuffixes > 0) {
      if (this.activeLength === 0) {
        this.activeEdge = this.text[position];
      }
      
      if (!this.activeNode.children.has(this.activeEdge)) {
        // Rule 2: Create new leaf
        this.activeNode.children.set(this.activeEdge, {
          children: new Map(),
          start: position,
          end: this.text.length - 1
        });
        
        if (this.lastNewNode !== null) {
          this.lastNewNode.suffixLink = this.activeNode;
          this.lastNewNode = null;
        }
      } else {
        const nextNode = this.activeNode.children.get(this.activeEdge)!;
        const edgeLength = this.getEdgeLength(nextNode);
        
        if (this.activeLength >= edgeLength) {
          this.activeNode = nextNode;
          this.activeLength -= edgeLength;
          this.activeEdge = this.text[position - this.activeLength];
          continue;
        }
        
        if (this.text[nextNode.start! + this.activeLength] === this.text[position]) {
          // Rule 3: Show stopper
          if (this.lastNewNode !== null && this.activeNode !== this.root) {
            this.lastNewNode.suffixLink = this.activeNode;
            this.lastNewNode = null;
          }
          this.activeLength++;
          break;
        }
        
        // Rule 2: Split edge
        const splitEnd = nextNode.start! + this.activeLength - 1;
        const splitNode: SuffixTreeNode = {
          children: new Map(),
          start: nextNode.start,
          end: splitEnd,
          suffixLink: this.root
        };
        
        // Update the existing node
        nextNode.start = splitEnd + 1;
        splitNode.children.set(this.text[nextNode.start!], nextNode);
        
        // Create new leaf for current character
        splitNode.children.set(this.text[position], {
          children: new Map(),
          start: position,
          end: this.text.length - 1
        });
        
        this.activeNode.children.set(this.activeEdge, splitNode);
        
        if (this.lastNewNode !== null) {
          this.lastNewNode.suffixLink = splitNode;
        }
        
        this.lastNewNode = splitNode;
      }
      
      this.remainingSuffixes--;
      
      if (this.activeNode === this.root && this.activeLength > 0) {
        this.activeLength--;
        this.activeEdge = this.text[position - this.remainingSuffixes + 1];
      } else if (this.activeNode !== this.root) {
        this.activeNode = this.activeNode.suffixLink || this.root;
      }
    }
  }

  private getEdgeLength(node: SuffixTreeNode): number {
    return (node.end! - node.start! + 1);
  }

  // Public methods for querying the suffix tree
  public search(pattern: string): boolean {
    return this.findNode(pattern) !== null;
  }

  public findAllOccurrences(pattern: string): number[] {
    const node = this.findNode(pattern);
    if (!node) return [];
    
    return this.getLeafIndices(node);
  }

  private findNode(pattern: string): SuffixTreeNode | null {
    let currentNode = this.root;
    let patternIndex = 0;
    
    while (patternIndex < pattern.length) {
      const char = pattern[patternIndex];
      
      if (!currentNode.children.has(char)) {
        return null;
      }
      
      currentNode = currentNode.children.get(char)!;
      const edgeLength = this.getEdgeLength(currentNode);
      const minLength = Math.min(edgeLength, pattern.length - patternIndex);
      
      for (let i = 0; i < minLength; i++) {
        if (this.text[currentNode.start! + i] !== pattern[patternIndex + i]) {
          return null;
        }
      }
      
      patternIndex += minLength;
    }
    
    return currentNode;
  }

  private getLeafIndices(node: SuffixTreeNode): number[] {
    const indices: number[] = [];
    
    const traverse = (currentNode: SuffixTreeNode) => {
      if (currentNode.children.size === 0) {
        // Leaf node
        indices.push(currentNode.start!);
      } else {
        for (const child of currentNode.children.values()) {
          traverse(child);
        }
      }
    };
    
    traverse(node);
    return indices.map(index => index - (this.text.length - 1 - index));
  }

  // Utility method to visualize the tree (for debugging)
  public printTree(): void {
    const printNode = (node: SuffixTreeNode, depth: number = 0): void => {
      const indent = '  '.repeat(depth);
      if (node.start !== undefined && node.end !== undefined) {
        const edge = this.text.substring(node.start, node.end + 1);
        console.log(`${indent}Edge: "${edge}" [${node.start}, ${node.end}]`);
      } else {
        console.log(`${indent}Root`);
      }
      
      for (const [char, child] of node.children) {
        console.log(`${indent}-> ${char}`);
        printNode(child, depth + 1);
      }
    };
    
    printNode(this.root);
  }
}

// Usage example
const suffixTree = new SuffixTree("banana");

// Search for patterns
console.log(suffixTree.search("ana")); // true
console.log(suffixTree.search("ban")); // true
console.log(suffixTree.search("nan")); // true
console.log(suffixTree.search("xyz")); // false

// Find all occurrences
console.log(suffixTree.findAllOccurrences("ana")); // [1, 3] (0-based indices)

// Visualize the tree structure
suffixTree.printTree();
class SimpleSuffixTree {
  private root: SuffixTreeNode;
  private text: string;

  constructor(text: string) {
    this.text = text;
    this.root = { children: new Map() };
    this.buildNaive();
  }

  // Naive O(n²) construction for smaller texts
  private buildNaive(): void {
    for (let i = 0; i < this.text.length; i++) {
      this.addSuffix(this.text.substring(i), i);
    }
  }

  private addSuffix(suffix: string, index: number): void {
    let currentNode = this.root;
    let i = 0;

    while (i < suffix.length) {
      const char = suffix[i];
      
      if (!currentNode.children.has(char)) {
        currentNode.children.set(char, {
          children: new Map(),
          start: index + i,
          end: this.text.length - 1
        });
        break;
      }
      
      const nextNode = currentNode.children.get(char)!;
      const edge = this.text.substring(nextNode.start!, nextNode.end! + 1);
      
      // Find common prefix
      let j = 0;
      while (j < edge.length && i + j < suffix.length && 
             edge[j] === suffix[i + j]) {
        j++;
      }

      if (j < edge.length) {
        // Split needed
        const splitNode: SuffixTreeNode = {
          children: new Map(),
          start: nextNode.start!,
          end: nextNode.start! + j - 1
        };

        // Update existing node
        nextNode.start! += j;
        splitNode.children.set(this.text[nextNode.start!], nextNode);

        // Add new suffix
        splitNode.children.set(suffix[i + j], {
          children: new Map(),
          start: index + i + j,
          end: this.text.length - 1
        });

        currentNode.children.set(char, splitNode);
        break;
      }

      currentNode = nextNode;
      i += j;
    }
  }

  public search(pattern: string): boolean {
    return this.traverse(pattern) !== null;
  }

  private traverse(pattern: string): SuffixTreeNode | null {
    let currentNode = this.root;
    let i = 0;

    while (i < pattern.length) {
      const char = pattern[i];
      
      if (!currentNode.children.has(char)) {
        return null;
      }

      currentNode = currentNode.children.get(char)!;
      const edge = this.text.substring(currentNode.start!, currentNode.end! + 1);
      
      for (let j = 0; j < edge.length && i < pattern.length; j++, i++) {
        if (edge[j] !== pattern[i]) {
          return null;
        }
      }
    }

    return currentNode;
  }
}
