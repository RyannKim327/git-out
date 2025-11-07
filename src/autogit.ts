function stringLength(str: string): number {
    let count = 0;
    for (let i = 0; str[i] !== undefined; i++) {
        count++;
    }
    return count;
}

// Usage
const myString = "Hello, World!";
console.log(stringLength(myString)); // Output: 13
function stringLengthRecursive(str: string, index = 0): number {
    if (str[index] === undefined) {
        return index;
    }
    return stringLengthRecursive(str, index + 1);
}

// Usage
const myString = "Hello, World!";
console.log(stringLengthRecursive(myString)); // Output: 13
function stringLengthReduce(str: string): number {
    return str.split('').reduce((count) => count + 1, 0);
}

// Usage
const myString = "Hello, World!";
console.log(stringLengthReduce(myString)); // Output: 13
function stringLengthWhile(str: string): number {
    let count = 0;
    while (str[count] !== undefined) {
        count++;
    }
    return count;
}

// Usage
const myString = "Hello, World!";
console.log(stringLengthWhile(myString)); // Output: 13
function stringLengthArray(str: string): number {
    return Array.from(str).length;
}

// Usage
const myString = "Hello, World!";
console.log(stringLengthArray(myString)); // Output: 13
function getStringLength(str: string): number {
    let length = 0;
    while (str[length] !== undefined) {
        length++;
    }
    return length;
}
