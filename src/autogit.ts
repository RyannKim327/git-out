class ListNode<T> {
    value: T;
    next: ListNode<T> | null;

    constructor(value: T) {
        this.value = value;
        this.next = null;
    }
}
function getLengthIterative(head: ListNode<any> | null): number {
    let count = 0;
    let current = head;
    
    while (current !== null) {
        count++;
        current = current.next;
    }
    
    return count;
}
function getLengthRecursive(head: ListNode<any> | null): number {
    if (head === null) {
        return 0;
    }
    return 1 + getLengthRecursive(head.next);
}
class LinkedList<T> {
    head: ListNode<T> | null = null;

    // Add node to the end
    append(value: T): void {
        const newNode = new ListNode(value);
        
        if (!this.head) {
            this.head = newNode;
            return;
        }
        
        let current = this.head;
        while (current.next !== null) {
            current = current.next;
        }
        current.next = newNode;
    }

    // Get length iteratively
    getLengthIterative(): number {
        let count = 0;
        let current = this.head;
        
        while (current !== null) {
            count++;
            current = current.next;
        }
        
        return count;
    }

    // Get length recursively
    getLengthRecursive(): number {
        const helper = (node: ListNode<T> | null): number => {
            if (node === null) return 0;
            return 1 + helper(node.next);
        };
        
        return helper(this.head);
    }
}

// Usage example
const list = new LinkedList<number>();
list.append(1);
list.append(2);
list.append(3);
list.append(4);

console.log("Iterative length:", list.getLengthIterative()); // Output: 4
console.log("Recursive length:", list.getLengthRecursive()); // Output: 4
// Test with empty list
const emptyList = new LinkedList<number>();
console.log(emptyList.getLengthIterative()); // Output: 0

// Test with single node
const singleNodeList = new LinkedList<number>();
singleNodeList.append(42);
console.log(singleNodeList.getLengthIterative()); // Output: 1
