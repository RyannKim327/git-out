// 1. The classic `+` operator
const a = "hello";
const b = "world";
const combined1 = a + " " + b; // "hello world"

// 2. Template literals (ES6+)
const combined2 = `${a} ${b}`; // "hello world"
const parts = [a, "awesome", b];
const combined3 = parts.join(" "); // "hello awesome world"
