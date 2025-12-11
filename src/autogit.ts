interface SuffixTreeNode {
  children: Map<string, SuffixTreeNode>;
  start?: number;
  end?: number;
  suffixLink?: SuffixTreeNode;
}

class SuffixTree {
  private root: SuffixTreeNode;
  private text: string;
  private remainingSuffixCount: number;
  private lastNewNode: SuffixTreeNode | null;
  private activeNode: SuffixTreeNode;
  private activeEdge: number;
  private activeLength: number;
  private leafEnd: number;
  private rootEnd: number | null;
  private splitEnd: number | null;
  private size: number;

  constructor(text: string) {
    this.text = text;
    this.size = text.length;
    this.root = this.createNode(-1, -1);
    this.lastNewNode = null;
    this.activeNode = this.root;
    this.activeEdge = -1;
    this.activeLength = 0;
    this.remainingSuffixCount = 0;
    this.leafEnd = -1;
    this.rootEnd = null;
    this.splitEnd = null;

    this.buildSuffixTree();
  }

  private createNode(start: number, end: number): SuffixTreeNode {
    return {
      children: new Map(),
      start,
      end,
      suffixLink: this.root,
    };
  }

  private getEdgeLength(node: SuffixTreeNode): number {
    if (node === this.root) return 0;
    return (node.end ?? this.leafEnd) - node.start + 1;
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

  private extendSuffixTree(pos: number): void {
    this.leafEnd = pos;
    this.remainingSuffixCount++;
    this.lastNewNode = null;

    while (this.remainingSuffixCount > 0) {
      if (this.activeLength === 0) {
        this.activeEdge = pos;
      }

      const currentChar = this.text[this.activeEdge];
      
      if (!this.activeNode.children.has(currentChar)) {
        this.activeNode.children.set(
          currentChar,
          this.createNode(pos, this.leafEnd)
        );

        if (this.lastNewNode !== null) {
          this.lastNewNode.suffixLink = this.activeNode;
          this.lastNewNode = null;
        }
      } else {
        const next = this.activeNode.children.get(currentChar)!;
        
        if (this.walkDown(next)) {
          continue;
        }

        if (this.text[next.start + this.activeLength] === this.text[pos]) {
          if (this.lastNewNode !== null && this.activeNode !== this.root) {
            this.lastNewNode.suffixLink = this.activeNode;
            this.lastNewNode = null;
          }
          this.activeLength++;
          break;
        }

        this.splitEnd = next.start + this.activeLength - 1;
        const splitNode = this.createNode(next.start, this.splitEnd);

        this.activeNode.children.set(currentChar, splitNode);
        splitNode.children.set(
          this.text[pos],
          this.createNode(pos, this.leafEnd)
        );
        next.start += this.activeLength;
        splitNode.children.set(this.text[next.start], next);

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
        this.activeNode = this.activeNode.suffixLink!;
      }
    }
  }

  private buildSuffixTree(): void {
    for (let i = 0; i < this.size; i++) {
      this.extendSuffixTree(i);
    }
  }

  // Public methods
  public search(pattern: string): boolean {
    return this.findSubstring(this.root, pattern, 0) !== null;
  }

  private findSubstring(node: SuffixTreeNode, pattern: string, index: number): SuffixTreeNode | null {
    if (index === pattern.length) {
      return node;
    }

    const char = pattern[index];
    if (!node.children.has(char)) {
      return null;
    }

    const child = node.children.get(char)!;
    const edgeLength = Math.min(
      this.getEdgeLength(child),
      pattern.length - index
    );

    for (let i = 0; i < edgeLength; i++) {
      if (this.text[child.start + i] !== pattern[index + i]) {
        return null;
      }
    }

    if (edgeLength === pattern.length - index) {
      return child;
    }

    return this.findSubstring(child, pattern, index + edgeLength);
  }

  public getAllSuffixes(): string[] {
    const suffixes: string[] = [];
    this.collectSuffixes(this.root, "", suffixes);
    return suffixes;
  }

  private collectSuffixes(node: SuffixTreeNode, current: string, suffixes: string[]): void {
    if (node.children.size === 0) {
      suffixes.push(current);
      return;
    }

    for (const [char, child] of node.children) {
      const edge = this.text.substring(child.start, (child.end ?? this.leafEnd) + 1);
      this.collectSuffixes(child, current + edge, suffixes);
    }
  }

  public getLongestRepeatedSubstring(): string {
    let result = "";
    this.findLongestRepeatedSubstring(this.root, "", result);
    return result;
  }

  private findLongestRepeatedSubstring(node: SuffixTreeNode, current: string, result: string): void {
    if (node.children.size > 1 && current.length > result.length) {
      result = current;
    }

    for (const [char, child] of node.children) {
      const edge = this.text.substring(child.start, (child.end ?? this.leafEnd) + 1);
      this.findLongestRepeatedSubstring(child, current + edge, result);
    }
  }

  public printTree(): void {
    this.printNode(this.root, 0);
  }

  private printNode(node: SuffixTreeNode, depth: number): void {
    const indent = " ".repeat(depth * 2);
    
    if (node === this.root) {
      console.log(`${indent}Root`);
    } else {
      const edge = this.text.substring(node.start, (node.end ?? this.leafEnd) + 1);
      console.log(`${indent}Edge: "${edge}" [${node.start}, ${node.end ?? this.leafEnd}]`);
    }

    for (const [char, child] of node.children) {
      this.printNode(child, depth + 1);
    }
  }
}
// Example usage
const text = "banana$";
const suffixTree = new SuffixTree(text);

console.log("Suffix Tree for:", text);
suffixTree.printTree();

console.log("\nAll suffixes:");
console.log(suffixTree.getAllSuffixes());

console.log("\nSearch results:");
console.log("Contains 'ana':", suffixTree.search("ana")); // true
console.log("Contains 'ban':", suffixTree.search("ban")); // true
console.log("Contains 'xyz':", suffixTree.search("xyz")); // false

console.log("\nLongest repeated substring:");
console.log(suffixTree.getLongestRepeatedSubstring()); // "ana"
class SimplifiedSuffixTree {
  private root: Node;
  private text: string;

