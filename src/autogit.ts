class ListNode<T> {
    value: T;
    next: ListNode<T> | null;

    constructor(value: T) {
        this.value = value;
        this.next = null;
    }
}

class LinkedList<T> {
    head: ListNode<T> | null;

    constructor() {
        this.head = null;
    }

    // Method to find length - iterative approach
    length(): number {
        let count = 0;
        let current = this.head;
        
        while (current !== null) {
            count++;
            current = current.next;
        }
        
        return count;
    }

    // Recursive approach
    lengthRecursive(): number {
        const countNodes = (node: ListNode<T> | null): number => {
            if (node === null) return 0;
            return 1 + countNodes(node.next);
        };
        
        return countNodes(this.head);
    }
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
interface IListNode<T> {
    value: T;
    next: IListNode<T> | null;
}

class LinkedList<T> {
    private head: IListNode<T> | null = null;
    private _size: number = 0; // cached length for O(1) access

    add(value: T): void {
        const newNode: IListNode<T> = { value, next: null };
        
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

    // O(1) time complexity - using cached size
    get length(): number {
        return this._size;
    }

    // O(n) time complexity - traverses the list
    calculateLength(): number {
        let count = 0;
        let current = this.head;
        
        while (current !== null) {
            count++;
            current = current.next;
        }
        
        return count;
    }
}
// Create and test the linked list
const list = new LinkedList<number>();
list.add(1);
list.add(2);
list.add(3);
list.add(4);

console.log(list.length); // 4 (using cached size)
console.log(list.calculateLength()); // 4 (by traversing)
function findLinkedListLength<T>(
    head: { next: any } | null, 
    nextProperty: string = 'next'
): number {
    let length = 0;
    let current = head;
    
    while (current !== null) {
        length++;
        current = current[nextProperty];
    }
    
    return length;
}

// Usage with different property names
const length1 = findLinkedListLength(someList.head); // uses 'next' property
const length2 = findLinkedListLength(someList.head, 'nextNode'); // custom property
