function areAnagramsSort(str1: string, str2: string): boolean {
    const normalize = (str: string): string =>
        str.toLowerCase().replace(/[^a-z]/g, '')  // Convert to lowercase and remove non-alphabets
          .split('').sort().join('');             // Sort characters

    return normalize(str1) === normalize(str2);
}
function areAnagramsCount(str1: string, str2: string): boolean {
    const normalize = (str: string): string =>
        str.toLowerCase().replace(/[^a-z]/g, '');  // Keep only lowercase letters

    const normalizedStr1 = normalize(str1);
    const normalizedStr2 = normalize(str2);

    // Quick length check
    if (normalizedStr1.length !== normalizedStr2.length) {
        return false;
    }

    const charCount: Record<string, number> = {};

    // Count characters in str1
    for (const char of normalizedStr1) {
        charCount[char] = (charCount[char] || 0) + 1;
    }

    // Decrement counts using str2
    for (const char of normalizedStr2) {
        if (!charCount[char]) return false;  // Character not present or count exhausted
        charCount[char]--;
    }

    return true;
}
console.log(areAnagramsSort("listen", "silent"));   // true
console.log(areAnagramsCount("Debit card", "Bad credit")); // true (ignores spaces/case)
console.log(areAnagramsCount("hello", "world"));    // false
