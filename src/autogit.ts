function factorial(n: number): number {
  if (!Number.isInteger(n) || n < 0)
    throw new RangeError('n must be a non-negative integer');

  let result = 1;
  for (let i = 2; i <= n; ++i) result *= i;
  return result;
}

// quick test
console.log(factorial(0)); // 1
console.log(factorial(5)); // 120
function factorialR(n: number): number {
  if (!Number.isInteger(n) || n < 0)
    throw new RangeError('n must be a non-negative integer');
  return n === 0 || n === 1 ? 1 : n * factorialR(n - 1);
}
function factorialBig(n: bigint): bigint {
  if (n < 0n) throw new RangeError('n must be non-negative');
  let result = 1n;
  for (let i = 2n; i <= n; ++i) result *= i;
  return result;
}

console.log(String(factorialBig(100n))); // 93326215...0000
// normal integer
const f1 = factorial(7);          // 5040

// huge integer
const f2 = factorialBig(50n); // exact 50!
