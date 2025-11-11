function isAnagram(str1: string, str2: string): boolean {
    if (str1.length !== str2.length) return false;
    
    const charCount: Record<string, number> = {};
    
    for (const char of str1) {
        charCount[char] = (charCount[char] || 0) + 1;
    }
    
    for (const char of str2) {
        if (!charCount[char]) return false;
        charCount[char]--;
    }
    
    return true;
}

// Usage
console.log(isAnagram("listen", "silent")); // true
console.log(isAnagram("hello", "world"));   // false
function isAnagramSort(str1: string, str2: string): boolean {
    if (str1.length !== str2.length) return false;
    
    const normalize = (str: string): string => 
        str.toLowerCase().replace(/[^a-z0-9]/g, '').split('').sort().join('');
    
    return normalize(str1) === normalize(str2);
}
function isAnagramMap(str1: string, str2: string): boolean {
    if (str1.length !== str2.length) return false;
    
    const charMap = new Map<string, number>();
    
    // Count characters in first string
    for (const char of str1) {
        charMap.set(char, (charMap.get(char) || 0) + 1);
    }
    
    // Subtract counts for second string
    for (const char of str2) {
        const count = charMap.get(char);
        if (!count) return false;
        charMap.set(char, count - 1);
    }
    
    return true;
}
function isAnagramFunctional(str1: string, str2: string): boolean {
    if (str1.length !== str2.length) return false;
    
    const createCharMap = (str: string): Record<string, number> => 
        str.split('').reduce((acc, char) => ({
            ...acc,
            [char]: (acc[char] || 0) + 1
        }), {} as Record<string, number>);
    
    const map1 = createCharMap(str1);
    const map2 = createCharMap(str2);
    
    return Object.keys(map1).every(char => 
        map1[char] === map2[char]
    );
}
function isAnagramAdvanced(str1: string, str2: string): boolean {
    const cleanString = (str: string): string => 
        str.toLowerCase().replace(/[^a-z0-9]/g, '');
    
    const cleaned1 = cleanString(str1);
    const cleaned2 = cleanString(str2);
    
    if (cleaned1.length !== cleaned2.length) return false;
    
    const charCount: Record<string, number> = {};
    
    for (const char of cleaned1) {
        charCount[char] = (charCount[char] || 0) + 1;
    }
    
    for (const char of cleaned2) {
        if (!charCount[char]) return false;
        charCount[char]--;
    }
    
    return true;
}

// Usage with different cases and spaces
console.log(isAnagramAdvanced("Listen", "Silent")); // true
console.log(isAnagramAdvanced("funeral", "real fun")); // true
// Test function
function testAnagramChecker(anagramChecker: (s1: string, s2: string) => boolean) {
    const testCases = [
        { s1: "listen", s2: "silent", expected: true },
        { s1: "hello", s2: "world", expected: false },
        { s1: "rat", s2: "car", expected: false },
        { s1: "anagram", s2: "nagaram", expected: true },
        { s1: "", s2: "", expected: true }
    ];
    
    testCases.forEach(({ s1, s2, expected }) => {
        const result = anagramChecker(s1, s2);
        console.log(`"${s1}" vs "${s2}": ${result} (Expected: ${expected})`);
    });
}

// Test the preferred method
testAnagramChecker(isAnagram);
