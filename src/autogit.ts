const isPalindrome = (s: string): boolean =>
  s.toLowerCase() === s.toLowerCase().split('').reverse().join('');
const isPalindrome = (s: string): boolean => {
  const cleaned = s
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, '');       // keep letters & digits
  return cleaned === [...cleaned].reverse().join('');
};

// usage
console.log(isPalindrome('A man, a plan, a canal: Panama')); // true
console.log(isPalindrome('race a car'));                     // false
