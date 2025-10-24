function isAnagram(str1: string, str2: string): boolean {
    // Remove non-alphanumeric characters and convert to lowercase
    const normalize = (str: string): string => 
        str.toLowerCase().replace(/[^a-z0-9]/g, '');
    
    const normalized1 = normalize(str1);
    const normalized2 = normalize(str2);
    
    // Sort and compare
    return normalized1.split('').sort().join('') === 
           normalized2.split('').sort().join('');
}

// Example usage
console.log(isAnagram('listen', 'silent')); // true
console.log(isAnagram('hello', 'world'));   // false
function isAnagram(str1: string, str2: string): boolean {
    const normalize = (str: string): string => 
        str.toLowerCase().replace(/[^a-z0-9]/g, '');
    
    const normalized1 = normalize(str1);
    const normalized2 = normalize(str2);
    
    // Check length first
    if (normalized1.length !== normalized2.length) {
        return false;
    }
    
    // Create frequency maps
    const charFrequency = (str: string): Map<string, number> => {
        const frequency = new Map<string, number>();
        for (const char of str) {
            frequency.set(char, (frequency.get(char) || 0) + 1);
        }
        return frequency;
    };
    
    const freq1 = charFrequency(normalized1);
    const freq2 = charFrequency(normalized2);
    
    // Compare frequency maps
    for (const [char, count] of freq1) {
        if (freq2.get(char) !== count) {
            return false;
        }
    }
    
    return true;
}
interface AnagramOptions {
    caseSensitive?: boolean;
    ignoreSpaces?: boolean;
    ignoreSpecialChars?: boolean;
}

function isAnagram(
    str1: string, 
    str2: string, 
    options: AnagramOptions = {}
): boolean {
    const {
        caseSensitive = false,
        ignoreSpaces = true,
        ignoreSpecialChars = true
    } = options;
    
    let processed1 = str1;
    let processed2 = str2;
    
    // Apply options
    if (!caseSensitive) {
        processed1 = processed1.toLowerCase();
        processed2 = processed2.toLowerCase();
    }
    
    if (ignoreSpaces) {
        processed1 = processed1.replace(/\s/g, '');
        processed2 = processed2.replace(/\s/g, '');
    }
    
    if (ignoreSpecialChars) {
        processed1 = processed1.replace(/[^a-z0-9]/gi, '');
        processed2 = processed2.replace(/[^a-z0-9]/gi, '');
    }
    
    // Check length
    if (processed1.length !== processed2.length) {
        return false;
    }
    
    // Create frequency arrays (more efficient than objects for large strings)
    const freq1 = new Array(256).fill(0);
    const freq2 = new Array(256).fill(0);
    
    for (let i = 0; i < processed1.length; i++) {
        freq1[processed1.charCodeAt(i)]++;
        freq2[processed2.charCodeAt(i)]++;
    }
    
    // Compare frequencies
    for (let i = 0; i < 256; i++) {
        if (freq1[i] !== freq2[i]) {
            return false;
        }
    }
    
    return true;
}

// Example usage with options
console.log(isAnagram('Hello', 'olelh')); // true
console.log(isAnagram('Dormitory', 'dirty room')); // true
console.log(isAnagram('Hello', 'World', { caseSensitive: true })); // false
const isAnagram = (a: string, b: string): boolean => 
    a.toLowerCase().replace(/\W/g, '').split('').sort().join('') === 
    b.toLowerCase().replace(/\W/g, '').split('').sort().join('');
// Test cases
const testCases = [
    ['listen', 'silent'],      // true
    ['hello', 'world'],        // false
    ['anagram', 'nagaram'],    // true
    ['rat', 'car'],            // false
    ['', ''],                  // true
    ['Dormitory', 'dirty room'] // true
];

testCases.forEach(([str1, str2]) => {
    console.log(`${str1} & ${str2}: ${isAnagram(str1, str2)}`);
});
