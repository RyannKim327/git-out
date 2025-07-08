function getStringLength(str: string): number {
    let count = 0;
    for (let i = 0; i < str.length; i++) {
        count++;
    }
    return count;
}

// Example usage:
const myString = "Hello, World!";
const length = getStringLength(myString);
console.log(length); // Output: 13
function getStringLength(str: string): number {
    let count = 0;
    let index = 0;
    while (str[index] !== undefined) {
        count++;
        index++;
    }
    return count;
}

// Example usage:
const myString = "Hello, World!";
const length = getStringLength(myString);
console.log(length); // Output: 13
function getStringLength(str: string): number {
    let count = 0;
    for (const char of str) {
        count++;
    }
    return count;
}

// Example usage:
const myString = "Hello, World!";
const length = getStringLength(myString);
console.log(length); // Output: 13
function getStringLength(str: string): number {
    if (str === "") {
        return 0;
    }
    return 1 + getStringLength(str.slice(1));
}

// Example usage:
const myString = "Hello, World!";
const length = getStringLength(myString);
console.log(length); // Output: 13
