class TreeNode<T> {
  constructor(
    public value: T,
    public left: TreeNode<T> | null = null,
    public right: TreeNode<T> | null = null
  ) {}
}
class BinaryTree<T> {
  root: TreeNode<T> | null = null;

  // Insert value in the first spot found (just for demonstration).
  // A real BST would place it relative to its neighbors.
  insert(value: T): void {
    const node = new TreeNode(value);
    if (!this.root) {
      this.root = node;
      return;
    }
    this._insertRec(this.root, node);
  }

  private _insertRec(current: TreeNode<T>, node: TreeNode<T>): void {
    // Walk left first, then right, until you hit a null spot.
    if (!current.left) {
      current.left = node;
    } else if (!current.right) {
      current.right = node;
    } else {
      // Go deeper – we’re just doing breadth‑like insertion.
      this._insertRec(current.left, node);
    }
  }

  // Breadth‑first traversal (queue style) – returns array of values.
  bfs(): T[] {
    const result: T[] = [];
    if (!this.root) return result;

    const queue: TreeNode<T>[] = [this.root];
    while (queue.length) {
      const cur = queue.shift()!;
      result.push(cur.value);
      if (cur.left) queue.push(cur.left);
      if (cur.right) queue.push(cur.right);
    }
    return result;
  }

  // Depth‑first in‑order traversal (left, node, right)
  inorder(): T[] {
    const res: T[] = [];
    const visit = (node: TreeNode<T> | null) => {
      if (!node) return;
      visit(node.left);
      res.push(node.value);
      visit(node.right);
    };
    visit(this.root);
    return res;
  }

  // Simple depth counter
  depth(): number {
    const dfs = (node: TreeNode<T> | null): number =>
      !node ? 0 : 1 + Math.max(dfs(node.left), dfs(node.right));
    return dfs(this.root);
  }
}
const tree = new BinaryTree<number>();
[10, 5, 15, 3, 7, 12, 18].forEach(v => tree.insert(v));

console.log('BFS order:', tree.bfs());      // [10, 5, 15, 3, 7, 12, 18]
console.log('In‑order:', tree.inorder());    // [3, 5, 7, 10, 12, 15, 18]
console.log('Depth:', tree.depth());         // 3
interface Person { name: string; age: number; }
const people = new BinaryTree<Person>();
people.insert({name: 'Alice', age: 30});
