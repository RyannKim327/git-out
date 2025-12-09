function isPrime(num: number): boolean {
  if (num <= 1) return false; 
  if (num <= 3) return true; // 2 and 3 are prime

  if (num % 2 === 0 || num % 3 === 0) return false; // quick elimination

  const limit = Math.floor(Math.sqrt(num));
  for (let i = 5; i <= limit; i += 6) {
    if (num % i === 0 || num % (i + 2) === 0) return false;
  }

  return true;
}

// Examples:
console.log(isPrime(2));  // true
console.log(isPrime(15)); // false
console.log(isPrime(17)); // true
function isPrimeBasic(num: number): boolean {
  if (num <= 1) return false;
  for (let i = 2; i < num; i++) {
    if (num % i === 0) return false;
  }
  return true;
}
