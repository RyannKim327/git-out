function stringLength(str: string): number {
    let count = 0;
    for (const char of str) {
        count++;
    }
    return count;
}

// Usage
const myString = "Hello, World!";
console.log(stringLength(myString)); // Output: 13
function stringLength(str: string): number {
    let count = 0;
    for (let i = 0; str[i] !== undefined; i++) {
        count++;
    }
    return count;
}

// Usage
console.log(stringLength("TypeScript")); // Output: 10
function stringLength(str: string): number {
    if (str === '') {
        return 0;
    }
    return 1 + stringLength(str.slice(1));
}

// Usage
console.log(stringLength("Recursion")); // Output: 9
function stringLength(str: string): number {
    return Array.from(str).length;
}

// Usage
console.log(stringLength("Array Method")); // Output: 12
function stringLength(str: string): number {
    return [...str].length;
}

// Usage
console.log(stringLength("Spread Operator")); // Output: 15
function stringLength(str: string): number {
    return [...str].reduce((count) => count + 1, 0);
}

// Usage
console.log(stringLength("Reduce Method")); // Output: 13
// Test with emojis and Unicode characters
const testString = "Hello 🚀 World 🌍";
console.log(stringLength(testString)); // Correctly outputs: 14
function getStringLength(input: string): number {
    if (typeof input !== 'string') {
        throw new Error('Input must be a string');
    }
    
    let length = 0;
    for (const _ of input) {
        length++;
    }
    return length;
}

// Usage examples
console.log(getStringLength("")); // 0
console.log(getStringLength("a")); // 1
console.log(getStringLength("Hello, TypeScript!")); // 19
