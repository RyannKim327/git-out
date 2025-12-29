// A simple binary‑tree node
export class TreeNode<T = number> {
  value: T;
  left: TreeNode<T> | null = null;
  right: TreeNode<T> | null = null;

  constructor(value: T, left?: TreeNode<T> | null, right?: TreeNode<T> | null) {
    this.value = value;
    if (left) this.left = left;
    if (right) this.right = right;
  }
}
/**
 * Returns the diameter of the binary tree measured in **edges**.
 *
 * @param root - The root of the binary tree (or null for an empty tree)
 * @returns number of edges on the longest path between any two nodes
 */
export function treeDiameter<T>(root: TreeNode<T> | null): number {
  // `maxDiameter` is captured by the inner helper and updated whenever we
  // discover a longer path that passes through the current node.
  let maxDiameter = 0;

  /**
   * Post‑order DFS that returns the height of the subtree rooted at `node`.
   * Height = number of edges on the longest downward path to a leaf.
   */
  function height(node: TreeNode<T> | null): number {
    if (!node) return -1; // empty subtree → height = -1 so leaf height = 0

    const leftHeight = height(node.left);
    const rightHeight = height(node.right);

    // Path that goes left → node → right uses `leftHeight + rightHeight + 2` edges.
    // Since we store heights as edges, the candidate diameter is:
    const candidate = leftHeight + rightHeight + 2;
    if (candidate > maxDiameter) maxDiameter = candidate;

    // Return the height of this node (max of its children + 1 edge to child)
    return Math.max(leftHeight, rightHeight) + 1;
  }

  height(root);
  return maxDiameter;
}
export function treeDiameterInNodes<T>(root: TreeNode<T> | null): number {
  // Edge‑based diameter + 1 (unless the tree is empty)
  const edges = treeDiameter(root);
  return root ? edges + 1 : 0;
}
export function treeDiameterIterative<T>(root: TreeNode<T> | null): number {
  if (!root) return 0;

  // Stack for post‑order traversal: [node, visitedFlag]
  const stack: Array<[TreeNode<T>, boolean]> = [[root, false]];
  const heightMap = new Map<TreeNode<T>, number>();
  let maxDiameter = 0;

  while (stack.length) {
    const [node, visited] = stack.pop()!;

    if (!node) continue;

    if (visited) {
      // Children have already been processed → we can compute height
      const leftH = heightMap.get(node.left!) ?? -1;
      const rightH = heightMap.get(node.right!) ?? -1;

      const candidate = leftH + rightH + 2;
      if (candidate > maxDiameter) maxDiameter = candidate;

      heightMap.set(node, Math.max(leftH, rightH) + 1);
    } else {
      // Post‑order: push node again marked as visited, then its children
      stack.push([node, true]);
      if (node.right) stack.push([node.right, false]);
      if (node.left) stack.push([node.left, false]);
    }
  }

  return maxDiameter;
}
export function treeDiameterTwoBFS<T>(root: TreeNode<T> | null): number {
  if (!root) return 0;

  // 1️⃣ Build adjacency list (node → neighbors)
  const adj = new Map<TreeNode<T>, TreeNode<T>[]>();
  const stack: TreeNode<T>[] = [root];
  while (stack.length) {
    const node = stack.pop()!;
    const neighbors: TreeNode<T>[] = [];

    if (node.left) {
      neighbors.push(node.left);
      (adj.get(node.left) ?? []).push(node);
      stack.push(node.left);
    }
    if (node.right) {
      neighbors.push(node.right);
      (adj.get(node.right) ?? []).push(node);
      stack.push(node.right);
    }
    adj.set(node, neighbors);
  }

  // Helper: BFS returning [farthestNode, distance]
  function bfs(start: TreeNode<T>): [TreeNode<T>, number] {
    const visited = new Set<TreeNode<T>>();
    const queue: Array<[TreeNode<T>, number]> = [[start, 0]];
    visited.add(start);
    let farthest: TreeNode<T> = start;
    let maxDist = 0;

    while (queue.length) {
      const [cur, dist] = queue.shift()!;
      if (dist > maxDist) {
        maxDist = dist;
        farthest = cur;
      }
      for (const nb of adj.get(cur) ?? []) {
        if (!visited.has(nb)) {
          visited.add(nb);
          queue.push([nb, dist + 1]);
        }
      }
    }
    return [farthest, maxDist];
  }

  const [farNode] = bfs(root);          // any node → farthest node
  const [, diameterEdges] = bfs(farNode); // farthest from farNode = diameter
  return diameterEdges;
}
// ---------------------------------------------------------------
// Build a sample tree:
//
//          1
//        /   \
//       2     3
//      / \     \
//     4   5     6
//        / \
//       7   8
//
// The longest path is 7‑5‑2‑1‑3‑6 (5 edges, 6 nodes)
// ---------------------------------------------------------------
function buildSampleTree(): TreeNode<number> {
  const n7 = new TreeNode(7);
  const n8 = new TreeNode(8);
  const n5 = new TreeNode(5, n7, n8);
  const n4 = new TreeNode(4);
  const n2 = new TreeNode(2, n4, n5);
  const n6 = new TreeNode(6);
  const n3 = new TreeNode(3, null, n6);
  const root = new TreeNode(1, n2, n3);
  return root;
}

