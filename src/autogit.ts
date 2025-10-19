function stringLength(str: string): number {
    let count = 0;
    for (const char of str) {
        count++;
    }
    return count;
}

// Example usage
const text = "Hello, World!";
console.log(stringLength(text)); // Output: 13
function stringLength(str: string): number {
    let count = 0;
    for (let i = 0; str[i] !== undefined; i++) {
        count++;
    }
    return count;
}

// Example usage
console.log(stringLength("TypeScript")); // Output: 10
function stringLength(str: string): number {
    return Array.from(str).length;
}

// Example usage
console.log(stringLength("Hello")); // Output: 5
function stringLength(str: string): number {
    if (str === '') {
        return 0;
    }
    return 1 + stringLength(str.slice(1));
}

// Example usage
console.log(stringLength("Recursion")); // Output: 9
function stringLength(str: string): number {
    return str.split('').length;
}

// Example usage
console.log(stringLength("Split method")); // Output: 12
function stringLength(str: string): number {
    const matches = str.match(/./gs); // 's' flag for dotall mode
    return matches ? matches.length : 0;
}

// Example usage
console.log(stringLength("Regex method")); // Output: 12
function getStringLength(input: string): number {
    // Type guard for null/undefined
    if (input == null) {
        return 0;
    }
    
    let length = 0;
    for (const char of input) {
        length++;
    }
    return length;
}

// Test cases
console.log(getStringLength(""));           // 0
console.log(getStringLength("Hello"));     // 5
console.log(getStringLength("🌍 World"));  // 7 (correctly handles Unicode)
