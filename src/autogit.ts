function isPalindrome(str: string): boolean {
  const cleaned = str
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '');   // keep only letters & digits

  return cleaned === cleaned.split('').reverse().join('');
}

// --- usage ---
console.log(isPalindrome('A man, a plan, a canal: Panama')); // true
console.log(isPalindrome('race a car'));                    // false
const cleaned = str
  .toLowerCase()
  .replace(/[^\p{L}\p{N}]/gu, '');
