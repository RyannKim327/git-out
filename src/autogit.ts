const stringWithSpaces = "Hello World 2024";
const noSpaces = stringWithSpaces.replace(/ /g, ''); // "HelloWorld2024"
const noSpaces = stringWithSpaces.replaceAll(' ', ''); // "HelloWorld2024"
const stringWithWhitespace = "Hello\tWorld\n2024";
const noWhitespace = stringWithWhitespace.replace(/\s/g, ''); // "HelloWorld2024"
