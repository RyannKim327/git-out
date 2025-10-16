function areAnagrams(str1: string, str2: string): boolean {
    if (str1.length !== str2.length) return false;
    
    const sorted1 = str1.toLowerCase().split('').sort().join('');
    const sorted2 = str2.toLowerCase().split('').sort().join('');
    
    return sorted1 === sorted2;
}

// Examples
console.log(areAnagrams('listen', 'silent')); // true
console.log(areAnagrams('hello', 'world'));   // false
console.log(areAnagrams('Race', 'Care'));     // true
function areAnagrams(str1: string, str2: string): boolean {
    if (str1.length !== str2.length) return false;
    
    const charCount: { [key: string]: number } = {};
    
    // Count characters in first string
    for (const char of str1.toLowerCase()) {
        charCount[char] = (charCount[char] || 0) + 1;
    }
    
    // Subtract characters from second string
    for (const char of str2.toLowerCase()) {
        if (!charCount[char]) return false;
        charCount[char]--;
    }
    
    // Check if all counts are zero
    return Object.values(charCount).every(count => count === 0);
}
function areAnagrams(str1: string, str2: string): boolean {
    if (str1.length !== str2.length) return false;
    
    const charMap = new Map<string, number>();
    
    // Count characters in first string
    for (const char of str1.toLowerCase()) {
        charMap.set(char, (charMap.get(char) || 0) + 1);
    }
    
    // Subtract characters from second string
    for (const char of str2.toLowerCase()) {
        const count = charMap.get(char);
        if (!count) return false;
        charMap.set(char, count - 1);
    }
    
    // Check if all counts are zero
    return Array.from(charMap.values()).every(count => count === 0);
}
const areAnagrams = (str1: string, str2: string): boolean => 
    str1.length === str2.length && 
    [...str1.toLowerCase()].sort().join('') === [...str2.toLowerCase()].sort().join('');
interface AnagramOptions {
    caseSensitive?: boolean;
    ignoreSpaces?: boolean;
    ignorePunctuation?: boolean;
}

function areAnagrams(
    str1: string, 
    str2: string, 
    options: AnagramOptions = {}
): boolean {
    const { 
        caseSensitive = false, 
        ignoreSpaces = false, 
        ignorePunctuation = false 
    } = options;

    let processed1 = str1;
    let processed2 = str2;

    // Apply options
    if (!caseSensitive) {
        processed1 = processed1.toLowerCase();
        processed2 = processed2.toLowerCase();
    }
    
    if (ignoreSpaces) {
        processed1 = processed1.replace(/\s+/g, '');
        processed2 = processed2.replace(/\s+/g, '');
    }
    
    if (ignorePunctuation) {
        processed1 = processed1.replace(/[^\w]/g, '');
        processed2 = processed2.replace(/[^\w]/g, '');
    }

    if (processed1.length !== processed2.length) return false;

    const charCount: { [key: string]: number } = {};
    
    for (const char of processed1) {
        charCount[char] = (charCount[char] || 0) + 1;
    }
    
    for (const char of processed2) {
        if (!charCount[char]) return false;
        charCount[char]--;
    }
    
    return Object.values(charCount).every(count => count === 0);
}

// Examples with different options
console.log(areAnagrams('Tom Marvolo Riddle', 'I am Lord Voldemort', { 
    ignoreSpaces: true, 
    ignorePunctuation: true 
})); // true

console.log(areAnagrams('A decimal point', 'Im a dot in place', {
    ignoreSpaces: true
})); // true
// Test cases
const tests = [
    ['listen', 'silent'],
    ['hello', 'world'],
    ['Race', 'Care'],
    ['evil', 'vile'],
    ['a', 'a'],
    ['', '']
];

tests.forEach(([str1, str2]) => {
    console.log(`"${str1}" and "${str2}" are anagrams: ${areAnagrams(str1, str2)}`);
});
