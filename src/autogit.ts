function areAnagrams(str1: string, str2: string): boolean {
  // Remove spaces and convert to lowercase (optional)
  const sanitize = (str: string) =>
    str.replace(/\s/g, '').toLowerCase().split('').sort().join('');

  return sanitize(str1) === sanitize(str2);
}

// Example usage:
console.log(areAnagrams('listen', 'silent'));    // true
console.log(areAnagrams('hello', 'world'));      // false
console.log(areAnagrams('Dormitory', 'Dirty room')); // true
