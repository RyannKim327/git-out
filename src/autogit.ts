// 1️⃣ Convert with the global Number constructor
const n1 = Number("42");          // 42

// 2️⃣ Use the unary plus – super terse
const n2 = +"123";                // 123

// 3️⃣ (recommended for base‑10 integer strings)
const n3 = parseInt("07", 10);    // 7

// 4️⃣ If you need a float, use parseFloat
const n4 = parseFloat("3.14");    // 3.14
const toInt = (s: string | null | undefined): number | null =>
  s == null ? null : parseInt(s, 10);

const age = toInt(queryParamAge); // gives you a number or null if it's missing
