function isPalindrome(str: string): boolean {
  const cleanStr = str.toLowerCase().replace(/[^a-z0-9]/g, '');
  return cleanStr === [...cleanStr].reverse().join('');
}

// usage
console.log(isPalindrome("A man, a plan, a canal: Panama"); // true
console.log(isPalindrome("racecar")); // true
console.log(isPalindrome("hello")); // false
