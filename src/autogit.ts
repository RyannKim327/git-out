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

// Example usage
console.log(findFirstRepeatedChar("typescript")); // "p"
console.log(findFirstRepeatedChar("hello"));      // "l"
console.log(findFirstRepeatedChar("world"));      // null
function findFirstRepeatedChar(str: string): string | null {
    const charCount: { [key: string]: number } = {};
    
    for (const char of str) {
        if (charCount[char]) {
            return char;
        }
        charCount[char] = 1;
    }
    
    return null;
}
function findFirstRepeatedChar(str: string): string | null {
    const chars = str.split('');
    
    for (let i = 0; i < chars.length; i++) {
        if (chars.indexOf(chars[i]) !== i) {
            return chars[i];
        }
    }
    
    return null;
}
function findFirstRepeatedChar(str: string): string | null {
    if (typeof str !== 'string' || str.length === 0) {
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

// With additional information
interface RepeatedCharResult {
    char: string;
    position: number;
    firstOccurrence: number;
}

function findFirstRepeatedCharWithDetails(str: string): RepeatedCharResult | null {
    const charPositions: { [key: string]: number } = {};
    
    for (let i = 0; i < str.length; i++) {
        const char = str[i];
        
        if (charPositions[char] !== undefined) {
            return {
                char: char,
                position: i,
                firstOccurrence: charPositions[char]
            };
        }
        
        charPositions[char] = i;
    }
    
    return null;
}

// Example with details
const result = findFirstRepeatedCharWithDetails("programming");
console.log(result); 
// { char: "r", position: 2, firstOccurrence: 1 }
const findFirstRepeatedChar = (str: string): string | null => 
    str.split('').find((char, index, arr) => arr.indexOf(char) !== index) || null;
// Test function
function testFindFirstRepeatedChar(): void {
    const testCases = [
        { input: "hello", expected: "l" },
        { input: "typescript", expected: "p" },
        { input: "world", expected: null },
        { input: "aabbcc", expected: "a" },
        { input: "abcde", expected: null },
        { input: "", expected: null },
    ];
    
    testCases.forEach(({ input, expected }, index) => {
        const result = findFirstRepeatedChar(input);
        console.log(`Test ${index + 1}: ${result === expected ? 'PASS' : 'FAIL'}`);
        console.log(`  Input: "${input}", Expected: ${expected}, Got: ${result}`);
    });
}

testFindFirstRepeatedChar();
