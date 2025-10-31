function factorial(n: number): number {
  if (n < 0 || !Number.isInteger(n))
    throw new RangeError('Argument must be a non-negative integer');

  let result = 1;
  for (let i = 2; i <= n; i++) result *= i;
  return result;
}

console.log(factorial(0)); // 1
console.log(factorial(5)); // 120
function factorial(n: number): number {
  if (n < 0 || !Number.isInteger(n))
    throw new RangeError('Argument must be a non-negative integer');
  return n <= 1 ? 1 : n * factorial(n - 1);
}
