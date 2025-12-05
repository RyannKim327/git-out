function reverseWords(str: string): string {
    if (!str.trim()) return ''; // Handle empty or whitespace-only strings
    return str.trim().split(/\s+/).reverse().join(' ');
}
console.log(reverseWords('Hello World'));        // "World Hello"
console.log(reverseWords('  one   two three  ')); // "three two one"
console.log(reverseWords('Single'));             // "Single"
console.log(reverseWords(''));                   // ""
