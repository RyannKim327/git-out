function firstRepeatedCharacter(str: string): string | null {
    const seen = new Set<string>();
    for (const char of str) {
        if (seen.has(char)) {
            return char;
        }
        seen.add(char);
    }
    return null;
}
console.log(firstRepeatedCharacter("abcabc"));   // Output: 'a'
console.log(firstRepeatedCharacter("bcaba"));    // Output: 'b'
console.log(firstRepeatedCharacter("abcdef"));   // Output: null
console.log(firstRepeatedCharacter("abba"));     // Output: 'b'
