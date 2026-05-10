const s = "42";

// 1️⃣  Simple integer
const num1 = Number(s);     // 42
const num2 = +"42";         // 42

// 2️⃣  Parse with a specific radix (base)
const hex = parseInt("FF", 16);   // 255
const oct = parseInt("10", 8);    // 8

// 3️⃣  Floating‑point
const floatVal = Number.parseFloat("3.14"); // 3.14

// 4️⃣  BigInt
const big = BigInt("12345678901234567890");

// 5️⃣  Handling bad input
const bad = Number("not a number"); // NaN
