function isPalindrome(s: string): boolean {
  // Optional: make it case‑insensitive and strip non‑alphanumerics
  const cleaned = s.replace(/[^A-Za-z0-9]/g, "").toLowerCase();
  const rev = cleaned.split("").reverse().join("");
  return cleaned === rev;
}
console.log(isPalindrome("A man, a plan, a canal: Panama")); // true
console.log(isPalindrome("race a car"));                     // false
function isPalindromeLoop(s: string): boolean {
  const cleaned = s.replace(/[^A-Za-z0-9]/g, "").toLowerCase();

  for (let i = 0, j = cleaned.length - 1; i < j; i++, j--) {
    if (cleaned[i] !== cleaned[j]) return false;
  }
  return true;
}
