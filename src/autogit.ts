// A minimal, generic binary‑tree node
export interface TreeNode<T = number> {
    /** The value stored in this node.  (Can be any type.) */
    val: T;
    /** Left child – `null` if none. */
    left: TreeNode<T> | null;
    /** Right child – `null` if none. */
    right: TreeNode<T> | null;
}
/**
 * Sum all the numeric values stored in a binary tree.
 *
 * @param root First node of the tree (or `null`).
 * @returns   Sum of every `val` in the tree.
 */
export function sumTree(root: TreeNode<number> | null): number {
    if (!root) return 0;                // base case: empty subtree
    const left  = sumTree(root.left);   // sum of left subtree
    const right = sumTree(root.right);  // sum of right subtree
    return root.val + left + right;     // current node + children
}
/**
 * Sum all the numeric values stored in a binary tree, iteratively.
 *
 * Uses an explicit stack so it never uses the call stack.
 */
export function sumTreeIterative(root: TreeNode<number> | null): number {
    if (!root) return 0;

    let sum = 0;
    const stack: Array<TreeNode<number>> = [root];

    while (stack.length > 0) {
        const node = stack.pop()!;   // pop returns |undefined|, but we know stack isn’t empty
        sum += node.val;

        // Push children onto the stack – order doesn’t matter for sum
        if (node.right) stack.push(node.right);
        if (node.left)  stack.push(node.left);
    }

    return sum;
}
const tree: TreeNode = {
    val: 5,
    left: {
        val: 3,
        left:  { val: 2, left: null, right: null },
        right: { val: 4, left: null, right: null },
    },
    right: {
        val: 8,
        left:  { val: 7, left: null, right: null },
        right: { val: 9, left: null, right: null },
    },
};

console.log(sumTree(tree));          // → 47
console.log(sumTreeIterative(tree)); // → 47
