function areAnagrams(str1: string, str2: string): boolean {
    // Normalize the strings: remove spaces and convert to lowercase
    const normalizedStr1 = str1.replace(/\s+/g, '').toLowerCase();
    const normalizedStr2 = str2.replace(/\s+/g, '').toLowerCase();

    // If lengths are different, they cannot be anagrams
    if (normalizedStr1.length !== normalizedStr2.length) {
        return false;
    }

    // Sort the characters of both strings
    const sortedStr1 = normalizedStr1.split('').sort().join('');
    const sortedStr2 = normalizedStr2.split('').sort().join('');

    // Compare the sorted strings
    return sortedStr1 === sortedStr2;
}

// Example usage:
console.log(areAnagrams("listen", "silent")); // true
console.log(areAnagrams("hello", "world"));   // false
console.log(areAnagrams("Dormitory", "Dirty room")); // true
