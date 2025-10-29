function isAnagram(str1: string, str2: string): boolean {
    // Remove spaces and convert to lowercase for case-insensitive comparison
    const cleanStr1 = str1.replace(/\s+/g, '').toLowerCase();
    const cleanStr2 = str2.replace(/\s+/g, '').toLowerCase();
    
    // If lengths are different, they can't be anagrams
    if (cleanStr1.length !== cleanStr2.length) {
        return false;
    }
    
    // Sort and compare
    const sortedStr1 = cleanStr1.split('').sort().join('');
    const sortedStr2 = cleanStr2.split('').sort().join('');
    
    return sortedStr1 === sortedStr2;
}

// Examples
console.log(isAnagram("listen", "silent")); // true
console.log(isAnagram("hello", "world"));   // false
console.log(isAnagram("Dormitory", "Dirty room")); // true (ignores spaces and case)
function isAnagramFrequency(str1: string, str2: string): boolean {
    const cleanStr1 = str1.replace(/\s+/g, '').toLowerCase();
    const cleanStr2 = str2.replace(/\s+/g, '').toLowerCase();
    
    if (cleanStr1.length !== cleanStr2.length) {
        return false;
    }
    
    const charCount: { [key: string]: number } = {};
    
    // Count characters in first string
    for (const char of cleanStr1) {
        charCount[char] = (charCount[char] || 0) + 1;
    }
    
    // Subtract characters from second string
    for (const char of cleanStr2) {
        if (!charCount[char]) {
            return false;
        }
        charCount[char]--;
    }
    
    // Check if all counts are zero
    return Object.values(charCount).every(count => count === 0);
}

// Examples
console.log(isAnagramFrequency("anagram", "nagaram")); // true
console.log(isAnagramFrequency("rat", "car"));         // false
function isAnagramMap(str1: string, str2: string): boolean {
    const cleanStr1 = str1.replace(/\s+/g, '').toLowerCase();
    const cleanStr2 = str2.replace(/\s+/g, '').toLowerCase();
    
    if (cleanStr1.length !== cleanStr2.length) {
        return false;
    }
    
    const charMap = new Map<string, number>();
    
    // Count characters in first string
    for (const char of cleanStr1) {
        charMap.set(char, (charMap.get(char) || 0) + 1);
    }
    
    // Check second string
    for (const char of cleanStr2) {
        const count = charMap.get(char);
        if (!count) {
            return false;
        }
        charMap.set(char, count - 1);
    }
    
    return true;
}
const isAnagramOneLiner = (str1: string, str2: string): boolean => 
    str1.replace(/\s+/g, '').toLowerCase().split('').sort().join('') === 
    str2.replace(/\s+/g, '').toLowerCase().split('').sort().join('');

// Example
console.log(isAnagramOneLiner("cinema", "iceman")); // true
type AnagramChecker = (str1: string, str2: string) => boolean;

const anagramCheckers: Record<string, AnagramChecker> = {
    sortMethod: isAnagram,
    frequencyMethod: isAnagramFrequency,
    mapMethod: isAnagramMap
};

// Test function
function testAnagram(method: string, str1: string, str2: string): void {
    const result = anagramCheckers[method](str1, str2);
    console.log(`${method}: "${str1}" and "${str2}" are ${result ? 'anagrams' : 'not anagrams'}`);
}

// Test cases
const testCases: [string, string, boolean][] = [
    ["listen", "silent", true],
    ["hello", "world", false],
    ["Dormitory", "Dirty room", true],
    ["anagram", "nagaram", true]
];

for (const [str1, str2, expected] of testCases) {
    console.log(`Testing: "${str1}" vs "${str2}" (expected: ${expected})`);
    testAnagram('sortMethod', str1, str2);
    testAnagram('frequencyMethod', str1, str2);
    testAnagram('mapMethod', str1, str2);
    console.log('---');
}
