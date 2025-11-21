let originalArray: number[] = [1, 2, 3, 4, 5];

console.log("Original array before reverse:", originalArray); // Output: [1, 2, 3, 4, 5]

originalArray.reverse(); // This modifies originalArray directly

console.log("Original array after reverse:", originalArray);  // Output: [5, 4, 3, 2, 1]

let stringArray: string[] = ["apple", "banana", "cherry"];
stringArray.reverse();
console.log("Reversed string array:", stringArray); // Output: ["cherry", "banana", "apple"]
let originalArray: number[] = [10, 20, 30, 40, 50];

console.log("Original array before non-mutating reverse:", originalArray); // Output: [10, 20, 30, 40, 50]

// Create a copy first, then reverse the copy
let newReversedArray: number[] = originalArray.slice().reverse();

console.log("Original array after non-mutating reverse:", originalArray);  // Output: [10, 20, 30, 40, 50] (Unchanged!)
console.log("New reversed array:", newReversedArray);                      // Output: [50, 40, 30, 20, 10]
let originalArray: string[] = ["a", "b", "c", "d"];

console.log("Original array before non-mutating reverse:", originalArray); // Output: ["a", "b", "c", "d"]

// Create a copy using spread syntax, then reverse the copy
let newReversedArray: string[] = [...originalArray].reverse();

console.log("Original array after non-mutating reverse:", originalArray);  // Output: ["a", "b", "c", "d"] (Unchanged!)
console.log("New reversed array:", newReversedArray);                      // Output: ["d", "c", "b", "a"]
