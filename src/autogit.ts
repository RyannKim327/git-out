function factorialRec(n: number): number {
  if (n < 0) throw new Error("negatives are not allowed");
  return n <= 1 ? 1 : n * factorialRec(n - 1);
}
function factorialIter(n: number): number {
  if (n < 0) throw new Error("negatives are not allowed");
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
}
function factorialBigInt(n: number): bigint {
  if (n < 0) throw new Error("negatives are not allowed");
  let result: bigint = 1n;
  for (let i = 2; i <= n; i++) {
    result *= BigInt(i);
  }
  return result;
}
const memo = new Map<number, bigint>();

function factorialCached(n: number): bigint {
  if (n < 0) throw new Error("negatives are not allowed");
  if (memo.has(n)) return memo.get(n)!;

  const result = n <= 1 ? 1n : BigInt(n) * factorialCached(n - 1);
  memo.set(n, result);
  return result;
}
console.log(factorialIter(5));      // 120
console.log(factorialBigInt(50));   // 30414093201713378043612608166064768844377641568960512000000000000n
