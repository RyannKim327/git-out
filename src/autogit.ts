const numbers: number[] = [1, 2, 3, 4, 5];
const elementToRemove = 3;

// Remove all occurrences of the element
const filteredArray = numbers.filter(item => item !== elementToRemove);
console.log(filteredArray); // [1, 2, 4, 5]
const numbers: number[] = [1, 2, 3, 4, 5];
const elementToRemove = 3;

// Find index first
const index = numbers.indexOf(elementToRemove);
if (index > -1) {
    numbers.splice(index, 1);
}
console.log(numbers); // [1, 2, 4, 5]
const numbers: number[] = [1, 2, 3, 3, 4, 5];
const elementToRemove = 3;

// Remove all occurrences
const result = numbers.filter(item => item !== elementToRemove);
console.log(result); // [1, 2, 4, 5]
// Remove last element
const numbers = [1, 2, 3, 4, 5];
numbers.pop();
console.log(numbers); // [1, 2, 3, 4]

// Remove first element
numbers.shift();
console.log(numbers); // [2, 3, 4]
function removeElement<T>(arr: T[], element: T): T[] {
    return arr.filter(item => item !== element);
}

// Usage
const numbers = [1, 2, 3, 4, 5];
const result = removeElement(numbers, 3);
console.log(result); // [1, 2, 4, 5]
const numbers: number[] = [1, 2, 3, 4, 5];

// Remove element at specific index
function removeByIndex<T>(arr: T[], index: number): T[] {
    return [...arr.slice(0, index), ...arr.slice(index + 1)];
}

const result = removeByIndex(numbers, 2);
console.log(result); // [1, 2, 4, 5]
