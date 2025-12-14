function areAnagrams(str1: string, str2: string): boolean {
  // Normalize strings: remove spaces, convert to lowercase
  const normalize = (s: string) => s.replace(/\s+/g, '').toLowerCase();
  
  const normalizedStr1 = normalize(str1);
  const normalizedStr2 = normalize(str2);
  
  // If lengths differ, they can't be anagrams
  if (normalizedStr1.length !== normalizedStr2.length) {
    return false;
  }
  
  // Sort characters and compare
  const sortedStr1 = normalizedStr1.split('').sort().join('');
  const sortedStr2 = normalizedStr2.split('').sort().join('');
  
  return sortedStr1 === sortedStr2;
}

// Examples
console.log(areAnagrams('listen', 'silent')); // true
console.log(areAnagrams('hello', 'world'));   // false
console.log(areAnagrams('Debit card', 'Bad credit')); // true
function areAnagrams(str1: string, str2: string): boolean {
  const normalize = (s: string) => s.replace(/\s+/g, '').toLowerCase();
  
  const normalizedStr1 = normalize(str1);
  const normalizedStr2 = normalize(str2);
  
  if (normalizedStr1.length !== normalizedStr2.length) {
    return false;
  }
  
  const charCount: Record<string, number> = {};
  
  // Count characters in first string
  for (const char of normalizedStr1) {
    charCount[char] = (charCount[char] || 0) + 1;
  }
  
  // Subtract counts for second string
  for (const char of normalizedStr2) {
    if (!charCount[char]) {
      return false;
    }
    charCount[char]--;
  }
  
  // Check if all counts are zero
  return Object.values(charCount).every(count => count === 0);
}
function areAnagrams(str1: string, str2: string): boolean {
  const normalize = (s: string) => s.replace(/\s+/g, '').toLowerCase();
  
  const normalizedStr1 = normalize(str1);
  const normalizedStr2 = normalize(str2);
  
  if (normalizedStr1.length !== normalizedStr2.length) {
    return false;
  }
  
  const charMap = new Map<string, number>();
  
  // Build character frequency map
  for (const char of normalizedStr1) {
    charMap.set(char, (charMap.get(char) || 0) + 1);
  }
  
  // Check against second string
  for (const char of normalizedStr2) {
    const count = charMap.get(char);
    if (!count) return false;
    charMap.set(char, count - 1);
  }
  
  return true;
}
const areAnagrams = (str1: string, str2: string): boolean => {
  const normalize = (s: string) => s.replace(/\s+/g, '').toLowerCase();
  const sorted = (s: string) => normalize(s).split('').sort().join('');
  
  return sorted(str1) === sorted(str2);
};
// Test cases
const testCases = [
  ['listen', 'silent', true],
  ['hello', 'world', false],
  ['', '', true],
  ['a', 'a', true],
  ['Debit card', 'Bad credit', true],
  ['abc', 'abcd', false]
];

testCases.forEach(([str1, str2, expected]) => {
  const result = areAnagrams(str1 as string, str2 as string);
  console.log(`"${str1}" vs "${str2}": ${result} (expected: ${expected})`);
});
