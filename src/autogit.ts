/* ──────────────────────────────────────────────────────
 *  SkipListNode<T>
 * ────────────────────────────────────────────────────── */
class SkipListNode<T> {
  /** The stored value (defined only in the “bottom” node) */
  value?: T;

  /** Links to the node that follows this one at each level */
  forward: Array<SkipListNode<T> | null> = [];

  constructor(value?: T, level: number = 0) {
    this.value = value;
    this.forward = new Array(level + 1).fill(null);
  }
}

/* ──────────────────────────────────────────────────────
 *  SkipList<T>
 * ────────────────────────────────────────────────────── */
export class SkipList<T> {
  /* Adjustable parameters */
  private readonly MAX_LEVEL: number;      // upper bound for levels
  private readonly P: number;              // probability of promoting a node

  private level: number = 0;               // current maximum level
  private header: SkipListNode<T>;         // sentinel start node

  constructor(maxLevel: number = 16, probability: number = 0.5) {
    this.MAX_LEVEL = maxLevel;
    this.P        = probability;
    this.header   = new SkipListNode<T>();
  }

  /* ──────────────────────────────────────────────────────
   *  Random level generator
   * ────────────────────────────────────────────────────── */
  private randomLevel(): number {
    let lvl = 0;
    while (Math.random() < this.P && lvl < this.MAX_LEVEL) {
      lvl++;
    }
    return lvl;
  }

  /* ──────────────────────────────────────────────────────
   *  Search for a value
   * ────────────────────────────────────────────────────── */
  search(value: T): SkipListNode<T> | null {
    let current = this.header;

    // move down each level, then across level 0
    for (let i = this.level; i >= 0; i--) {
      while (current.forward[i] && current.forward[i]!.value! < value) {
        current = current.forward[i]!;
      }
    }

    current = current.forward[0]!;

    if (current && current.value === value) return current;
    return null;
  }

  /* ──────────────────────────────────────────────────────
   *  Insert a new value
   * ────────────────────────────────────────────────────── */
  insert(value: T): void {
    const update = new Array<SkipListNode<T>>(this.MAX_LEVEL + 1);
    let current = this.header;

    // find where the new node will be inserted at each level
    for (let i = this.level; i >= 0; i--) {
      while (current.forward[i] && current.forward[i]!.value! < value) {
        current = current.forward[i]!;
      }
      update[i] = current;
    }

    // pick a random level for the new node
    const lvl = this.randomLevel();

    // raise the list’s level if necessary
    if (lvl > this.level) {
      for (let i = this.level + 1; i <= lvl; i++) {
        update[i] = this.header;
      }
      this.level = lvl;
    }

    const newNode = new SkipListNode<T>(value, lvl);

    // splice the new node into every level above 0
    for (let i = 0; i <= lvl; i++) {
      newNode.forward[i] = update[i].forward[i];
      update[i].forward[i] = newNode;
    }
  }

  /* ──────────────────────────────────────────────────────
   *  Remove a value
   * ────────────────────────────────────────────────────── */
  remove(value: T): boolean {
    const update = new Array<SkipListNode<T>>(this.MAX_LEVEL + 1);
    let current = this.header;

    for (let i = this.level; i >= 0; i--) {
      while (current.forward[i] && current.forward[i]!.value! < value) {
        current = current.forward[i]!;
      }
      update[i] = current;
    }

    current = current.forward[0]!;

    if (!current || current.value !== value) {
      return false; // nothing to delete
    }

    // unlink the node at every level it appears
    for (let i = 0; i <= this.level; i++) {
      if (update[i].forward[i] !== current) break;
      update[i].forward[i] = current.forward[i];
    }

    // shrink the list’s level if the top levels became empty
    while (this.level > 0 && this.header.forward[this.level] == null) {
      this.level--;
    }

    return true;
  }

  /* ──────────────────────────────────────────────────────
   *  Helper: convert list into an array (useful for debugging)
   * ────────────────────────────────────────────────────── */
  toArray(): T[] {
    const result: T[] = [];
    let node = this.header.forward[0];

    while (node) {
      result.push(node.value!);
      node = node.forward[0];
    }

    return result;
  }
}
