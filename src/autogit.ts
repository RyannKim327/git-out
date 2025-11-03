function countOccurrences(str: string, char: string): number {
    if (char.length !== 1) { // Ensure `char` is a single character
        throw new Error('Char must be a single character.');
    }
    return str.split(char).length - 1;
}

// Example usage:
const text = "hello world";
console.log(countOccurrences(text, "l")); // Output: 3
function countOccurrences(str: string, char: string): number {
    if (char.length !== 1) {
        throw new Error('Char must be a single character.');
    }
    let count = 0;
    for (const c of str) {
        if (c === char) count++;
    }
    return count;
}

// Example usage:
console.log(countOccurrences("typescript", "t")); // Output: 2
function countOccurrences(str: string, char: string): number {
    if (char.length !== 1) {
        throw new Error('Char must be a single character.');
    }
    // Escape regex special characters (e.g., ".", "*")
    const escapedChar = char.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(escapedChar, 'g'); // Global match
    const matches = str.match(regex);
    return matches ? matches.length : 0;
}

// Example usage:
console.log(countOccurrences("a.b.c.d", ".")); // Output: 3 (counts the literal ".")
