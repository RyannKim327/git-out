/**
 * Very common “good enough” email regex.
 *
 * It accepts most real‑world addresses, rejects obvious
 * malformed strings, and stays within a tiny, readable
 * pattern.  It isn’t RFC‑5322 exhaustive, but that’s usually
 * the sweet spot for UI‑side validation.
 */
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Validate an e‑mail string.
 * @param value – value to test
 * @returns true  if it looks like an e‑mail, false otherwise
 */
export function isValidEmail(value: string): boolean {
  return emailRegex.test(value);
}
const stricterEmailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
import { useState } from 'react';
import { isValidEmail } from './email-utils';

export default function EmailInput() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setEmail(val);
    setError(val && !isValidEmail(val) ? 'Invalid address' : null);
  };

  return (
    <div>
      <input
        type="email"
        value={email}
        onChange={handleChange}
        aria-invalid={!!error}
        aria-describedby={error ? 'email-error' : undefined}
      />
      {error && <div id="email-error" style={{color: 'red'}}>{error}</div>}
    </div>
  );
}
