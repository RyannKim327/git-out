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
console.log(firstRepeatedCharacter("hello"));   // "l"
console.log(firstRepeatedCharacter("world"));   // null
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
function firstRepeatedCharacterWithPosition(str: string): 
{ character: string, firstIndex: number, secondIndex: number } | null {
    const charMap = new Map<string, number>();
    
    for (let i = 0; i < str.length; i++) {
        const char = str[i];
        if (charMap.has(char)) {
            return {
                character: char,
                firstIndex: charMap.get(char)!,
                secondIndex: i
            };
        }
        charMap.set(char, i);
    }
    
    return null;
}

// Example usage
console.log(firstRepeatedCharacterWithPosition("programming"));
// Output: { character: "r", firstIndex: 1, secondIndex: 4 }
function firstRepeatedCharacter(str: string): string | null {
    const repeatedChar = str.split('').find((char, index, array) => 
        array.indexOf(char) !== index
    );
    
    return repeatedChar || null;
}
function firstRepeatedCharacter<T extends string>(
    str: T
): string | null {
    const seen = new Set<string>();
    
    for (const char of str) {
        if (seen.has(char)) {
            return char;
        }
        seen.add(char);
    }
    
    return null;
}
// Best practice solution
function firstRepeatedCharacter(str: string): string | null {
    const seen = new Set<string>();
    
    for (const char of str) {
        if (seen.has(char)) return char;
        seen.add(char);
    }
    
    return null;
}
