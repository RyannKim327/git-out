const reversed = (str: string): string => [...str].reverse().join('');
console.log(reverse('hello'));     // "olleh"
console.log(reverse('mañana'));    // "anañam"
console.log(reverse('👩🏽‍🚀'));      // "🚀‍🏽👩"  (correctly keeps the emoji together)
