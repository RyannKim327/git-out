function stringLength(str: string): number {
    let count = 0;
    for (const char of str) {
        count++;
    }
    return count;
}

// Usage
const text = "Hello, World!";
console.log(stringLength(text)); // Output: 13
function stringLength(str: string): number {
    return [...str].length;
}

// Usage
const text = "Hello, World!";
console.log(stringLength(text)); // Output: 13
function stringLength(str: string): number {
    if (str === '') {
        return 0;
    }
    return 1 + stringLength(str.slice(1));
}

// Usage
const text = "Hello, World!";
console.log(stringLength(text)); // Output: 13
function stringLength(str: string): number {
    let count = 0;
    let currentStr = str;
    
    while (currentStr !== '') {
        count++;
        currentStr = currentStr.substring(1);
    }
    
    return count;
}

// Usage
const text = "Hello, World!";
console.log(stringLength(text)); // Output: 13
function getStringLength(input: string): number {
    // Type guard to handle null/undefined
    if (!input) return 0;
    
    let length = 0;
    for (const _ of input) {
        length++;
    }
    return length;
}

// Test cases
console.log(getStringLength("Hello"));        // 5
console.log(getStringLength(""));            // 0
console.log(getStringLength("👋🌍"));        // 2 (emoji characters)
console.log(getStringLength("Hello, 世界!")); // 10 (mixed characters)
