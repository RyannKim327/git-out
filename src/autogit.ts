/********************************************************************
 * 1.  Node definition
 *******************************************************************/
class TreeNode<T> {
  constructor(
    public key: T,
    public left: TreeNode<T> | null = null,
    public right: TreeNode<T> | null = null
  ) {}
}

/********************************************************************
 * 2.  Comparator type
 *     Return < 0  if a < b
 *            > 0  if a > b
 *            0    if a === b
 *******************************************************************/
type Comparator<T> = (a: T, b: T) => number;

/********************************************************************
 * 3.  Binary Search Tree
 *******************************************************************/
class BinarySearchTree<T> {
  private root: TreeNode<T> | null = null;

  constructor(private compare: Comparator<T>) {}

  /******************** INSERT *************************************/
  insert(key: T): this {
    const node = new TreeNode(key);
    if (!this.root) {
      this.root = node;
      return this;
    }

    let curr: TreeNode<T> = this.root;
    while (true) {
      const cmp = this.compare(key, curr.key);
      if (cmp === 0) return this;          // duplicate keys ignored
      if (cmp < 0) {
        if (!curr.left) {
          curr.left = node;
          return this;
        }
        curr = curr.left;
      } else {
        if (!curr.right) {
          curr.right = node;
          return this;
        }
        curr = curr.right;
      }
    }
  }

  /******************** SEARCH *************************************/
  contains(key: T): boolean {
    return this.searchNode(this.root, key) !== null;
  }

  private searchNode(node: TreeNode<T> | null, key: T): TreeNode<T> | null {
    if (!node) return null;
    const cmp = this.compare(key, node.key);
    if (cmp === 0) return node;
    return cmp < 0
      ? this.searchNode(node.left, key)
      : this.searchNode(node.right, key);
  }

  /******************** DELETE *************************************/
  delete(key: T): boolean {
    const { node, parent } = this.findNodeAndParent(key);
    if (!node) return false;               // key not found
    this.deleteNode(node, parent);
    return true;
  }

  private findNodeAndParent(
    key: T
  ): { node: TreeNode<T> | null; parent: TreeNode<T> | null } {
    let parent: TreeNode<T> | null = null;
    let curr: TreeNode<T> | null = this.root;

    while (curr) {
      const cmp = this.compare(key, curr.key);
      if (cmp === 0) return { node: curr, parent };
      parent = curr;
      curr = cmp < 0 ? curr.left : curr.right;
    }
    return { node: null, parent };
  }

  private deleteNode(node: TreeNode<T>, parent: TreeNode<T> | null): void {
    // Case 1: two children → replace with in-order successor
    if (node.left && node.right) {
      const successor = this.minimumNode(node.right);
      const tempKey = successor.key;
      this.delete(tempKey);                // recurse to delete successor
      node.key = tempKey;                  // overwrite current node
      return;
    }

    // Case 2: leaf or single child
    const child = node.left || node.right;

    if (!parent) {
      this.root = child;                   // deleting root
    } else if (parent.left === node) {
      parent.left = child;
    } else {
      parent.right = child;
    }
  }

  private minimumNode(node: TreeNode<T>): TreeNode<T> {
    while (node.left) node = node.left;
    return node;
  }

  /******************** TRAVERSALS *********************************/
  inOrder(): T[]   { const out: T[] = []; this.inOrderWalk(this.root, out); return out; }
  preOrder(): T[]  { const out: T[] = []; this.preOrderWalk(this.root, out); return out; }
  postOrder(): T[] { const out: T[] = []; this.postOrderWalk(this.root, out); return out; }

  private inOrderWalk(node: TreeNode<T> | null, out: T[]): void {
    if (!node) return;
    this.inOrderWalk(node.left, out);
    out.push(node.key);
    this.inOrderWalk(node.right, out);
  }
  private preOrderWalk(node: TreeNode<T> | null, out: T[]): void {
    if (!node) return;
    out.push(node.key);
    this.preOrderWalk(node.left, out);
    this.preOrderWalk(node.right, out);
  }
  private postOrderWalk(node: TreeNode<T> | null, out: T[]): void {
    if (!node) return;
    this.postOrderWalk(node.left, out);
    this.postOrderWalk(node.right, out);
    out.push(node.key);
  }

  /******************** UTILS **************************************/
  isEmpty(): boolean { return this.root === null; }
  getRoot(): TreeNode<T> | null { return this.root; }
}

/********************************************************************
 * 4.  Convenience factory for numbers
 *******************************************************************/
const numberBST = () => new BinarySearchTree<number>((a, b) => a - b);

/********************************************************************
 * 5.  Quick demo
 *******************************************************************/
const bst = numberBST();
[50, 30, 70, 20, 40, 60, 80].forEach(n => bst.insert(n));

console.log("In-order:", bst.inOrder());   // [20,30,40,50,60,70,80]
console.log("Contains 60?", bst.contains(60)); // true
bst.delete(50);
console.log("After deleting 50:", bst.inOrder());
