interface ListNode<T> {
    value: T;
    next: ListNode<T> | null;
}

function length<T>(head: ListNode<T> | null): number {
    let count = 0;
    for (let curr = head; curr !== null; curr = curr.next) {
        count++;
    }
    return count;
}
const node3: ListNode<number> = { value: 3, next: null };
const node2: ListNode<number> = { value: 2, next: node3 };
const node1: ListNode<number> = { value: 1, next: node2 };

console.log(length(node1)); // 3
