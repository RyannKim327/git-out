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
const result = firstRepeatedCharacter("typescript");
console.log(result); // Output: "p"
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
        const char = str[i];
        if (str.indexOf(char) !== i) {
            return char;
        }
    }
    return null;
}
function findAllRepeatedCharacters(str: string): Map<string, number[]> {
    const charPositions = new Map<string, number[]>();
    
    for (let i = 0; i < str.length; i++) {
        const char = str[i];
        if (!charPositions.has(char)) {
            charPositions.set(char, []);
        }
        charPositions.get(char)!.push(i);
    }
    
    // Filter for characters that appear more than once
    const repeated = new Map<string, number[]>();
    for (const [char, positions] of charPositions) {
        if (positions.length > 1) {
            repeated.set(char, positions);
        }
    }
    
    return repeated;
}

// Find the first repeated character from the map
function getFirstRepeated(str: string): string | null {
    const repeated = findAllRepeatedCharacters(str);
    if (repeated.size === 0) return null;
    
    // Find the character with the smallest second occurrence index
    let firstChar: string | null = null;
    let minSecondIndex = Infinity;
    
    for (const [char, positions] of repeated) {
        if (positions[1] < minSecondIndex) {
            minSecondIndex = positions[1];
            firstChar = char;
        }
    }
    
    return firstChar;
}
function firstRepeatedCharacter(str: string): string | null {
    if (str.length === 0) return null;
    
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
console.log(firstRepeatedCharacter("typescript"));    // "p"
console.log(firstRepeatedCharacter("hello"));         // "l"
console.log(firstRepeatedCharacter("world"));         // null
console.log(firstRepeatedCharacter(""));              // null
console.log(firstRepeatedCharacter("aabb"));          // "a"
