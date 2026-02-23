type AdjacencyList = Record<string, string[]>;

/*
  Example:

  {
    A: ["B"],
    B: ["C", "E"],
    C: ["A", "D"],
    D: ["C"],
    E: ["F"],
    F: ["E", "G"],
    G: ["H"],
    H: ["I", "J"],
    I: ["H"],
    J: ["G"],
  }
*/
// TarjanSCC.ts
type AdjacencyList = Record<string, string[]>;

export function tarjanSCC(graph: AdjacencyList): string[][] {
  let index = 0;                         // global index counter
  const indices: Record<string, number> = {};   // vertex → index
  const lowlinks: Record<string, number> = {};  // vertex → lowlink
  const stack: string[] = [];
  const onStack: Record<string, boolean> = {};
  const sccs: string[][] = [];

  function strongConnect(v: string) {
    // 1. Set the depth index for v to the smallest unused index
    indices[v] = lowlinks[v] = index++;
    stack.push(v);
    onStack[v] = true;

    // 2. Consider successors of v
    const neighbours = graph[v] ?? [];
    for (const w of neighbours) {
      if (indices[w] === undefined) {
        // Successor w has not yet been visited; recurse on it
        strongConnect(w);
        lowlinks[v] = Math.min(lowlinks[v], lowlinks[w]);
      } else if (onStack[w]) {
        // Successor w is in stack → part of current SCC
        lowlinks[v] = Math.min(lowlinks[v], indices[w]);
      }
    }

    // 3. If v is a root node, pop the stack and generate an SCC
    if (lowlinks[v] === indices[v]) {
      const component: string[] = [];
      let w: string;
      do {
        w = stack.pop() as string;
        onStack[w] = false;
        component.push(w);
      } while (w !== v);
      sccs.push(component);
    }
  }

  // Kick off
  for (const v of Object.keys(graph)) {
    if (indices[v] === undefined) {
      strongConnect(v);
    }
  }

  return sccs;
}
import { tarjanSCC } from "./TarjanSCC";

const graph: AdjacencyList = {
  A: ["B"],
  B: ["C", "E"],
  C: ["A", "D"],
  D: ["C"],
  E: ["F"],
  F: ["E", "G"],
  G: ["H"],
  H: ["I", "J"],
  I: ["H"],
  J: ["G"],
};

const sccs = tarjanSCC(graph);
console.log("Strongly connected components:");
sccs.forEach((comp, idx) => {
  console.log(`  ${idx + 1}: [${comp.join(", ")}]`);
});
Strongly connected components:
  1: [A, B, C, D]
  2: [E, F]
  3: [G, H, I, J]
