function areAnagrams(str1: string, str2: string): boolean {
    // Normalize the strings: convert to lowercase and remove spaces
    const normalizedStr1 = str1.toLowerCase().replace(/\s+/g, '');
    const normalizedStr2 = str2.toLowerCase().replace(/\s+/g, '');

    // Sort the characters of both strings
    const sortedStr1 = normalizedStr1.split('').sort().join('');
    const sortedStr2 = normalizedStr2.split('').sort().join('');

    // Compare the sorted strings
    return sortedStr1 === sortedStr2;
}

// Example usage:
const string1 = "listen";
const string2 = "silent";
console.log(areAnagrams(string1, string2)); // Output: true
