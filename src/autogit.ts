interface ListNode {
    val: number;
    next: ListNode | null;
}

function isPalindromeArray(head: ListNode | null): boolean {
    if (!head) return true;
    
    const values: number[] = [];
    let current: ListNode | null = head;
    
    // Store all values in an array
    while (current) {
        values.push(current.val);
        current = current.next;
    }
    
    // Check if array is palindrome
    let left = 0, right = values.length - 1;
    while (left < right) {
        if (values[left] !== values[right]) {
            return false;
        }
        left++;
        right--;
    }
    
    return true;
}
function isPalindromeReverse(head: ListNode | null): boolean {
    if (!head || !head.next) return true;
    
    // Find the middle using slow and fast pointers
    let slow: ListNode | null = head;
    let fast: ListNode | null = head;
    
    while (fast && fast.next) {
        slow = slow!.next;
        fast = fast.next.next;
    }
    
    // Reverse the second half
    let prev: ListNode | null = null;
    let current: ListNode | null = slow;
    
    while (current) {
        const next: ListNode | null = current.next;
        current.next = prev;
        prev = current;
        current = next;
    }
    
    // Compare first half with reversed second half
    let firstHalf: ListNode | null = head;
    let secondHalf: ListNode | null = prev;
    
    while (secondHalf) {
        if (firstHalf!.val !== secondHalf.val) {
            return false;
        }
        firstHalf = firstHalf!.next;
        secondHalf = secondHalf.next;
    }
    
    return true;
}
function isPalindromeRecursive(head: ListNode | null): boolean {
    let frontPointer: ListNode | null = head;
    
    function recursivelyCheck(current: ListNode | null): boolean {
        if (current) {
            if (!recursivelyCheck(current.next)) return false;
            if (frontPointer!.val !== current.val) return false;
            frontPointer = frontPointer!.next;
        }
        return true;
    }
    
    return recursivelyCheck(head);
}
class ListNode {
    constructor(
        public val: number,
        public next: ListNode | null = null
    ) {}
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

// Test the functions
function testPalindrome() {
    // Test cases
    const testCases = [
        [1, 2, 3, 2, 1],    // Palindrome
        [1, 2, 2, 1],       // Palindrome
        [1, 2, 3],          // Not palindrome
        [1],                // Single element (palindrome)
        []                  // Empty list (palindrome)
    ];
    
    for (const testCase of testCases) {
        const list = createLinkedList(testCase);
        
        console.log(`List: [${testCase}]`);
        console.log(`Array method: ${isPalindromeArray(list)}`);
        console.log(`Reverse method: ${isPalindromeReverse(createLinkedList(testCase))}`);
        console.log(`Recursive method: ${isPalindromeRecursive(createLinkedList(testCase))}`);
        console.log('---');
    }
}

// Run tests
testPalindrome();