// Run all three implementations and log results
function demo() {
  const root = buildSampleTree();

  console.log('Recursive (edges):', treeDiameter(root));               // 5
  console.log('Recursive (nodes):', treeDiameterInNodes(root));        // 6
  console.log('Iterative (edges):', treeDiameterIterative(root));      // 5
  console.log('Two‑BFS (edges):', treeDiameterTwoBFS(root));           // 5
}

demo();
Recursive (edges): 5
Recursive (nodes): 6
Iterative (edges): 5
Two‑BFS (edges): 5
// tree-diameter.ts -------------------------------------------------
export class TreeNode<T = number> {
  value: T;
  left: TreeNode<T> | null = null;
  right: TreeNode<T> | null = null;

  constructor(value: T, left?: TreeNode<T> | null, right?: TreeNode<T> | null) {
    this.value = value;
    if (left) this.left = left;
    if (right) this.right = right;
  }
}

/**
 * Diameter measured in edges (recursive O(N) solution).
 */
export function treeDiameter<T>(root: TreeNode<T> | null): number {
  let maxDiameter = 0;
  function height(node: TreeNode<T> | null): number {
    if (!node) return -1;
    const left = height(node.left);
    const right = height(node.right);
    const candidate = left + right + 2;
    if (candidate > maxDiameter) maxDiameter = candidate;
    return Math.max(left, right) + 1;
  }
  height(root);
  return maxDiameter;
}

/**
 * Diameter measured in nodes (just edges + 1, unless empty).
 */
export function treeDiameterInNodes<T>(root: TreeNode<T> | null): number {
  const edges = treeDiameter(root);
  return root ? edges + 1 : 0;
}

/**
 * Iterative version (still O(N)).
 */
export function treeDiameterIterative<T>(root: TreeNode<T> | null): number {
  if (!root) return 0;
  const stack: Array<[TreeNode<T>, boolean]> = [[root, false]];
  const heightMap = new Map<TreeNode<T>, number>();
  let maxDiameter = 0;

  while (stack.length) {
    const [node, visited] = stack.pop()!;
    if (!node) continue;

    if (visited) {
      const leftH = heightMap.get(node.left!) ?? -1;
      const rightH = heightMap.get(node.right!) ?? -1;
      const candidate = leftH + rightH + 2;
      if (candidate > maxDiameter) maxDiameter = candidate;
      heightMap.set(node, Math.max(leftH, rightH) + 1);
    } else {
      stack.push([node, true]);
      if (node.right) stack.push([node.right, false]);
      if (node.left) stack.push([node.left, false]);
    }
  }
  return maxDiameter;
}

/**
 * Two‑BFS version (works for any tree shape).
 */
export function treeDiameterTwoBFS<T>(root: TreeNode<T> | null): number {
  if (!root) return 0;

  // Build adjacency list
  const adj = new Map<TreeNode<T>, TreeNode<T>[]>();
  const stack: TreeNode<T>[] = [root];
  while (stack.length) {
    const node = stack.pop()!;
    const neighbors: TreeNode<T>[] = [];

    if (node.left) {
      neighbors.push(node.left);
      (adj.get(node.left) ?? []).push(node);
      stack.push(node.left);
    }
    if (node.right) {
      neighbors.push(node.right);
      (adj.get(node.right) ?? []).push(node);
      stack.push(node.right);
    }
    adj.set(node, neighbors);
  }

  function bfs(start: TreeNode<T>): [TreeNode<T>, number] {
    const visited = new Set<TreeNode<T>>();
    const q: Array<[TreeNode<T>, number]> = [[start, 0]];
    visited.add(start);
    let far = start;
    let maxDist = 0;

    while (q.length) {
      const [cur, d] = q.shift()!;
      if (d > maxDist) {
        maxDist = d;
        far = cur;
      }
      for (const nb of adj.get(cur) ?? []) {
        if (!visited.has(nb)) {
          visited.add(nb);
          q.push([nb, d + 1]);
        }
      }
    }
    return [far, maxDist];
  }

  const [farNode] = bfs(root);
  const [, diameter] = bfs(farNode);
  return diameter;
}

// ---------------------------------------------------------------
// Example usage (uncomment to run with ts-node):
// ---------------------------------------------------------------
// function buildSample(): TreeNode<number> {
//   const n7 = new TreeNode(7);
//   const n8 = new TreeNode(8);
//   const n5 = new TreeNode(5, n7, n8);
//   const n4 = new TreeNode(4);
//   const n2 = new TreeNode(2, n4, n5);
//   const n6 = new TreeNode(6);
//   const n3 = new TreeNode(3, null, n6);
//   return new TreeNode(1, n2, n3);
// }
//
// const root = buildSample();
// console.log('Recursive (edges):', treeDiameter(root));          // 5
// console.log('Recursive (nodes):', treeDiameterInNodes(root));   // 6
// console.log('Iterative (edges):', treeDiameterIterative(root)); // 5
// console.log('Two‑BFS (edges):', treeDiameterTwoBFS(root));      // 5
npx ts-node tree-diameter.ts
