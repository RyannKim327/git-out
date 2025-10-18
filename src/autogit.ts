class ListNode<T> {
    constructor(
        public value: T,
        public next: ListNode<T> | null = null
    ) {}
}

class LinkedList<T> {
    private head: ListNode<T> | null = null;
    private _length: number = 0;

    // Method to get length (O(1) time)
    get length(): number {
        return this._length;
    }

    // Add node to the end
    append(value: T): void {
        const newNode = new ListNode(value);
        
        if (!this.head) {
            this.head = newNode;
        } else {
            let current = this.head;
            while (current.next) {
                current = current.next;
            }
            current.next = newNode;
        }
        
        this._length++;
    }

    // Add node to the beginning
    prepend(value: T): void {
        const newNode = new ListNode(value, this.head);
        this.head = newNode;
        this._length++;
    }

    // Other methods would also update _length accordingly
}
class ListNode<T> {
    constructor(
        public value: T,
        public next: ListNode<T> | null = null
    ) {}
}

function getLinkedListLength<T>(head: ListNode<T> | null): number {
    let length = 0;
    let current = head;
    
    while (current !== null) {
        length++;
        current = current.next;
    }
    
    return length;
}

// Usage
const node1 = new ListNode(1);
const node2 = new ListNode(2);
const node3 = new ListNode(3);

node1.next = node2;
node2.next = node3;

console.log(getLinkedListLength(node1)); // Output: 3
console.log(getLinkedListLength(null));  // Output: 0
function getLinkedListLengthRecursive<T>(head: ListNode<T> | null): number {
    if (head === null) {
        return 0;
    }
    
    return 1 + getLinkedListLengthRecursive(head.next);
}

// Usage
console.log(getLinkedListLengthRecursive(node1)); // Output: 3
class LinkedList<T> {
    private head: ListNode<T> | null = null;

    // Method 1: Iterative length calculation
    getLengthIterative(): number {
        let length = 0;
        let current = this.head;
        
        while (current !== null) {
            length++;
            current = current.next;
        }
        
        return length;
    }

    // Method 2: Recursive length calculation
    getLengthRecursive(): number {
        return this._getLengthRecursive(this.head);
    }

    private _getLengthRecursive(node: ListNode<T> | null): number {
        if (node === null) {
            return 0;
        }
        
        return 1 + this._getLengthRecursive(node.next);
    }

    // Method 3: Using reduce-like approach
    getLengthFunctional(): number {
        let length = 0;
        let current = this.head;
        
        while (current !== null) {
            length++;
            current = current.next;
        }
        
        return length;
    }

    // Add node
    append(value: T): void {
        const newNode = new ListNode(value);
        
        if (!this.head) {
            this.head = newNode;
        } else {
            let current = this.head;
            while (current.next) {
                current = current.next;
            }
            current.next = newNode;
        }
    }
}

// Usage example
const list = new LinkedList<number>();
list.append(1);
list.append(2);
list.append(3);
list.append(4);

console.log("Iterative length:", list.getLengthIterative());    // 4
console.log("Recursive length:", list.getLengthRecursive());    // 4
console.log("Functional length:", list.getLengthFunctional());  // 4

const emptyList = new LinkedList<number>();
console.log("Empty list length:", emptyList.getLengthIterative()); // 0
