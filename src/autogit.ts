interface LinkedListNode<T> {
    value: T;
    next: LinkedListNode<T> | null;
}

function findMiddleNode<T>(head: LinkedListNode<T> | null): LinkedListNode<T> | null {
    if (!head) return null;
    
    let slow: LinkedListNode<T> | null = head;
    let fast: LinkedListNode<T> | null = head;
    
    while (fast && fast.next) {
        slow = slow!.next;
        fast = fast.next.next;
    }
    
    return slow;
}
function findMiddleNodeWithArray<T>(head: LinkedListNode<T> | null): LinkedListNode<T> | null {
    if (!head) return null;
    
    const nodes: LinkedListNode<T>[] = [];
    let current: LinkedListNode<T> | null = head;
    
    while (current) {
        nodes.push(current);
        current = current.next;
    }
    
    const middleIndex = Math.floor(nodes.length / 2);
    return nodes[middleIndex];
}
function findMiddleWithCount<T>(head: LinkedListNode<T> | null): LinkedListNode<T> | null {
    if (!head) return null;
    
    // Count total nodes
    let count = 0;
    let current: LinkedListNode<T> | null = head;
    while (current) {
        count++;
        current = current.next;
    }
    
    // Find middle node
    const middleIndex = Math.floor(count / 2);
    current = head;
    for (let i = 0; i < middleIndex; i++) {
        current = current!.next;
    }
    
    return current;
}
class LinkedListNode<T> {
    constructor(
        public value: T,
        public next: LinkedListNode<T> | null = null
    ) {}
}

class LinkedList<T> {
    private head: LinkedListNode<T> | null = null;
    
    add(value: T): void {
        const newNode = new LinkedListNode(value);
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
    
    findMiddle(): LinkedListNode<T> | null {
        if (!this.head) return null;
        
        let slow = this.head;
        let fast = this.head;
        
        while (fast && fast.next) {
            slow = slow.next!;
            fast = fast.next.next!;
        }
        
        return slow;
    }
    
    // Utility method to display the list
    display(): void {
        let current = this.head;
        const values: T[] = [];
        while (current) {
            values.push(current.value);
            current = current.next;
        }
        console.log(values.join(' -> '));
    }
}

// Usage example
const list = new LinkedList<number>();
list.add(1);
list.add(2);
list.add(3);
list.add(4);
list.add(5);

console.log("Linked List:");
list.display();

const middleNode = list.findMiddle();
console.log("Middle element:", middleNode?.value); // Output: 3

const list2 = new LinkedList<number>();
list2.add(1);
list2.add(2);
list2.add(3);
list2.add(4);

const middleNode2 = list2.findMiddle();
console.log("Middle element:", middleNode2?.value); // Output: 2 (first middle for even-length lists)
// Test edge cases
const emptyList = new LinkedList<number>();
console.log("Empty list middle:", emptyList.findMiddle()?.value); // null

const singleNodeList = new LinkedList<number>();
singleNodeList.add(42);
console.log("Single node middle:", singleNodeList.findMiddle()?.value); // 42
