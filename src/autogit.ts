class ListNode<T> {
    constructor(
        public value: T,
        public next: ListNode<T> | null = null
    ) {}
}

function findMiddle<T>(head: ListNode<T> | null): ListNode<T> | null {
    if (!head) return null;
    
    let slow: ListNode<T> | null = head;
    let fast: ListNode<T> | null = head;
    
    while (fast && fast.next) {
        slow = slow!.next;
        fast = fast.next.next;
    }
    
    return slow;
}
function findMiddleCount<T>(head: ListNode<T> | null): ListNode<T> | null {
    if (!head) return null;
    
    // Count total nodes
    let current: ListNode<T> | null = head;
    let count = 0;
    
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
class LinkedList<T> {
    head: ListNode<T> | null = null;
    
    add(value: T): void {
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
    
    findMiddle(): T | null {
        if (!this.head) return null;
        
        let slow: ListNode<T> | null = this.head;
        let fast: ListNode<T> | null = this.head;
        
        while (fast && fast.next) {
            slow = slow!.next;
            fast = fast.next.next;
        }
        
        return slow!.value;
    }
    
    findMiddleWithIndex(): { value: T; index: number } | null {
        if (!this.head) return null;
        
        let slow: ListNode<T> | null = this.head;
        let fast: ListNode<T> | null = this.head;
        let index = 0;
        
        while (fast && fast.next) {
            slow = slow!.next;
            fast = fast.next.next;
            index++;
        }
        
        return { value: slow!.value, index };
    }
    
    print(): void {
        let current = this.head;
        const values: T[] = [];
        while (current) {
            values.push(current.value);
            current = current.next;
        }
        console.log(values.join(' -> '));
    }
}
// Example usage
const list = new LinkedList<number>();
list.add(1);
list.add(2);
list.add(3);
list.add(4);
list.add(5);

list.print(); // 1 -> 2 -> 3 -> 4 -> 5

const middle = list.findMiddle();
console.log(`Middle element: ${middle}`); // Middle element: 3

const middleWithIndex = list.findMiddleWithIndex();
console.log(`Middle element: ${middleWithIndex?.value} at index ${middleWithIndex?.index}`);
// Middle element: 3 at index 2

// Odd number of elements
const oddList = new LinkedList<number>();
oddList.add(1);
oddList.add(2);
oddList.add(3);
oddList.add(4);
oddList.add(5);
oddList.add(6);
oddList.add(7);

console.log(`Odd list middle: ${oddList.findMiddle()}`); // Odd list middle: 4
