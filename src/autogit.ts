function firstNonRepeatingCharacter(str: string): string | null {
    const frequencyMap: Record<string, number> = {};
    
    // Count frequency of each character
    for (const char of str) {
        frequencyMap[char] = (frequencyMap[char] || 0) + 1;
    }
    
    // Find first character with frequency 1
    for (const char of str) {
        if (frequencyMap[char] === 1) {
            return char;
        }
    }
    
    return null; // Return null if no non-repeating character found
}

// Usage
const result = firstNonRepeatingCharacter("swiss");
console.log(result); // Output: "w"
function firstNonRepeatingCharacter(str: string): string | null {
    for (let i = 0; i < str.length; i++) {
        const char = str[i];
        if (str.indexOf(char) === str.lastIndexOf(char)) {
            return char;
        }
    }
    return null;
}

// Usage
const result = firstNonRepeatingCharacter("typescript");
console.log(result); // Output: "t" (first non-repeating from start)
function firstNonRepeatingCharacter(str: string): string | null {
    if (str.length === 0) return null;
    
    const frequencyMap: Map<string, number> = new Map();
    const order: string[] = [];
    
    // Build frequency map and preserve insertion order
    for (const char of str) {
        if (!frequencyMap.has(char)) {
            frequencyMap.set(char, 1);
            order.push(char);
        } else {
            frequencyMap.set(char, frequencyMap.get(char)! + 1);
        }
    }
    
    // Find first non-repeating character
    for (const char of order) {
        if (frequencyMap.get(char) === 1) {
            return char;
        }
    }
    
    return null;
}

// Usage examples
console.log(firstNonRepeatingCharacter("swiss"));        // "w"
console.log(firstNonRepeatingCharacter("aabbcc"));       // null
console.log(firstNonRepeatingCharacter("hello"));        // "h"
console.log(firstNonRepeatingCharacter(""));             // null
function firstNonRepeatingCharacter(str: string): string | null {
    const frequencyMap: Record<string, number> = {};
    const order: string[] = [];
    
    for (const char of str) {
        if (!frequencyMap[char]) {
            frequencyMap[char] = 1;
            order.push(char);
        } else {
            frequencyMap[char]++;
        }
    }
    
    for (const char of order) {
        if (frequencyMap[char] === 1) {
            return char;
        }
    }
    
    return null;
}
function findFirstNonRepeatingChar(input: string): { char: string | null; index: number } {
    if (input.length === 0) {
        return { char: null, index: -1 };
    }
    
    const frequencyMap: Record<string, number> = {};
    
    // Count frequencies
    for (const char of input) {
        frequencyMap[char] = (frequencyMap[char] || 0) + 1;
    }
    
    // Find first non-repeating character and its index
    for (let i = 0; i < input.length; i++) {
        if (frequencyMap[input[i]] === 1) {
            return { char: input[i], index: i };
        }
    }
    
    return { char: null, index: -1 };
}

// Usage
const result = findFirstNonRepeatingChar("programming");
console.log(result); // { char: "p", index: 0 }
