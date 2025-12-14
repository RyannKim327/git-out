class ListNode {
    val: number;
    next: ListNode | null;
    
    constructor(val?: number, next?: ListNode | null) {
        this.val = (val === undefined ? 0 : val);
        this.next = (next === undefined ? null : next);
    }
}

function findNthFromEnd(head: ListNode | null, n: number): ListNode | null {
    if (!head || n <= 0) return null;
    
    let fast: ListNode | null = head;
    let slow: ListNode | null = head;
    
    // Move fast pointer n nodes ahead
    for (let i = 0; i < n; i++) {
        if (!fast) return null; // List is shorter than n
        fast = fast.next;
    }
    
    // Move both pointers until fast reaches the end
    while (fast) {
        slow = slow!.next;
        fast = fast.next;
    }
    
    return slow;
}
function findNthFromEndLength(head: ListNode | null, n: number): ListNode | null {
    if (!head || n <= 0) return null;
    
    // Calculate length of the list
    let length = 0;
    let current: ListNode | null = head;
    
    while (current) {
        length++;
        current = current.next;
    }
    
    // Validate n is within bounds
    if (n > length) return null;
    
    // Find the (length - n)th node from beginning
    let targetPos = length - n;
    current = head;
    
    for (let i = 0; i < targetPos; i++) {
        current = current!.next;
    }
    
    return current;
}
function findNthFromEndRecursive(head: ListNode | null, n: number): ListNode | null {
    let result: ListNode | null = null;
    let count = 0;
    
    function recursiveHelper(node: ListNode | null): number {
        if (!node) return 0;
        
        const index = recursiveHelper(node.next) + 1;
        
        if (index === n) {
            result = node;
        }
        
        return index;
    }
    
    recursiveHelper(head);
    return result;
}
// Helper function to create linked list from array
function createLinkedList(arr: number[]): ListNode | null {
    if (arr.length === 0) return null;
    
    const head = new ListNode(arr[0]);
    let current = head;
    
    for (let i = 1; i < arr.length; i++) {
        current.next = new ListNode(arr[i]);
        current = current.next;
    }
    
    return head;
}

// Helper function to print linked list
function printList(head: ListNode | null): string {
    const result: number[] = [];
    let current = head;
    
    while (current) {
        result.push(current.val);
        current = current.next;
    }
    
    return result.join(' -> ');
}

// Example usage
const list = createLinkedList([1, 2, 3, 4, 5, 6]);
console.log('Original list:', printList(list));

const n = 2;
const nthNode = findNthFromEnd(list, n);
console.log(`${n}th node from end:`, nthNode?.val); // Output: 5

const nthNode2 = findNthFromEndLength(list, 4);
console.log(`4th node from end:`, nthNode2?.val); // Output: 3
// Test cases
console.log(findNthFromEnd(null, 1)); // null (empty list)
console.log(findNthFromEnd(createLinkedList([1]), 2)); // null (n > length)
console.log(findNthFromEnd(createLinkedList([1, 2]), 0)); // null (n <= 0)
