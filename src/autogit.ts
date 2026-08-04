/* ───────────────────────────────────────────────────────────────────── */
/*  AVL tree – 32‑bit integers for brevity.  Replace T with generic if you
 *  need other key types, but then you have to supply a comparator. -------- */

/*  Node ------------------------------------------------------------------- */
class Node {
  key: number;
  height: number;
  left: Node | null = null;
  right: Node | null = null;

  constructor(key: number) {           // simple ctor
    this.key = key;
    this.height = 1;                    // leaf height = 1
  }
}

/*  Helper utilities -------------------------------------------------------- */
const height = (node: Node | null): number => (node ? node.height : 0);

const updateHeight = (node: Node) =>
  node.height = 1 + Math.max(height(node.left), height(node.right));

const balanceFactor = (node: Node): number =>
  height(node.left) - height(node.right);

/*  Rotations -------------------------------------------------------------- */
function rotateRight(y: Node): Node {
  const x = y.left!;
  const T2 = x.right;

  // rotation
  x.right = y;
  y.left = T2;

  // update heights
  updateHeight(y);
  updateHeight(x);

  return x;     // new root of this part
}

function rotateLeft(x: Node): Node {
  const y = x.right!;
  const T2 = y.left;

  // rotation
  y.left = x;
  x.right = T2;

  // update heights
  updateHeight(x);
  updateHeight(y);

  return y;     // new root
}

/*  Insert ------------------------------------------------------------------ */
function insert(node: Node | null, key: number): Node {
  if (!node) return new Node(key);

  if (key < node.key) node.left = insert(node.left, key);
  else if (key > node.key) node.right = insert(node.right, key);
  else return node;           // duplicate keys rejected

  /* update our own height after child changed */
  updateHeight(node);

  /* balance now */
  const bf = balanceFactor(node);

  // Left heavy
  if (bf > 1) {
    if (key < node.left!.key)                   // Left‑Left case
      return rotateRight(node);

    // Left‑Right case
    node.left = rotateLeft(node.left!);
    return rotateRight(node);
  }

  // Right heavy
  if (bf < -1) {
    if (key > node.right!.key)                  // Right‑Right case
      return rotateLeft(node);

    // Right‑Left case
    node.right = rotateRight(node.right!);
    return rotateLeft(node);
  }

  return node;            // unchanged
}

/*  Search --------------------------------------------------------------- */
function contains(node: Node | null, key: number): boolean {
  while (node) {
    if (key === node.key) return true;
    node = key < node.key ? node.left : node.right;
  }
  return false;
}

/*  In‑order traversal for debugging -------------------------------------- */
function inorder(node: Node | null, res: number[] = []): number[] {
  if (!node) return res;
  inorder(node.left, res);
  res.push(node.key);
  inorder(node.right, res);
  return res;
}

/*  Example usage ---------------------------------------------------------- */
let root: Node | null = null;
[10, 20, 30, 40, 50, 25].forEach(k => root = insert(root, k));

console.log('In‑order:', inorder(root));              // 10 20 25 30 40 50
console.log('Contains 25?', contains(root, 25));      // true
console.log('Contains 15?', contains(root, 15));      // false
class Node<T> { key: T; height: number; ... }
function insert<T>(node: Node<T> | null, key: T, cmp: (a: T, b: T) => number): Node<T> { ... }
