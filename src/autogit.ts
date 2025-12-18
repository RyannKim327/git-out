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

// Example usage
console.log(firstRepeatedCharacter("abcdefa")); // "a"
console.log(firstRepeatedCharacter("abcde"));   // null
console.log(firstRepeatedCharacter("hello"));   // "l"
function firstRepeatedCharacter(str: string): string | null {
    const charCount: { [key: string]: boolean } = {};
    
    for (const char of str) {
        if (charCount[char]) {
            return char;
        }
        charCount[char] = true;
    }
    
    return null;
}
function firstRepeatedCharacterWithIndex(str: string): { char: string, index: number } | null {
    const seen = new Set<string>();
    
    for (let i = 0; i < str.length; i++) {
        const char = str[i];
        if (seen.has(char)) {
            return { char, index: i };
        }
        seen.add(char);
    }
    
    return null;
}

// Example usage
const result = firstRepeatedCharacterWithIndex("programming");
if (result) {
    console.log(`First repeated character: "${result.char}" at index ${result.index}`);
} else {
    console.log("No repeated characters found");
}
function firstRepeatedCharacterArray(str: string): string | null {
    for (let i = 0; i < str.length; i++) {
        if (str.indexOf(str[i]) !== i) {
            return str[i];
        }
    }
    return null;
}
function firstRepeatedCharacterDetailed(str: string): string | null {
    const charFrequency: Map<string, number> = new Map();
    
    for (const char of str) {
        const count = charFrequency.get(char) || 0;
        charFrequency.set(char, count + 1);
        
        if (count > 0) {
            return char;
        }
    }
    
    return null;
}

// To get all repeated characters
function getAllRepeatedCharacters(str: string): string[] {
    const charFrequency: Map<string, number> = new Map();
    const repeated: Set<string> = new Set();
    
    for (const char of str) {
        const count = charFrequency.get(char) || 0;
        charFrequency.set(char, count + 1);
        
        if (count > 0) {
            repeated.add(char);
        }
    }
    
    return Array.from(repeated);
}
function firstRepeatedCharacterSafe(str: string): string | null {
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
