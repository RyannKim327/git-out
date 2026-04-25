// 1️⃣ Using a regex (global, matches all spaces)
const withoutSpaces1 = str.replace(/ /g, '');

// 2️⃣ If you need to get rid of **all** whitespace (tabs, newlines, etc.)
const withoutSpaces2 = str.replace(/\s+/g, '');

// 3️⃣ Using `split` + `join` (this will only remove the literal space character)
const withoutSpaces3 = str.split(' ').join('');

// 4️⃣ If you have ES2021, `replaceAll` is a tiny bit cleaner
const withoutSpaces4 = str.replaceAll(' ', '');

// 5️⃣ For a functional style (works even in older versions)
const withoutSpaces5 = Array.from(str).filter(ch => ch !== ' ').join('');
