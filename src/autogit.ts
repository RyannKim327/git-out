class ListNode<T> {
    constructor(
        public value: T,
        public next: ListNode<T> | null = null
    ) {}
}

class LinkedList<T> {
    private head: ListNode<T> | null = null;
    
    // Add this method to your LinkedList class
    getLength(): number {
        let count = 0;
        let current = this.head;
        
        while (current !== null) {
            count++;
            current = current.next;
        }
        
        return count;
    }
    
    // Usage example
    add(value: T): void {
        const newNode = new ListNode(value);
        if (!this.head) {
            this.head = newNode;
        } else {
            let current = this.head;
            while (current.next !== null) {
                current = current.next;
            }
            current.next = newNode;
        }
    }
}

// Usage
const list = new LinkedList<number>();
list.add(1);
list.add(2);
list.add(3);
console.log(list.getLength()); // Output: 3
class ListNode<T> {
    constructor(
        public value: T,
        public next: ListNode<T> | null = null
    ) {}
}

// Recursive function to find length
function getLengthRecursive<T>(node: ListNode<T> | null): number {
    if (node === null) {
        return 0;
    }
    return 1 + getLengthRecursive(node.next);
}

// Usage
const node1 = new ListNode(1);
const node2 = new ListNode(2);
const node3 = new ListNode(3);
node1.next = node2;
node2.next = node3;

console.log(getLengthRecursive(node1)); // Output: 3
class ListNode<T> {
    constructor(
        public value: T,
        public next: ListNode<T> | null = null
    ) {}
}

class LinkedList<T> {
    private head: ListNode<T> | null = null;
    private length: number = 0;
    
    getLength(): number {
        return this.length;
    }
    
    add(value: T): void {
        const newNode = new ListNode(value);
        if (!this.head) {
            this.head = newNode;
        } else {
            let current = this.head;
            while (current.next !== null) {
                current = current.next;
            }
            current.next = newNode;
        }
        this.length++;
    }
    
    remove(value: T): boolean {
        if (!this.head) return false;
        
        if (this.head.value === value) {
            this.head = this.head.next;
            this.length--;
            return true;
        }
        
        let current = this.head;
        while (current.next !== null) {
            if (current.next.value === value) {
                current.next = current.next.next;
                this.length--;
                return true;
            }
            current = current.next;
        }
        
        return false;
    }
}

// Usage
const list = new LinkedList<number>();
list.add(1);
list.add(2);
list.add(3);
console.log(list.getLength()); // Output: 3
list.remove(2);
console.log(list.getLength()); // Output: 2
interface ListNode<T> {
    value: T;
    next: ListNode<T> | null;
}

function getLinkedListLength<T>(head: ListNode<T> | null): number {
    let count = 0;
    let current = head;
    
    while (current !== null) {
        count++;
        current = current.next;
    }
    
    return count;
}

// Usage
const list: ListNode<number> = {
    value: 1,
    next: {
        value: 2,
        next: {
            value: 3,
            next: null
        }
    }
};

console.log(getLinkedListLength(list)); // Output: 3
