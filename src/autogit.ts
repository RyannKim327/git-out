class SkipListNode<T> {
    value: T;
    forward: SkipListNode<T>[];

    constructor(value: T, level: number) {
        this.value = value;
        this.forward = new Array(level + 1).fill(null);
    }
}
class SkipList<T> {
    private maxLevel: number;
    private p: number; // Probability of promoting a node
    private header: SkipListNode<T>;
    private level: number; // Current max level

    constructor(maxLevel: number, p: number) {
        this.maxLevel = maxLevel;
        this.p = p;
        this.header = new SkipListNode<T>(null, maxLevel);
        this.level = 0; // Start with level 0
    }
}
insert(value: T): void {
    const update = new Array<SkipListNode<T>>(this.maxLevel + 1);
    let current: SkipListNode<T> = this.header;

    // Find the position to insert the new node
    for (let i = this.level; i >= 0; i--) {
        while (current.forward[i] !== null && current.forward[i].value < value) {
            current = current.forward[i];
        }
        update[i] = current;
    }

    current = current.forward[0];

    // If current is null or its value is not equal to the new value, insert the new node
    if (current === null || current.value !== value) {
        const newLevel = this.randomLevel();
        if (newLevel > this.level) {
            for (let i = this.level + 1; i <= newLevel; i++) {
                update[i] = this.header;
            }
            this.level = newLevel;
        }

        const newNode = new SkipListNode(value, newLevel);
        for (let i = 0; i <= newLevel; i++) {
            newNode.forward[i] = update[i].forward[i];
            update[i].forward[i] = newNode;
        }
    }
}
private randomLevel(): number {
    let level = 0;
    while (Math.random() < this.p && level < this.maxLevel) {
        level++;
    }
    return level;
}
search(value: T): boolean {
    let current: SkipListNode<T> = this.header;

    for (let i = this.level; i >= 0; i--) {
        while (current.forward[i] !== null && current.forward[i].value < value) {
            current = current.forward[i];
        }
    }

    current = current.forward[0];

    return current !== null && current.value === value;
}
delete(value: T): boolean {
    const update = new Array<SkipListNode<T>>(this.maxLevel + 1);
    let current: SkipListNode<T> = this.header;

    for (let i = this.level; i >= 0; i--) {
        while (current.forward[i] !== null && current.forward[i].value < value) {
            current = current.forward[i];
        }
        update[i] = current;
    }

    current = current.forward[0];

    if (current !== null && current.value === value) {
        for (let i = 0; i <= this.level; i++) {
            if (update[i].forward[i] !== current) break;
            update[i].forward[i] = current.forward[i];
        }

        while (this.level > 0 && this.header.forward[this.level] === null) {
            this.level--;
        }

        return true;
    }

    return false;
}
class SkipListNode<T> {
    value: T;
    forward: SkipListNode<T>[];

    constructor(value: T, level: number) {
        this.value = value;
        this.forward = new Array(level + 1).fill(null);
    }
}

class SkipList<T> {
    private maxLevel: number;
    private p: number;
    private header: SkipListNode<T>;
    private level: number;

    constructor(maxLevel: number = 16, p: number = 0.5) {
        this.maxLevel = maxLevel;
        this.p = p;
        this.header = new SkipListNode<T>(null, maxLevel);
        this.level = 0;
    }

    insert(value: T): void {
        const update = new Array<SkipListNode<T>>(this.maxLevel + 1);
        let current: SkipListNode<T> = this.header;

        for (let i = this.level; i >= 0; i--) {
            while (current.forward[i] !== null && current.forward[i].value < value) {
                current = current.forward[i];
            }
            update[i] = current;
        }

        current = current.forward[0];

        if (current === null || current.value !== value) {
            const newLevel = this.randomLevel();
            if (newLevel > this.level) {
                for (let i = this.level + 1; i <= newLevel; i++) {
                    update[i] = this.header;
                }
                this.level = newLevel;
            }

            const newNode = new SkipListNode(value, newLevel);
            for (let i = 0; i <= newLevel; i++) {
                newNode.forward[i] = update[i].forward[i];
                update[i].forward[i] = newNode;
            }
        }
    }

    private randomLevel(): number {
        let level = 0;
        while (Math.random() < this.p && level < this.maxLevel) {
            level++;
        }
        return level;
    }

    search(value: T): boolean {
        let current: SkipListNode<T> = this.header;

        for (let i = this.level; i >= 0; i--) {
            while (current.forward[i] !== null && current.forward[i].value < value) {
                current = current.forward[i];
            }
        }

        current = current.forward[0];

        return current !== null && current.value === value;
    }

    delete(value: T): boolean {
        const update = new Array<SkipListNode<T>>(this.maxLevel + 1);
        let current: SkipListNode<T> = this.header;

        for (let i = this.level; i >= 0; i--) {
            while (current.forward[i] !== null && current.forward[i].value < value) {
                current = current.forward[i];
            }
            update[i] =
