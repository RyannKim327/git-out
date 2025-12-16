function stringLength(str: string): number {
    let count = 0;
    while (str[count] !== undefined) {
        count++;
    }
    return count;
}

// Usage
console.log(stringLength("Hello")); // Output: 5
console.log(stringLength("")); // Output: 0
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
    if (str === "") return 0;
    return 1 + stringLength(str.slice(1));
}

// Usage
console.log(stringLength("Recursion")); // Output: 9
function stringLength(str: string): number {
    let count = 0;
    const arr = Array.from(str);
    for (const char of arr) {
        count++;
    }
    return count;
}

// Usage
console.log(stringLength("Array Method")); // Output: 12
function stringLength(str: string): number {
    let count = 0;
    const iterator = str[Symbol.iterator]();
    let result = iterator.next();
    
    while (!result.done) {
        count++;
        result = iterator.next();
    }
    return count;
}

// Usage
console.log(stringLength("Iterator")); // Output: 8
function getStringLength(input: string): number {
    // Input validation
    if (typeof input !== 'string') {
        throw new Error('Input must be a string');
    }
    
    let length = 0;
    let index = 0;
    
    // Loop until we reach undefined (end of string)
    while (input[index] !== undefined) {
        length++;
        index++;
    }
    
    return length;
}

// Test cases
console.log(getStringLength("")); // 0
console.log(getStringLength("a")); // 1
console.log(getStringLength("Hello World")); // 11
console.log(getStringLength("🎉")); // 2 (emoji counts as 2 characters in JavaScript)
