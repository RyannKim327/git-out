function areAnagrams(str1: string, str2: string): boolean {
    // Clean strings (remove non-alphanumeric and lowercase)
    const cleanStr1 = str1.toLowerCase().replace(/[^a-z0-9]/g, '');
    const cleanStr2 = str2.toLowerCase().replace(/[^a-z0-9]/g, '');

    // Early exit if lengths differ
    if (cleanStr1.length !== cleanStr2.length) return false;

    // Sort characters and compare
    return cleanStr1.split('').sort().join('') === cleanStr2.split('').sort().join('');
}
function areAnagrams(str1: string, str2: string): boolean {
    const cleanStr1 = str1.toLowerCase().replace(/[^a-z0-9]/g, '');
    const cleanStr2 = str2.toLowerCase().replace(/[^a-z0-9]/g, '');

    if (cleanStr1.length !== cleanStr2.length) return false;

    const charCount: { [key: string]: number } = {};

    // Count characters in first string
    for (const char of cleanStr1) {
        charCount[char] = (charCount[char] || 0) + 1;
    }

    // Decrement counts using second string
    for (const char of cleanStr2) {
        if (!charCount[char]) return false; // Missing or count is 0
        charCount[char]--;
    }

    return true;
}
console.log(areAnagrams("listen", "silent"));        // true
console.log(areAnagrams("Hello", "World"));          // false
console.log(areAnagrams("Debit card", "Bad credit"));// true
console.log(areAnagrams("123", "321"));              // true
console.log(areAnagrams("astronomer", "moon starer"));// true
