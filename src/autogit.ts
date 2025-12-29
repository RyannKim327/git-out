const str = "42";

// 1. parseInt (radix is optional but recommended)
const n1: number = parseInt(str, 10);   // 42

// 2. Number constructor
const n2: number = Number(str);         // 42

// 3. Unary plus (shortest)
const n3: number = +str;                 // 42
