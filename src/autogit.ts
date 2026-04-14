// 1.  Define a node type ----------------------------------------------------
type TreeNode<T = number> = {
  val: T
  left?: TreeNode<T>
  right?: TreeNode<T>
}

// 2.  Recursive leaf‑counter -----------------------------------------------
function countLeaves<T>(root: TreeNode<T> | undefined): number {
  if (!root) return 0                            // empty subtree
  if (!root.left && !root.right) return 1        // leaf reached
  // otherwise sum the counts from both sides
  return countLeaves(root.left) + countLeaves(root.right)
}

// 3.  Iterative version (works the same but uses an explicit stack) --------
function countLeavesIter<T>(root: TreeNode<T> | undefined): number {
  if (!root) return 0

  let count = 0
  const stack: Array<TreeNode<T>> = [root]

  while (stack.length) {
    const node = stack.pop()!
    const { left, right } = node

    if (!left && !right) {
      count++
    } else {
      if (right) stack.push(right)
      if (left) stack.push(left)
    }
  }
  return count
}

// 4.  Quick demo -------------------------------------------------------------
const tree: TreeNode<number> = {
  val: 1,
  left: {
    val: 2,
    left: { val: 4 },
    right: { val: 5 }
  },
  right: {
    val: 3,
    right: { val: 6 }
  }
}

console.log('Recursive count:', countLeaves(tree))       // 3 (4,5,6)
console.log('Iterative count:', countLeavesIter(tree))   // 3 (4,5,6)
