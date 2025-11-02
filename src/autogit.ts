function firstRepeatedCharacter(str: string): string | null {
    const seen = new Set<string>();
    
    for (const char of str) {
        if (seen.has(char)) {
            return char; // Found first repeat
        }
        seen.add(char);
    }
    
    return null; // No repeats found
}
console.log(firstRepeatedCharacter("abcdeed"));       // 'e'
console.log(firstRepeatedCharacter("abcda"));         // 'a'
console.log(firstRepeatedCharacter("aabb"));          // 'a'
console.log(firstRepeatedCharacter("typescript"));    // null
