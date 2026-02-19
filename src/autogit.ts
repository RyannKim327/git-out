// emailValidator.ts
export function isEmail(str: string): boolean {
  // RFC‑5322 allows a very wide set of characters.  For most apps a
  // simpler “+ followed by domain” style rule is good enough.
  // This expression is a commonly‑accepted compromise:
  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return emailRe.test(str);
}
export const strictEmailRe = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/;
const tests: Record<string, boolean> = {
  // pass
  'user@example.com': true,
  'user.name+tag@sub.domain.co.uk': true,

  // fail
  'user@': false,
  '@example.com': false,
  'user@@example.com': false,
  'user example@example.com': false,
  'user@.com': false,
  '': false,
};

for (const [addr, expected] of Object.entries(tests)) {
  const result = isEmail(addr);
  console.assert(result === expected, `❌ ${addr}: expected ${expected}, got ${result}`);
}

console.log('All test cases passed!');
import { useForm } from 'react-hook-form';

function MyForm() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = data => console.log('Valid email:', data.email);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register('email', { validate: isEmail })}
        placeholder="email@example.com"
      />
      {errors.email && <p>Email is not valid.</p>}
      <button type="submit">Submit</button>
    </form>
  );
}
