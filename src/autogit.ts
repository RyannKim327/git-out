function areAnagrams(str1: string, str2: string): boolean {
    // Normalize the strings: remove spaces and convert to lowercase
    const normalize = (str: string): string => 
        str.replace(/\s+/g, '').toLowerCase().split('').sort().join('');

    // Normalize both strings
    const normalizedStr1 = normalize(str1);
    const normalizedStr2 = normalize(str2);

    // Check if normalized strings are equal
    return normalizedStr1 === normalizedStr2;
}

// Example usage:
console.log(areAnagrams("Listen", "Silent")); // true
console.log(areAnagrams("Hello", "World"));   // false
console.log(areAnagrams("Dormitory", "Dirty room")); // true
function areAnagrams(str1: string, str2: string): boolean {
    const normalize = (str: string): string => 
        str.replace(/\s+/g, '').toLowerCase();

    const normalizedStr1 = normalize(str1);
    const normalizedStr2 = normalize(str2);

    if (normalizedStr1.length !== normalizedStr2.length) {
        return false; // Early exit if lengths differ
    }

    const charCountMap: { [key: string]: number } = {};

    // Count characters in the first string
    for (const char of normalizedStr1) {
        charCountMap[char] = (charCountMap[char] || 0) + 1;
    }

    // Subtract counts based on the second string
    for (const char of normalizedStr2) {
        if (!charCountMap[char]) {
            return false; // Char not found or count is zero
        }
        charCountMap[char]--;
    }

    // Check if all counts are zero
    return Object.values(charCountMap).every(count => count === 0);
}

// Example usage:
console.log(areAnagrams("Listen", "Silent")); // true
console.log(areAnagrams("Hello", "World"));   // false
console.log(areAnagrams("Dormitory", "Dirty room")); // true
