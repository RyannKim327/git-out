/**
 * Very practical “looks‑nice‑like‑an‑email” validator.
 * Not a full RFC‑5322 parser, but catches most real‑world cases.
 */
export function isValidEmail(email: string): boolean {
  // One or more non‑space, non‑@ chars, an @, one or more non‑space @ chars,
  // a dot, and finally one or more non‑space chars.
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}
import validator from 'validator';
validator.isEmail(someString); // true/false
const input = document.querySelector('#email') as HTMLInputElement;

function onSubmit(e: Event) {
  e.preventDefault();
  const email = input.value.trim();

  if (!isValidEmail(email)) {
    alert('That’s not a valid email address.');
    return;
  }

  // …go on with your logic
}
