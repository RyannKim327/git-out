function firstNonRepeatingChar(str: string): string | null {
    // Track character frequency
    const charCount = new Map<string, number>();
    
    // First pass: count occurrences
    for (const char of str) {
        charCount.set(char, (charCount.get(char) || 0) + 1);
    }
    
    // Second pass: find first character with count 1
    for (const char of str) {
        if (charCount.get(char) === 1) {
            return char;
        }
    }
    
    return null; // No non-repeating character found
}

// Usage
console.log(firstNonRepeatingChar("leetcode")); // 'l'
console.log(firstNonRepeatingChar("aabb")); // null
console.log(firstNonRepeatingChar("aabc")); // 'c'
function firstNonRepeatingChar(str: string): string | null {
    // Count frequency using object
    const charCount: { [key: string]: number } = {};
    
    for (const char of str) {
        charCount[char] = (charCount[char] || 0) + 1;
    }
    
    for (const char of str) {
        if (charCount[char] === 1) {
            return char;
        }
    }
    
    return null;
}
function firstNonRepeatingChar(str: string): string | null {
    // For lowercase letters only (a-z)
    const seen = new Array(26).fill(false);
    const counts = new Array(26).fill(0);
    const base = 'a'.charCodeAt(0);
    
    for (const char of str) {
        if (char >= 'a' && char <= 'z') {
            const index = char.charCodeAt(0) - base;
            if (seen[index]) {
                counts[index] = 2; // Mark as repeating
            } else {
                seen[index] = true;
                counts[index] = 1;
            }
        }
    }
    
    for (const char of str) {
        if (char >= 'a' && char <= 'z') {
            const index = char.charCodeAt(0) - base;
            if (counts[index] === 1) {
                return char;
            }
        }
    }
    
    return null;
}
function firstNonRepeatingChar(str: string): string | null {
    for (let i = 0; i < str.length; i++) {
        const char = str[i];
        // If first and last occurrence are the same, it's non-repeating
        if (str.indexOf(char) === str.lastIndexOf(char)) {
            return char;
        }
    }
    return null;
}
