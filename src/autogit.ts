class BTreeNode<K> {
  keys: K[]
  children: BTreeNode<K>[]
  leaf: boolean

  constructor(leaf: boolean) {
    this.keys = []
    this.children = []
    this.leaf = leaf
  }
}

export class BTree<K> {
  private root: BTreeNode<K>
  private t: number
  private compare: (a: K, b: K) => number

  constructor(t: number, compareFn: (a: K, b: K) => number) {
    if (t < 2) throw new Error("Minimum degree t must be at least 2")
    this.root = new BTreeNode<K>(true)
    this.t = t
    this.compare = compareFn
  }

  search(key: K, node: BTreeNode<K> = this.root): BTreeNode<K> | null {
    let i = 0
    while (i < node.keys.length && this.compare(key, node.keys[i]) > 0) {
      i++
    }
    if (i < node.keys.length && this.compare(key, node.keys[i]) === 0) {
      return node
    }
    if (node.leaf) {
      return null
    }
    return this.search(key, node.children[i])
  }

  insert(key: K) {
    const root = this.root
    if (root.keys.length === 2 * this.t - 1) {
      const newRoot = new BTreeNode<K>(false)
      newRoot.children.push(root)
      this.splitChild(newRoot, 0)
      this.root = newRoot
      this.insertNonFull(newRoot, key)
    } else {
      this.insertNonFull(root, key)
    }
  }

  private insertNonFull(node: BTreeNode<K>, key: K) {
    let i = node.keys.length - 1
    if (node.leaf) {
      node.keys.push(key)
      node.keys.sort(this.compare)
    } else {
      while (i >= 0 && this.compare(key, node.keys[i]) < 0) i--
      i++
      if (node.children[i].keys.length === 2 * this.t - 1) {
        this.splitChild(node, i)
        if (this.compare(key, node.keys[i]) > 0) i++
      }
      this.insertNonFull(node.children[i], key)
    }
  }

  private splitChild(parent: BTreeNode<K>, i: number) {
    const t = this.t
    const fullChild = parent.children[i]
    const newChild = new BTreeNode<K>(fullChild.leaf)

    // Mid key moves up
    parent.keys.splice(i, 0, fullChild.keys[t - 1])

    // Right half to new child
    newChild.keys = fullChild.keys.splice(t, t - 1)

    // If not a leaf, move child pointers
    if (!fullChild.leaf) {
      newChild.children = fullChild.children.splice(t, t)
    }

    // Insert new child pointer
    parent.children.splice(i + 1, 0, newChild)

    // Remove middle key from original child
    fullChild.keys.length = t - 1
  }

  print(node: BTreeNode<K> = this.root, level: number = 0) {
    console.log("Level", level, "Keys:", node.keys)
    if (!node.leaf) {
      node.children.forEach(child => this.print(child, level + 1))
    }
  }
}
const compareNumbers = (a: number, b: number) => a - b
const btree = new BTree<number>(3, compareNumbers)

btree.insert(10)
btree.insert(20)
btree.insert(5)
btree.insert(6)
btree.insert(12)
btree.insert(30)
btree.insert(7)
btree.insert(17)

btree.print()

// Search for a key
const found = btree.search(6)
console.log("Found:", !!found)
