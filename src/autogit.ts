const str: string = " This is a test string. ";
const noSpaces: string = str.replace(/\s+/g, '');
console.log(noSpaces); // Output: "Thisisateststring."
const str: string = " This is a test string. ";
const noSpaces: string = str.split(' ').join('');
console.log(noSpaces); // Output: "Thisisateststring."
const str: string = " This is a test string. ";
const noSpaces: string = str.replaceAll(' ', '');
console.log(noSpaces); // Output: "Thisisateststring."
