const str = "  Hello   World\n\t!  ";
const result = str.replace(/\s/g, '');
console.log(result); // "HelloWorld!"
const str = "   Hello World   ";
const result = str.replace(/^\s+/, '');
console.log(result); // "Hello World   "
const str = "   Hello World   ";
const result = str.replace(/\s+$/, '');
console.log(result); // "   Hello World"
const str = "   Hello World   ";
const result = str.trim();
console.log(result); // "Hello World"
const str = "  Hello   World\n\t!  ";
const result = str.replace(/\s+/g, ' ').trim();
console.log(result); // "Hello World !"
// Remove all whitespace
const removeAllWhitespace = (input: string): string => {
    return input.replace(/\s/g, '');
};

// Remove extra whitespace (keep single spaces)
const normalizeWhitespace = (input: string): string => {
    return input.replace(/\s+/g, ' ').trim();
};
function removeSpecificWhitespace(
    input: string, 
    options: { 
        removeSpaces?: boolean; 
        removeTabs?: boolean; 
        removeNewlines?: boolean 
    } = {}
): string {
    let pattern = '';
    
    if (options.removeSpaces) pattern += ' ';
    if (options.removeTabs) pattern += '\\t';
    if (options.removeNewlines) pattern += '\\n\\r';
    
    if (pattern) {
        const regex = new RegExp(`[${pattern}]`, 'g');
        return input.replace(regex, '');
    }
    
    return input;
}

// Example usage
const result = removeSpecificWhitespace("Hello\nWorld\t!", {
    removeNewlines: true,
    removeTabs: true
});
console.log(result); // "HelloWorld!"
