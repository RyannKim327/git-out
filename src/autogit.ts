function reverseString(str: string): string {
  return str.split('').reverse().join('');
}

// Example usage
const result = reverseString("hello"); // "olleh"
console.log(result);
function reverseStringUnicodeSafe(str: string): string {
  return [...str].reverse().join('');
}

// Example with emoji
const unicodeResult = reverseStringUnicodeSafe("Hi👋🌍"); // "🌍👋iH"
console.log(unicodeResult);
