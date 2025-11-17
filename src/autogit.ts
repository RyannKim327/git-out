class ListNode {
    constructor(public val: number, public next: ListNode | null = null) {}
}

function isPalindromeStack(head: ListNode | null): boolean {
    if (!head || !head.next) return true;
    
    const stack: number[] = [];
    let slow: ListNode | null = head;
    let fast: ListNode | null = head;
    
    // Find middle using slow and fast pointers
    while (fast && fast.next) {
        stack.push(slow!.val);
        slow = slow!.next;
        fast = fast.next.next;
    }
    
    // Handle odd length lists
    if (fast) {
        slow = slow!.next;
    }
    
    // Compare second half with stack
    while (slow) {
        if (stack.pop() !== slow.val) {
            return false;
        }
        slow = slow.next;
    }
    
    return true;
}
function isPalindromeReverse(head: ListNode | null): boolean {
    if (!head || !head.next) return true;
    
    let slow: ListNode | null = head;
    let fast: ListNode | null = head;
    
    // Find middle
    while (fast && fast.next) {
        slow = slow!.next;
        fast = fast.next.next;
    }
    
    // Reverse second half
    let secondHalf = reverseList(slow);
    let firstHalf: ListNode | null = head;
    let secondHalfCopy = secondHalf;
    
    // Compare both halves
    let result = true;
    while (secondHalf) {
        if (firstHalf!.val !== secondHalf.val) {
            result = false;
            break;
        }
        firstHalf = firstHalf!.next;
        secondHalf = secondHalf.next;
    }
    
    // Restore the original list
    reverseList(secondHalfCopy);
    
    return result;
}

function reverseList(head: ListNode | null): ListNode | null {
    let prev: ListNode | null = null;
    let current: ListNode | null = head;
    
    while (current) {
        const next = current.next;
        current.next = prev;
        prev = current;
        current = next;
    }
    
    return prev;
}
function isPalindromeRecursive(head: ListNode | null): boolean {
    let frontPointer: ListNode | null = head;
    
    function recursivelyCheck(currentNode: ListNode | null): boolean {
        if (currentNode) {
            if (!recursivelyCheck(currentNode.next)) return false;
            if (currentNode.val !== frontPointer!.val) return false;
            frontPointer = frontPointer!.next;
        }
        return true;
    }
    
    return recursivelyCheck(head);
}
// ListNode class
class ListNode {
    constructor(public val: number, public next: ListNode | null = null) {}
}

// Create linked list from array
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

// Print linked list (for debugging)
function printLinkedList(head: ListNode | null): string {
    const values: number[] = [];
    let current = head;
    
    while (current) {
        values.push(current.val);
        current = current.next;
    }
    
    return values.join(' -> ');
}

// Test function
function testPalindrome() {
    // Test cases
    const testCases = [
        [1, 2, 3, 2, 1],    // true
        [1, 2, 2, 1],       // true
        [1, 2, 3],          // false
        [1],                 // true
        [1, 1],              // true
        [1, 2],              // false
    ];
    
    console.log("Testing Palindrome Checker:\n");
    
    for (const testCase of testCases) {
        const list = createLinkedList(testCase);
        const stackResult = isPalindromeStack(list);
        const reverseResult = isPalindromeReverse(list);
        
        console.log(`List: ${printLinkedList(createLinkedList(testCase))}`);
        console.log(`Stack Method: ${stackResult}`);
        console.log(`Reverse Method: ${reverseResult}`);
        console.log(`Expected: ${stackResult === reverseResult ? '✓' : '✗'}`);
        console.log('---');
    }
}

// Run tests
testPalindrome();
