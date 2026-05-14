// ------------------------------------------------------------------
// SkipList.ts
// ------------------------------------------------------------------
export type Comparator<K> = (a: K, b: K) => number;

interface ListNode<K, V> {
  key: K;
  value: V;
  next: Array<ListNode<K, V> | null>; // forward pointers, one per level
}

export class SkipList<K, V> {
  // These constants set the “skew” of the random level.
  // Every additional level is ½ as likely as the previous one.
  private static readonly P = 0.5;
  private static readonly MAX_LEVEL = 32;

  private readonly head: ListNode<K, V>;
  private readonly tail: ListNode<K, V>;
  private level = 0;                // current highest level that contains any nodes
  private size = 0;                // number of key/value pairs

  constructor(private readonly compare: Comparator<K>) {
    // create an array of `null` references for head and tail
    const sentinelNext: Array<ListNode<K, V> | null> =
      Array(SkipList.MAX_LEVEL).fill(null);

    this.head = { key: null as any, value: null as any, next: sentinelNext };
    this.tail = { key: null as any, value: null as any, next: sentinelNext };
  }

  /* -----------------------------------------------------------------
     Random level generator – geometric distribution
     ----------------------------------------------------------------- */
  private randomLevel(): number {
    let lvl = 0;
    while (Math.random() < SkipList.P && lvl < SkipList.MAX_LEVEL - 1) {
      lvl++;
    }
    return lvl;
  }

  /* -----------------------------------------------------------------
     Search – returns the value for a key, or undefined if not found.
     ----------------------------------------------------------------- */
  get(key: K): V | undefined {
    let current = this.head;

    // walk from top level down
    for (let i = this.level; i >= 0; i--) {
      while (
        current.next[i] &&
        this.compare(current.next[i]!.key, key) < 0
      ) {
        current = current.next[i]!;
      }
    }

    const candidate = current.next[0];
    if (candidate && this.compare(candidate.key, key) === 0) {
      return candidate.value;
    }
    return undefined;
  }

  /* -----------------------------------------------------------------
     Insert – O(log n) average
     ----------------------------------------------------------------- */
  set(key: K, value: V): void {
    // build a slice of pointers that we’ll need to update
    const update: Array<ListNode<K, V> | null> =
      Array(SkipList.MAX_LEVEL).fill(null);

    let current = this.head;
    for (let i = this.level; i >= 0; i--) {
      while (
        current.next[i] &&
        this.compare(current.next[i]!.key, key) < 0
      ) {
        current = current.next[i]!;
      }
      update[i] = current;
    }

    const next = current.next[0];

    // key already present → just replace the value
    if (next && this.compare(next.key, key) === 0) {
      next.value = value;
      return;
    }

    // new node: determine its height
    const nodeLevel = this.randomLevel();
    const newNode: ListNode<K, V> = {
      key,
      value,
      next: Array(nodeLevel + 1).fill(null),
    };

    if (nodeLevel > this.level) {
      // adjust the “head” to point to the tail on the new higher levels
      for (let i = this.level + 1; i <= nodeLevel; i++) {
        update[i] = this.head;
      }
      this.level = nodeLevel;
    }

    // link the new node into the list
    for (let i = 0; i <= nodeLevel; i++) {
      newNode.next[i] = update[i]!.next[i];
      update[i]!.next[i] = newNode;
    }

    this.size++;
  }

  /* -----------------------------------------------------------------
     Delete – O(log n) average
     ----------------------------------------------------------------- */
  delete(key: K): boolean {
    const update: Array<ListNode<K, V> | null> =
      Array(SkipList.MAX_LEVEL).fill(null);

    let current = this.head;
    for (let i = this.level; i >= 0; i--) {
      while (
        current.next[i] &&
        this.compare(current.next[i]!.key, key) < 0
      ) {
        current = current.next[i]!;
      }
      update[i] = current;
    }

    const target = current.next[0];
    if (!target || this.compare(target.key, key) !== 0) {
      return false; // nothing to delete
    }

    // unlink the node from every level it appears in
    for (let i = 0; i <= target.next.length - 1; i++) {
      if (update[i]!.next[i] !== target) break;
      update[i]!.next[i] = target.next[i];
    }

    // trim empty top levels
    while (this.level > 0 && this.head
