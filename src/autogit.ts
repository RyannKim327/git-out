function isPrime(n: number): boolean {
  if (n <= 1) return false;        // 1 and below are not prime
  if (n <= 3) return true;         // 2 and 3 are prime

  // Even numbers > 2 are composite.
  if (n % 2 === 0) return false;

  // Check odd divisors up to sqrt(n)
  for (let i = 3; i * i <= n; i += 2) {
    if (n % i === 0) return false;
  }
  return true;
}
function isPrime6(n: number): boolean {
  if (n <= 1) return false;
  if (n <= 3) return true;
  if (n % 2 === 0 || n % 3 === 0) return false;

  for (let i = 5; i * i <= n; i += 6) {
    if (n % i === 0 || n % (i + 2) === 0) return false;
  }
  return true;
}
function isPrimeBig(n: bigint): boolean {
  if (n <= 1n) return false;
  if (n <= 3n) return true;
  if (n % 2n === 0n || n % 3n === 0n) return false;

  for (let i = 5n; i * i <= n; i += 6n) {
    if (n % i === 0n || n % (i + 2n) === 0n) return false;
  }
  return true;
}
console.log(isPrime(97));   // true
console.log(isPrime(100));  // false
console.log(isPrime6(97));  // true
console.log(isPrime6(100)); // false
console.log(isPrimeBig(19n)); // true
