function isPalindrome(str: string): boolean {
  const cleaned = str.toLowerCase().replace(/[^a-z0-9]/g, ''); // keep only alphanumerics
  const reversed = cleaned.split('').reverse().join('');
  return cleaned === reversed;
}

// ---- tests ----
console.log(isPalindrome('RaceCar'));               // true
console.log(isPalindrome('A man, a plan, a canal: Panama')); // true
console.log(isPalindrome('hello'));                 // false
