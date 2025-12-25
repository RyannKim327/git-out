function stringLength(str: string): number {
    let count = 0;
    for (const char of str) {
        count++;
    }
    return count;
}

// Usage
const length = stringLength("Hello");
console.log(length); // Output: 5
function stringLength(str: string): number {
    let count = 0;
    while (str[count] !== undefined) {
        count++;
    }
    return count;
}
function stringLength(str: string): number {
    if (str === "") {
        return 0;
    }
    return 1 + stringLength(str.slice(1));
}
function stringLength(str: string): number {
    const arr = Array.from(str);
    let count = 0;
    arr.forEach(() => count++);
    return count;
}
function stringLength(str: string): number {
    return Array.from(str).reduce((count) => count + 1, 0);
}
function getStringLength(input: string): number {
    // Type guard to ensure input is a string
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
console.log(getStringLength(""));          // 0
console.log(getStringLength("Hello"));     // 5
console.log(getStringLength("TypeScript")); // 10
