let originalString: string = "Hello World!";
let lowercaseString: string = originalString.toLowerCase();

console.log(originalString);    // Output: "Hello World!"
console.log(lowercaseString);   // Output: "hello world!"

let anotherString: string = "TYPESCRIPT IS GREAT";
let result: string = anotherString.toLowerCase();

console.log(result);            // Output: "typescript is great"
let originalTurkishI: string = "I"; // This is a capital 'I'
let originalTurkishDotlessI: string = "İ"; // This is a capital 'I' with a dot (Turkish)

// Standard lowercase (English rules)
console.log(originalTurkishI.toLowerCase()); // Output: "i"
console.log(originalTurkishDotlessI.toLowerCase()); // Output: "i̇" (still has the dot, standard English doesn't change it)

// Turkish lowercase
// 'I' (capital dotless I) becomes 'ı' (lowercase dotless i)
console.log(originalTurkishI.toLocaleLowerCase("tr")); // Output: "ı"

// 'İ' (capital dotted I) becomes 'i' (lowercase dotted i)
console.log(originalTurkishDotlessI.toLocaleLowerCase("tr")); // Output: "i"

// Using multiple locales (the first one that provides a valid rule will be used)
console.log(originalTurkishI.toLocaleLowerCase(["en-US", "tr"])); // Output: "i" (en-US takes precedence here for 'I')
