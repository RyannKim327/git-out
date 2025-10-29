interface SuffixTreeNode {
  children: Map<string, SuffixTreeNode>;
  start: number;
  end?: number; // For internal nodes, end is undefined
  suffixLink?: SuffixTreeNode;
  index?: number; // For leaves, stores the starting index
}

class SuffixTree {
  private root: SuffixTreeNode;
  private text: string;
  
  constructor(text: string) {
    this.text = text;
    this.root = this.createNode(-1);
    this.buildSuffixTree();
  }

  private createNode(start: number): SuffixTreeNode {
    return {
      children: new Map(),
      start,
      suffixLink: undefined
    };
  }

  private buildSuffixTree(): void {
    const n = this.text.length;
    let activeNode = this.root;
    let activeEdge = '';
    let activeLength = 0;
    let remainingSuffixCount = 0;
    let lastNewNode: SuffixTreeNode | null = null;

    // Initialize root
    this.root.suffixLink = this.root;

    for (let i = 0; i < n; i++) {
      lastNewNode = null;
      remainingSuffixCount++;

      while (remainingSuffixCount > 0) {
        if (activeLength === 0) {
          activeEdge = this.text[i];
        }

        if (!activeNode.children.has(activeEdge)) {
          // Rule 2: Create new leaf node
          const leaf = this.createNode(i);
          leaf.index = i - activeLength;
          activeNode.children.set(activeEdge, leaf);
          
          if (lastNewNode !== null) {
            lastNewNode.suffixLink = activeNode;
            lastNewNode = null;
          }
        } else {
          const nextNode = activeNode.children.get(activeEdge)!;
          
          if (activeLength >= this.edgeLength(nextNode)) {
            activeNode = nextNode;
            activeLength -= this.edgeLength(nextNode);
            activeEdge = this.text[i - activeLength];
            continue;
          }

          // Rule 3: Current character already exists
          if (this.text[nextNode.start + activeLength] === this.text[i]) {
            if (lastNewNode !== null && activeNode !== this.root) {
              lastNewNode.suffixLink = activeNode;
              lastNewNode = null;
            }
            activeLength++;
            break;
          }

          // Rule 2: Split the edge
          const split = this.createNode(nextNode.start);
          split.children.set(
            this.text[nextNode.start + activeLength],
            this.createNode(nextNode.start + activeLength)
          );
          
          // Update the existing node
          nextNode.start += activeLength;
          split.children.set(this.text[nextNode.start], nextNode);
          
          // Create new leaf
          const leaf = this.createNode(i);
          leaf.index = i - activeLength;
          split.children.set(this.text[i], leaf);
          
          activeNode.children.set(activeEdge, split);
          
          if (lastNewNode !== null) {
            lastNewNode.suffixLink = split;
          }
          
          lastNewNode = split;
        }

        remainingSuffixCount--;
        
        if (activeNode === this.root && activeLength > 0) {
          activeLength--;
          activeEdge = this.text[i - remainingSuffixCount + 1];
        } else if (activeNode !== this.root) {
          activeNode = activeNode.suffixLink!;
        }
      }
    }
  }

  private edgeLength(node: SuffixTreeNode): number {
    return node.end ? node.end - node.start + 1 : this.text.length - node.start;
  }

  // Search for a pattern in the suffix tree
  search(pattern: string): number[] {
    const result: number[] = [];
    let currentNode = this.root;
    let patternIndex = 0;

    while (patternIndex < pattern.length) {
      const char = pattern[patternIndex];
      
      if (!currentNode.children.has(char)) {
        return result; // Pattern not found
      }

      currentNode = currentNode.children.get(char)!;
      const edgeLength = this.edgeLength(currentNode);
      
      for (let i = 0; i < edgeLength && patternIndex < pattern.length; i++, patternIndex++) {
        if (this.text[currentNode.start + i] !== pattern[patternIndex]) {
          return result; // Pattern not found
        }
      }
    }

    // Collect all indices from leaves in the subtree
    this.collectIndices(currentNode, result);
    return result.sort();
  }

  private collectIndices(node: SuffixTreeNode, indices: number[]): void {
    if (node.index !== undefined) {
      indices.push(node.index);
    }

    for (const child of node.children.values()) {
      this.collectIndices(child, indices);
    }
  }

  // Check if pattern exists
  contains(pattern: string): boolean {
    return this.search(pattern).length > 0;
  }

  // Get all suffixes (for demonstration)
  getAllSuffixes(): string[] {
    const suffixes: string[] = [];
    this.traverse(this.root, '', suffixes);
    return suffixes;
  }

  private traverse(node: SuffixTreeNode, current: string, suffixes: string[]): void {
    if (node.index !== undefined) {
      suffixes.push(current + this.text.substring(node.start));
    }

    for (const [char, child] of node.children.entries()) {
      const edge = this.text.substring(child.start, child.end ? child.end + 1 : undefined);
      this.traverse(child, current + edge, suffixes);
    }
  }
}
// Example usage
const text = "banana";
const suffixTree = new SuffixTree(text);

console.log("All suffixes:", suffixTree.getAllSuffixes());
console.log("Search 'ana':", suffixTree.search("ana")); // [1, 3]
console.log("Contains 'nan':", suffixTree.contains("nan")); // true
console.log("Contains 'apple':", suffixTree.contains("apple")); // false
class OptimizedSuffixTree {
  private root: SuffixTreeNode;
  private text: string;
  private last: SuffixTreeNode;

  constructor(text: string) {
    this.text = text + '$'; // Terminator character
    this.root = this.createNode(-1, -1);
    this.last = this.root;
    this.buildUkkonen();
  }

  private createNode(start: number, end: number): SuffixTreeNode {
    return {
      children: new Map(),
      start,
      end,
      suffixLink: this.root
    };
  }

  private buildUkkonen(): void {
    // Implementation of Ukkonen's algorithm
    // This is a simplified version - full implementation is complex
    let activeNode = this.root;
    let activeEdge = 0;
    let activeLength = 0;
    let remaining = 0;

    for (let i = 0; i < this.text.length; i++) {
      remaining++;
      let lastCreatedNode: SuffixTreeNode | null = null;

      while (remaining > 0) {
        // ... Ukkonen's algorithm logic
        // This would include rules 1-3 and suffix links management
      }
    }
  }
}
