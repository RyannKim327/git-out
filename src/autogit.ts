const str = "hello world";
const hasFoo = str.includes("world");   // true
const hasBar = str.includes("bar");     // false
const hasCapital = str.includes("WORLD");          // false
const hasCapitalIgnoreCase = str.toLowerCase()
                                .includes("WORLD".toLowerCase()); // true
const hasCapitalIgnoreCase = /world/i.test(str);   // true
const index = str.indexOf("world"); // 6
const missing = str.indexOf("bar"); // -1
const present = str.indexOf("world") !== -1; // true
const hasPrefix = /^hello/.test(str); // true

// With dynamic patterns
const word = "world";
const pattern = new RegExp(word);    // case‑sensitive
const result = pattern.test(str);    // true
// Presence
const contains = text.includes(sub);

// Presence (index form)
const containsIndex = text.indexOf(sub) !== -1;

// Position
const pos = text.indexOf(sub); // -1 if absent

// Case‑insensitive
const containsIC = text.toLowerCase().includes(sub.toLowerCase());

// Regex
const containsRegex = /world/i.test(text);
