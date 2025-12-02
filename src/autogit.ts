// Removes ONLY standard space characters (not tabs/newlines)
const str1: string = "Hello World!";
const noSpaces1: string = str1.replace(/ /g, ''); 
console.log(noSpaces1); // "HelloWorld!"

// Removes ALL whitespace (spaces, tabs, newlines, etc.)
const str2: string = "Type\tScript\n is fun!";
const noWhitespace: string = str2.replace(/\s/g, ''); 
console.log(noWhitespace); // "TypeScriptisfun!"
const str: string = "Remove all spaces";
const result: string = str.split(' ').join('');
console.log(result); // "Removeallspaces"
