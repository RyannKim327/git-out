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
    
    let slow: ListNode | null = head;
    let fast: ListNode | null = head;
    
    // Move fast pointer n steps ahead
    for (let i = 0; i < n; i++) {
        if (!fast) return null; // List is shorter than n
        fast = fast.next;
    }
    
    // If fast is null after moving n steps, 
    // it means we need to remove the head
    if (!fast) return head;
    
    // Move both pointers until fast reaches the end
    while (fast && fast.next) {
        slow = slow!.next;
        fast = fast.next;
    }
    
    return slow!.next;
}

// Alternative function that returns the value instead of the node
function findNthFromEndValue(head: ListNode | null, n: number): number | null {
    const node = findNthFromEnd(head, n);
    return node ? node.val : null;
}

// Example usage:
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

// Test the function
const list = createLinkedList([1, 2, 3, 4, 5]);
console.log(findNthFromEndValue(list, 2)); // Output: 4 (2nd from end)
console.log(findNthFromEndValue(list, 1)); // Output: 5 (1st from end)
console.log(findNthFromEndValue(list, 5)); // Output: 1 (5th from end)
console.log(findNthFromEndValue(list, 6)); // Output: null (out of bounds)
