// 1️⃣  Generic node type
class TreeNode<T> {
  value: T;
  left: TreeNode<T> | null = null;
  right: TreeNode<T> | null = null;

  constructor(value: T) {
    this.value = value;
  }
}

// 2️⃣  BinaryTree class
class BinaryTree<T> {
  root: TreeNode<T> | null = null;

  // Insert a value – keeps the tree *ordered* (BST rule)
  insert(value: T, comparator: (a: T, b: T) => number) {
    const newNode = new TreeNode(value);

    if (!this.root) {
      this.root = newNode;
      return;
    }

    let current: TreeNode<T> | null = this.root;
    while (current) {
      const comp = comparator(value, current.value);
      if (comp < 0) {
        if (!current.left) {
          current.left = newNode;
          return;
        }
        current = current.left;
      } else if (comp > 0) {
        if (!current.right) {
          current.right = newNode;
          return;
        }
        current = current.right;
      } else {
        // Duplicate – decide what to do; here we just replace
        current.value = value;
        return;
      }
    }
  }

  // Find a node with a particular value
  find(value: T, comparator: (a: T, b: T) => number): TreeNode<T> | null {
    let current = this.root;
    while (current) {
      const comp = comparator(value, current.value);
      if (comp === 0) return current;
      current = comp < 0 ? current.left : current.right;
    }
    return null;
  }

  // In‑order traversal (left, root, right)
  inOrder(callback: (node: TreeNode<T>) => void) {
    const visit = (node: TreeNode<T> | null) => {
      if (!node) return;
      visit(node.left);
      callback(node);
      visit(node.right);
    };
    visit(this.root);
  }

  // Pre‑ and post‑order are left to you if needed
}
const cmpNum = (a: number, b: number) => a - b;
const cmpStr = (a: string, b: string) => a.localeCompare(b);
const tree = new BinaryTree<number>();

tree.insert(42, cmpNum);
tree.insert(23, cmpNum);
tree.insert(87, cmpNum);
tree.insert(13, cmpNum);
tree.insert(31, cmpNum);

console.log("In‑order traversal:");
tree.inOrder(node => console.log(node.value));

const found = tree.find(31, cmpNum);
console.log(found ? `Found ${found.value}` : "Not found");
In-order traversal:
13
23
31
42
87
Found 31
