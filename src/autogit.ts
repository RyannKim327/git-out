function factorial(n: number): number {
  if (n <= 1) return 1;   // base case: 0! = 1 and 1! = 1
  return n * factorial(n - 1);
}
console.log(factorial(5)); // 120
function factorialBig(n: bigint): bigint {
  if (n <= 1n) return 1n;
  return n * factorialBig(n - 1n);
}
