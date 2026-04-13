const EMAIL_REGEX = new RegExp(
  // local part   : a letter or digit, followed by 0–63 chars that can be
  //                 letters, digits, or one of  . _ - + % #
  // domain part  : 1+ labels separated by dots.  Each label may contain
  //                 letters, digits, hyphens (not at the ends).
  //                 The final label (TLD) must be at least two letters.
  //             This purposely *does not* allow quoted local parts,
  //             nor IP‑literal addresses (e.g. [127.0.0.1]).
  //             It covers the vast majority of addresses you’ll see.
  /^(?=.{1,254}$)(?:[A-Za-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\\.[A-Za-z0-9!#$%&'*+\/=?^_`{|}~-]+)*)@(?:[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?)(?:\\.[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?)*\\.[A-Za-z]{2,}$/i
);
/**
 * Returns true if the string looks like a real e‑mail address.
 *
 * @param address The value to test.
 * @returns Boolean indicating validity.
 */
export function isValidEmail(address: string): boolean {
  return EMAIL_REGEX.test(address);
}
import { useState } from "react";
import { isValidEmail } from "./validators";

export function EmailForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(!isValidEmail(email));
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ borderColor: error ? "red" : undefined }}
      />
      {error && <p>That doesn’t look like a valid e‑mail.</p>}
      <button type="submit">Send</button>
    </form>
  );
}
const testEmails = [
  "hello@example.com",
  "user+tag@domain.co.uk",
  "firstname.lastname@sub.domain.org",
  `"just a quote"@example.com",  // invalid here
  "invalid@",
  "@no-local.com",
  "space in local@domain.com",
  "very.long@domain.verylongtldnameforeverthisdoesnotmakeanysensebecausewhothereisit.com"
];

testEmails.forEach(e => console.log(`${e} → ${isValidEmail(e)}`));
