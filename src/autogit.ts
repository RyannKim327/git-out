function isAnagram(str1: string, str2: string): boolean {
  // Clean strings (remove non-alphanumeric characters and lowercase)
  const clean = (s: string) => s.replace(/[^a-z0-9]/gi, '').toLowerCase();
  const cleanedStr1 = clean(str1);
  const cleanedStr2 = clean(str2);

  // Early exit if lengths differ
  if (cleanedStr1.length !== cleanedStr2.length) return false;

  // Sort and compare
  return (
    cleanedStr1.split('').sort().join('') ===
    cleanedStr2.split('').sort().join('')
  );
}
function isAnagram(str1: string, str2: string): boolean {
  // Clean strings (remove non-alphanumeric characters and lowercase)
  const clean = (s: string) => s.replace(/[^a-z0-9]/gi, '').toLowerCase();
  const cleanedStr1 = clean(str1);
  const cleanedStr2 = clean(str2);

  // Early exit if lengths differ
  if (cleanedStr1.length !== cleanedStr2.length) return false;

  // Create a frequency map
  const charCount: Record<string, number> = {};

  // Increment counts for str1
  for (const char of cleanedStr1) {
    charCount[char] = (charCount[char] || 0) + 1;
  }

  // Decrement counts for str2 and check for mismatches
  for (const char of cleanedStr2) {
    if (!charCount[char]) return false; // Character not present or count is zero
    charCount[char]--;
  }

  return true;
}
console.log(isAnagram('listen', 'silent')); // true
console.log(isAnagram('Debit card', 'Bad credit')); // true
console.log(isAnagram('hello', 'world')); // false
