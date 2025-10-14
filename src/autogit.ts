const numbers: number[] = [1, 2, 3, 4, 5];
const reversedNumbers = numbers.reverse();
console.log(reversedNumbers); // Output: [5, 4, 3, 2, 1]
const numbers: number[] = [1, 2, 3, 4, 5];
const reversedNumbers = [...numbers].reverse();
console.log(reversedNumbers); // Output: [5, 4, 3, 2, 1]
console.log(numbers);         // Output: [1, 2, 3, 4, 5]
function reverseArray<T>(arr: T[]): T[] {
    const reversed: T[] = [];
    for (let i = arr.length - 1; i >= 0; i--) {
        reversed.push(arr[i]);
    }
    return reversed;
}

const numbers = [1, 2, 3, 4, 5];
const reversed = reverseArray(numbers);
console.log(reversed); // Output: [5, 4, 3, 2, 1]
const numbers: number[] = [1, 2, 3, 4, 5];
const reversedNumbers = numbers.reduce((acc: number[], curr) => [curr, ...acc], []);
console.log(reversedNumbers); // Output: [5, 4, 3, 2, 1]
const numbers: number[] = [1, 2, 3, 4, 5];
const reversedNumbers = numbers.slice().reverse();
console.log(reversedNumbers); // Output: [5, 4, 3, 2, 1]
console.log(numbers);         // Output: [1, 2, 3, 4, 5]
function reverseInPlace<T>(arr: T[]): T[] {
    let left = 0;
    let right = arr.length - 1;
    
    while (left < right) {
        [arr[left], arr[right]] = [arr[right], arr[left]];
        left++;
        right--;
    }
    return arr;
}

const numbers = [1, 2, 3, 4, 5];
reverseInPlace(numbers);
console.log(numbers); // Output: [5, 4, 3, 2, 1]
function reverseArray<T>(arr: T[]): T[] {
    return [...arr].reverse();
}

// Usage examples:
const numbers = [1, 2, 3, 4, 5];
const strings = ["a", "b", "c", "d"];
const mixed = [1, "two", true];

console.log(reverseArray(numbers)); // [5, 4, 3, 2, 1]
console.log(reverseArray(strings)); // ["d", "c", "b", "a"]
console.log(reverseArray(mixed));   // [true, "two", 1]
