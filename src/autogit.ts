const original = "Hello  world \t from TypeScript!";

const noSpaces = original.replace(/\s+/g, '');   // → "HelloworldfromTypeScript!"
const noSpaces = original.replace(/ +/g, '');
const noSpaces = original.split(' ').join('');
