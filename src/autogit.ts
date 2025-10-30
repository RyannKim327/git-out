function firstRepeatedCharacter(str: string): string | null {
    const seen = new Set<string>();
    
    for (const char of str) {
        if (seen.has(char)) {
            return char;
        }
        seen.add(char);
    }
    
    return null;
}

// Example usage
console.log(firstRepeatedCharacter("abcdef")); // null
console.log(firstRepeatedCharacter("hello"));  // "l"
console.log(firstRepeatedCharacter("typescript")); // "p"
function firstRepeatedCharacter(str: string): string | null {
    const charCount: Record<string, number> = {};
    
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
function firstRepeatedCharacterWithInfo(str: string): {
    character: string;
    position: number;
} | null {
    const seen = new Map<string, number>();
    
    for (let i = 0; i < str.length; i++) {
        const char = str[i];
        if (seen.has(char)) {
            return {
                character: char,
                position: i
            };
        }
        seen.set(char, i);
    }
    
    return null;
}

// Example usage
const result = firstRepeatedCharacterWithInfo("programming");
console.log(result); // { character: "r", position: 4 }
function firstRepeatedCharacterRegex(str: string): string | null {
    const match = str.match(/(.)(?=.*\1)/);
    return match ? match[1] : null;
}
function findFirstRepeatedCharacter(input: string): string | null {
    // Type guard for empty string
    if (!input || input.length === 0) {
        return null;
    }

    const seenCharacters = new Set<string>();
    
    for (const char of input) {
        if (seenCharacters.has(char)) {
            return char;
        }
        seenCharacters.add(char);
    }
    
    return null;
}

// Test cases
const testCases = [
    "abcdef",    // null
    "hello",     // "l"
    "typescript", // "p"
    "aabbcc",    // "a"
    "",          // null
    "x"          // null
];

testCases.forEach(test => {
    console.log(`"${test}" -> ${findFirstRepeatedCharacter(test)}`);
});
