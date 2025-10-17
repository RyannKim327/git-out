const noSpaces = (str: string): string => str.replace(/\s+/g, '');

// usage
console.log(noSpaces('  hello   world\t\n')); // "helloworld"
