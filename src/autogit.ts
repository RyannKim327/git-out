const removeSpaces = (s: string) => s.replace(/\s+/g, '');

const original  = 'Hello   world!  How are   you?';
const cleaned    = removeSpaces(original);

console.log(cleaned); // "Helloworld!Howareyou?"
const onlySpace = (s: string) => s.replace(/ +/g, '');
