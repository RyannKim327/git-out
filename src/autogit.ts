enum Color {
  RED = "RED",
  BLACK = "BLACK",
}

class RBNode<T> {
  value: T;
  color: Color;
  left: RBNode<T>;
  right: RBNode<T>;
  parent: RBNode<T> | null;

  constructor(
    value: T,
    color: Color = Color.RED, // New nodes are RED by default
    parent: RBNode<T> | null = null,
  ) {
    this.value = value;
    this.color = color;
    this.left = null as unknown as RBNode<T>; // Initialize with NIL
    this.right = null as unknown as RBNode<T>;
    this.parent = parent;
  }
}
class RedBlackTree<T> {
  private NIL: RBNode<T>;
  private root: RBNode<T>;

  constructor() {
    this.NIL = new RBNode<T>(null as unknown as T);
    this.NIL.color = Color.BLACK;
    this.root = this.NIL;
  }
}
private min(node: RBNode<T>): RBNode<T> {
  while (node.left !== this.NIL) node = node.left;
  return node;
}

private leftRotate(x: RBNode<T>): void {
  const y = x.right;
  x.right = y.left;

  if (y.left !== this.NIL) y.left.parent = x;
  y.parent = x.parent;

  if (x.parent === null) this.root = y;
  else if (x === x.parent.left) x.parent.left = y;
  else x.parent.right = y;

  y.left = x;
  x.parent = y;
}

private rightRotate(y: RBNode<T>): void {
  const x = y.left;
  y.left = x.right;

  if (x.right !== this.NIL) x.right.parent = y;
  x.parent = y.parent;

  if (y.parent === null) this.root = x;
  else if (y === y.parent.right) y.parent.right = x;
  else y.parent.left = x;

  x.right = y;
  y.parent = x;
}
public insert(value: T): void {
  let parent: RBNode<T> | null = null;
  let current = this.root;
  
  // Standard BST insertion
  while (current !== this.NIL) {
    parent = current;
    if (value < current.value) current = current.left;
    else current = current.right;
  }

  const newNode = new RBNode(value);
  newNode.parent = parent;
  newNode.left = this.NIL;
  newNode.right = this.NIL;

  if (parent === null) this.root = newNode;
  else if (newNode.value < parent.value) parent.left = newNode;
  else parent.right = newNode;

  this.insertFixup(newNode);
}

private insertFixup(node: RBNode<T>): void {
  let current = node;
  while (current.parent?.color === Color.RED) {
    if (current.parent === current.parent.parent?.left) {
      const uncle = current.parent.parent.right;
      if (uncle.color === Color.RED) {
        // Case 1: Uncle is RED
        current.parent.color = Color.BLACK;
        uncle.color = Color.BLACK;
        current.parent.parent.color = Color.RED;
        current = current.parent.parent;
      } else {
        // Case 2/3: Uncle is BLACK
        if (current === current.parent.right) {
          current = current.parent;
          this.leftRotate(current);
        }
        current.parent!.color = Color.BLACK;
        current.parent!.parent!.color = Color.RED;
        this.rightRotate(current.parent!.parent!);
      }
    } else {
      // Mirror cases for right-parent
      // (Implementation similar to the left-parent case)
    }
  }
  this.root.color = Color.BLACK;
}
public delete(value: T): void {
  // Helper methods omitted for brevity (e.g., transplant)
  let node = this.search(value);
  // ... Deletion logic involving cases ...
  this.deleteFixup(node);
}

private deleteFixup(node: RBNode<T>): void {
  // Complex fixup logic based on sibling color/nephews
  // Includes 4 cases for each child direction
}
const rbt = new RedBlackTree<number>();
rbt.insert(10);
rbt.insert(20);
rbt.insert(5);
// Tree auto-balances after each operation
