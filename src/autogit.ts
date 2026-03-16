enum Color { RED, BLACK }

class RBNode<T> {
  val: T
  color: Color
  left: RBNode<T> | null
  right: RBNode<T> | null
  parent: RBNode<T> | null

  constructor(val: T, color = Color.RED) {
    this.val = val
    this.color = color
    this.left = null
    this.right = null
    this.parent = null
  }
}
class RedBlackTree<T> {
  root: RBNode<T> | null = null

  /* ===================== SEARCH ===================== */
  search(val: T): RBNode<T> | null {
    let node = this.root
    while (node) {
      if (val < node.val) node = node.left
      else if (val > node.val) node = node.right
      else return node
    }
    return null
  }

  /* ===================== INSERT ===================== */
  insert(val: T): void {
    const newNode = new RBNode(val)          // starts RED
    let y: RBNode<T> | null = null
    let x = this.root

    while (x) {
      y = x
      x = val < x.val ? x.left : x.right
    }

    newNode.parent = y
    if (!y) {                               // tree was empty
      this.root = newNode
    } else if (val < y.val) {
      y.left = newNode
    } else {
      y.right = newNode
    }

    this.insertFixup(newNode)
  }

  private insertFixup(node: RBNode<T>) {
    while (node.parent && node.parent.color === Color.RED) {
      const gp = node.parent.parent!
      if (node.parent === gp.left) {
        const uncle = gp.right
        if (uncle && uncle.color === Color.RED) {
          // Case 1 – recolor
          node.parent.color = Color.BLACK
          uncle.color = Color.BLACK
          gp.color = Color.RED
          node = gp
        } else {
          if (node === node.parent.right) {
            // Case 2 – left rotate at parent
            node = node.parent
            this.rotateLeft(node)
          }
          // Case 3 – right rotate at grandparent
          node.parent!.color = Color.BLACK
          gp.color = Color.RED
          this.rotateRight(gp)
        }
      } else {
        // Mirror of above (swap left/right)
        const uncle = gp.left
        if (uncle && uncle.color === Color.RED) {
          node.parent.color = Color.BLACK
          uncle.color = Color.BLACK
          gp.color = Color.RED
          node = gp
        } else {
          if (node === node.parent.left) {
            node = node.parent
            this.rotateRight(node)
          }
          node.parent!.color = Color.BLACK
          gp.color = Color.RED
          this.rotateLeft(gp)
        }
      }
    }
    this.root!.color = Color.BLACK
  }

  /* ===================== ROTAIONS ===================== */
  private rotateLeft(x: RBNode<T>) {
    const y = x.right!
    x.right = y.left
    if (y.left) y.left.parent = x
    y.parent = x.parent
    if (!x.parent) this.root = y
    else if (x === x.parent.left) x.parent.left = y
    else x.parent.right = y
    y.left = x
    x.parent = y
  }

  private rotateRight(x: RBNode<T>) {
    const y = x.left!
    x.left = y.right
    if (y.right) y.right.parent = x
    y.parent = x.parent
    if (!x.parent) this.root = y
    else if (x === x.parent.right) x.parent.right = y
    else x.parent.left = y
    y.right = x
    x.parent = y
  }

  /* ===================== DELETE (stub) ===================== */
  // A full delete implementation is longer – you can copy from a standard textbook
  // or use an existing implementation if you only need it for production.
}
const tree = new RedBlackTree<number>()

[10, 20, 30, 15, 5, 25].forEach(v => tree.insert(v))

console.log(tree.search(15) !== null) // true
console.log(tree.search(99) === null) // true
