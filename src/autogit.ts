function stringLength(str: string): number {
    let count = 0;
    for (let i = 0; str[i] !== undefined; i++) {
        count++;
    }
    return count;
}

// Usage
console.log(stringLength("Hello")); // Output: 5
function stringLength(str: string): number {
    let count = 0;
    while (str[count] !== undefined) {
        count++;
    }
    return count;
}
function stringLength(str: string): number {
    const arr = Array.from(str);
    let count = 0;
    for (const _ of arr) {
        count++;
    }
    return count;
}
function stringLength(str: string): number {
    if (str === "") return 0;
    return 1 + stringLength(str.substring(1));
}

// Alternative recursion with slice
function stringLengthRecursive(str: string): number {
    return str === "" ? 0 : 1 + stringLengthRecursive(str.slice(1));
}
function stringLength(str: string): number {
    return [...str].length; // Technically uses array's length property
}
function getStringLength(input: string): number {
    // Validate input is a string
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
console.log(getStringLength(""));          // 0
console.log(getStringLength("Hello"));     // 5
console.log(getStringLength("TypeScript")); // 10
