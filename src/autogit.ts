function isAnagram(str1: string, str2: string): boolean {
  const normalize = (str: string) =>
    str
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '') // remove non-alphanumeric characters
      .split('')
      .sort()
      .join('');

  return normalize(str1) === normalize(str2);
}

// Example usage:
console.log(isAnagram("listen", "silent")); // true
console.log(isAnagram("Hello", "Olelh!"));  // true
console.log(isAnagram("apple", "pale"));   // false
