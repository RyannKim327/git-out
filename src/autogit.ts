// 1. Regular expression – removes *any* whitespace (spaces, tabs, newlines)
const noSpace = str.replace(/\s+/g, '');

// 2. If you only want literal space characters:
const noSpaceLiteral = str.replace(/ +/g, '');   // or / /g

// 3. Split/join – handy when you only want spaces:
const noSpaceSplit = str.split(' ').join('');

// 4. Using `Array.filter` to keep non‑space characters:
const noSpaceArray = str.split('').filter(c => c !== ' ').join('');
const original = 'Hello  world!\nThis is\tgood.';
console.log(original.replace(/\s+/g, ''));  // "Helloworld!Thisisgood."
