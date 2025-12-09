function reverseString(str: string): string {
  return str.split('').reverse().join('');
}

// Examples:
console.log(reverseString("hello"));       // "olleh"
console.log(reverseString("TypeScript"));  // "tpircSepyT"
console.log(reverseString(""));            // ""
console.log(reverseString("a"));           // "a"
function reverseStringUnicode(str: string): string {
  // Using spread operator to correctly handle multi-byte characters (surrogate pairs)
  return [...str].reverse().join('');
}

// Examples:
console.log(reverseStringUnicode("hello"));        // "olleh"
console.log(reverseStringUnicode("TypeScript"));   // "tpircSepyT"
console.log(reverseStringUnicode("你好"));        // "好你"
console.log(reverseStringUnicode("👨‍👩‍👧‍👦"));    // This might still be tricky depending on the environment/character set, but it's generally better than split('') for single emoji characters.
// Example of a character with a surrogate pair: '𠮷' (U+20BB7)
console.log(reverseStringUnicode("𠮷A"));         // "A𠮷"
console.log(reverseString("𠮷A"));              // "A�" (might break down into two separate UTF-16 code units) - illustrates the difference
function reverseStringLoop(str: string): string {
  let reversed = '';
  for (let i = str.length - 1; i >= 0; i--) {
    reversed += str[i];
  }
  return reversed;
}

// Examples:
console.log(reverseStringLoop("hello"));       // "olleh"
console.log(reverseStringLoop("TypeScript"));  // "tpircSepyT"
function reverseStringReduce(str: string): string {
  // Again, using spread operator for better Unicode handling
  return [...str].reduce((reversed, char) => char + reversed, '');
}

// Examples:
console.log(reverseStringReduce("hello"));       // "olleh"
console.log(reverseStringReduce("TypeScript"));  // "tpircSepyT"
console.log(reverseStringReduce("𠮷A"));         // "A𠮷"
function reverseString(str: string): string {
  return [...str].reverse().join('');
}
