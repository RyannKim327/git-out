class ListNode<T> {
    constructor(
        public value: T,
        public next: ListNode<T> | null = null
    ) {}
}

function isPalindrome<T>(head: ListNode<T> | null): boolean {
    if (!head || !head.next) return true;
    
    // Find the middle of the list
    let slow: ListNode<T> | null = head;
    let fast: ListNode<T> | null = head;
    
    while (fast && fast.next) {
        slow = slow!.next;
        fast = fast.next.next;
    }
    
    // Reverse the second half
    let secondHalf: ListNode<T> | null = reverseList(slow);
    let firstHalf: ListNode<T> | null = head;
    
    // Compare both halves
    while (secondHalf && firstHalf) {
        if (secondHalf.value !== firstHalf.value) {
            return false;
        }
        secondHalf = secondHalf.next;
        firstHalf = firstHalf.next;
    }
    
    return true;
}

function reverseList<T>(head: ListNode<T> | null): ListNode<T> | null {
    let prev: ListNode<T> | null = null;
    let current: ListNode<T> | null = head;
    
    while (current) {
        const next: ListNode<T> | null = current.next;
        current.next = prev;
        prev = current;
        current = next;
    }
    
    return prev;
}
function isPalindromeWithStack<T>(head: ListNode<T> | null): boolean {
    if (!head || !head.next) return true;
    
    const stack: T[] = [];
    let slow: ListNode<T> | null = head;
    let fast: ListNode<T> | null = head;
    
    // Push first half to stack
    while (fast && fast.next) {
        stack.push(slow!.value);
        slow = slow!.next;
        fast = fast.next.next;
    }
    
    // If odd number of elements, skip middle
    if (fast) {
        slow = slow!.next;
    }
    
    // Compare stack with second half
    while (slow) {
        if (stack.pop() !== slow.value) {
            return false;
        }
        slow = slow.next;
    }
    
    return true;
}
function isPalindromeRecursive<T>(head: ListNode<T> | null): boolean {
    let frontPointer: ListNode<T> | null = head;
    
    function recursivelyCheck(currentNode: ListNode<T> | null): boolean {
        if (!currentNode) return true;
        
        if (!recursivelyCheck(currentNode.next)) {
            return false;
        }
        
        if (currentNode.value !== frontPointer!.value) {
            return false;
        }
        
        frontPointer = frontPointer!.next;
        return true;
    }
    
    return recursivelyCheck(head);
}
// Helper function to create linked list from array
function createLinkedList<T>(arr: T[]): ListNode<T> | null {
    if (arr.length === 0) return null;
    
    const head = new ListNode(arr[0]);
    let current = head;
    
    for (let i = 1; i < arr.length; i++) {
        current.next = new ListNode(arr[i]);
        current = current.next;
    }
    
    return head;
}

// Test function
function testPalindrome() {
    // Test cases
    const testCases = [
        [1, 2, 3, 2, 1],    // true
        [1, 2, 2, 1],       // true
        [1, 2, 3],          // false
        [1],                // true
        [],                 // true
        [1, 2, 3, 4, 3, 2, 1], // true
        [1, 2, 3, 4, 2, 1]  // false
    ];
    
    testCases.forEach((testCase, index) => {
        const list = createLinkedList(testCase);
        const result1 = isPalindrome(list);
        const result2 = isPalindromeWithStack(list);
        const result3 = isPalindromeRecursive(list);
        
        console.log(`Test ${index + 1}: [${testCase}]`);
        console.log(`Reverse & Compare: ${result1}`);
        console.log(`Stack Method: ${result2}`);
        console.log(`Recursive: ${result3}`);
        console.log('---');
    });
}

// Run tests
testPalindrome();
// Create a palindrome linked list: 1 -> 2 -> 3 -> 2 -> 1
const head = new ListNode(1);
head.next = new ListNode(2);
head.next.next = new ListNode(3);
head.next.next.next = new ListNode(2);
head.next.next.next.next = new ListNode(1);

console.log(isPalindrome(head)); // true
console.log(isPalindromeWithStack(head)); // true
console.log(isPalindromeRecursive(head)); // true
