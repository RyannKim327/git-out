/** A node that holds a value and optional left/right children. */
class TreeNode<T> {
  constructor(
    public value: T,
    public left: TreeNode<T> | null = null,
    public right: TreeNode<T> | null = null
  ) {}
}
/** A minimal generic binary search tree. */
class BinarySearchTree<T> {
  private root: TreeNode<T> | null = null;

  /* Comparator: returns negative if a < b, 0 if equal, positive if a > b */
  constructor(private compare: (a: T, b: T) => number) {}

  /** Insert a new value. */
  insert(value: T): void {
    const newNode = new TreeNode(value);

    if (!this.root) {
      this.root = newNode;
      return;
    }

    let current = this.root;
    while (true) {
      if (this.compare(value, current.value) < 0) {
        if (!current.left) {
          current.left = newNode;
          break;
        }
        current = current.left;
      } else {
        if (!current.right) {
          current.right = newNode;
          break;
        }
        current = current.right;
      }
    }
  }

  /** Search for a value – returns <node> or null. */
  find(value: T): TreeNode<T> | null {
    let current = this.root;
    while (current) {
      const cmp = this.compare(value, current.value);
      if (cmp === 0) return current;
      current = cmp < 0 ? current.left : current.right;
    }
    return null;
  }

  /** In-order traversal – returns values sorted ascending. */
  inOrder(): T[] {
    const result: T[] = [];
    const walk = (node: TreeNode<T> | null) => {
      if (!node) return;
      walk(node.left);
      result.push(node.value);
      walk(node.right);
    };
    walk(this.root);
    return result;
  }

  /** Remove a value. (Simplest version – does not handle replacement of two children.) */
  delete(value: T): void {
    const remove = (
      node: TreeNode<T> | null,
      value: T
    ): TreeNode<T> | null => {
      if (!node) return null;

      const cmp = this.compare(value, node.value);
      if (cmp < 0) {
        node.left = remove(node.left, value);
      } else if (cmp > 0) {
        node.right = remove(node.right, value);
      } else {
        // Node with only one child or no child
        if (!node.left) return node.right;
        if (!node.right) return node.left;

        // Node with two children: get the inorder successor (smallest in right subtree)
        let succ = node.right;
        while (succ.left) succ = succ.left;
        node.value = succ.value;                // Copy successor’s value
        node.right = remove(node.right, succ.value); // Delete successor
      }
      return node;
    };

    this.root = remove(this.root, value);
  }
}
// A simple numeric comparator
const numCmp = (a: number, b: number) => a - b;

// Create tree
const tree = new BinarySearchTree<number>(numCmp);

// Insert numbers
[5, 3, 7, 2, 4, 6, 8].forEach(v => tree.insert(v));

// Search
console.log(tree.find(4)?.value); // 4
console.log(tree.find(10));       // null

// In‑order traversal should be sorted
console.log(tree.inOrder()); // [2,3,4,5,6,7,8]

// Delete a value
tree.delete(5);
console.log(tree.inOrder()); // [2,3,4,6,7,8]
interface Person { name: string; age: number }

const ageCmp = (a: Person, b: Person) => a.age - b.age;
const personTree = new BinarySearchTree<Person>(ageCmp);

personTree.insert({ name: "Alice", age: 30 });
personTree.insert({ name: "Bob", age: 25 });
