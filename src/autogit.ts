function bubbleSort(arr: number[]): number[] {
    let n = arr.length;
    let swapped: boolean;

    do {
        swapped = false;
        for (let i = 0; i < n - 1; i++) {
            // Compare adjacent elements
            if (arr[i] > arr[i + 1]) {
                // Swap using destructuring assignment
                [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
                swapped = true;
            }
        }
        n--; // Reduce the range since last element is now sorted
    } while (swapped); // Early exit if no swaps occurred

    return arr;
}
function genericBubbleSort<T>(
    arr: T[],
    compare: (a: T, b: T) => number
): T[] {
    let n = arr.length;
    let swapped: boolean;

    do {
        swapped = false;
        for (let i = 0; i < n - 1; i++) {
            // Use comparator to determine order
            if (compare(arr[i], arr[i + 1]) > 0) {
                [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
                swapped = true;
            }
        }
        n--;
    } while (swapped);

    return arr;
}
// Sort numbers
const numbers = [5, 3, 8, 2];
genericBubbleSort(numbers, (a, b) => a - b); // Ascending: [2, 3, 5, 8]

// Sort strings by length
const strings = ["apple", "kiwi", "banana"];
genericBubbleSort(strings, (a, b) => a.length - b.length); // ["kiwi", "apple", "banana"]

// Sort objects by age
interface Person { name: string; age: number; }
const people: Person[] = [{name: "Alice", age: 30}, {name: "Bob", age: 25}];
genericBubbleSort(people, (a, b) => a.age - b.age); // Bob (25), Alice (30)
