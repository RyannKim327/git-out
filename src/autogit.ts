function firstRepeatedCharacter(str: string): string | null {
    const seen = new Set<string>();
    
    for (const char of str) {
        if (seen.has(char)) {
            return char;
        }
        seen.add(char);
    }
    
    return null; // No repeated characters found
}
function firstRepeatedCharacter(str: string): string | null {
    const charCount: { [key: string]: number } = {};
    
    for (const char of str) {
        if (charCount[char]) {
            return char;
        }
        charCount[char] = 1;
    }
    
    return null;
}
function firstRepeatedCharacter(str: string): string | null {
    for (let i = 0; i < str.length; i++) {
        if (str.indexOf(str[i]) !== i) {
            return str[i];
        }
    }
    return null;
}
function firstRepeatedCharacter(str: string): string | null {
    if (typeof str !== 'string') {
        throw new Error('Input must be a string');
    }
    
    if (str.length === 0) {
        return null;
    }
    
    const seen = new Set<string>();
    
    for (const char of str) {
        if (seen.has(char)) {
            return char;
        }
        seen.add(char);
    }
    
    return null;
}
// Test cases
console.log(firstRepeatedCharacter("abcdefa"));  // "a"
console.log(firstRepeatedCharacter("abcde"));    // null
console.log(firstRepeatedCharacter("hello"));    // "l"
console.log(firstRepeatedCharacter("typescript")); // "t"
console.log(firstRepeatedCharacter(""));         // null
function firstRepeatedCharacterWithIndex(str: string): { char: string, index: number } | null {
    const charMap = new Map<string, number>();
    
    for (let i = 0; i < str.length; i++) {
        const char = str[i];
        if (charMap.has(char)) {
            return { char, index: i };
        }
        charMap.set(char, i);
    }
    
    return null;
}
