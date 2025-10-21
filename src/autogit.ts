function reverseString(str: string): string {
  return str.split('').reverse().join('');
}

// --- Examples ---
console.log(reverseString("hello"));         // Output: "olleh"
console.log(reverseString("TypeScript"));    // Output: "tpircSepyT"
console.log(reverseString("a"));             // Output: "a"
console.log(reverseString(""));              // Output: ""
console.log(reverseString("racecar"));       // Output: "racecar"
function reverseStringUnicodeAware(str: string): string {
  // Using Array.from()
  return Array.from(str).reverse().join('');
  
  // Or using the spread operator (more concise, essentially the same)
  // return [...str].reverse().join('');
}

// --- Examples ---
console.log(reverseStringUnicodeAware("hello"));      // Output: "olleh"
console.log(reverseStringUnicodeAware("👋🌎"));     // Output: "🌎👋"
console.log(reverseStringUnicodeAware("👍🏽"));      // Output: "🏽👍" (Note: this correctly reverses code points, but complex grapheme clusters like skin tone modifiers still get split. For true grapheme cluster reversal, you'd need a library.)
console.log(reverseStringUnicodeAware("👨‍👩‍👧‍👦")); // Output: "👦‍👧‍👩‍👨" (Shows it splits ZWJ sequences, which is often expected for simple reversal but not for "semantic" grapheme clusters)
function reverseStringLoop(str: string): string {
  let reversed = '';
  for (let i = str.length - 1; i >= 0; i--) {
    reversed += str[i];
  }
  return reversed;
}

// --- Examples ---
console.log(reverseStringLoop("hello"));         // Output: "olleh"
console.log(reverseStringLoop("TypeScript"));    // Output: "tpircSepyT"