  constructor(text: string) {
    this.text = text + '$'; // Add terminal character
    this.root = { children: new Map(), start: -1, end: -1 };
    this.buildTree();
  }

  private buildTree(): void {
    for (let i = 0; i < this.text.length; i++) {
      this.addSuffix(i);
    }
  }

  private addSuffix(suffixStart: number): void {
    let currentNode = this.root;
    let i = suffixStart;

    while (i < this.text.length) {
      const currentChar = this.text[i];
      
      if (!currentNode.children.has(currentChar)) {
        // Create new leaf node
        currentNode.children.set(
          currentChar,
          { children: new Map(), start: i, end: this.text.length - 1 }
        );
        return;
      }

      const childNode = currentNode.children.get(currentChar)!;
      const edgeLength = childNode.end - childNode.start + 1;
      
      // Compare characters along the edge
      let j = 0;
      while (j < edgeLength && i + j < this.text.length && 
             this.text[childNode.start + j] === this.text[i + j]) {
        j++;
      }

      if (j < edgeLength) {
        // Split the edge
        const splitNode = {
          children: new Map(),
          start: childNode.start,
          end: childNode.start + j - 1
        };
        
        // Update the original child node
        childNode.start += j;
        splitNode.children.set(this.text[childNode.start], childNode);
        
        // Add new leaf for the remaining suffix
        splitNode.children.set(
          this.text[i + j],
          { children: new Map(), start: i + j, end: this.text.length - 1 }
        );
        
        currentNode.children.set(this.text[splitNode.start], splitNode);
        return;
      } else {
        // Move to next node
        currentNode = childNode;
        i += edgeLength;
      }
    }
  }
}

interface Node {
  children: Map<string, Node>;
  start: number;
  end: number;
}
