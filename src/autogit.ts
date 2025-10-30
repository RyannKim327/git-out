function stringLength(str: string): number {
    let count = 0;
    for (let i = 0; str[i] !== undefined; i++) {
        count++;
    }
    return count;
}

// Usage
const text = "Hello, TypeScript!";
console.log(stringLength(text)); // Output: 18
function stringLength(str: string): number {
    let count = 0;
    while (str[count] !== undefined) {
        count++;
    }
    return count;
}
function stringLength(str: string): number {
    let count = 0;
    const arr = Array.from(str);
    for (const char of arr) {
        count++;
    }
    return count;
}
function stringLength(str: string): number {
    if (str === "") return 0;
    return 1 + stringLength(str.slice(1));
}

// Or with ternary operator
function stringLength(str: string): number {
    return str === "" ? 0 : 1 + stringLength(str.slice(1));
}
function stringLength(str: string): number {
    return str.split('').reduce((count) => count + 1, 0);
}
function stringLength(str: string): number {
    let count = 0;
    const iterator = str[Symbol.iterator]();
    while (iterator.next().value !== undefined) {
        count++;
    }
    return count;
}
function getStringLength(input: string): number {
    let length = 0;
    
    // Iterate until we reach undefined (end of string)
    while (input[length] !== undefined) {
        length++;
    }
    
    return length;
}

// Test the function
const testString = "Hello, World!";
console.log(`Length: ${getStringLength(testString)}`); // Output: 13
console.log(`Built-in length: ${testString.length}`);  // Output: 13
