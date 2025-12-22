function isPalindrome(str: string): boolean {
  const cleaned = str.toLowerCase().replace(/[^a-z0-9]/g, ''); // keep only letters & digits
  const reversed = cleaned.split('').reverse().join('');
  return cleaned === reversed;
}

// examples
console.log(isPalindrome('RaceCar'));               // true
console.log(isPalindrome('A man, a plan, a canal: Panama')); // true
console.log(isPalindrome('Hello'));               // false
