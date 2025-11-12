function isPrime(n: number): boolean {
  // Check if the input is a non-integer or less than 2
  if (!Number.isInteger(n) || n <= 1) return false;

  // Handle the only even prime number
  if (n === 2) return true;

  // Eliminate even numbers greater than 2
  if (n % 2 === 0) return false;

  // Check divisors up to the square root of n
  const maxDivisor = Math.sqrt(n);
  
  // Test only odd divisors (start from 3, increment by 2)
  for (let i = 3; i <= maxDivisor; i += 2) {
    if (n % i === 0) return false;
  }

  return true;
}
console.log(isPrime(2));    // true
console.log(isPrime(7));    // true
console.log(isPrime(8));    // false
console.log(isPrime(25));   // false
console.log(isPrime(97));   // true
console.log(isPrime(4.5));  // false (non-integer)
