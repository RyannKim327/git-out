class ListNode<T> {
    value: T;
    next: ListNode<T> | null;
    
    constructor(value: T, next: ListNode<T> | null = null) {
        this.value = value;
        this.next = next;
    }
}

class LinkedList<T> {
    head: ListNode<T> | null = null;
    
    // Add methods to populate the list
    append(value: T) {
        const newNode = new ListNode(value);
        if (!this.head) {
            this.head = newNode;
            return;
        }
        
        let current = this.head;
        while (current.next) {
            current = current.next;
        }
        current.next = newNode;
    }
}
class LinkedList<T> {
    // ... existing code ...
    
    // Iterative approach
    getLength(): number {
        let count = 0;
        let current = this.head;
        
        while (current !== null) {
            count++;
            current = current.next;
        }
        
        return count;
    }
}
class LinkedList<T> {
    // ... existing code ...
    
    // Recursive approach
    getLengthRecursive(node: ListNode<T> | null = this.head): number {
        if (node === null) {
            return 0;
        }
        return 1 + this.getLengthRecursive(node.next);
    }
}
class ListNode<T> {
    value: T;
    next: ListNode<T> | null;
    
    constructor(value: T, next: ListNode<T> | null = null) {
        this.value = value;
        this.next = next;
    }
}

class LinkedList<T> {
    head: ListNode<T> | null = null;
    
    append(value: T) {
        const newNode = new ListNode(value);
        if (!this.head) {
            this.head = newNode;
            return;
        }
        
        let current = this.head;
        while (current.next) {
            current = current.next;
        }
        current.next = newNode;
    }
    
    // Iterative length
    getLength(): number {
        let count = 0;
        let current = this.head;
        
        while (current !== null) {
            count++;
            current = current.next;
        }
        
        return count;
    }
    
    // Recursive length
    getLengthRecursive(node: ListNode<T> | null = this.head): number {
        if (node === null) {
            return 0;
        }
        return 1 + this.getLengthRecursive(node.next);
    }
}

// Usage example
const list = new LinkedList<number>();
list.append(1);
list.append(2);
list.append(3);
list.append(4);

console.log("Iterative length:", list.getLength()); // Output: 4
console.log("Recursive length:", list.getLengthRecursive()); // Output: 4
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
const node1 = new ListNode(1);
const node2 = new ListNode(2);
const node3 = new ListNode(3);
node1.next = node2;
node2.next = node3;

console.log(getLinkedListLength(node1)); // Output: 3
