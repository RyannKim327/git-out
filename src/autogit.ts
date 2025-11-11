function areAnagrams(str1: string, str2: string): boolean {
  // Remove spaces and convert to lowercase for case-insensitive comparison
  const cleanStr1 = str1.replace(/\s+/g, '').toLowerCase();
  const cleanStr2 = str2.replace(/\s+/g, '').toLowerCase();
  
  // If lengths are different, they can't be anagrams
  if (cleanStr1.length !== cleanStr2.length) {
    return false;
  }
  
  // Sort characters and compare
  const sorted1 = cleanStr1.split('').sort().join('');
  const sorted2 = cleanStr2.split('').sort().join('');
  
  return sorted1 === sorted2;
}

// Examples
console.log(areAnagrams('listen', 'silent')); // true
console.log(areAnagrams('hello', 'world'));   // false
console.log(areAnagrams('Debit card', 'Bad credit')); // true
function areAnagramsFrequency(str1: string, str2: string): boolean {
  const cleanStr1 = str1.replace(/\s+/g, '').toLowerCase();
  const cleanStr2 = str2.replace(/\s+/g, '').toLowerCase();
  
  if (cleanStr1.length !== cleanStr2.length) {
    return false;
  }
  
  const charCount: { [key: string]: number } = {};
  
  // Count characters in first string
  for (const char of cleanStr1) {
    charCount[char] = (charCount[char] || 0) + 1;
  }
  
  // Subtract counts for second string
  for (const char of cleanStr2) {
    if (!charCount[char]) {
      return false;
    }
    charCount[char]--;
  }
  
  // Check if all counts are zero
  return Object.values(charCount).every(count => count === 0);
}
function areAnagramsMap(str1: string, str2: string): boolean {
  const cleanStr1 = str1.replace(/\s+/g, '').toLowerCase();
  const cleanStr2 = str2.replace(/\s+/g, '').toLowerCase();
  
  if (cleanStr1.length !== cleanStr2.length) {
    return false;
  }
  
  const charMap = new Map<string, number>();
  
  // Build frequency map for first string
  for (const char of cleanStr1) {
    charMap.set(char, (charMap.get(char) || 0) + 1);
  }
  
  // Compare with second string
  for (const char of cleanStr2) {
    const count = charMap.get(char);
    if (!count) {
      return false;
    }
    charMap.set(char, count - 1);
  }
  
  // Verify all counts are zero
  for (const count of charMap.values()) {
    if (count !== 0) {
      return false;
    }
  }
  
  return true;
}
const areAnagramsOneLiner = (str1: string, str2: string): boolean => 
  str1.replace(/\s+/g, '').toLowerCase().split('').sort().join('') === 
  str2.replace(/\s+/g, '').toLowerCase().split('').sort().join('');

// Or more readable version:
const areAnagramsClean = (str1: string, str2: string): boolean => {
  const normalize = (s: string) => s.replace(/\s+/g, '').toLowerCase().split('').sort().join('');
  return normalize(str1) === normalize(str2);
};
// Test cases
const testCases: [string, string, boolean][] = [
  ['listen', 'silent', true],
  ['hello', 'world', false],
  ['Debit card', 'Bad credit', true],
  ['Astronomer', 'Moon starer', true],
  ['Dormitory', 'Dirty room', true],
  ['test', 'tests', false],
  ['', '', true],
  ['a', 'a', true],
  ['a', 'b', false],
];

testCases.forEach(([str1, str2, expected]) => {
  const result = areAnagrams(str1, str2);
  console.log(`"${str1}" vs "${str2}": ${result} (expected: ${expected})`);
});
