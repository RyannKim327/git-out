const str = "Hello \t World \n";
const noSpaces = str.replace(/\s+/g, '');
console.log(noSpaces); // "HelloWorld"
const noSpaces = str.replace(/ /g, '');
