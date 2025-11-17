class ListNode<T> {
    constructor(
        public value: T,
        public next: ListNode<T> | null = null
    ) {}
}

function findMiddleNode<T>(head: ListNode<T> | null): ListNode<T> | null {
    if (!head) return null;
    
    let slow: ListNode<T> | null = head;
    let fast: ListNode<T> | null = head;
    
    while (fast && fast.next) {
        slow = slow!.next;
        fast = fast.next.next;
    }
    
    return slow;
}
function findMiddleNodeTwoPass<T>(head: ListNode<T> | null): ListNode<T> | null {
    if (!head) return null;
    
    // First pass: count nodes
    let current: ListNode<T> | null = head;
    let count = 0;
    
    while (current) {
        count++;
        current = current.next;
    }
    
    // Second pass: go to middle
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
        } else {
            let current = this.head;
            while (current.next) {
                current = current.next;
            }
            current.next = newNode;
        }
    }
    
    findMiddle(): ListNode<T> | null {
        if (!this.head) return null;
        
        let slow: ListNode<T> | null = this.head;
        let fast: ListNode<T> | null = this.head;
        
        while (fast && fast.next) {
            slow = slow!.next;
            fast = fast.next.next;
        }
        
        return slow;
    }
    
    findMiddleValue(): T | null {
        const middleNode = this.findMiddle();
        return middleNode ? middleNode.value : null;
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

// Usage Example
const list = new LinkedList<number>();
list.add(1);
list.add(2);
list.add(3);
list.add(4);
list.add(5);

list.print(); // 1 -> 2 -> 3 -> 4 -> 5
console.log('Middle element:', list.findMiddleValue()); // 3

list.add(6);
list.print(); // 1 -> 2 -> 3 -> 4 -> 5 -> 6
console.log('Middle element:', list.findMiddleValue()); // 4 (second middle when even length)
function findMiddleEnhanced<T>(head: ListNode<T> | null): {
    node: ListNode<T> | null;
    value: T | null;
    isEvenLength: boolean;
} {
    if (!head) {
        return { node: null, value: null, isEvenLength: true };
    }
    
    let slow: ListNode<T> | null = head;
    let fast: ListNode<T> | null = head;
    let isEvenLength = false;
    
    while (fast && fast.next) {
        slow = slow!.next;
        if (fast.next.next === null) {
            isEvenLength = true;
        }
        fast = fast.next.next;
    }
    
    return {
        node: slow,
        value: slow ? slow.value : null,
        isEvenLength
    };
}
