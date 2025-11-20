function isAnagram(str1: string, str2: string): boolean {
    // Remove non-alphanumeric characters and convert to lowercase
    const cleanStr1 = str1.replace(/[^a-z0-9]/gi, '').toLowerCase();
    const cleanStr2 = str2.replace(/[^a-z0-9]/gi, '').toLowerCase();
    
    // Sort and compare
    return cleanStr1.split('').sort().join('') === cleanStr2.split('').sort().join('');
}

// Examples
console.log(isAnagram("listen", "silent")); // true
console.log(isAnagram("hello", "world"));   // false
console.log(isAnagram("Dormitory", "Dirty room")); // true
function isAnagramFrequency(str1: string, str2: string): boolean {
    const cleanStr1 = str1.replace(/[^a-z0-9]/gi, '').toLowerCase();
    const cleanStr2 = str2.replace(/[^a-z0-9]/gi, '').toLowerCase();
    
    if (cleanStr1.length !== cleanStr2.length) return false;
    
    const charCount: Record<string, number> = {};
    
    // Count characters in first string
    for (const char of cleanStr1) {
        charCount[char] = (charCount[char] || 0) + 1;
    }
    
    // Subtract characters from second string
    for (const char of cleanStr2) {
        if (!charCount[char]) return false;
        charCount[char]--;
    }
    
    return true;
}
function isAnagramMap(str1: string, str2: string): boolean {
    const cleanStr1 = str1.replace(/[^a-z0-9]/gi, '').toLowerCase();
    const cleanStr2 = str2.replace(/[^a-z0-9]/gi, '').toLowerCase();
    
    if (cleanStr1.length !== cleanStr2.length) return false;
    
    const charMap = new Map<string, number>();
    
    // Count characters in first string
    for (const char of cleanStr1) {
        charMap.set(char, (charMap.get(char) || 0) + 1);
    }
    
    // Check second string
    for (const char of cleanStr2) {
        const count = charMap.get(char);
        if (!count) return false;
        charMap.set(char, count - 1);
    }
    
    return true;
}
const isAnagramShort = (str1: string, str2: string): boolean => 
    str1.replace(/[^a-z0-9]/gi, '').toLowerCase()
        .split('')
        .sort()
        .join('') === 
    str2.replace(/[^a-z0-9]/gi, '').toLowerCase()
        .split('')
        .sort()
        .join('');
function testAnagram(): void {
    const testCases = [
        { str1: "listen", str2: "silent", expected: true },
        { str1: "hello", str2: "world", expected: false },
        { str1: "Dormitory", str2: "Dirty room", expected: true },
        { str1: "Anagram", str2: "Nag a ram", expected: true },
        { str1: "abc", str2: "abcd", expected: false },
        { str1: "", str2: "", expected: true }
    ];
    
    testCases.forEach(({ str1, str2, expected }) => {
        const result = isAnagram(str1, str2);
        console.log(`"${str1}" vs "${str2}": ${result} (Expected: ${expected})`);
    });
}

testAnagram();
