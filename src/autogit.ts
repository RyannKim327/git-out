const num = parseInt("123", 10);   // 123 as a number
const num = Number("123");          // 123
const num = +"123";                // 123
const big = BigInt("123456789123456789123"); // 123456789123456789123n
if (Number.isInteger(num)) {
  // safe to use `num` as an int
}
