function findFirstRepeatedChar(str: string): string | null {
    const seen = new Set<string>();
    
    for (const char of str) {
        if (seen.has(char)) {
            return char;
        }
        seen.add(char);
    }
    
    return null;
}

// Examples
console.log(findFirstRepeatedChar("hello")); // "l"
console.log(findFirstRepeatedChar("abcde")); // null
console.log(findFirstRepeatedChar("programming")); // "r"
function findFirstRepeatedChar(str: string): string | null {
    const charCount: Record<string, number> = {};
    
    for (const char of str) {
        if (charCount[char]) {
            return char;
        }
        charCount[char] = 1;
    }
    
    return null;
}
function findFirstRepeatedChar(str: string): string | null {
    const firstRepeated = str.split('').find((char, index, array) => 
        array.indexOf(char) !== index
    );
    
    return firstRepeated || null;
}
function findFirstRepeatedChar(str: string): string | null {
    const seen = new Map<string, number>();
    
    for (const char of str) {
        if (seen.has(char)) {
            return char;
        }
        seen.set(char, 1);
    }
    
    return null;
}
function findFirstRepeatedCharWithPosition(str: string): { char: string, firstIndex: number, secondIndex: number } | null {
    const charMap = new Map<string, number>();
    
    for (let i = 0; i < str.length; i++) {
        const char = str[i];
        if (charMap.has(char)) {
            return {
                char,
                firstIndex: charMap.get(char)!,
                secondIndex: i
            };
        }
        charMap.set(char, i);
    }
    
    return null;
}

// Example
console.log(findFirstRepeatedCharWithPosition("hello"));
// Output: { char: "l", firstIndex: 2, secondIndex: 3 }
function findFirstRepeatedChar(str: string): string | null {
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
