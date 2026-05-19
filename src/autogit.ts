const clean = str.replace(/\s+/g, '');   // removes **all** whitespace chars
// or, if you only want literal space characters (not tabs, newlines, …)
const clean = str.replaceAll(' ', '');
const input = "  Why   are   we  still  here?  \n";

const withoutAllWhitespace = input.replace(/\s+/g, '');
console.log(withoutAllWhitespace);  // "Whyarewesstillhere?"

const withoutOnlySpaces = input.replaceAll(' ', '');
console.log(withoutOnlySpaces);  // "Why\there? "

// If you want to keep line breaks but trim spaces:
const trimmed = input.trim();  // removes spaces at the start/end only
const noSpaces = str.split(' ').join('');
