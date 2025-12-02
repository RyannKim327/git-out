function factorial(n: number): number {
  if (n < 0) throw new Error('Factorial is undefined for negative numbers');
  return n === 0 || n === 1 ? 1 : n * factorial(n - 1);
}

console.log(factorial(5)); // 120
function factorial(n: number): number {
  if (n < 0) throw new Error('Factorial is undefined for negative numbers');
  let result = 1;
  for (let i = 2; i <= n; i++) result *= i;
  return result;
}

console.log(factorial(10)); // 3628800
