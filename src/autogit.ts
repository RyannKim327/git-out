function removeAllSpaces(text: string): string {
  // \s matches any whitespace (space, tab, newline, etc.)
  return text.replace(/\s+/g, '');
}
const original = "  Hello,   world!   ";
const withoutSpaces = removeAllSpaces(original);
console.log(withoutSpaces); // => "Hello,world!"
return text.replace(/ /g, '');
return text.split(' ').join('');
