function areAnagrams(str1: string, str2: string): boolean {
  const normalize = (str: string) =>
    str.replace(/\s+/g, '').toLowerCase().split('').sort().join('');
  
  return normalize(str1) === normalize(str2);
}
console.log(areAnagrams('listen', 'silent')); // true
console.log(areAnagrams('rail safety', 'fairy tales')); // true
console.log(areAnagrams('hello', 'world')); // false
