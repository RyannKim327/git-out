const original = "Hello World This Is Typescript";

// Remove all spaces
const noSpaces = original.replace(/\s/g, "");

console.log(noSpaces); // "HelloWorldThisIsTypescript"
const onlySpacesRemoved = original.replace(/ /g, "");
