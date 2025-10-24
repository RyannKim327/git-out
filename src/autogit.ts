let numbers = [1, 2, 3, 4, 5];
console.log("Original array:", numbers); // Output: [1, 2, 3, 4, 5]

numbers.reverse(); // Modifies the 'numbers' array directly

console.log("Reversed array (in-place):", numbers); // Output: [5, 4, 3, 2, 1]
const originalFruits = ["apple", "banana", "cherry"];
console.log("Original fruits:", originalFruits); // Output: ["apple", "banana", "cherry"]

// Create a shallow copy, then reverse the copy
const reversedFruits = [...originalFruits].reverse();

console.log("New reversed fruits:", reversedFruits); // Output: ["cherry", "banana", "apple"]
console.log("Original fruits (unchanged):", originalFruits); // Output: ["apple", "banana", "cherry"]
const originalColors = ["red", "green", "blue"];
console.log("Original colors:", originalColors); // Output: ["red", "green", "blue"]

// Create a shallow copy, then reverse the copy
const reversedColors = originalColors.slice().reverse();

console.log("New reversed colors:", reversedColors); // Output: ["blue", "green", "red"]
console.log("Original colors (unchanged):", originalColors); // Output: ["red", "green", "blue"]
const readOnlyItems: ReadonlyArray<string> = ["A", "B", "C"];
// readOnlyItems.reverse(); // TypeScript Error: Property 'reverse' does not exist on type 'readonly string[]'.

const newReversedItems = [...readOnlyItems].reverse(); // Works!
console.log("Readonly items:", readOnlyItems); // Output: ["A", "B", "C"]
console.log("New reversed from readonly:", newReversedItems); // Output: ["C", "B", "A"]

// Or if you want the result to also be readonly:
const anotherReversedReadonly: ReadonlyArray<string> = [...readOnlyItems].reverse();
console.log("Another reversed readonly:", anotherReversedReadonly); // Output: ["C", "B", "A"]
const data = [10, 20, 30];
const reversedData = data.reduce((acc, current) => [current, ...acc], []);

console.log("Original data:", data); // Output: [10, 20, 30]
console.log("Reversed with reduce:", reversedData); // Output: [30, 20, 10]
