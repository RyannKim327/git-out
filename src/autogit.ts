/**
 * Return true if `text` is a palindrome (ignoring case, spaces, punctuation and diacritics).
 */
function isPalindrome(text: string): boolean {
  // 1️⃣  Clean the string:
  const cleaned = text
    .toLowerCase()          // case‑insensitive
    .replace(/\s+/g, '')    // strip whitespace
    .replace(/[^a-z0-9]/g, ''); // strip punctuation & accents

  // 2️⃣  Compare the string with its reverse:
  const reversed = cleaned.split('').reverse().join('');
  return cleaned === reversed;
}

// handy demo
console.log(isPalindrome('A man, a plan, a canal: Panama!')); // true
console.log(isPalindrome('Hello, world!'));                    // false
