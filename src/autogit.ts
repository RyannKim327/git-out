function firstNonRepeatingCharacter(str: string): string | null {
    const charCount = new Map<string, number>();
    
    // Count occurrences of each character
    for (const char of str) {
        charCount.set(char, (charCount.get(char) || 0) + 1);
    }
    
    // Find first character with count = 1
    for (const char of str) {
        if (charCount.get(char) === 1) {
            return char;
        }
    }
    
    return null; // No non-repeating character found
}

// Example usage
console.log(firstNonRepeatingCharacter("swiss")); // "w"
console.log(firstNonRepeatingCharacter("aabbcc")); // null
console.log(firstNonRepeatingCharacter("typescript")); // "t"
function firstNonRepeatingCharacterObj(str: string): string | null {
    const charCount: { [key: string]: number } = {};
    
    // Count occurrences
    for (const char of str) {
        charCount[char] = (charCount[char] || 0) + 1;
    }
    
    // Find first character with count = 1
    for (const char of str) {
        if (charCount[char] === 1) {
            return char;
        }
    }
    
    return null;
}
function firstNonRepeatingCharacterOptimized(str: string): string | null {
    const seen = new Set<string>();
    const nonRepeating: string[] = [];
    
    for (const char of str) {
        if (seen.has(char)) {
            // Remove from nonRepeating array if it exists
            const index = nonRepeating.indexOf(char);
            if (index > -1) {
                nonRepeating.splice(index, 1);
            }
        } else {
            seen.add(char);
            nonRepeating.push(char);
        }
    }
    
    return nonRepeating.length > 0 ? nonRepeating[0] : null;
}
function firstNonRepeatingCharArray(str: string): string | null {
    for (let i = 0; i < str.length; i++) {
        const char = str[i];
        if (str.indexOf(char) === str.lastIndexOf(char)) {
            return char;
        }
    }
    return null;
}
type NonRepeatingResult = {
    character: string | null;
    position: number | null;
};

function findFirstNonRepeatingCharacter(str: string): NonRepeatingResult {
    const charCount = new Map<string, { count: number; firstIndex: number }>();
    
    // Count occurrences and track first index
    for (let i = 0; i < str.length; i++) {
        const char = str[i];
        if (charCount.has(char)) {
            const data = charCount.get(char)!;
            charCount.set(char, { ...data, count: data.count + 1 });
        } else {
            charCount.set(char, { count: 1, firstIndex: i });
        }
    }
    
    // Find character with count = 1 and earliest position
    let result: NonRepeatingResult = { character: null, position: null };
    
    for (const [char, data] of charCount) {
        if (data.count === 1) {
            if (result.position === null || data.firstIndex < result.position) {
                result = { character: char, position: data.firstIndex };
            }
        }
    }
    
    return result;
}

// Usage examples
const test1 = findFirstNonRepeatingCharacter("swiss");
console.log(test1); // { character: "w", position: 1 }

const test2 = findFirstNonRepeatingCharacter("aabbcc");
console.log(test2); // { character: null, position: null }

const test3 = findFirstNonRepeatingCharacter("typescript");
console.log(test3); // { character: "t", position: 0 }
// Test cases
console.log(firstNonRepeatingCharacter("")); // null (empty string)
console.log(firstNonRepeatingCharacter("a")); // "a" (single character)
console.log(firstNonRepeatingCharacter("aa")); // null (all repeating)
console.log(firstNonRepeatingCharacter("aA")); // "a" (case sensitive)
console.log(firstNonRepeatingCharacter("hello world")); // "h"
