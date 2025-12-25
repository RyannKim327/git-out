const isPalindrome = (str: string): boolean => {
  const cleaned = str.toLowerCase().replace(/[^a-z0-9]/g, '');
  return cleaned === [...cleaned].reverse().join('');
};

// --- usage ---
console.log(isPalindrome('A man, a plan, a canal: Panama')); // true
console.log(isPalindrome('palindrome'));                   // false
const isPalindrome = (s: string) => s === [...s].reverse().join('');
