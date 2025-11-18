function firstRepeatedCharacter(str: string): string | null {
    const seen = new Set<string>();
    for (const char of str) {
        if (seen.has(char)) {
            return char;
        }
        seen.add(char);
    }
    return null; // Return null if no repeats found
}
console.log(firstRepeatedCharacter("abba"));        // "b"
console.log(firstRepeatedCharacter("abc"));         // null
console.log(firstRepeatedCharacter("TypeScript"));  // "T" (case-sensitive)
function firstRepeatedCharacter(str: string): string | null {
    const seen = new Set<string>();
    for (const char of str.toLowerCase()) { // Normalizes case
        if (seen.has(char)) {
            return char;
        }
        seen.add(char);
    }
    return null;
}
