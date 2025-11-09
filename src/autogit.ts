function getStringLength(str: string): number {
    let count = 0;
    for (const _ of str) count++; // Count each character
    return count;
}

// Usage
const message = "Hello, TypeScript!";
console.log(getStringLength(message)); // Output: 18
function getStringLength(str: string): number {
    let count = 0;
    let index = 0;
    while (str[index] !== undefined) { // Stop when undefined
        count++;
        index++;
    }
    return count;
}
