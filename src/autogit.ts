interface ListNode<T> {
    value: T;
    next: ListNode<T> | null;
}

function getLengthIterative(head: ListNode<any> | null): number {
    let length = 0;
    let current = head;
    
    while (current !== null) {
        length++;
        current = current.next;
    }
    
    return length;
}
function getLengthRecursive(node: ListNode<any> | null): number {
    if (node === null) {
        return 0;
    }
    return 1 + getLengthRecursive(node.next);
}
class LinkedListNode<T> {
    value: T;
    next: LinkedListNode<T> | null;

    constructor(value: T) {
        this.value = value;
        this.next = null;
    }
}

class LinkedList<T> {
    head: LinkedListNode<T> | null;
    private _size: number = 0;

    constructor() {
        this.head = null;
    }

    // Add this method to get length
    getLength(): number {
        let count = 0;
        let current = this.head;
        
        while (current !== null) {
            count++;
            current = current.next;
        }
        
        return count;
    }

    // Alternative: Maintain size internally
    add(value: T): void {
        const newNode = new LinkedListNode(value);
        if (!this.head) {
            this.head = newNode;
        } else {
            let current = this.head;
            while (current.next !== null) {
                current = current.next;
            }
            current.next = newNode;
        }
        this._size++;
    }

    getSize(): number {
        return this._size;
    }
}
// Create a linked list
const node1 = { value: 1, next: null };
const node2 = { value: 2, next: null };
const node3 = { value: 3, next: null };

node1.next = node2;
node2.next = node3;

// Get length
console.log(getLengthIterative(node1)); // Output: 3
console.log(getLengthRecursive(node1)); // Output: 3

// Using the class approach
const list = new LinkedList<number>();
list.add(1);
list.add(2);
list.add(3);
console.log(list.getLength()); // Output: 3
console.log(list.getSize());   // Output: 3
