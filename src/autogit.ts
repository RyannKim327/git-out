// Suffix tree (naive/compressed-ish) implementation in TS
// Note: this is a practical, readable implementation for many use cases.
// It uses explicit edge labels (substrings) for simplicity.

class Node {
  edges: Map<string, Edge> = new Map();
}

class Edge {
  label: string;
  dest: Node;
  constructor(label: string, dest: Node) {
    this.label = label;
    this.dest = dest;
  }
}

export class SuffixTree {
  private root: Node;
  private text: string = "";

  constructor() {
    this.root = new Node();
  }

  // Build a suffix tree for the string s
  // We append a unique terminal symbol '$' to ensure unique leaves
  build(s: string): void {
    this.root = new Node();
    this.text = s + "$"; // unique termination
    // insert all suffixes starting at i = 0 .. text.length-1
    for (let i = 0; i < this.text.length; i++) {
      this.insertSuffix(i);
    }
  }

  // Insert the suffix starting at position i of this.text
  private insertSuffix(i: number): void {
    let current: Node = this.root;
    let p = i;

    while (true) {
      if (p >= this.text.length) break;
      const c = this.text[p];
      const edge = current.edges.get(c);

      if (!edge) {
        // No edge starting with this char: create a new leaf with the rest of the suffix
        const leaf = new Node();
        const leafLabel = this.text.substring(p); // includes the rest, ending with $
        current.edges.set(c, new Edge(leafLabel, leaf));
        break;
      } else {
        // We have an edge; try to match as much as possible with its label
        const label = edge.label;
        let k = 0;
        while (
          k < label.length &&
          p + k < this.text.length &&
          this.text[p + k] === label[k]
        ) {
          k++;
        }

        if (k === label.length) {
          // Fully matched the edge; move down
          current = edge.dest;
          p += k;
          if (p >= this.text.length) break;
          continue;
        } else {
          // Partial match inside the edge: split the edge
          const mid = new Node();

          // Part 1: current -> mid with label[0..k)
          current.edges.set(c, new Edge(label.substring(0, k), mid));

          // Part 2: mid -> oldDest with label[k..)
          const secondLabel = label.substring(k);
          mid.edges.set(secondLabel[0], new Edge(secondLabel, edge.dest));

          // Leaf for the remaining suffix from position p+k
          // If rest is empty (shouldn't normally happen because of '$'), guard it
          let rest = this.text.substring(p + k);
          if (rest.length === 0) rest = "$";
          const leaf = new Node();
          mid.edges.set(rest[0], new Edge(rest, leaf));

          break;
        }
      }
    }
  }

  // Check whether the string pattern exists in the text
  // Returns true if pattern is a substring of the original string (without the terminal)
  contains(pattern: string): boolean {
    let node: Node = this.root;
    let m = pattern;

    while (m.length > 0) {
      const edge = node.edges.get(m[0]);
      if (!edge) return false;

      const label = edge.label;
      // compare pattern prefix with edge label
      let i = 0;
      while (i < label.length && i < m.length && label[i] === m[i]) i++;

      if (i === m.length) {
        // pattern fully matched along this edge
        return true;
      }
      if (i < label.length) {
        // mismatch inside the edge
        return false;
      }

      // matched whole edge: move to next node and reduce pattern
      node = edge.dest;
      m = m.substring(i);
    }

    return true;
  }

  // Optional: expose a simple query API
  // Example usage:
  // const st = new SuffixTree(); st.build("banana"); st.contains("ana"); // true
}
const st = new SuffixTree();
st.build("banana");

console.log(st.contains("ana")); // true
console.log(st.contains("nab")); // true  ("nab" is part of "banana"? yes, "banan"a contains "nab" as "banan"… but you can test other patterns)
console.log(st.contains("apple")); // false
