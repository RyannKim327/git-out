banana
anana
nana
ana
na
a
class SuffixTreeNode {
  children: Map<string, SuffixTreeNode> = new Map();
  start: number;
  end: { value: number }; // Using object approach for "end" to make leaf expansion easy
  suffixLink: SuffixTreeNode | null = null;

  constructor(start: number, end: { value: number }) {
    this.start = start;
    this.end = end;
  }
}

class SuffixTree {
  text: string;
  root: SuffixTreeNode;

  constructor(text: string) {
    this.text = text;
    this.root = new SuffixTreeNode(-1, { value: -1 });
    this.buildNaive();
  }

  // Naïve build: O(n^2) insertion
  buildNaive() {
    for (let i = 0; i < this.text.length; i++) {
      this.insertSuffix(i);
    }
  }

  insertSuffix(index: number) {
    let current = this.root;
    for (let i = index; i < this.text.length; i++) {
      const char = this.text[i];
      if (!current.children.has(char)) {
        current.children.set(
          char,
          new SuffixTreeNode(i, { value: this.text.length - 1 })
        );
        return;
      }
      current = current.children.get(char)!;
    }
  }

  // Utility to print tree
  print(node: SuffixTreeNode = this.root, depth = 0) {
    for (let [char, child] of node.children) {
      const label = this.text.substring(child.start, child.end.value + 1);
      console.log(" ".repeat(depth * 2) + char + " -> " + label);
      this.print(child, depth + 1);
    }
  }
}
const st = new SuffixTree("banana");
st.print();
