interface SuffixTreeNode {
  [key: string]: SuffixTreeNode;
  index?: number; // For leaf nodes
}

class SuffixTree {
  private root: SuffixTreeNode;
  private text: string;
  
  constructor(text: string) {
    this.root = {};
    this.text = text;
    this.buildSuffixTree();
  }

  private buildSuffixTree(): void {
    const n = this.text.length;
    let activeNode = this.root;
    let activeEdge = -1;
    let activeLength = 0;
    let remainingSuffixCount = 0;
    let lastNewNode: SuffixTreeNode | null = null;
    
    // Initialize root
    this.root = {};
    
    for (let i = 0; i < n; i++) {
      remainingSuffixCount++;
      lastNewNode = null;
      
      while (remainingSuffixCount > 0) {
        if (activeLength === 0) {
          activeEdge = i;
        }
        
        const currentChar = this.text[i];
        
        if (!activeNode[this.text[activeEdge]]) {
          // Create new leaf node
          activeNode[this.text[activeEdge]] = {
            index: i - activeLength
          };
          remainingSuffixCount--;
          
          if (lastNewNode !== null) {
            lastNewNode['suffixLink'] = activeNode;
            lastNewNode = null;
          }
        } else {
          const nextNode = activeNode[this.text[activeEdge]];
          
          if (activeLength >= this.getEdgeLength(nextNode, i)) {
            activeEdge += this.getEdgeLength(nextNode, i);
            activeLength -= this.getEdgeLength(nextNode, i);
            activeNode = nextNode;
            continue;
          }
          
          if (this.text[this.getStartIndex(nextNode) + activeLength] === currentChar) {
            activeLength++;
            
            if (lastNewNode !== null && activeNode !== this.root) {
              lastNewNode['suffixLink'] = activeNode;
              lastNewNode = null;
            }
            break;
          }
          
          // Split the node
          const splitIndex = this.getStartIndex(nextNode) + activeLength;
          const splitChar = this.text[splitIndex];
          
          const splitNode: SuffixTreeNode = {
            [this.text[splitIndex]]: nextNode,
            index: nextNode.index
          };
          
          delete nextNode.index;
          nextNode[splitChar] = splitNode;
          
          // Create new leaf node
          splitNode[currentChar] = {
            index: i
          };
          
          activeNode[this.text[activeEdge]] = splitNode;
          
          if (lastNewNode !== null) {
            lastNewNode['suffixLink'] = splitNode;
          }
          
          lastNewNode = splitNode;
          remainingSuffixCount--;
        }
        
        if (activeNode === this.root && activeLength > 0) {
          activeLength--;
          activeEdge = i - remainingSuffixCount + 1;
        } else if (activeNode !== this.root) {
          activeNode = activeNode['suffixLink'] || this.root;
        }
      }
    }
  }

  private getEdgeLength(node: SuffixTreeNode, pos: number): number {
    if (node.index !== undefined) {
      return this.text.length - node.index;
    }
    // For internal nodes, we need to calculate based on children
    // This is a simplified implementation
    return 1;
  }

  private getStartIndex(node: SuffixTreeNode): number {
    if (node.index !== undefined) {
      return node.index;
    }
    // For internal nodes, find the minimum index from children
    return this.findMinIndex(node);
  }

  private findMinIndex(node: SuffixTreeNode): number {
    let minIndex = Infinity;
    for (const key in node) {
      if (key !== 'suffixLink' && key !== 'index') {
        const child = node[key];
        const childIndex = child.index !== undefined ? child.index : this.findMinIndex(child);
        minIndex = Math.min(minIndex, childIndex);
      }
    }
    return minIndex;
  }

  // Public method to check if a substring exists
  public contains(substring: string): boolean {
    return this.findNode(substring) !== null;
  }

  private findNode(pattern: string): SuffixTreeNode | null {
    let currentNode = this.root;
    let i = 0;
    
    while (i < pattern.length) {
      const char = pattern[i];
      if (!currentNode[char]) {
        return null;
      }
      
      currentNode = currentNode[char];
      
      if (currentNode.index !== undefined) {
        // We're at a leaf node, check if the remaining pattern matches
        const remainingPattern = pattern.substring(i);
        const remainingText = this.text.substring(currentNode.index);
        return remainingText.startsWith(remainingPattern) ? currentNode : null;
      }
      
      i++;
    }
    
    return currentNode;
  }

  // Find all occurrences of a pattern
  public findAllOccurrences(pattern: string): number[] {
    const node = this.findNode(pattern);
    if (!node) return [];
    
    return this.collectIndices(node);
  }

  private collectIndices(node: SuffixTreeNode): number[] {
    const indices: number[] = [];
    
    if (node.index !== undefined) {
      indices.push(node.index);
    }
    
    for (const key in node) {
      if (key !== 'suffixLink' && key !== 'index') {
        indices.push(...this.collectIndices(node[key]));
      }
    }
    
    return indices;
  }
}

// Usage Example
const text = "banana";
const suffixTree = new SuffixTree(text);

console.log("Contains 'ana':", suffixTree.contains("ana")); // true
console.log("Occurrences of 'na':", suffixTree.findAllOccurrences("na")); // [2, 4]
class SuffixTrie {
  private root: TrieNode;
  
  constructor(text: string) {
    this.root = {};
    this.buildTrie(text);
  }

  private buildTrie(text: string): void {
    for (let i = 0; i < text.length; i++) {
      this.insertSuffix(text.substring(i), i);
    }
  }

  private insertSuffix(suffix: string, index: number): void {
    let node = this.root;
    
    for (const char of suffix) {
      if (!node[char]) {
        node[char] = {};
      }
      node = node[char];
    }
    
    node['$'] = index; // Mark end of suffix with original index
  }

  public contains(substring: string): boolean {
    let node = this.root;
    
    for (const char of substring) {
      if (!node[char]) return false;
      node = node[char];
    }
    
    return true;
  }
}

interface TrieNode {
  [key: string]: TrieNode | number;
}

// Usage
const trie = new SuffixTrie("banana");
console.log("Contains 'nan':", trie.contains("nan")); // true
