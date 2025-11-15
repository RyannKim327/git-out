function isAnagram(str1: string, str2: string): boolean {
    // Normalize strings: lowercase, remove non-letters, sort characters
    const normalize = (str: string): string => {
        return str
            .toLowerCase()
            .replace(/[^a-z]/g, '')   // Remove non-alphabetic characters
            .split('')
            .sort()
            .join('');
    };

    return normalize(str1) === normalize(str2);
}
function isAnagram(str1: string, str2: string): boolean {
    // Normalize strings: lowercase and remove non-letters
    const normalize = (str: string): string => {
        return str.toLowerCase().replace(/[^a-z]/g, '');
    };

    const normalizedStr1 = normalize(str1);
    const normalizedStr2 = normalize(str2);

    // Early exit if lengths differ
    if (normalizedStr1.length !== normalizedStr2.length) return false;

    // Count character frequencies
    const charCount = new Map<string, number>();

    // Increment counts for str1
    for (const char of normalizedStr1) {
        charCount.set(char, (charCount.get(char) || 0) + 1);
    }

    // Decrement counts for str2
    for (const char of normalizedStr2) {
        const count = charCount.get(char) || 0;
        if (count === 0) return false;  // Character not present or already exhausted
        charCount.set(char, count - 1);
    }

    return true;
}
console.log(isAnagram('listen', 'silent'));  // true
console.log(isAnagram('rail safety', 'fairy tales')); // true
console.log(isAnagram('Hello', 'World'));    // false
