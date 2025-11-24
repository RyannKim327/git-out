function stringLength(str: string): number {
    return [...str].length;
}

// Usage
const length = stringLength("Hello"); // Returns 5
function stringLength(str: string): number {
    let count = 0;
    for (const char of str) {
        count++;
    }
    return count;
}

// Usage
const length = stringLength("Hello"); // Returns 5
function stringLength(str: string): number {
    if (str === "") return 0;
    return 1 + stringLength(str.slice(1));
}

// Usage
const length = stringLength("Hello"); // Returns 5
function stringLength(str: string): number {
    // Split into individual code points to handle Unicode properly
    const match = str.match(/./gu);
    return match ? match.length : 0;
}

// Usage
const length = stringLength("Hello"); // Returns 5
function getStringLength(input: string): number {
    // Handle null or undefined input
    if (!input) return 0;
    
    let count = 0;
    for (const char of input) {
        count++;
    }
    return count;
}

// Test cases
console.log(getStringLength(""));          // 0
console.log(getStringLength("Hello"));     // 5
console.log(getStringLength("🌍"));        // 1 (handles Unicode)
console.log(getStringLength("Hello 🌍"));  // 7
