function isAnagram(str1: string, str2: string): boolean {
    // Normalize the strings: lowercase and remove non-alphabetic characters
    const normalize = (str: string): string => 
        str.toLowerCase().replace(/[^a-z]/g, '');
    
    const cleanedStr1 = normalize(str1);
    const cleanedStr2 = normalize(str2);

    // Early exit if lengths differ
    if (cleanedStr1.length !== cleanedStr2.length) return false;

    // Sort and compare
    return (
        cleanedStr1.split('').sort().join('') === 
        cleanedStr2.split('').sort().join('')
    );
}
function isAnagram(str1: string, str2: string): boolean {
    const normalize = (str: string): string => 
        str.toLowerCase().replace(/[^a-z]/g, '');
    
    const cleanedStr1 = normalize(str1);
    const cleanedStr2 = normalize(str2);

    if (cleanedStr1.length !== cleanedStr2.length) return false;

    const charCount: Record<string, number> = {};

    // Count characters in str1
    for (const char of cleanedStr1) {
        charCount[char] = (charCount[char] || 0) + 1;
    }

    // Decrement counts using str2
    for (const char of cleanedStr2) {
        if (!charCount[char]) return false; // Character not present or count is zero
        charCount[char]--;
    }

    return true;
}
console.log(isAnagram("listen", "silent"));       // true
console.log(isAnagram("Dormitory", "dirty room"));// true
console.log(isAnagram("hello", "world"));         // false
