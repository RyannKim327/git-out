function areAnagrams(str1: string, str2: string): boolean {
    // Normalize strings: remove spaces, convert to lowercase
    const normalizedStr1 = str1.replace(/\s/g, '').toLowerCase();
    const normalizedStr2 = str2.replace(/\s/g, '').toLowerCase();
    
    // If lengths differ, they can't be anagrams
    if (normalizedStr1.length !== normalizedStr2.length) {
        return false;
    }
    
    // Sort characters and compare
    const sortedStr1 = normalizedStr1.split('').sort().join('');
    const sortedStr2 = normalizedStr2.split('').sort().join('');
    
    return sortedStr1 === sortedStr2;
}

// Example usage
console.log(areAnagrams("listen", "silent")); // true
console.log(areAnagrams("hello", "world"));   // false
console.log(areAnagrams("Debit card", "Bad credit")); // true
function areAnagrams(str1: string, str2: string): boolean {
    const normalizedStr1 = str1.replace(/\s/g, '').toLowerCase();
    const normalizedStr2 = str2.replace(/\s/g, '').toLowerCase();
    
    if (normalizedStr1.length !== normalizedStr2.length) {
        return false;
    }
    
    // Create frequency maps
    const frequencyMap1 = createFrequencyMap(normalizedStr1);
    const frequencyMap2 = createFrequencyMap(normalizedStr2);
    
    // Compare frequency maps
    for (const char in frequencyMap1) {
        if (frequencyMap1[char] !== frequencyMap2[char]) {
            return false;
        }
    }
    
    return true;
}

function createFrequencyMap(str: string): Record<string, number> {
    const frequencyMap: Record<string, number> = {};
    
    for (const char of str) {
        frequencyMap[char] = (frequencyMap[char] || 0) + 1;
    }
    
    return frequencyMap;
}
function areAnagrams(str1: string, str2: string): boolean {
    const normalizedStr1 = str1.replace(/\s/g, '').toLowerCase();
    const normalizedStr2 = str2.replace(/\s/g, '').toLowerCase();
    
    if (normalizedStr1.length !== normalizedStr2.length) {
        return false;
    }
    
    const frequencyMap1 = normalizedStr1.split('').reduce((acc, char) => {
        acc[char] = (acc[char] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);
    
    const frequencyMap2 = normalizedStr2.split('').reduce((acc, char) => {
        acc[char] = (acc[char] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);
    
    // Compare the two frequency maps
    return Object.keys(frequencyMap1).every(char => 
        frequencyMap1[char] === frequencyMap2[char]
    );
}
function areAnagrams(str1: string, str2: string): boolean {
    const normalizedStr1 = str1.replace(/\s/g, '').toLowerCase();
    const normalizedStr2 = str2.replace(/\s/g, '').toLowerCase();
    
    if (normalizedStr1.length !== normalizedStr2.length) {
        return false;
    }
    
    const charMap = new Map<string, number>();
    
    // Count characters in first string
    for (const char of normalizedStr1) {
        charMap.set(char, (charMap.get(char) || 0) + 1);
    }
    
    // Subtract counts for second string
    for (const char of normalizedStr2) {
        const count = charMap.get(char);
        if (!count) return false; // Character doesn't exist
        charMap.set(char, count - 1);
    }
    
    // Check if all counts are zero
    return Array.from(charMap.values()).every(count => count === 0);
}
// Case-sensitive version (no .toLowerCase())
function areAnagramsCaseSensitive(str1: string, str2: string): boolean {
    // Remove only spaces but preserve case
    const processedStr1 = str1.replace(/\s/g, '');
    const processedStr2 = str2.replace(/\s/g, '');
    
    if (processedStr1.length !== processedStr2.length) {
        return false;
    }
    
    return processedStr1.split('').sort().join('') === 
           processedStr2.split('').sort().join('');
}

// With punctuation handling
function areAnagramsWithPunctuation(str1: string, str2: string): boolean {
    const normalizedStr1 = str1.replace(/[^\w]/g, '').toLowerCase();
    const normalizedStr2 = str2.replace(/[^\w]/g, '').toLowerCase();
    
    return normalizedStr1.split('').sort().join('') === 
           normalizedStr2.split('').sort().join('');
}
