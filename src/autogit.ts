function getStringLength(str: string): number {
    let count = 0;
    for (const char of str) {
        count++;
    }
    return count;
}

// Usage
const text = "Hello World";
console.log(getStringLength(text)); // Output: 11
function getStringLength(str: string): number {
    let count = 0;
    for (let i = 0; str[i] !== undefined; i++) {
        count++;
    }
    return count;
}

// Usage
const text = "Hello World";
console.log(getStringLength(text)); // Output: 11
function getStringLength(str: string): number {
    if (str === "") {
        return 0;
    }
    return 1 + getStringLength(str.slice(1));
}

// Usage
const text = "Hello World";
console.log(getStringLength(text)); // Output: 11
function getStringLength(str: string): number {
    return [...str].reduce((count) => count + 1, 0);
}

// Or using array length after spread
function getStringLengthAlt(str: string): number {
    return [...str].length; // This technically uses array length, not string length
}

// Usage
const text = "Hello World";
console.log(getStringLength(text)); // Output: 11
function getStringLength(str: string): number {
    let count = 0;
    let i = 0;
    
    while (str[i]) {
        count++;
        i++;
    }
    return count;
}

// Usage
const text = "Hello World";
console.log(getStringLength(text)); // Output: 11
function getStringLength(str: string): number {
    let count = 0;
    let index = 0;
    
    while (str.indexOf(str.charAt(index)) !== -1) {
        count++;
        index++;
    }
    return count;
}
function getStringLength(str: string): number {
    // Input validation
    if (typeof str !== 'string') {
        throw new Error('Input must be a string');
    }
    
    let count = 0;
    for (const char of str) {
        count++;
    }
    return count;
}

// Test cases
const testCases = [
    "",
    "a",
    "Hello",
    "Hello World",
    "🚀🚀🚀", // Emoji characters
    "🎉🎊✨"
];

testCases.forEach(test => {
    console.log(`"${test}" length: ${getStringLength(test)}`);
});
