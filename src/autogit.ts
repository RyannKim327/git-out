class ListNode {
    val: number;
    next: ListNode | null;
    constructor(val?: number, next?: ListNode | null) {
        this.val = (val === undefined ? 0 : val);
        this.next = (next === undefined ? null : next);
    }
}

function isPalindrome(head: ListNode | null): boolean {
    if (!head || !head.next) return true;
    
    // Find middle using slow/fast pointers
    let slow = head;
    let fast = head;
    
    while (fast && fast.next) {
        slow = slow.next!;
        fast = fast.next.next!;
    }
    
    // Reverse second half
    let prev: ListNode | null = null;
    let current = slow;
    
    while (current) {
        const next = current.next;
        current.next = prev;
        prev = current;
        current = next;
    }
    
    // Compare first half with reversed second half
    let left = head;
    let right = prev;
    
    while (right) {
        if (left!.val !== right.val) return false;
        left = left!.next;
        right = right.next;
    }
    
    return true;
}
function isPalindromeStack(head: ListNode | null): boolean {
    const stack: number[] = [];
    let current = head;
    
    // Push all elements to stack
    while (current) {
        stack.push(current.val);
        current = current.next;
    }
    
    // Compare with original list
    current = head;
    while (current) {
        if (current.val !== stack.pop()) return false;
        current = current.next;
    }
    
    return true;
}
function isPalindromeRecursive(head: ListNode | null): boolean {
    let frontPointer = head;
    
    function recursivelyCheck(current: ListNode | null): boolean {
        if (current !== null) {
            if (!recursivelyCheck(current.next)) return false;
            if (current.val !== frontPointer!.val) return false;
            frontPointer = frontPointer!.next;
        }
        return true;
    }
    
    return recursivelyCheck(head);
}
// Linked List implementation
class LinkedList {
    head: ListNode | null;
    
    constructor() {
        this.head = null;
    }
    
    add(val: number): void {
        const newNode = new ListNode(val);
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
    
    isPalindrome(): boolean {
        return isPalindrome(this.head);
    }
}

// Test
const list = new LinkedList();
list.add(1);
list.add(2);
list.add(2);
list.add(1);

console.log(list.isPalindrome()); // true
