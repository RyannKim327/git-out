const txt = "Hello, world!";

// 1. Modern, readable
const hasWorld = txt.includes("world");          // true

// 2. Works everywhere (even older browsers)
const hasWorldOld = txt.indexOf("world") !== -1; // true
const hasWorldCI = txt.toLowerCase().includes("world"); // true
const hasWorldRe = /world/i.test(txt); // true
