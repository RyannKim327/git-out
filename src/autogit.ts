function areAnagrams(a: string, b: string): boolean {
  const normalize = (str: string) =>
    str
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '') // keep only alphanumerics; drop if you want strict char-for-char
      .split('')
      .sort()
      .join('');
  return normalize(a) === normalize(b);
}

// Usage
console.log(areAnagrams('listen', 'silent')); // true
console.log(areAnagrams('Hello', 'Olelh!'));  // true
console.log(areAnagrams('apple', 'pale'));    // false
