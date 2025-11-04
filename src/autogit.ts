function isAnagram(str1: string, str2: string): boolean {
  // Remove non-alphanumeric characters and convert to lowercase
  const normalize = (str: string): string => 
    str.replace(/[^a-z0-9]/gi, '').toLowerCase();
  
  const normalized1 = normalize(str1);
  const normalized2 = normalize(str2);
  
  // Check length first for efficiency
  if (normalized1.length !== normalized2.length) {
    return false;
  }
  
  // Sort and compare
  return normalized1.split('').sort().join('') === 
         normalized2.split('').sort().join('');
}

// Example usage
console.log(isAnagram('listen', 'silent')); // true
console.log(isAnagram('hello', 'world'));   // false
function isAnagram(str1: string, str2: string): boolean {
  const normalize = (str: string): string => 
    str.replace(/[^a-z0-9]/gi, '').toLowerCase();
  
  const normalized1 = normalize(str1);
  const normalized2 = normalize(str2);
  
  if (normalized1.length !== normalized2.length) {
    return false;
  }
  
  const charCount: Record<string, number> = {};
  
  // Count characters in first string
  for (const char of normalized1) {
    charCount[char] = (charCount[char] || 0) + 1;
  }
  
  // Subtract counts from second string
  for (const char of normalized2) {
    if (!charCount[char]) {
      return false;
    }
    charCount[char]--;
  }
  
  // Check if all counts are zero
  return Object.values(charCount).every(count => count === 0);
}
function isAnagram(str1: string, str2: string): boolean {
  const normalize = (str: string): string => 
    str.replace(/[^a-z0-9]/gi, '').toLowerCase();
  
  const normalized1 = normalize(str1);
  const normalized2 = normalize(str2);
  
  if (normalized1.length !== normalized2.length) {
    return false;
  }
  
  const charMap = new Map<string, number>();
  
  // Build frequency map
  for (const char of normalized1) {
    charMap.set(char, (charMap.get(char) || 0) + 1);
  }
  
  // Check against second string
  for (const char of normalized2) {
    const count = charMap.get(char);
    if (!count) return false;
    charMap.set(char, count - 1);
  }
  
  return true;
}
const isAnagram = (str1: string, str2: string): boolean => {
  const normalize = (str: string): string => 
    str.replace(/[^a-z0-9]/gi, '').toLowerCase();
  
  const [s1, s2] = [normalize(str1), normalize(str2)];
  
  return s1.length === s2.length && 
         [...s1].sort().join('') === [...s2].sort().join('');
};
interface AnagramOptions {
  caseSensitive?: boolean;
  ignoreSpaces?: boolean;
  ignoreSpecialChars?: boolean;
}

function isAnagram(
  str1: string, 
  str2: string, 
  options: AnagramOptions = {}
): boolean {
  const {
    caseSensitive = false,
    ignoreSpaces = true,
    ignoreSpecialChars = true
  } = options;
  
  let normalized1 = str1;
  let normalized2 = str2;
  
  // Apply normalization based on options
  if (!caseSensitive) {
    normalized1 = normalized1.toLowerCase();
    normalized2 = normalized2.toLowerCase();
  }
  
  if (ignoreSpaces) {
    normalized1 = normalized1.replace(/\s+/g, '');
    normalized2 = normalized2.replace(/\s+/g, '');
  }
  
  if (ignoreSpecialChars) {
    normalized1 = normalized1.replace(/[^a-z0-9]/gi, '');
    normalized2 = normalized2.replace(/[^a-z0-9]/gi, '');
  }
  
  if (normalized1.length !== normalized2.length) {
    return false;
  }
  
  // Use frequency count for better performance
  const frequency: Record<string, number> = {};
  
  for (const char of normalized1) {
    frequency[char] = (frequency[char] || 0) + 1;
  }
  
  for (const char of normalized2) {
    if (!frequency[char]) return false;
    frequency[char]--;
  }
  
  return Object.values(frequency).every(count => count === 0);
}

// Example usage with options
console.log(isAnagram('Hello', 'olelh', { caseSensitive: false })); // true
console.log(isAnagram('Dormitory', 'Dirty room', { ignoreSpaces: true })); // true
// Basic usage
console.log(isAnagram('anagram', 'nagaram')); // true
console.log(isAnagram('rat', 'car'));         // false

// With punctuation and spaces
console.log(isAnagram('Eleven plus two', 'Twelve plus one')); // true

// Case insensitive
console.log(isAnagram('Hello', 'olelh')); // true
