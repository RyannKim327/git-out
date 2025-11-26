function isPalindrome(str: string): boolean {
  const cleaned = str
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '');      // keep only letters and digits

  const reversed = cleaned
    .split('')
    .reverse()
    .join('');

  return cleaned === reversed;
}

/* ---- usage ---- */
console.log(isPalindrome('RaceCar'));          // true
console.log(isPalindrome('A man, a plan…'));  // true
console.log(isPalindrome('hello'));            // false
const cleaned = Array.from(str.toLowerCase().replace(/[^\p{L}\p{N}]/gu, '')).join('');
const reversed = Array.from(cleaned).reverse().join('');
