function reverseWords(str: string): string {
    return str.trim().split(/\s+/).reverse().join(' ');
}
console.log(reverseWords("Hello world"));         // "world Hello"
console.log(reverseWords("   Hello   world   ")); // "world Hello"
console.log(reverseWords("Typescript is great")); // "great is Typescript"
