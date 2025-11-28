/**
 * Checks if two strings are anagrams by processing and comparing sorted characters.
 * @param str1 First input string
 * @param str2 Second input string
 * @returns `true` if the strings are anagrams, otherwise `false`
 */
function isAnagramSort(str1: string, str2: string): boolean {
  // Process strings: lowercase and remove non-alphabetic characters
  const process = (str: string): string => 
    str.toLowerCase().replace(/[^a-z]/g, '');

  const cleanStr1 = process(str1);
  const cleanStr2 = process(str2);

  // Early exit if lengths differ
  if (cleanStr1.length !== cleanStr2.length) return false;

  // Sort and compare
  return (
    cleanStr1.split('').sort().join('') === 
    cleanStr2.split('').sort().join('')
  );
}
/**
 * Checks if two strings are anagrams using a character frequency map.
 * @param str1 First input string
 * @param str2 Second input string
 * @returns `true` if the strings are anagrams, otherwise `false`
 */
function isAnagramFrequency(str1: string, str2: string): boolean {
  // Process strings: lowercase and remove non-alphabetic characters
  const process = (str: string): string => 
    str.toLowerCase().replace(/[^a-z]/g, '');

  const cleanStr1 = process(str1);
  const cleanStr2 = process(str2);

  // Early exit if lengths differ
  if (cleanStr1.length !== cleanStr2.length) return false;

  // Create a frequency map for characters in cleanStr1
  const charCount: Record<string, number> = {};

  for (const char of cleanStr1) {
    charCount[char] = (charCount[char] || 0) + 1;
  }

  // Decrement counts using cleanStr2 and check for mismatches
  for (const char of cleanStr2) {
    if (!charCount[char]) return false; // Character not present or count already zero
    charCount[char]--;
  }

  return true;
}
// Test cases
console.log(isAnagramSort('listen', 'silent'));    // true
console.log(isAnagramSort('hello', 'world'));      // false
console.log(isAnagramSort('Rail safety', 'fairy tales')); // true

console.log(isAnagramFrequency('listen', 'silent')); // true
console.log(isAnagramFrequency('Dormitory', 'dirty room')); // true
console.log(isAnagramFrequency('test', 'tests'));    // false (length mismatch)
