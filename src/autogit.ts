// ---------- Graph data ----------------------------------------------------
type Graph = { [node: string]: number[] };   // e.g. { '0': [1, 2], '1': [2], ... }

// ---------- Tarjan's SCC implementation ----------------------------------
class TarjanSCC {
  private graph: Graph;            // the adjacency list
  private index = 0;               // incremental index counter
  private indices: Map<string, number> = new Map(); // node → index
  private lowlink: Map<string, number> = new Map(); // node → lowlink

  private stack: string[] = [];    // nodes currently on the recursion stack
  private onStack: Set<string> = new Set();

  private result: string[][] = []; // list of SCCs found

  constructor(g: Graph) {
    this.graph = g;
  }

  public run(): string[][] {
    // start DFS from every undiscovered node
    for (const node of Object.keys(this.graph)) {
      if (!this.indices.has(node)) {
        this.strongConnect(node);
      }
    }
    return this.result;
  }

  private strongConnect(v: string) {
    // set the depth index for v
    this.indices.set(v, this.index);
    this.lowlink.set(v, this.index);
    this.index += 1;

    this.stack.push(v);
    this.onStack.add(v);

    // consider successors of v
    for (const w of this.graph[v] ?? []) {
      if (!this.indices.has(w)) {
        // success: DFS tree edge
        this.strongConnect(w);
        this.lowlink.set(v, Math.min(
          this.lowlink.get(v)!,
          this.lowlink.get(w)!
        ));
      } else if (this.onStack.has(w)) {
        // back edge – strengthen lowlink
        this.lowlink.set(v, Math.min(
          this.lowlink.get(v)!,
          this.indices.get(w)!
        ));
      }
    }

    // If v is the root of an SCC, pop the stack
    if (this.lowlink.get(v) === this.indices.get(v)) {
      const component: string[] = [];
      let w: string;
      do {
        w = this.stack.pop()!;
        this.onStack.delete(w);
        component.push(w);
      } while (w !== v);
      this.result.push(component);
    }
  }
}
const graph: Graph = {
  '0': ['1'],
  '1': ['2', '3'],
  '2': ['0', '4'],
  '3': ['4'],
  '4': ['5'],
  '5': ['3', '6'],
  '6': ['7'],
  '7': ['5'],
};

const tarjan = new TarjanSCC(graph);
const sccs = tarjan.run();

console.log('Strongly connected components:');
sccs.forEach((comp, i) => console.log(`${i}: [${comp.join(', ')}]`));
Strongly connected components:
0: [6, 7, 5]
1: [0, 1, 2, 4, 3]
