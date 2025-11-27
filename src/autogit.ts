function reverseWords(str: string): string {
    return str.trim().split(/\s+/).reverse().join(' ');
}
console.log(reverseWords(" Hello   world  TypeScript! ")); 
// Output: "TypeScript! world Hello"
