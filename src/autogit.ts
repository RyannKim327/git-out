// 1. Define the ListNode structure
class ListNode<T> {
    value: T;
    next: ListNode<T> | null;

    constructor(value: T, next: ListNode<T> | null = null) {
        this.value = value;
        this.next = next;
    }
}

// 2. Define a simple LinkedList class for utility (optional, but good for testing)
class LinkedList<T> {
    head: ListNode<T> | null;

    constructor(head: ListNode<T> | null = null) {
        this.head = head;
    }

    // Appends a new node to the end of the list
    append(value: T): void {
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

    // Creates a linked list from an array
    static fromArray<T>(arr: T[]): LinkedList<T> {
        if (arr.length === 0) {
            return new LinkedList<T>();
        }
        const list = new LinkedList<T>(new ListNode(arr[0]));
        for (let i = 1; i < arr.length; i++) {
            list.append(arr[i]);
        }
        return list;
    }

    // Prints the list values
    print(): string {
        if (!this.head) {
            return "Empty List";
        }
        let current = this.head;
        let result: T[] = [];
        while (current) {
            result.push(current.value);
            current = current.next;
        }
        return result.join(" -> ");
    }
}
function reverseListIterative<T>(head: ListNode<T> | null): ListNode<T> | null {
    let prev: ListNode<T> | null = null;
    let current: ListNode<T> | null = head;
    let nextNode: ListNode<T> | null = null; // Temporary storage for the next node

    while (current !== null) {
        nextNode = current.next; // 1. Store the next node
        current.next = prev;     // 2. Reverse current node's pointer
        prev = current;          // 3. Move prev one step forward (to current)
        current = nextNode;      // 4. Move current one step forward (to nextNode)
    }

    return prev; // `prev` is now the new head of the reversed list
}
function reverseListRecursive<T>(head: ListNode<T> | null): ListNode<T> | null {
    // Base case: empty list or single node
    if (head === null || head.next === null) {
        return head;
    }

    // Recursively reverse the rest of the list
    // `reversedHead` will be the new head of the entire reversed list
    const reversedHead: ListNode<T> | null = reverseListRecursive(head.next);

    // Now, `head.next` is the second node in the original list.
    // After the recursive call, `head.next` (the original second node)
    // currently has its `next` pointer pointing to the head of the *reversed* sublist
    // that started from the original third node.
    // We want the original second node (`head.next`) to point back to the original `head`.
    if (head.next !== null) { // Type guard for safety
        head.next.next = head;
    }


    // The original `head` is now the tail of the reversed list,
    // so its `next` pointer should be null.
    head.next = null;

    return reversedHead; // This is the new head of the entire reversed list
}
// --- Test the Iterative Approach ---
console.log("--- Iterative Reversal ---");
const list1 = LinkedList.fromArray([1, 2, 3, 4, 5]);
console.log("Original List 1:", list1.print()); // Expected: 1 -> 2 -> 3 -> 4 -> 5

const reversedHead1 = reverseListIterative(list1.head);
const reversedList1 = new LinkedList(reversedHead1);
console.log("Reversed List 1:", reversedList1.print()); // Expected: 5 -> 4 -> 3 -> 2 -> 1

const listEmpty = LinkedList.fromArray([]);
console.log("Original Empty List:", listEmpty.print());
const reversedEmpty = new LinkedList(reverseListIterative(listEmpty.head));
console.log("Reversed Empty List:", reversedEmpty.print());

const listSingle = LinkedList.fromArray([10]);
console.log("Original Single List:", listSingle.print());
const reversedSingle = new LinkedList(reverseListIterative(listSingle.head));
console.log("Reversed Single List:", reversedSingle.print());


console.log("\n--- Recursive Reversal ---");
// --- Test the Recursive Approach ---
const list2 = LinkedList.fromArray([1, 2, 3, 4, 5]);
console.log("Original List 2:", list2.print()); // Expected: 1 -> 2 -> 3 -> 4 -> 5

const reversedHead2 = reverseListRecursive(list2.head);
const reversedList2 = new LinkedList(reversedHead2);
console.log("Reversed List 2:", reversedList2.print()); // Expected: 5 -> 4 -> 3 -> 2 -> 1

const listEmptyRec = LinkedList.fromArray([]);
console.log("Original Empty List (Rec):", listEmptyRec.print());
const reversedEmptyRec = new LinkedList(reverseListRecursive(listEmptyRec.head));
console.log("Reversed Empty List (Rec):", reversedEmptyRec.print());

const listSingleRec = LinkedList.fromArray([100]);
console.log("Original Single List (Rec):", listSingleRec.print());
const reversedSingleRec = new LinkedList(reverseListRecursive(listSingleRec.head));
console.log("Reversed Single List (Rec):", reversedSingleRec.print());
