function firstRepeatedCharacter(str: string): string | null {
    const seen = new Set<string>();
    
    for (const char of str) {
        if (seen.has(char)) {
            return char;
        }
        seen.add(char);
    }
    
    return null; // No repeated character found
}

// Example usage
console.log(firstRepeatedCharacter("hello"));     // "l"
console.log(firstRepeatedCharacter("world"));     // null
console.log(firstRepeatedCharacter("typescript")); // "t"
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
function firstRepeatedCharacter(str: string): string | null {
    return str.split('').find((char, index, arr) => 
        arr.indexOf(char) !== index
    ) || null;
}
interface RepeatedCharInfo {
    character: string;
    firstIndex: number;
    secondIndex: number;
}

function firstRepeatedCharacterDetailed(str: string): RepeatedCharInfo | null {
    const charMap: { [key: string]: number } = {};
    
    for (let i = 0; i < str.length; i++) {
        const char = str[i];
        
        if (charMap[char] !== undefined) {
            return {
                character: char,
                firstIndex: charMap[char],
                secondIndex: i
            };
        }
        
        charMap[char] = i;
    }
    
    return null;
}

// Example usage
console.log(firstRepeatedCharacterDetailed("programming"));
// { character: "r", firstIndex: 1, secondIndex: 4 }
function firstRepeatedCharacterCaseInsensitive(str: string): string | null {
    const seen = new Set<string>();
    const lowerStr = str.toLowerCase();
    
    for (const char of lowerStr) {
        if (seen.has(char)) {
            return char;
        }
        seen.add(char);
    }
    
    return null;
}

// Example usage
console.log(firstRepeatedCharacterCaseInsensitive("Hello")); // "l"
console.log(firstRepeatedCharacterCaseInsensitive("TypeScript")); // "t"
type FirstRepeatedResult = {
    type: 'found';
    character: string;
    firstIndex: number;
    secondIndex: number;
} | {
    type: 'not_found';
};

function firstRepeatedCharacterTyped(str: string): FirstRepeatedResult {
    const charMap: { [key: string]: number } = {};
    
    for (let i = 0; i < str.length; i++) {
        const char = str[i];
        
        if (charMap[char] !== undefined) {
            return {
                type: 'found',
                character: char,
                firstIndex: charMap[char],
                secondIndex: i
            };
        }
        
        charMap[char] = i;
    }
    
    return { type: 'not_found' };
}
