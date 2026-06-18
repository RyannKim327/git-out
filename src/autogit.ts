enum Color { RED, BLACK }

class Node<T> {
  constructor(
    public value: T,
    public color: Color = Color.RED,
    public left: Node<T> | null = null,
    public right: Node<T> | null = null,
    public parent: Node<T> | null = null
  ) {}
}
export class RedBlackTree<T> {
  private root: Node<T> | null = null;

  /* Public API */
  public insert(value: T): void { /* ... */ }
  public delete(value: T): void { /* ... */ }
  public find(value: T): Node<T> | null { /* ... */ }

  /* private helpers… */
  private rotateLeft(x: Node<T>): void { /* ... */ }
  private rotateRight(x: Node<T>): void { /* ... */ }
  private fixAfterInsertion(z: Node<T>): void { /* ... */ }
  private fixAfterDeletion(x: Node<T>): void { /* ... */ }
  private transplant(u: Node<T>, v: Node<T> | null): void { /* ... */ }
  private minimum(n: Node<T> | null): Node<T> | null { /* ... */ }
}
public find(value: T): Node<T> | null {
  let node = this.root;
  while (node && node.value !== value) {
    node = value < node.value ? node.left : node.right;
  }
  return node;
}
private rotateLeft(x: Node<T>): void {
  const y = x.right!;
  x.right = y.left;
  if (y.left) y.left.parent = x;

  y.parent = x.parent;
  if (!x.parent) this.root = y;
  else if (x === x.parent.left) x.parent.left = y;
  else x.parent.right = y;

  y.left = x;
  x.parent = y;
}

private rotateRight(x: Node<T>): void {
  const y = x.left!;
  x.left = y.right;
  if (y.right) y.right.parent = x;

  y.parent = x.parent;
  if (!x.parent) this.root = y;
  else if (x === x.parent.right) x.parent.right = y;
  else x.parent.left = y;

  y.right = x;
  x.parent = y;
}
public insert(value: T): void {
  const z = new Node(value);
  let y: Node<T> | null = null;
  let x = this.root;

  // Binary‑search‑tree insert
  while (x) {
    y = x;
    x = value < x.value ? x.left : x.right;
  }
  z.parent = y;

  if (!y) this.root = z;
  else if (value < y.value) y.left = z;
  else y.right = z;

  // Re‑balance
  this.fixAfterInsertion(z);
}
private fixAfterInsertion(z: Node<T>): void {
  z.color = Color.RED;

  while (z.parent && z.parent.color === Color.RED) {
    if (z.parent === z.parent.parent!.left) { // z.parent is left child
      const y = z.parent.parent.right; // uncle

      if (y && y.color === Color.RED) {
        // Case 1: Uncle red
        z.parent.color = Color.BLACK;
        y.color = Color.BLACK;
        z.parent.parent!.color = Color.RED;
        z = z.parent.parent!;
      } else {
        // Case 2 or 3: Uncle black
        if (z === z.parent.right) {
          // Case 2: triangle
          z = z.parent;
          this.rotateLeft(z);
        }
        // Case 3: line
        z.parent.color = Color.BLACK;
        z.parent.parent!.color = Color.RED;
        this.rotateRight(z.parent.parent!);
      }
    } else {               // Symmetric case (z.parent is right child)
      const y = z.parent.parent!.left; // uncle

      if (y && y.color === Color.RED) {
        z.parent.color = Color.BLACK;
        y.color = Color.BLACK;
        z.parent.parent!.color = Color.RED;
        z = z.parent.parent!;
      } else {
        if (z === z.parent.left) {
          z = z.parent;
          this.rotateRight(z);
        }
        z.parent.color = Color.BLACK;
        z.parent.parent!.color = Color.RED;
        this.rotateLeft(z.parent.parent!);
      }
    }
  }

  this.root!.color = Color.BLACK; // Root is always black
}
public delete(value: T): void {
  let z = this.find(value);
  if (!z) return; // Not found, nothing to delete

  let y = z;
  let yOriginalColor = y.color;
  let x: Node<T> | null
