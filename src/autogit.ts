function stringLength(str: string): number {
    let count = 0;
    for (const char of str) {
        count++;
    }
    return count;
}

// Usage
const length = stringLength("Hello"); // Returns 5
function stringLength(str: string): number {
    return [...str].length;
    // Note: This still uses .length on the array, but demonstrates a different approach
}
function stringLength(str: string): number {
    if (str === '') {
        return 0;
    }
    return 1 + stringLength(str.slice(1));
}

// Usage
const length = stringLength("TypeScript"); // Returns 10
function stringLength(str: string): number {
    let count = 0;
    while (str[count] !== undefined) {
        count++;
    }
    return count;
}
function stringLength(str: string): number {
    let count = 0;
    for (let i = 0; str[i] !== undefined; i++) {
        count++;
    }
    return count;
}
function stringLength(str: string): number {
    let count = 0;
    let i = 0;
    while (str.charCodeAt(i)) {
        count++;
        i++;
    }
    return count;
}
function getStringLength(input: string): number {
    let length = 0;
    
    // Iterate through each character
    for (const _ of input) {
        length++;
    }
    
    return length;
}

// Test
const testString = "Hello, TypeScript!";
console.log(getStringLength(testString)); // Output: 18
