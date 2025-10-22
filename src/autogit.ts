function isPalindrome(str: string): boolean {
  const cleaned = str
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '');      // strip non-alphanumerics
  return cleaned === [...cleaned].reverse().join('');
}

/* ---- usage ---- */
console.log(isPalindrome('A man, a plan, a canal: Panama')); // true
console.log(isPalindrome('hello'));                           // false
