function isPrime(n: number): boolean {
  // Handle edge cases
  if (n <= 1) return false;
  if (n <= 3) return true;
  if (n % 2 === 0 || n % 3 === 0) return false;
  
  // Check for factors from 5 up to sqrt(n)
  for (let i = 5; i * i <= n; i += 6) {
    if (n % i === 0 || n % (i + 2) === 0) {
      return false;
    }
  }
  
  return true;
}
console.log(isPrime(2));  // true
console.log(isPrime(17)); // true
console.log(isPrime(25)); // false
console.log(isPrime(1));  // false
console.log(isPrime(0));  // false
function isPrimeSimple(n: number): boolean {
  if (n <= 1) return false;
  if (n === 2) return true;
  if (n % 2 === 0) return false;
  
  for (let i = 3; i * i <= n; i += 2) {
    if (n % i === 0) return false;
  }
  
  return true;
}
