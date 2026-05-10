// ──────────────────────────────────────────────────────────────────────
// 1️⃣  Node definition
// ──────────────────────────────────────────────────────────────────────

export class TreeNode<T> {
  constructor(
    public value: T,
    public left: TreeNode<T> | null = null,
    public right: TreeNode<T> | null = null
  ) {}
}

// ──────────────────────────────────────────────────────────────────────
// 2️⃣  Binary‑Search‑Tree
// ──────────────────────────────────────────────────────────────────────

export class BinarySearchTree<T> {
  private root: TreeNode<T> | null = null;

  /* ----------------------------------------------------------------- */
  // basic insertion – assumes no duplicates
  /* ----------------------------------------------------------------- */
  insert(value: T): void {
    const newNode = new TreeNode(value);

    if (!this.root) {
      this.root = newNode;
      return;
    }

    let node: TreeNode<T> | null = this.root;
    while (node) {
      if (value < node.value) {
        if (!node.left) {
          node.left = newNode;
          break;
        }
        node = node.left;
      } else {
        if (!node.right) {
          node.right = newNode;
          break;
        }
        node = node.right;
      }
    }
  }

  /* ----------------------------------------------------------------- */
  // find a value – returns the node or null
  /* ----------------------------------------------------------------- */
  find(value: T): TreeNode<T> | null {
    let node = this.root;
    while (node) {
      if (value === node.value) return node;
      node = value < node.value ? node.left : node.right;
    }
    return null;
  }

  /* ----------------------------------------------------------------- */
  // In‑order traversal – returns array of values sorted (for BST)
  /* ----------------------------------------------------------------- */
  inorder(): T[] {
    const result: T[] = [];
    const stack: Array<TreeNode<T>> = [];
    let node = this.root;

    while (stack.length || node) {
      while (node) {
        stack.push(node);
        node = node.left!;
      }
      node = stack.pop()!;
      result.push(node.value);
      node = node.right!;
    }

    return result;
  }

  /* ----------------------------------------------------------------- */
  // Pre‑order (root, left, right)
  /* ----------------------------------------------------------------- */
  preorder(): T[] {
    if (!this.root) return [];
    const result: T[] = [];
    const stack: Array<TreeNode<T>> = [this.root];

    while (stack.length) {
      const node = stack.pop()!;
      result.push(node.value);

      // push right first so left is processed first
      if (node.right) stack.push(node.right);
      if (node.left) stack.push(node.left);
    }

    return result;
  }

  /* ----------------------------------------------------------------- */
  // Post‑order (left, right, root) – iterative with two stacks
  /* ----------------------------------------------------------------- */
  postorder(): T[] {
    const result: T[] = [];
    if (!this.root) return result;

    const stack1: TreeNode<T>[] = [this.root];
    const stack2: TreeNode<T>[] = [];

    while (stack1.length) {
      const node = stack1.pop()!;
      stack2.push(node);

      if (node.left) stack1.push(node.left);
      if (node.right) stack1.push(node.right);
    }

    while (stack2.length) {
      result.push(stack2.pop()!.value);
    }

    return result;
  }
}
import { BinarySearchTree } from "./bst";

const bst = new BinarySearchTree<number>();

[7, 3, 9, 1, 5, 8, 10].forEach(v => bst.insert(v));

console.log("In‑order (sorted):", bst.inorder());     // [1, 3, 5, 7, 8, 9, 10]
console.log("Pre‑order:", bst.preorder());            // [7, 3, 1, 5, 9, 8, 10]
console.log("Post‑order:", bst.postorder());          // [1, 5, 3, 8, 10, 9, 7]

console.log("Find 5:", bst.find(5)?.value);          // 5
console.log("Find 20:", bst.find(20));               // null
