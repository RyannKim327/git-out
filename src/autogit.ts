/** 
 * A single node in the skip list.  
 * `references` holds forward pointers for each level (index 0 = lowest level).  
 */
class SkipNode<K extends number | string, V> {
    key: K
    value: V
    references: (SkipNode<K, V> | null)[]
    level: number

    constructor(key: K, value: V, level: number) {
        this.key = key
        this.value = value
        this.level = level
        // one element per level, all initially null
        this.references = Array.from({ length: level + 1 }, () => null)
    }
}

/** 
 * Skip list parameters – tailor these to your workload.
 */
const MAX_LEVEL = 16           // biggest stack of levels
const P_FACTOR = 0.5           // probability used when randomising level

/**
 * Compare two keys; for numbers the comparator is trivial  
 * – change it if you want a custom ordering.
 */
function compareKeys<K extends number | string>(a: K, b: K): number {
    return a < b ? -1 : a > b ? 1 : 0
}

/**
 * A simple pseudo‑random level picker.
 * 0‑based levels, i.e. 0 = base level.
 */
function randomLevel(): number {
    let lvl = 0
    while (Math.random() < P_FACTOR && lvl < MAX_LEVEL - 1) {
        lvl++
    }
    return lvl
}

/**
 * The skip list itself.
 */
class SkipList<K extends number | string, V> {
    private head: SkipNode<K, V>
    private size: number = 0

    constructor() {
        // head carries MIN_VALUE to simplify edge handling
        this.head = new SkipNode(K as any, null as any, MAX_LEVEL - 1)
    }

    /** number of elements */
    get length() { return this.size }

    /** search for a key → value or undefined */
    find(key: K): V | undefined {
        let current: SkipNode<K, V> | null = this.head
        for (let level = MAX_LEVEL - 1; level >= 0; level--) {
            while (current.references[level] && compareKeys(current.references[level]!.key, key) < 0) {
                current = current.references[level]!
            }
        }
        current = current.references[0]!
        if (current && compareKeys(current.key, key) === 0) {
            return current.value
        }
        return undefined
    }

    /** insert or update a key/value pair */
    insert(key: K, value: V): void {
        // array of nodes that need to be updated on each level
        const update: (SkipNode<K, V> | null)[] = Array.from({ length: MAX_LEVEL }, () => null)
        let current: SkipNode<K, V> | null = this.head

        for (let level = MAX_LEVEL - 1; level >= 0; level--) {
            while (current.references[level] && compareKeys(current.references[level]!.key, key) < 0) {
                current = current.references[level]!
            }
            update[level] = current
        }

        current = current.references[0]!

        // key already present → replace value
        if (current && compareKeys(current.key, key) === 0) {
            current.value = value
            return
        }

        const nodeLevel = randomLevel()
        const newNode = new SkipNode(key, value, nodeLevel)

        for (let i = 0; i <= nodeLevel; i++) {
            newNode.references[i] = update[i]!.references[i]!
            update[i]!.references[i] = newNode
        }

        this.size++
    }

    /** remove a key → true if removed, false if not found */
    delete(key: K): boolean {
        const update: (SkipNode<K, V> | null)[] = Array.from({ length: MAX_LEVEL }, () => null)
        let current: SkipNode<K, V> | null = this.head

        for (let level = MAX_LEVEL - 1; level >= 0; level--) {
            while (current.references[level] && compareKeys(current.references[level]!.key, key) < 0) {
                current = current.references[level]!
            }
            update[level] = current
        }

        current = current.references[0]!

        if (!current || compareKeys(current.key, key) !== 0) {
            return false
        }

        for (let i = 0; i <= current.level; i++) {
            update[i]!.references[i] = current.references[i]
        }

        this.size--
        return true
    }

    /** iterate over the list in ascending key order */
    [Symbol.iterator](): Iterator<[K, V]> {
        let node: SkipNode<K, V> | null = this.head.references[0]
        return {
            next: () => {
                if (!node) return { done: true, value: undefined as any }
                const value = [node.key, node.value]
                node = node.references[0]
                return { done: false, value }
            },
        }
    }
}

/** Sample usage ---------------------------------------------------- */
const list = new SkipList<number, string>()
list.insert(20, "twenty")
list.insert(5,  "five")
list.insert(15, "fifteen")
list.insert(30, "thirty")

console.log("find 15:", list.find(15))        // => "fifteen"
console.log("length:", list.length)           // => 4

list.delete(5)
console.log("after delete 5, length:", list.length) // => 3

for (const [k, v] of list) {
    console.log(k, v)
}
// prints:
// 15 fifteen
// 20 twenty
// 30 thirty
