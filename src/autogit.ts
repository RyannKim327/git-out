const shout: string = "HELLO WORLD";

const whisper: string = shout.toLowerCase(); // "hello world"

console.log(whisper);
const ganglı = "İSTANBUL";

console.log(ganglı.toLocaleLowerCase('tr-TR')); // "istanbul"
console.log(ganglı.toLocaleLowerCase('en-US')); // "i̇stanbul" (notice the dotless I)
