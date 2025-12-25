function stringLength(str: string): number {
    let count = 0;
    for (const char of str) {
        count++;
    }
    return count;
}

// Usage
const result = stringLength("Hello World"); // Returns 11
function stringLength(str: string): number {
    let count = 0;
    let i = 0;
    while (str[i] !== undefined) {
        count++;
        i++;
    }
    return count;
}
function stringLength(str: string): number {
    if (str === '') {
        return 0;
    }
    return 1 + stringLength(str.slice(1));
}

// Usage
const result = stringLength("TypeScript"); // Returns 10
function stringLength(str: string): number {
    return [...str].reduce((count) => count + 1, 0);
}

// Or using forEach
function stringLength(str: string): number {
    let count = 0;
    [...str].forEach(() => count++);
    return count;
}
function stringLength(str: string): number {
    const iterator = str[Symbol.iterator]();
    let count = 0;
    let next = iterator.next();
    
    while (!next.done) {
        count++;
        next = iterator.next();
    }
    return count;
}
function getStringLength(input: string): number {
    let length = 0;
    
    // Iterate through each character
    for (const char of input) {
        length++;
    }
    
    return length;
}

// Test the function
const testString = "Hello TypeScript!";
console.log(`Length of "${testString}" is: ${getStringLength(testString)}`);
// Output: Length of "Hello TypeScript!" is: 17
