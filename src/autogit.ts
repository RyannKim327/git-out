type Vertex = number | string;               // any hashable identifier
type AdjList = Map<Vertex, Vertex[]>;        // vertex → list of outgoing neighbours
/**
 * Tarjan's algorithm – Strongly Connected Components
 *
 * Returns an array of SCCs, each SCC being an array of vertices.
 *
 * The algorithm runs in O(V + E) time and O(V) auxiliary space.
 */
export function tarjanSCC<V extends string | number>(graph: Map<V, V[]>): V[][] {
  // ---------- 1. bookkeeping ----------
  const indexMap = new Map<V, number>();   // discovery index of each vertex
  const lowlinkMap = new Map<V, number>(); // low‑link value of each vertex
  const onStack = new Set<V>();            // vertices currently on the stack
  const stack: V[] = [];                   // the DFS stack

  const sccs: V[][] = [];                  // result container
  let index = 0;                           // global discovery counter

  // ---------- 2. the recursive DFS ----------
  function strongConnect(v: V): void {
    // 2a. assign discovery index and low‑link, push onto stack
    indexMap.set(v, index);
    lowlinkMap.set(v, index);
    index++;
    stack.push(v);
    onStack.add(v);

    // 2b. explore all outgoing edges
    const neighbours = graph.get(v) ?? [];
    for (const w of neighbours) {
      if (!indexMap.has(w)) {
        // w has never been visited → recurse
        strongConnect(w);
        // after recursion: propagate low‑link value up
        lowlinkMap.set(
          v,
          Math.min(lowlinkMap.get(v)!, lowlinkMap.get(w)!)
        );
      } else if (onStack.has(w)) {
        // w is in the current SCC candidate → a back‑edge
        lowlinkMap.set(
          v,
          Math.min(lowlinkMap.get(v)!, indexMap.get(w)!)
        );
      }
      // else: w already assigned to an SCC and removed from stack → ignore
    }

    // 2c. If v is a root node, pop the stack to form an SCC
    if (lowlinkMap.get(v) === indexMap.get(v)) {
      const component: V[] = [];
      let w: V;
      do {
        w = stack.pop()!;
        onStack.delete(w);
        component.push(w);
      } while (w !== v);
      sccs.push(component);
    }
  }

  // ---------- 3. start DFS from every vertex ----------
  for (const v of graph.keys()) {
    if (!indexMap.has(v)) {
      strongConnect(v);
    }
  }

  return sccs;
}
import { tarjanSCC } from "./tarjan";

// Build a graph (example from CLRS)
const g = new Map<number, number[]>([
  [1, [2]],
  [2, [3, 5, 6]],
  [3, [4, 7]],
  [4, [3, 8]],
  [5, [1, 6]],
  [6, [7]],
  [7, [6]],
  [8, [4, 7]],
]);

const sccs = tarjanSCC(g);
console.log("Strongly Connected Components:");
for (const comp of sccs) {
  console.log(comp);
}

/* Expected output (order of components may differ):
Strongly Connected Components:
[ 6, 7 ]
[ 3, 4, 8 ]
[ 1, 2, 5 ]
*/
# If you use npm + ts-node
npm i -D ts-node typescript @types/node
npx ts-node example.ts
// tarjan.test.ts
import { tarjanSCC } from "./tarjan";

describe("Tarjan SCC", () => {
  test("single node", () => {
    const g = new Map<number, number[]>([[1, []]]);
    expect(tarjanSCC(g)).toEqual([[1]]);
  });

  test("two nodes, one direction", () => {
    const g = new Map<number, number[]>([[1, [2]], [2, []]]);
    expect(tarjanSCC(g)).toEqual([[2], [1]]);
  });

  test("two nodes, mutual edge", () => {
    const g = new Map<number, number[]>([[1, [2]], [2, [1]]]);
    const scc = tarjanSCC(g);
    // order inside a component is not important
    expect(scc).toHaveLength(1);
    expect(scc[0].sort()).toEqual([1, 2]);
  });

  test("complex graph (CLRS example)", () => {
    const g = new Map<number, number[]>([
      [1, [2]],
      [2, [3, 5, 6]],
      [3, [4, 7]],
      [4, [3, 8]],
      [5, [1, 6]],
      [6, [7]],
      [7, [6]],
      [8, [4, 7]],
    ]);
    const sccs = tarjanSCC(g);
    const sorted = sccs.map(c => c.sort()).sort((a, b) => a[0] - b[0]);
    expect(sorted).toEqual([[1, 2, 5], [3, 4, 8], [6, 7]]);
  });
});
npm i -D jest ts-jest @types/jest
npx jest
src/
│─ tarjan.ts          ← implementation (exported function)
│─ example.ts         ← demo script shown above
│─ tarjan.test.ts     ← Jest test suite
package.json
tsconfig.json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "commonjs",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "outDir": "dist"
  },
  "include": ["src"]
}
const sccs = tarjanSCC(yourAdjacencyMap); // O(V+E) time, returns array of SCCs
